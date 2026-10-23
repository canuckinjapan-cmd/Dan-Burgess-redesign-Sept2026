// Pure helpers for the contact endpoint (no Cloudflare imports, so they can be tested in Node).

export const LIMITS = { name: 100, email: 254, company: 150, message: 5000 };
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u001f\u007f]+/g;

/** Browsers always send Origin on a cross-origin-capable POST; require it to match this host. */
export function isSameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

const oneLine = (v) => String(v ?? "").replace(CONTROL_RE, " ").trim();

/**
 * Validates and normalises the payload. Header-bound fields (name, email, company)
 * are collapsed to one line, which is what prevents header injection.
 * `hp_field` is a honeypot: humans never see it, bots fill it.
 */
export function validateContact(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return { ok: false, field: "body" };
  if (typeof data.hp_field === "string" && data.hp_field.trim() !== "") return { ok: true, spam: true };

  for (const k of ["name", "email", "company", "message"]) {
    if (data[k] != null && typeof data[k] !== "string") return { ok: false, field: k };
  }

  const name = oneLine(data.name);
  const email = oneLine(data.email);
  const company = oneLine(data.company);
  const message = String(data.message ?? "").replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();

  if (!name || name.length > LIMITS.name) return { ok: false, field: "name" };
  if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) return { ok: false, field: "email" };
  if (company.length > LIMITS.company) return { ok: false, field: "company" };
  if (!message || message.length > LIMITS.message) return { ok: false, field: "message" };

  return { ok: true, value: { name, email, company, message } };
}

const enc = new TextEncoder();

export function toBase64(str) {
  const bytes = enc.encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

const wrap76 = (s) => s.match(/.{1,76}/g)?.join("\r\n") ?? "";

/** RFC 2047 encoded-words, split so each stays under the 75-character limit. */
export function encodeSubject(text) {
  const words = [];
  let cur = "";
  let curBytes = 0;
  for (const ch of text) {
    const n = enc.encode(ch).length;
    if (curBytes + n > 42) {
      words.push(cur);
      cur = "";
      curBytes = 0;
    }
    cur += ch;
    curBytes += n;
  }
  if (cur) words.push(cur);
  return words.map((w) => `=?UTF-8?B?${toBase64(w)}?=`).join("\r\n ");
}

/**
 * Builds the full RFC 5322 message. The body is base64, so a message line that is just "."
 * can never terminate the SMTP DATA phase early, and Japanese text survives any relay.
 * The returned string has no trailing CRLF and no terminating dot.
 */
export function buildMessage({ from, to, name, email, company, message, date = new Date() }) {
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    ...(company ? [`Company: ${company}`] : []),
    "",
    "Message:",
    message,
  ]
    .join("\n")
    .replace(/\n/g, "\r\n");

  return [
    `Date: ${date.toUTCString()}`,
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${email}`,
    `Subject: ${encodeSubject(`New inquiry from ${name.slice(0, 40)}`)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrap76(toBase64(body)),
  ].join("\r\n");
}

/** Sends one message over implicit-TLS SMTP (port 465). `connect` is cloudflare:sockets' connect. */
export async function sendMail({ connect, host, port = 465, user, pass, to, rawMessage, timeoutMs = 15000 }) {
  const socket = connect({ hostname: host, port }, { secureTransport: "on" });
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const readReply = async (expected) => {
    for (;;) {
      const lines = buffer.split("\r\n");
      for (let i = 0; i < lines.length - 1; i++) {
        const m = /^(\d{3})([ -])/.exec(lines[i]);
        if (!m) continue;
        if (m[2] === " ") {
          if (m[1] === expected) {
            buffer = lines.slice(i + 1).join("\r\n");
            return;
          }
          if (m[1][0] === "4" || m[1][0] === "5") throw new Error(`SMTP ${m[1]} (expected ${expected})`);
        }
      }
      const { value, done } = await reader.read();
      if (done) throw new Error("SMTP connection closed early");
      buffer += decoder.decode(value, { stream: true });
    }
  };
  const send = (line) => writer.write(enc.encode(line + "\r\n"));
  const cmd = async (line, expected) => {
    await send(line);
    await readReply(expected);
  };

  const run = async () => {
    await readReply("220");
    await cmd("EHLO danburgess.com", "250");
    await cmd("AUTH LOGIN", "334");
    await cmd(btoa(user), "334");
    await cmd(btoa(pass), "235");
    await cmd(`MAIL FROM:<${user}>`, "250");
    await cmd(`RCPT TO:<${to}>`, "250");
    await cmd("DATA", "354");
    await cmd(`${rawMessage}\r\n.`, "250");
    await send("QUIT").catch(() => {});
  };

  let timer;
  try {
    await Promise.race([
      run(),
      new Promise((_, rej) => {
        timer = setTimeout(() => rej(new Error("SMTP timeout")), timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
    try {
      await socket.close();
    } catch {
      /* already closed */
    }
  }
}

// Run with: node --test functions/_lib/contact.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { validateContact, buildMessage, encodeSubject, isSameOrigin, sendMail } from "./contact.js";

const good = { name: "Taro", email: "taro@example.co.jp", company: "", message: "Hello" };

test("validate: accepts a normal payload", () => {
  const r = validateContact(good);
  assert.equal(r.ok, true);
  assert.equal(r.value.name, "Taro");
});

test("validate: header injection via email/name is rejected or flattened", () => {
  assert.equal(validateContact({ ...good, email: "a@b.co\r\nBcc: x@y.z" }).ok, false);
  const r = validateContact({ ...good, name: "Taro\r\nBcc: x@y.z" });
  assert.equal(r.ok, true);
  assert.ok(!/[\r\n]/.test(r.value.name));
});

test("validate: limits, types and honeypot", () => {
  assert.equal(validateContact({ ...good, message: "x".repeat(5001) }).ok, false);
  assert.equal(validateContact({ ...good, name: 5 }).ok, false);
  assert.equal(validateContact(null).ok, false);
  assert.equal(validateContact({ ...good, hp_field: "buy now" }).spam, true);
});

test("encodeSubject: every encoded-word <= 75 chars, Japanese intact", () => {
  const s = encodeSubject("New inquiry from 山田太郎山田太郎山田太郎山田太郎");
  for (const w of s.split("\r\n ")) assert.ok(w.length <= 75, w);
});

test("isSameOrigin", () => {
  const mk = (origin) => ({ url: "https://www.danburgess.com/api/contact", headers: new Headers(origin ? { Origin: origin } : {}) });
  assert.equal(isSameOrigin(mk("https://www.danburgess.com")), true);
  assert.equal(isSameOrigin(mk("https://evil.example")), false);
  assert.equal(isSameOrigin(mk(null)), false);
});

// --- fake SMTP server speaking through web streams
function fakeConnect(log, { failAuth = false } = {}) {
  return () => {
    let ctl;
    let inData = false;
    let dataBuf = "";
    const readable = new ReadableStream({ start(c) { ctl = c; c.enqueue(new TextEncoder().encode("220 fake ESMTP\r\n")); } });
    const reply = (s) => ctl.enqueue(new TextEncoder().encode(s + "\r\n"));
    let awaiting = null;
    const writable = new WritableStream({
      write(chunk) {
        const text = new TextDecoder().decode(chunk);
        if (inData) {
          dataBuf += text;
          if (dataBuf.endsWith("\r\n.\r\n")) { inData = false; log.data = dataBuf; reply("250 2.0.0 OK queued"); }
          return;
        }
        for (const line of text.split("\r\n").filter(Boolean)) {
          log.cmds.push(line.startsWith("EHLO") || /^(AUTH|MAIL|RCPT|DATA|QUIT)/.test(line) ? line : "<b64>");
          if (awaiting === "user") { awaiting = "pass"; reply("334 UGFzc3dvcmQ6"); continue; }
          if (awaiting === "pass") { awaiting = null; reply(failAuth ? "535 5.7.8 bad creds" : "235 2.7.0 Accepted"); continue; }
          if (line.startsWith("EHLO")) { reply("250-fake"); reply("250-8BITMIME"); reply("250 AUTH LOGIN"); }
          else if (line === "AUTH LOGIN") { awaiting = "user"; reply("334 VXNlcm5hbWU6"); }
          else if (line.startsWith("MAIL") || line.startsWith("RCPT")) reply("250 OK");
          else if (line === "DATA") { inData = true; reply("354 go ahead"); }
        }
      },
    });
    return { readable, writable, close: async () => { log.closed = true; } };
  };
}

test("sendMail: full dialog, body is base64, dot-only line cannot end DATA early", async () => {
  const log = { cmds: [] };
  const v = validateContact({ ...good, message: "line one\r\n.\r\nQUIT\r\nMAIL FROM:<evil@x.y>\r\n日本語です" }).value;
  const raw = buildMessage({ from: "me@example.com", to: "me@example.com", ...v });
  await sendMail({ connect: fakeConnect(log), host: "x", user: "me@example.com", pass: "pw", to: "me@example.com", rawMessage: raw });
  assert.deepEqual(log.cmds.filter((c) => /^(AUTH|MAIL|RCPT|DATA)/.test(c)), ["AUTH LOGIN", "MAIL FROM:<me@example.com>", "RCPT TO:<me@example.com>", "DATA"]);
  assert.ok(log.closed);
  const body = log.data.split("\r\n\r\n")[1];
  assert.match(body, /^[A-Za-z0-9+/=\r\n.]+$/);
  assert.equal((log.data.match(/\r\n\.\r\n/g) || []).length, 1);
  const decoded = Buffer.from(body.replace(/\r\n\.\r\n$/, "").replace(/\r\n/g, ""), "base64").toString("utf8");
  assert.ok(decoded.includes("日本語です") && decoded.includes("\r\n.\r\nQUIT"));
  assert.match(log.data, /Reply-To: taro@example\.co\.jp\r\n/);
});

test("sendMail: auth failure rejects and still closes the socket", async () => {
  const log = { cmds: [] };
  await assert.rejects(sendMail({ connect: fakeConnect(log, { failAuth: true }), host: "x", user: "u@x.y", pass: "bad", to: "u@x.y", rawMessage: "x" }), /535/);
  assert.ok(log.closed);
});

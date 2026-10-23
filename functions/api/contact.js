import { connect } from "cloudflare:sockets";
import { isSameOrigin, validateContact, buildMessage, sendMail } from "../_lib/contact.js";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export const onRequestPost = async ({ request, env }) => {
  if (!isSameOrigin(request)) return json({ message: "Forbidden" }, 403);

  if (!(request.headers.get("Content-Type") || "").includes("application/json")) {
    return json({ message: "Unsupported media type" }, 415);
  }

  const raw = await request.text();
  if (raw.length > 20000) return json({ message: "Payload too large" }, 413);

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ message: "Invalid request" }, 400);
  }

  const result = validateContact(data);
  if (!result.ok) return json({ message: "Invalid request", field: result.field }, 400);
  if (result.spam) return json({ message: "Success" }); // honeypot: pretend it worked

  if (!env.SMTP_USER || !env.SMTP_PASS) {
    console.error("contact: SMTP_USER / SMTP_PASS are not set");
    return json({ message: "Server error" }, 500);
  }

  const to = env.CONTACT_EMAIL || env.SMTP_USER;
  try {
    await sendMail({
      connect,
      host: env.SMTP_HOST || "smtp.gmail.com",
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
      to,
      rawMessage: buildMessage({ from: env.SMTP_USER, to, ...result.value }),
    });
    return json({ message: "Success" });
  } catch (err) {
    // Detail stays in the Cloudflare logs; the client only gets a generic error.
    console.error("contact: send failed:", err?.message);
    return json({ message: "Server error" }, 502);
  }
};

// Anything other than POST
export const onRequest = () => json({ message: "Method not allowed" }, 405);

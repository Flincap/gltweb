import type { VercelRequest, VercelResponse } from "./_lib/types.js";
import {
  clean,
  cleanMultiline,
  clientIp,
  escapeHtml,
  isEmail,
  json,
  methodNotAllowed,
  readBody,
} from "./_lib/http.js";
import { hashIp, rateLimit, saveMessage, storageReady } from "./_lib/store.js";

const TO = process.env.CONTACT_TO || "enquiries@glt.church";
const FROM = process.env.CONTACT_FROM || "GLT Church Website <website@glt.church>";

function buildHtml(f: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  location: string;
  message: string;
}) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 14px 6px 0;color:#5a6657;font:600 12px/1.5 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${label}</td>
      <td style="padding:6px 0;color:#0e150c;font:400 15px/1.6 Arial,sans-serif">${value}</td>
    </tr>`;

  return `<!doctype html>
<html><body style="margin:0;background:#f7f5ef;padding:24px">
  <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid rgba(14,21,12,.12)">
    <tr><td style="background:#257f18;padding:22px 26px">
      <p style="margin:0;color:#eef9e6;font:700 11px/1.4 Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase">New website message</p>
      <p style="margin:6px 0 0;color:#fff;font:700 22px/1.3 Arial,sans-serif">${escapeHtml(f.subject)}</p>
    </td></tr>
    <tr><td style="padding:24px 26px">
      <table role="presentation" width="100%">
        ${row("From", escapeHtml(f.name))}
        ${row("Email", `<a href="mailto:${escapeHtml(f.email)}" style="color:#1b6111">${escapeHtml(f.email)}</a>`)}
        ${row("Phone", f.phone ? escapeHtml(f.phone) : "—")}
        ${row("Extension", escapeHtml(f.location))}
      </table>
      <div style="margin-top:20px;padding-top:18px;border-top:1px solid rgba(14,21,12,.12);color:#1a2417;font:400 15px/1.75 Arial,sans-serif;white-space:pre-wrap">${escapeHtml(f.message)}</div>
    </td></tr>
    <tr><td style="padding:16px 26px;background:#f7f5ef;color:#5a6657;font:400 12px/1.6 Arial,sans-serif">
      Sent from the contact form on glt.church. Reply directly to answer ${escapeHtml(f.name)}.
    </td></tr>
  </table>
</body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(res, 503, {
      error: "Email delivery is not configured yet. Please email us directly.",
    });
  }

  const body = readBody(req.body);

  // Honeypot and dwell time. Both are client-supplied, so they are a filter
  // for lazy bots, not a security control; the rate limit below is the guard.
  if (clean(body.website, 200)) {
    // Look successful so the bot does not retry with the field cleared.
    return json(res, 200, { ok: true, stored: false });
  }
  const elapsed = Number(body.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < 2000) {
    return json(res, 400, { error: "That was too quick. Please try again." });
  }

  const ip = clientIp(req);
  const limit = await rateLimit(`contact:${hashIp(ip)}`, 5, 15 * 60);
  if (!limit.allowed) {
    return json(res, 429, {
      error: "Too many messages from this connection. Please try again shortly.",
    });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const phone = clean(body.phone, 40);
  const subject = clean(body.subject, 60) || "Enquiry";
  const location = clean(body.location, 80) || "International Headquarters (Lekki, Lagos)";
  const message = cleanMultiline(body.message, 4000);

  if (!name || !isEmail(email) || message.length < 2) {
    return json(res, 400, {
      error: "Please check your name, email address, and message.",
    });
  }

  const fields = { name, email, phone, subject, location, message };
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Extension: ${location}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  let delivered = false;
  let deliveryError = "";
  try {
    const send = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `[${location}] ${subject} — ${name}`,
        html: buildHtml(fields),
        text,
      }),
    });
    delivered = send.ok;
    if (!send.ok) {
      deliveryError = `Resend responded ${send.status}`;
      console.error("Resend delivery failed", send.status, await send.text());
    }
  } catch (err) {
    deliveryError = "Resend request threw";
    console.error("Resend request failed", err);
  }

  // Archive regardless of delivery, so a mail outage never loses a message.
  let stored = false;
  if (storageReady) {
    try {
      await saveMessage({ ...fields, ipHash: hashIp(ip), delivered });
      stored = true;
    } catch (err) {
      console.error("Message archive failed", err);
    }
  }

  if (!delivered && !stored) {
    return json(res, 502, {
      error:
        "We could not send that just now. Please email enquiries@glt.church directly.",
      detail: deliveryError || undefined,
    });
  }

  return json(res, 200, { ok: true, stored, delivered });
}

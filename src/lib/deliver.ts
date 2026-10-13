import { site } from "@/content/site";

/**
 * Delivers form submissions. Configure at least one channel in production:
 *  - RESEND_API_KEY + INQUIRY_FROM_EMAIL → email via Resend (resend.com)
 *  - FORM_WEBHOOK_URL → JSON POST to Zapier / Make / Google Apps Script / CRM
 * Without either, submissions are logged in development and rejected in
 * production so leads are never silently lost.
 */

export type Topic = "wholesale" | "retail" | "partnerships" | "press";

export function inboxFor(topic: Topic) {
  const env = process.env[`INQUIRY_EMAIL_${topic.toUpperCase()}`];
  return env || site.inquiryRouting[topic];
}

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function toHtml(title: string, fields: Record<string, unknown>) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#6b625a;vertical-align:top;white-space:nowrap">${escape(k)}</td><td style="padding:6px 12px;color:#2e2b28">${escape(
          typeof v === "string" ? v : JSON.stringify(v, null, 2),
        ).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif"><h2 style="color:#2b1a12">${escape(title)}</h2><table style="border-collapse:collapse;font-size:14px">${rows}</table></div>`;
}

export async function deliver({
  topic,
  subject,
  replyTo,
  fields,
}: {
  topic: Topic;
  subject: string;
  replyTo?: string;
  fields: Record<string, unknown>;
}): Promise<{ ok: boolean; error?: string }> {
  const to = inboxFor(topic);
  const tasks: Promise<Response>[] = [];

  if (process.env.RESEND_API_KEY && process.env.INQUIRY_FROM_EMAIL) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.INQUIRY_FROM_EMAIL,
          to: [to],
          reply_to: replyTo,
          subject: `[Website] ${subject}`,
          html: toHtml(subject, fields),
        }),
      }),
    );
  }

  if (process.env.FORM_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, to, subject, replyTo, fields, receivedAt: new Date().toISOString() }),
      }),
    );
  }

  if (tasks.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`\n[form] ${subject} → ${to}\n`, fields);
      return { ok: true };
    }
    console.error("[form] No delivery channel configured (RESEND_API_KEY or FORM_WEBHOOK_URL).");
    return { ok: false, error: "not-configured" };
  }

  const results = await Promise.allSettled(tasks);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) console.error("[form] Delivery failed", results);
  return delivered ? { ok: true } : { ok: false, error: "delivery-failed" };
}

/** Very small in-memory rate limiter (per server instance). */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > limit;
}

import { NextResponse } from "next/server";
import { deliver, rateLimited, type Topic } from "@/lib/deliver";

/**
 * One endpoint for every lead form. `type` decides required fields and routing.
 */
const schemas: Record<string, { required: string[]; topic: (d: Record<string, string>) => Topic; subject: (d: Record<string, string>) => string }> = {
  quote: {
    required: ["name", "email", "company", "country", "volume"],
    topic: () => "wholesale",
    subject: (d) => `Quote request — ${d.company} (${d.country}) — ${d.volume}`,
  },
  sample: {
    required: ["name", "email", "company", "country", "address", "coffees"],
    topic: () => "wholesale",
    subject: (d) => `Sample request — ${d.company} (${d.country})`,
  },
  "price-list": {
    required: ["name", "email", "company", "country"],
    topic: () => "wholesale",
    subject: (d) => `Price list request — ${d.company} (${d.country})`,
  },
  contact: {
    required: ["name", "email", "topic", "message"],
    topic: (d) => (["wholesale", "retail", "partnerships", "press"].includes(d.topic) ? (d.topic as Topic) : "wholesale"),
    subject: (d) => `${d.topic?.[0]?.toUpperCase()}${d.topic?.slice(1)} enquiry — ${d.name}`,
  },
  newsletter: {
    required: ["email"],
    topic: () => "partnerships",
    subject: (d) => `Newsletter signup — ${d.email}`,
  },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const type = String(body.type ?? "");
  const schema = schemas[type];
  if (!schema) return NextResponse.json({ ok: false, error: "Unknown form." }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(`${ip}:${type}`)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later or email us directly." }, { status: 429 });
  }

  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(body)) {
    if (k === "type" || k === "website") continue;
    data[k] = (Array.isArray(v) ? v.join(", ") : String(v ?? "")).slice(0, 5000).trim();
  }

  const missing = schema.required.filter((f) => !data[f]);
  if (missing.length) return NextResponse.json({ ok: false, error: "Please complete the required fields.", fields: missing }, { status: 422 });
  if (!EMAIL.test(data.email)) return NextResponse.json({ ok: false, error: "Please enter a valid email address.", fields: ["email"] }, { status: 422 });
  if (type !== "newsletter" && data.consent !== "true" && data.consent !== "on") {
    return NextResponse.json({ ok: false, error: "Please accept the privacy policy.", fields: ["consent"] }, { status: 422 });
  }

  const result = await deliver({
    topic: schema.topic(data),
    subject: schema.subject(data),
    replyTo: data.email,
    fields: { form: type, ...data, page: req.headers.get("referer") ?? "" },
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "We couldn't send your message just now. Please email or WhatsApp us directly." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}

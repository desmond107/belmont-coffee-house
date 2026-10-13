import { NextResponse } from "next/server";
import { getProduct } from "@/content/products";
import { shippingFor, type ShippingId } from "@/lib/shipping";
import { deliver, rateLimited } from "@/lib/deliver";

/**
 * Receives a retail order. Prices are recalculated on the server from the
 * product data; client-side totals are never trusted.
 *
 * PAYMENT: this phase emails the order to the team, who send a secure payment
 * link (card via Stripe/Pesapal/Flutterwave, or M-Pesa). To take payment at
 * checkout, create the provider session here and return its redirect URL. See
 * GUIDE.md → "Shop & payments".
 */
type Line = { slug: string; size: string; qty: number };

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(`${ip}:order`, 5)) return NextResponse.json({ ok: false, error: "Too many attempts." }, { status: 429 });

  const body = await req.json().catch(() => null);
  if (!body?.lines?.length || !body.customer?.email || !body.customer?.name || !body.customer?.country) {
    return NextResponse.json({ ok: false, error: "Please complete your details." }, { status: 422 });
  }

  const lines = (body.lines as Line[]).flatMap((l) => {
    const p = getProduct(l.slug);
    const size = p?.retail?.find((s) => s.label === l.size);
    const qty = Math.min(Math.max(1, Math.floor(Number(l.qty) || 1)), 99);
    return p && size ? [{ name: p.name, size: size.label, sku: size.sku, qty, unitUSD: size.priceUSD, totalUSD: size.priceUSD * qty }] : [];
  });
  if (!lines.length) return NextResponse.json({ ok: false, error: "Your cart is empty." }, { status: 422 });

  const subtotal = lines.reduce((s, l) => s + l.totalUSD, 0);
  const shipping = shippingFor(String(body.customer.country), body.shipping as ShippingId, subtotal);
  if (!shipping) return NextResponse.json({ ok: false, error: "Please choose a delivery option." }, { status: 422 });

  const ref = `BLM-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const total = subtotal + shipping.priceUSD;

  const result = await deliver({
    topic: "retail",
    subject: `New retail order ${ref} — US$${total.toFixed(2)}`,
    replyTo: body.customer.email,
    fields: {
      reference: ref,
      customer: body.customer,
      lines: lines.map((l) => `${l.qty} × ${l.name} (${l.size}, ${l.sku}) — US$${l.totalUSD.toFixed(2)}`).join("\n"),
      subtotalUSD: subtotal.toFixed(2),
      shipping: `${shipping.label} — US$${shipping.priceUSD.toFixed(2)}`,
      totalUSD: total.toFixed(2),
      displayCurrency: body.currency,
      paymentPreference: body.payment,
      notes: body.notes,
    },
  });

  if (!result.ok) return NextResponse.json({ ok: false, error: "We couldn't place your order just now. Please try again or WhatsApp us." }, { status: 503 });
  return NextResponse.json({ ok: true, ref, totalUSD: total });
}

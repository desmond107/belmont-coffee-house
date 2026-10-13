"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart, usePrefs } from "@/components/providers";
import { useCartDetails } from "./CartView";
import { optionsFor, shippingFor, type ShippingId } from "@/lib/shipping";
import { countryList } from "@/content/countries";

export function CheckoutForm() {
  const { ready, lines, clear } = useCart();
  const { price, currency } = usePrefs();
  const { items, subtotal } = useCartDetails();
  const [country, setCountry] = useState("Kenya");
  const [shipping, setShipping] = useState<ShippingId>("nairobi");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [ref, setRef] = useState("");

  const options = optionsFor(country);
  const chosen = useMemo(() => shippingFor(country, shipping, subtotal) ?? (options[0] ? shippingFor(country, options[0].id, subtotal) : null), [country, shipping, subtotal, options]);
  const total = subtotal + (chosen?.priceUSD ?? 0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (fd.website) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines,
          shipping: chosen?.id,
          currency,
          payment: fd.payment,
          notes: fd.notes,
          customer: { name: fd.name, email: fd.email, phone: fd.phone, address: fd.address, city: fd.city, postalCode: fd.postalCode, country },
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setRef(json.ref);
      setStatus("done");
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message ? err.message : "Something went wrong.");
    }
  }

  if (status === "done")
    return (
      <div role="status" className="mx-auto max-w-2xl bg-parchment p-10 text-center ring-1 ring-line">
        <p className="eyebrow">Order received</p>
        <h2 className="mt-3 text-4xl">Thank you. Your reference is {ref}.</h2>
        <p className="mt-4 leading-relaxed text-muted">
          We&apos;ve received your order and will send a secure payment link (card, M-Pesa or PayPal) to your email within business hours. Your coffee is roasted and dispatched once payment is confirmed.
        </p>
        <Link href="/shop" className="mt-8 inline-block text-sm font-semibold text-gold-deep underline underline-offset-4">Continue shopping</Link>
      </div>
    );

  if (!ready) return <p className="text-muted">Loading…</p>;
  if (!items.length)
    return (
      <p className="text-muted">
        Your cart is empty. <Link href="/shop" className="text-gold-deep underline">Visit the shop</Link>.
      </p>
    );

  const field = "field";
  return (
    <form onSubmit={submit} className="grid gap-12 lg:grid-cols-[1fr_24rem]">
      <div className="space-y-10">
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-4 font-serif text-2xl font-semibold text-espresso">Contact</legend>
          <label className="sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold">Full name *</span><input name="name" required autoComplete="name" className={field} /></label>
          <label><span className="mb-1.5 block text-sm font-semibold">Email *</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
          <label><span className="mb-1.5 block text-sm font-semibold">Phone / WhatsApp *</span><input name="phone" type="tel" required autoComplete="tel" className={field} /></label>
        </fieldset>
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-4 font-serif text-2xl font-semibold text-espresso">Delivery address</legend>
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold">Country *</span>
            <select
              name="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setShipping(optionsFor(e.target.value)[0]?.id ?? "international");
              }}
              className={field}
              autoComplete="country-name"
            >
              {countryList.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="sm:col-span-2"><span className="mb-1.5 block text-sm font-semibold">Street address *</span><input name="address" required autoComplete="street-address" className={field} /></label>
          <label><span className="mb-1.5 block text-sm font-semibold">City *</span><input name="city" required autoComplete="address-level2" className={field} /></label>
          <label><span className="mb-1.5 block text-sm font-semibold">Postal code</span><input name="postalCode" autoComplete="postal-code" className={field} /></label>
        </fieldset>
        <fieldset>
          <legend className="mb-4 font-serif text-2xl font-semibold text-espresso">Delivery method</legend>
          <div className="space-y-2">
            {options.map((o) => {
              const priced = shippingFor(country, o.id, subtotal)!;
              return (
                <label key={o.id} className="flex cursor-pointer items-center justify-between gap-4 border border-line bg-white p-4 has-[:checked]:border-espresso">
                  <span className="flex items-center gap-3">
                    <input type="radio" name="shipping" value={o.id} checked={chosen?.id === o.id} onChange={() => setShipping(o.id)} className="accent-espresso" />
                    <span>
                      <span className="block font-semibold text-espresso">{o.label}</span>
                      <span className="text-sm text-muted">{o.eta}{o.freeOverUSD ? ` · free over ${price(o.freeOverUSD)}` : ""}</span>
                    </span>
                  </span>
                  <span className="font-semibold">{priced.priceUSD === 0 ? "Free" : price(priced.priceUSD)}</span>
                </label>
              );
            })}
          </div>
          {country !== "Kenya" && <p className="mt-3 text-xs text-muted">International orders may be subject to import duties and taxes in the destination country, payable by the recipient.</p>}
        </fieldset>
        <fieldset>
          <legend className="mb-4 font-serif text-2xl font-semibold text-espresso">Payment preference</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {["Card (Visa / Mastercard)", "M-Pesa", "PayPal"].map((m, i) => (
              <label key={m} className="flex cursor-pointer items-center gap-3 border border-line bg-white p-4 text-sm has-[:checked]:border-espresso">
                <input type="radio" name="payment" value={m} defaultChecked={i === 0} className="accent-espresso" /> {m}
              </label>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            For your security, we never collect card details on this page. After you place your order, we email a secure payment link from our payment provider.
          </p>
        </fieldset>
        <label className="block"><span className="mb-1.5 block text-sm font-semibold">Order notes</span><textarea name="notes" rows={3} className={field} placeholder="Gift message, grind preference, delivery instructions…" /></label>
        <div aria-hidden className="absolute -left-[9999px]"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      </div>

      <aside className="h-fit bg-parchment p-8 ring-1 ring-line lg:sticky lg:top-28">
        <h2 className="text-2xl">Your order</h2>
        <ul className="mt-6 space-y-3 text-sm">
          {items.map((i) => (
            <li key={`${i.slug}-${i.size}`} className="flex justify-between gap-4">
              <span>{i.qty} × {i.product.name} <span className="text-muted">({i.size})</span></span>
              <span className="shrink-0">{price(i.total)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{price(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd>{chosen ? (chosen.priceUSD === 0 ? "Free" : price(chosen.priceUSD)) : "—"}</dd></div>
          <div className="flex justify-between border-t border-line pt-3 text-base font-semibold text-espresso"><dt>Total</dt><dd>{price(total)}</dd></div>
        </dl>
        <label className="mt-6 flex items-start gap-3 text-xs text-muted">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-espresso" />
          <span>I accept the <Link href="/terms" className="underline">terms of sale</Link> and <Link href="/privacy" className="underline">privacy policy</Link>.</span>
        </label>
        <button type="submit" disabled={status === "sending" || !chosen} className="mt-6 w-full rounded-[2px] bg-espresso px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-cream hover:bg-roast disabled:opacity-60">
          {status === "sending" ? "Placing order…" : "Place order"}
        </button>
        <div aria-live="polite">{status === "error" && <p className="mt-4 text-sm text-[#7a2a1d]">{error}</p>}</div>
      </aside>
    </form>
  );
}

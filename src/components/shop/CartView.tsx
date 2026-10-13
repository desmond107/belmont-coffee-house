"use client";

import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/content/products";
import { images } from "@/content/images";
import { useCart, usePrefs } from "@/components/providers";

export function useCartDetails() {
  const { lines } = useCart();
  const items = lines.flatMap((l) => {
    const p = getProduct(l.slug);
    const s = p?.retail?.find((x) => x.label === l.size);
    return p && s ? [{ ...l, product: p, unit: s.priceUSD, total: s.priceUSD * l.qty }] : [];
  });
  return { items, subtotal: items.reduce((n, i) => n + i.total, 0) };
}

export function CartView() {
  const { ready, setQty, remove } = useCart();
  const { price } = usePrefs();
  const { items, subtotal } = useCartDetails();

  if (!ready) return <p className="text-muted">Loading your cart…</p>;
  if (!items.length)
    return (
      <div className="border border-dashed border-line p-12 text-center">
        <p className="font-serif text-3xl text-espresso">Your cart is empty.</p>
        <Link href="/shop" className="mt-6 inline-block rounded-[2px] bg-espresso px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-cream">
          Browse the shop
        </Link>
      </div>
    );

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((i) => (
          <li key={`${i.slug}-${i.size}`} className="flex gap-5 py-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-sand">
              <Image src={images[i.product.image].src} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row">
              <div>
                <Link href={`/shop/${i.slug}`} className="font-serif text-xl text-espresso hover:text-gold-deep">{i.product.name}</Link>
                <p className="text-sm text-muted">{i.size} · {price(i.unit)} each</p>
                <button onClick={() => remove(i.slug, i.size)} className="mt-2 text-xs text-muted underline underline-offset-2 hover:text-espresso">Remove</button>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center border border-line bg-white">
                  <span className="sr-only">Quantity for {i.product.name}</span>
                  <button type="button" aria-label="Decrease" onClick={() => setQty(i.slug, i.size, i.qty - 1)} className="px-3 py-2">−</button>
                  <input type="number" min={1} max={99} value={i.qty} onChange={(e) => setQty(i.slug, i.size, Number(e.target.value) || 1)} className="w-10 bg-transparent text-center [appearance:textfield] focus:outline-none" />
                  <button type="button" aria-label="Increase" onClick={() => setQty(i.slug, i.size, i.qty + 1)} className="px-3 py-2">+</button>
                </label>
                <span className="w-24 text-right font-semibold text-espresso">{price(i.total)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit bg-parchment p-8 ring-1 ring-line">
        <h2 className="text-2xl">Order summary</h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-semibold">{price(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="text-muted">Calculated at checkout</dd></div>
        </dl>
        <Link href="/shop/checkout" className="mt-8 block rounded-[2px] bg-espresso px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-cream hover:bg-roast">
          Proceed to checkout
        </Link>
        <p className="mt-4 text-xs leading-relaxed text-muted">Prices shown in your selected currency are converted from USD at indicative rates. You will be charged in USD or KES.</p>
      </aside>
    </div>
  );
}

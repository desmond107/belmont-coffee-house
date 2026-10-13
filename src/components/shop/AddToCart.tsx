"use client";

import Link from "next/link";
import { useState } from "react";
import type { RetailSize } from "@/content/products";
import { useCart, usePrefs } from "@/components/providers";

export function AddToCart({ slug, sizes }: { slug: string; sizes: RetailSize[] }) {
  const [size, setSize] = useState(sizes[0].label);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const { price } = usePrefs();
  const current = sizes.find((s) => s.label === size)!;

  return (
    <div>
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Size</legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <label key={s.label} className="cursor-pointer">
              <input type="radio" name="size" value={s.label} checked={size === s.label} onChange={() => setSize(s.label)} className="peer sr-only" />
              <span className="inline-flex flex-col rounded-[2px] border border-line bg-white px-5 py-3 text-sm transition-colors peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
                <span className="font-semibold">{s.label}</span>
                <span className="text-xs opacity-75">{price(s.priceUSD)}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-6 flex flex-wrap items-end gap-4">
        <label>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">Quantity</span>
          <span className="flex items-center border border-line bg-white">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-lg">−</button>
            <input type="number" min={1} max={99} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))} className="w-12 bg-transparent text-center [appearance:textfield] focus:outline-none" />
            <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(99, q + 1))} className="px-4 py-3 text-lg">+</button>
          </span>
        </label>
        <button
          type="button"
          onClick={() => {
            add({ slug, size, qty });
            setAdded(true);
          }}
          className="flex-1 rounded-[2px] bg-espresso px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-roast"
        >
          Add to cart · {price(current.priceUSD * qty)}
        </button>
      </div>
      <div aria-live="polite">
        {added && (
          <p className="mt-4 flex items-center justify-between gap-4 bg-forest-soft px-4 py-3 text-sm text-forest">
            Added to your cart.
            <Link href="/shop/cart" className="font-semibold underline underline-offset-2">View cart & checkout →</Link>
          </p>
        )}
      </div>
    </div>
  );
}

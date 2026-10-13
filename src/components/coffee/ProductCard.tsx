import Link from "next/link";
import type { Product } from "@/content/products";
import { categoryLabel } from "@/content/products";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/providers";

export function ProductCard({ product: p, showPrice = false }: { product: Product; showPrice?: boolean }) {
  const from = p.retail?.length ? Math.min(...p.retail.map((s) => s.priceUSD)) : null;
  return (
    <Link href={showPrice ? `/shop/${p.slug}` : `/coffee/${p.slug}`} className="group flex h-full flex-col bg-parchment ring-1 ring-line transition-shadow duration-500 hover:shadow-2xl hover:shadow-espresso/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Photo name={p.image} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
        {p.cupScore && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-espresso/90 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
            {p.cupScore} <span className="font-normal text-cream/75">pts</span>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-[0.62rem]!">
          {p.originLabel} · {categoryLabel(p.category).replace(" & Single-Origin Lots", "")}
        </p>
        <h3 className="mt-2 text-2xl leading-tight transition-colors group-hover:text-gold-deep">{p.name}</h3>
        <p className="mt-2 text-sm italic text-muted">{p.tastingNotes.join(" · ")}</p>
        <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-line pt-4 text-xs">
          <div>
            <dt className="text-muted">Grade</dt>
            <dd className="font-semibold text-espresso">{p.grade}</dd>
          </div>
          <div>
            <dt className="text-muted">Process</dt>
            <dd className="font-semibold text-espresso">{p.process}</dd>
          </div>
          <div>
            <dt className="text-muted">{showPrice && from !== null ? "From" : "Altitude"}</dt>
            <dd className="font-semibold text-espresso">{showPrice && from !== null ? <Price usd={from} /> : p.altitude.split(" – ")[0] + (p.altitude.includes("–") ? "+" : "")}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

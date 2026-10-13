import Link from "next/link";
import type { Product } from "@/content/products";
import { categoryLabel } from "@/content/products";
import { programmeName } from "@/content/certifications";

export function SpecTable({ p }: { p: Product }) {
  const rows: [string, React.ReactNode][] = [
    ["Category", categoryLabel(p.category)],
    ["Species", p.species],
    ["Origin", p.originLabel],
    ["Region", p.region ? <Link href={`/origins/${p.region}`} className="underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">{p.regionLabel}</Link> : p.regionLabel],
    ["Altitude", p.altitude],
    ["Variety", p.varieties.join(", ")],
    ["Processing", p.process],
    ["Roast", p.roast === "Green" ? "Green (unroasted)" : p.roast],
    ["Grade / screen", `${p.grade} · ${p.screen}`],
    ["Cupping score", p.cupScore ? `${p.cupScore} points (SCA)` : "Available on request"],
    ["Harvest season", p.harvest],
    ["Packaging", p.packaging.join(" · ")],
    ["Minimum order", p.moq],
    ["Certified lots", p.certifications.length ? p.certifications.map(programmeName).join(", ") : "Available on request"],
  ];
  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-3.5 text-sm sm:grid-cols-[11rem_1fr]">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{k}</dt>
          <dd className="text-espresso">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories, products } from "@/content/products";
import { countries } from "@/content/origins";
import { programmes } from "@/content/certifications";
import { ProductCard } from "./ProductCard";

const uniq = (xs: string[]) => [...new Set(xs)];
const grades = uniq(products.map((p) => p.grade)).filter((g) => !/specification|Blend|Mixed/i.test(g));

const filters = [
  { key: "category", label: "Category", options: categories.map((c) => ({ value: c.id, label: c.label })) },
  { key: "origin", label: "Origin", options: countries.map((c) => ({ value: c.slug, label: c.name })) },
  { key: "process", label: "Process", options: ["Washed", "Natural", "Honey"].map((v) => ({ value: v, label: v })) },
  { key: "roast", label: "Roast level", options: ["Green", "Light", "Medium", "Medium-Dark"].map((v) => ({ value: v, label: v === "Green" ? "Green (unroasted)" : v })) },
  { key: "grade", label: "Grade", options: grades.map((v) => ({ value: v, label: v })) },
  { key: "cert", label: "Certification", options: programmes.filter((p) => p.available && products.some((x) => x.certifications.includes(p.id))).map((p) => ({ value: p.id, label: p.name })) },
] as const;

export function CatalogBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const get = (k: string) => params.get(k) ?? "";

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params.toString());
    if (v) next.set(k, v);
    else next.delete(k);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  const results = useMemo(
    () =>
      products.filter((p) => {
        const f = Object.fromEntries(filters.map((x) => [x.key, params.get(x.key) ?? ""]));
        if (f.category && p.category !== f.category) return false;
        if (f.origin && p.origin !== f.origin && !p.originLabel.toLowerCase().includes(f.origin)) return false;
        if (f.process && p.process !== f.process) return false;
        if (f.roast && p.roast !== f.roast) return false;
        if (f.grade && p.grade !== f.grade) return false;
        if (f.cert && !p.certifications.includes(f.cert)) return false;
        return true;
      }),
    [params],
  );

  const activeCount = filters.filter((f) => get(f.key)).length;
  const activeCategory = categories.find((c) => c.id === get("category"));

  return (
    <div>
      {/* Category tabs */}
      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <ul className="flex min-w-max gap-2 border-b border-line" role="tablist" aria-label="Coffee categories">
          {[{ id: "", label: "All coffees" }, ...categories].map((c) => {
            const on = get("category") === c.id;
            return (
              <li key={c.id}>
                <button
                  role="tab"
                  aria-selected={on}
                  onClick={() => set("category", c.id)}
                  className={`-mb-px border-b-2 px-4 py-4 text-sm font-medium transition-colors ${on ? "border-gold text-espresso" : "border-transparent text-muted hover:text-espresso"}`}
                >
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {activeCategory && <p className="mt-6 max-w-3xl text-muted">{activeCategory.blurb}</p>}

      <div className="mt-10 grid gap-10 lg:grid-cols-[16rem_1fr]">
        <aside aria-label="Filters">
          <div className="flex items-center justify-between">
            <h2 className="font-sans! text-xs font-semibold uppercase tracking-[0.18em] text-espresso">Refine</h2>
            {activeCount > 0 && (
              <button onClick={() => router.replace(pathname, { scroll: false })} className="text-xs text-gold-deep underline underline-offset-2">
                Clear all ({activeCount})
              </button>
            )}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {filters
              .filter((f) => f.key !== "category")
              .map((f) => (
                <label key={f.key} className="block">
                  <span className="mb-1.5 block text-xs text-muted">{f.label}</span>
                  <select value={get(f.key)} onChange={(e) => set(f.key, e.target.value)} className="field py-2.5! text-sm">
                    <option value="">All</option>
                    {f.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
          </div>
          <div className="mt-8 hidden border-t border-line pt-6 text-sm text-muted lg:block">
            <p className="font-serif text-xl text-espresso">Need a full offer list?</p>
            <p className="mt-2">Download our export catalogue, or ask for current stock and prices.</p>
            <a href="/api/catalog" target="_blank" rel="noopener" className="mt-4 inline-block font-semibold text-gold-deep underline underline-offset-4">
              Export catalogue (PDF)
            </a>
          </div>
        </aside>

        <div>
          <p className="mb-6 text-sm text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "coffee" : "coffees"}
          </p>
          {results.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-dashed border-line p-12 text-center">
              <p className="font-serif text-2xl text-espresso">No coffees match those filters.</p>
              <p className="mt-2 text-muted">We source to order, so ask our export desk for what you need.</p>
              <button onClick={() => router.replace(pathname, { scroll: false })} className="mt-6 text-sm font-semibold text-gold-deep underline underline-offset-4">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

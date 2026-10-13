import type { Faq } from "@/content/company";

export function FaqList({ items }: { items: Pick<Faq, "q" | "a">[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-2">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-serif text-xl font-semibold text-espresso sm:text-2xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-base text-gold-deep transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

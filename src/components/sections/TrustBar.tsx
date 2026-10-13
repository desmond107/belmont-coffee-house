import { site } from "@/content/site";
import { licences } from "@/content/certifications";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function TrustBar() {
  return (
    <section id="trust" aria-label="Belmont at a glance" className="border-b border-line bg-parchment">
      <Container>
        <dl className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="flex flex-col px-2 py-10 text-center lg:py-14">
              <dt className="order-2 mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{s.label}</dt>
              <dd className="order-1 font-serif text-5xl font-semibold text-espresso sm:text-6xl">
                {s.value}
                <span className="text-gold">{s.suffix}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line py-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {licences.map((l) => (
            <li key={l.id} className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
              {l.name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

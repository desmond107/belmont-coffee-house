import { testimonials, clients } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="bg-sand py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Trusted by buyers on four continents" title="What our partners say" align="center" />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 120} as="article" className="flex flex-col bg-parchment p-8 ring-1 ring-line sm:p-10">
              <span aria-hidden className="font-serif text-6xl leading-none text-gold">&ldquo;</span>
              <blockquote className="mt-2 flex-1 font-serif text-[1.4rem] leading-snug text-espresso">{t.quote}</blockquote>
              <footer className="mt-8 border-t border-line pt-5 text-sm">
                <p className="font-semibold text-espresso">{t.name}</p>
                <p className="text-muted">
                  {t.role}, {t.company}
                </p>
              </footer>
            </Reveal>
          ))}
        </div>
        <div className="mt-20">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">Selected clients</p>
          {/* Replace these text marks with client logos (with permission). */}
          <ul className="mt-8 grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">
            {clients.map((c) => (
              <li key={c} className="grid h-24 place-items-center bg-sand px-4 text-center font-serif text-lg text-espresso/70">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

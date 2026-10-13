import { impact, impactStories } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
import { Button, Arrow } from "@/components/ui/Button";

export const metadata = pageMeta({
  title: "Sustainability & Community — Fair Pricing, Farmer Livelihoods & Environment",
  description: "Belmont's commitments to smallholder farmers in East Africa: transparent quality premiums, women and youth programmes, water and soil stewardship, and deforestation-free supply.",
  path: "/sustainability",
  image: "plantation",
});

const pillars = [
  { icon: "scale", title: "Fair & transparent pricing", text: "We pay quality premiums above the prevailing market for separated, high-scoring lots, and share the premium paid with buyers who want to see it. Payments to cooperatives are made on time, every time." },
  { icon: "users", title: "Farmer livelihoods", text: "Agronomy support, access to seedlings of resilient varieties such as Batian and Ruiru 11, and pre-harvest finance through partner cooperatives help farmers raise yields and income." },
  { icon: "leaf", title: "Environmental practices", text: "We favour shade-grown coffee, work with washing stations on wastewater treatment and water recycling, and compile deforestation-free plot data for every EU-bound lot." },
  { icon: "water", title: "Water & soil stewardship", text: "Training in composting coffee pulp, mulching and soil conservation improves soil health and reduces the need for chemical inputs." },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability & community"
        title="Great coffee only has a future if farming it does."
        intro="Most of our coffee comes from smallholders farming less than two hectares. Our business depends on their prosperity, and we act accordingly."
        image="plantation"
        crumbs={[{ name: "Sustainability", path: "/sustainability" }]}
      />

      <section className="bg-forest py-20 text-cream">
        <Container>
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((m) => (
              <Reveal key={m.label} className="flex flex-col border-t border-cream/25 pt-6">
                <dt className="order-2 mt-2 text-sm text-cream/80">{m.label}</dt>
                <dd className="order-1 font-serif text-5xl text-cream">{m.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Our commitments" title="Four pillars of responsible sourcing" />
          <div className="mt-14 grid gap-px bg-line md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 100} className="bg-cream p-10">
                <Icon name={p.icon} className="h-9 w-9 text-forest" />
                <h3 className="mt-6 text-3xl">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest-soft py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo name="pickingBranch" sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <div>
              <p className="eyebrow text-forest!">Women & youth</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Investing in the next generation of coffee farmers.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Women do much of the work on East African coffee farms but often receive little of the income. We support women-led groups that produce and sell their own separated lots, and we fund youth agronomy fellowships that train young farmers in pruning, rejuvenation and quality, so coffee is a career worth staying for.
              </p>
              <p className="mt-4 text-sm text-muted">[Add programme names, partner organisations and measurable results.]</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Stories from origin" title="The people behind the cup" />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {impactStories.map((s, i) => (
              <Reveal as="article" key={s.title} delay={i * 100}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo name={s.image} sizes="(min-width:768px) 33vw, 100vw" />
                </div>
                <h3 className="mt-6 text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact?topic=partnerships" variant="dark">Partner with us <Arrow /></Button>
            <Button href="/quality" variant="outline">Traceability & certifications</Button>
          </div>
        </Container>
      </section>
    </>
  );
}

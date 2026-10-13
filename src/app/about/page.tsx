import { story, values, team, timeline } from "@/content/company";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Button, Arrow } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMeta({
  title: "About Us — A Nairobi Coffee Exporter Since 2016",
  description: `The story of Belmont Coffee House: founded in Nairobi in ${site.founded}, exporting East African coffee to partners worldwide. Mission, values, leadership and milestones.`,
  path: "/about",
  image: "plantation",
});

const initials = (role: string) => role.split(/[\s&—-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("");

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About Belmont · Est. ${site.founded}`}
        title="A trading house built on the farms of East Africa."
        intro={story.mission}
        image="cherriesRipening"
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Our story</p>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">It started with one question: why does great Kenyan coffee lose its name?</h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
              <p>{story.founding}</p>
              <p>{story.growth}</p>
              <p>Today, our name stands for one thing among buyers: the coffee that arrives is the coffee they approved. That reputation is earned one container at a time.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-espresso py-24 text-cream sm:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="border-t border-gold/50 pt-8">
              <p className="eyebrow eyebrow-light">Mission</p>
              <p className="mt-4 font-serif text-3xl leading-snug text-cream">{story.mission}</p>
            </div>
            <div className="border-t border-gold/50 pt-8">
              <p className="eyebrow eyebrow-light">Vision</p>
              <p className="mt-4 font-serif text-3xl leading-snug text-cream">{story.vision}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Our values" title="What we stand for" />
          <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="bg-cream p-8">
                <span className="font-serif text-4xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-2xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-parchment py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Leadership" title="The team behind every lot" intro="Coffee people first: cuppers, agronomists and logisticians with decades of combined experience in East African coffee." />
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal as="li" key={i} delay={i * 80}>
                {/* Replace with a professional portrait: /public/images/team/<name>.webp, 4:5 ratio. */}
                <div className="grid aspect-[4/5] place-items-center bg-sand ring-1 ring-line">
                  <span className="font-serif text-6xl text-espresso/30">{initials(m.role)}</span>
                </div>
                <h3 className="mt-5 text-2xl">{m.name}</h3>
                <p className="text-sm font-semibold text-gold-deep">{m.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.bio}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container narrow>
          <SectionHeading eyebrow="Milestones" title="Our journey" align="center" />
          <ol className="relative mt-16 border-l border-gold/40 sm:ml-[7.5rem]">
            {timeline.map((t) => (
              <Reveal as="li" key={t.year + t.title} className="relative pb-12 pl-8 last:pb-0">
                <span className="absolute -left-[5px] top-2.5 h-2.5 w-2.5 rotate-45 bg-gold" />
                <span className="font-serif text-2xl font-semibold text-gold-deep sm:absolute sm:-left-[7.5rem] sm:w-24 sm:text-right">{t.year}</span>
                <h3 className="text-2xl">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Farmer partners</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Our partners are cooperatives, not commodities.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                We buy from the same cooperatives and washing stations season after season across Kenya, Ethiopia, Rwanda, Tanzania and Uganda. Long relationships mean better quality, better prices and real investment in the communities that grow our coffee.
              </p>
              <Button href="/sustainability" variant="outline" className="mt-8">Community impact <Arrow /></Button>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo name="handPicked" sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

import Link from "next/link";
import { countries, regions } from "@/content/origins";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { OriginsMap } from "@/components/map/OriginsMap";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMeta({
  title: "Origins — Coffee Growing Regions of Kenya, Ethiopia, Rwanda, Tanzania & Uganda",
  description: "Explore the East African regions Belmont sources from: Nyeri, Kirinyaga, Yirgacheffe, Guji, Lake Kivu, Kilimanjaro, Mount Elgon and more, with altitude, climate, soil and flavour profiles.",
  path: "/origins",
  image: "ethiopia",
});

export default function OriginsPage() {
  return (
    <>
      <PageHero
        eyebrow="Origins"
        title="Five countries. Ten regions. One standard."
        intro="East Africa's high plateaus, volcanic soils and equatorial sun produce some of the most distinctive coffees on earth. Explore where ours are grown."
        image="kilimanjaro"
        crumbs={[{ name: "Origins", path: "/origins" }]}
      />
      <section className="py-16 sm:py-24">
        <Container>
          <OriginsMap />
        </Container>
      </section>
      {countries.map((c, ci) => (
        <section key={c.slug} id={c.slug} className={`scroll-mt-28 py-20 sm:py-24 ${ci % 2 ? "bg-parchment" : ""}`}>
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHeading eyebrow={c.species} title={c.name} />
                <p className="mt-5 leading-relaxed text-muted">{c.summary}</p>
                <dl className="mt-6 space-y-2 text-sm">
                  <div><dt className="inline font-semibold text-espresso">Harvest: </dt><dd className="inline text-muted">{c.harvest}</dd></div>
                  <div><dt className="inline font-semibold text-espresso">Export bag: </dt><dd className="inline text-muted">{c.bagSize}</dd></div>
                </dl>
                <Link href={`/coffee?origin=${c.slug}`} className="mt-6 inline-block text-sm font-semibold text-gold-deep underline underline-offset-4">
                  View {c.name} coffees →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
                {regions
                  .filter((r) => r.country === c.slug)
                  .map((r, i) => (
                    <Reveal key={r.slug} delay={i * 100}>
                      <Link href={`/origins/${r.slug}`} className="group block bg-cream ring-1 ring-line">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Photo name={r.image} sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" className="transition-transform duration-[1.2s] group-hover:scale-105" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl group-hover:text-gold-deep">{r.name}</h3>
                          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">{r.altitude} · {r.processes.join(" / ")}</p>
                          <p className="mt-3 text-sm italic text-muted">{r.flavor.join(" · ")}</p>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
              </div>
            </div>
          </Container>
        </section>
      ))}
      <CtaBand title="Cup the difference between origins." text="Request a side-by-side origin sample set and compare Kenya, Ethiopia, Rwanda, Tanzania and Uganda on your own cupping table." image="ethiopia" />
    </>
  );
}

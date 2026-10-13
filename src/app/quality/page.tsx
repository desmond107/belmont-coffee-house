import { licences, programmes } from "@/content/certifications";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMeta({
  title: "Quality & Certifications — Q-Grader Cupping, Lab Testing & Traceability",
  description: "How Belmont controls quality: licensed liquorers and Q-graders, moisture and defect analysis, farm-to-container traceability, export licences and certified lots.",
  path: "/quality",
  image: "portafilter",
});

const qc = [
  { icon: "cup", title: "Q-grader cupping", text: "Licensed liquorers and Q Arabica Graders cup every lot to SCA protocol, scoring fragrance, flavour, acidity, body, balance and uniformity. Lots are cupped three times: on offer, on approval and before loading." },
  { icon: "lab", title: "Physical & lab analysis", text: "Each lot is checked for moisture (target 10 – 12%), water activity, density, screen-size distribution and defect count per 350 g. Third-party lab testing for residues and mycotoxins is available on request." },
  { icon: "trace", title: "Farm-to-container traceability", text: "Lot codes link every bag to its washing station or estate, delivery dates, mill and warehouse, and, for EU-bound coffee, the geolocated plots it came from." },
  { icon: "check", title: "Sample-matched shipments", text: "We retain a reference sample from every shipment for 12 months. If arrival quality does not match the approved sample, we resolve it. That is our promise." },
];

const qcFlow = ["Cherry selection at the washing station", "Parchment moisture check before milling", "Hulling, grading and density sorting", "Optical and hand sorting", "Offer cupping and scoring", "Buyer sample approval", "Pre-shipment cupping and moisture check", "Container inspection, stuffing and seal"];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & certifications"
        title="If it doesn't match the sample, it doesn't ship."
        intro="Our quality system is built around one principle: what you cup is what you receive. Here is how we make sure of it."
        image="portafilter"
        crumbs={[{ name: "Quality", path: "/quality" }]}
      />

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-px bg-line md:grid-cols-2">
            {qc.map((q, i) => (
              <Reveal key={q.title} delay={(i % 2) * 100} className="bg-cream p-10">
                <Icon name={q.icon} className="h-9 w-9 text-gold-deep" />
                <h2 className="mt-6 text-3xl">{q.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{q.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-parchment py-24 sm:py-32">
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-28">
              <Photo name="roasterCooling" sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <div>
              <SectionHeading eyebrow="Quality control process" title="Eight checkpoints between farm and port." />
              <ol className="mt-10 border-l border-gold/40">
                {qcFlow.map((s, i) => (
                  <Reveal as="li" key={s} className="relative pb-8 pl-10 last:pb-0">
                    <span className="absolute -left-[13px] top-0 grid h-6 w-6 place-items-center rounded-full bg-espresso text-[10px] font-bold text-gold">{i + 1}</span>
                    <p className="font-serif text-2xl text-espresso">{s}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Licences held" title="Licensed and regulated in Kenya." intro="We hold the licences and permits required to buy, grade and export coffee. Licence numbers are available on request and on every contract." />
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {licences.map((l) => (
              <Reveal as="li" key={l.id} className="flex flex-col bg-parchment p-8 ring-1 ring-line">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-gold text-gold-deep">
                  <Icon name="doc" className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-2xl">{l.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">{l.issuer}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{l.description}</p>
                <p className="mt-6 border-t border-line pt-4 text-xs text-muted">Reference: <span className="text-espresso">{l.reference}</span></p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sand py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Certified lots" title="Certification programmes" intro="Through partner cooperatives and estates, we can supply lots certified under the following programmes. Certificates are supplied with every certified shipment." />
          <ul className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {programmes
              .filter((p) => p.available)
              .map((p) => (
                <li key={p.id} className="bg-sand p-8">
                  {/* Replace this badge with the official certification mark once licensed to use it. */}
                  <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-espresso/40 bg-parchment text-center font-serif text-sm font-semibold leading-tight text-espresso">
                    {p.name}
                  </span>
                  <h3 className="mt-6 text-2xl">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                </li>
              ))}
          </ul>
        </Container>
      </section>

      <CtaBand eyebrow="See for yourself" title="Cup our coffees on your own table." text="Request offer samples with full lab data, and judge our grading against your own standards." image="scoop" />
    </>
  );
}

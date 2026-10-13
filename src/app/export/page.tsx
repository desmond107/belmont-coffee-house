import { exportSteps, incoterms, shippingRoutes, leadTimes, paymentTerms, documents, faqs, caseStudies } from "@/content/company";
import { site } from "@/content/site";
import { faqLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
import { Button, Arrow } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import { PriceListForm } from "@/components/forms/PriceListForm";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMeta({
  title: "Export & Wholesale — Buy Green Coffee Beans in Bulk from Kenya",
  description:
    "How exporting with Belmont works: sourcing, milling, grading, cupping, packing, documentation and shipping. FOB Mombasa, CIF and DAP, payment terms, lead times and compliance documents.",
  path: "/export",
  image: "port",
});

const tradeFaqs = faqs.filter((f) => ["Ordering", "Samples", "Shipping", "Payment"].includes(f.group));

export default function ExportPage() {
  return (
    <>
      <JsonLd data={faqLd(tradeFaqs)} />
      <PageHero
        eyebrow="Export & wholesale"
        title="From washing station to your warehouse, documented at every step."
        intro={`A licensed Kenyan exporter since ${site.founded}, shipping East African green and roasted coffee to importers, roasters, distributors and hospitality groups worldwide.`}
        image="port"
        crumbs={[{ name: "Export & Wholesale", path: "/export" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/quote">Request a quote <Arrow /></Button>
          <Button href="/samples" variant="outline-light">Request samples</Button>
          <Button href="/api/catalog" variant="outline-light">Export catalogue (PDF)</Button>
        </div>
      </PageHero>

      {/* Process */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="How it works" title="Seven stages, three cupping checkpoints." intro="Every Belmont shipment passes through the same disciplined process. Nothing is loaded until you have approved the pre-shipment sample." />
          <ol className="mt-16 space-y-px bg-line">
            {exportSteps.map((s, i) => (
              <Reveal as="li" key={s.title} className="grid gap-4 bg-cream py-8 sm:grid-cols-[6rem_14rem_1fr] sm:items-baseline">
                <span className="font-serif text-5xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-3xl">{s.title}</h3>
                <p className="max-w-2xl leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Incoterms + routes */}
      <section className="bg-parchment py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 [&>*]:min-w-0">
            <div>
              <SectionHeading eyebrow="Incoterms 2020" title="Terms that suit your supply chain." />
              <dl className="mt-10 divide-y divide-line border-y border-line">
                {incoterms.map((t) => (
                  <div key={t.term} className="grid grid-cols-[4.5rem_1fr] gap-4 py-5">
                    <dt className="font-serif text-2xl font-semibold text-gold-deep">{t.term}</dt>
                    <dd>
                      <span className="block font-semibold text-espresso">{t.name}</span>
                      <span className="text-sm text-muted">{t.text}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <SectionHeading eyebrow="Shipping routes" title={`Loading at ${site.ports.join(" & ")}.`} />
              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[28rem] text-left text-sm">
                  <caption className="sr-only">Indicative ocean transit times from Mombasa</caption>
                  <thead>
                    <tr className="border-b border-espresso/20 text-xs uppercase tracking-[0.14em] text-muted">
                      <th scope="col" className="py-3 font-semibold">Destination</th>
                      <th scope="col" className="py-3 font-semibold">Main ports</th>
                      <th scope="col" className="py-3 text-right font-semibold">Transit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {shippingRoutes.map((r) => (
                      <tr key={r.region}>
                        <th scope="row" className="py-4 pr-4 font-serif text-lg font-semibold text-espresso">{r.region}</th>
                        <td className="py-4 pr-4 text-muted">{r.ports}</td>
                        <td className="whitespace-nowrap py-4 text-right text-espresso">{r.transit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted">Indicative port-to-port transit times. They vary by carrier, routing and season.</p>
              <h3 className="mt-12 text-2xl">Lead times</h3>
              <dl className="mt-4 space-y-3 text-sm">
                {leadTimes.map((l) => (
                  <div key={l.label} className="flex justify-between gap-6 border-b border-line pb-3">
                    <dt className="text-muted">{l.label}</dt>
                    <dd className="text-right font-semibold text-espresso">{l.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Payment */}
      <section className="grain relative bg-espresso py-24 text-cream sm:py-28">
        <Container>
          <SectionHeading light eyebrow="Payment terms" title="Secure, bank-backed terms." intro="Green coffee is invoiced in US dollars, as a fixed price or a differential to ICE futures." />
          <div className="mt-14 grid gap-px bg-cream/10 md:grid-cols-3">
            {paymentTerms.map((p) => (
              <div key={p.title} className="bg-espresso p-8">
                <Icon name="scale" className="h-8 w-8 text-gold" />
                <h3 className="mt-6 text-2xl text-cream!">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Compliance */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Compliance & documentation" title="Every certificate, every time." intro="Your customs broker receives a complete, consistent document set with every shipment." />
              <div className="relative mt-10 hidden aspect-[3/4] overflow-hidden lg:block">
                <Photo name="sacks" sizes="33vw" />
              </div>
            </div>
            <ul className="grid gap-px self-start bg-line sm:grid-cols-2 lg:col-span-8">
              {documents.map((d, i) => (
                <Reveal as="li" key={d.title} delay={(i % 2) * 80} className="bg-cream p-8">
                  <Icon name="doc" className="h-7 w-7 text-gold-deep" />
                  <h3 className="mt-5 text-2xl">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Case studies */}
      <section className="bg-sand py-24 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Case studies" title="Programmes we run for our partners" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {caseStudies.map((c) => (
              <article key={c.title} className="grid bg-parchment ring-1 ring-line sm:grid-cols-2">
                <div className="relative aspect-[4/3] sm:aspect-auto">
                  <Photo name={c.image} sizes="(min-width:768px) 25vw, 100vw" />
                </div>
                <div className="p-8">
                  <p className="eyebrow text-[0.62rem]!">{c.client}</p>
                  <h3 className="mt-3 text-2xl">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.result}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Downloads + price list */}
      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Downloads" title="Catalogue & price list" intro="Our export catalogue covers every coffee we currently offer, with full specifications. Prices move with the market, so we send the price list and position report on request." />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/api/catalog" variant="dark"><Icon name="download" className="h-4 w-4" /> Export catalogue (PDF)</Button>
                <Button href="/api/buyers-guide" variant="outline"><Icon name="download" className="h-4 w-4" /> Buyer&apos;s guide (PDF)</Button>
              </div>
            </div>
            <div className="bg-parchment p-8 ring-1 ring-line sm:p-10">
              <h3 className="mb-6 text-3xl">Request the current price list</h3>
              <PriceListForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-parchment py-24 sm:py-28">
        <Container narrow>
          <SectionHeading eyebrow="Buyer FAQ" title="Questions buyers ask us" align="center" className="mb-12" />
          <FaqList items={tradeFaqs} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

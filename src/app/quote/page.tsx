import { Suspense } from "react";
import { site, whatsappLink } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata = pageMeta({
  title: "Request a Wholesale Quote — Green & Roasted Coffee",
  description: "Request a quotation for East African green coffee, roasted coffee or private label. FOB Mombasa, CIF and DAP. Reply within one business day.",
  path: "/quote",
  image: "sacks",
});

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us what you need. We'll do the sourcing."
        intro={`Share your requirements and our export desk will reply ${site.contact.responseTime} with matching lots, offer samples and an indicative price.`}
        image="sacks"
        crumbs={[{ name: "Export & Wholesale", path: "/export" }, { name: "Request a quote", path: "/quote" }]}
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_20rem]">
            <Suspense>
              <QuoteForm />
            </Suspense>
            <aside className="space-y-8 lg:sticky lg:top-28 lg:h-fit">
              <div className="bg-espresso p-8 text-cream">
                <p className="font-serif text-2xl text-cream">What happens next</p>
                <ol className="mt-5 space-y-4 text-sm text-cream/80">
                  {["We review your requirements and current stock.", "You receive matching lots with full specifications.", "We courier offer samples for cupping.", "On approval we confirm price, contract and shipment."].map((s, i) => (
                    <li key={s} className="flex gap-3"><span className="font-serif text-lg text-gold">{i + 1}</span>{s}</li>
                  ))}
                </ol>
              </div>
              <div className="space-y-4 text-sm">
                <p className="font-semibold text-espresso">Prefer to talk?</p>
                <a href={whatsappLink("Hello Belmont, I'd like a wholesale quote.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-espresso"><Icon name="phone" className="h-5 w-5 text-gold-deep" /> WhatsApp {site.contact.phone}</a>
                <a href={`mailto:${site.inquiryRouting.wholesale}`} className="flex items-center gap-3 break-all text-muted hover:text-espresso"><Icon name="mail" className="h-5 w-5 shrink-0 text-gold-deep" /> {site.inquiryRouting.wholesale}</a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

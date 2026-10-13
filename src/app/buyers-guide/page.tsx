import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata = pageMeta({
  title: "Free Green Coffee Buyer's Guide (PDF)",
  description: "Download Belmont's free guide to buying green coffee from East Africa: specifications, sampling, pricing, contracts, payment terms, logistics and documents.",
  path: "/buyers-guide",
  image: "greenBeans",
});

const inside = ["How to write a green coffee specification", "Sampling discipline: offer and pre-shipment samples", "Pricing: fixed price vs differentials to ICE futures", "Contracts, arbitration and claims", "Payment terms: CAD, L/C and T/T", "Logistics, container loads and transit times", "The complete export document checklist", "Red flags when choosing a supplier"];

export default function BuyersGuidePage() {
  return (
    <>
      <PageHero eyebrow="Free guide" title="The Green Coffee Buyer's Guide" intro="Everything we wish every new buyer knew before their first container from East Africa." image="greenBeans" crumbs={[{ name: "Buyer's Guide", path: "/buyers-guide" }]} />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl">What&apos;s inside</h2>
              <ul className="mt-8 space-y-4">
                {inside.map((i) => (
                  <li key={i} className="flex gap-4 text-lg text-espresso">
                    <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-gold-deep" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-fit bg-parchment p-8 ring-1 ring-line sm:p-10">
              <p className="eyebrow">Instant download</p>
              <h2 className="mt-3 text-3xl">Get the guide</h2>
              <p className="mt-3 mb-6 text-muted">Subscribe to the Belmont Letter, our monthly harvest and market update, and download the PDF straight away.</p>
              <NewsletterForm dark={false} source="buyers-guide" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import { Suspense } from "react";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SampleForm } from "@/components/forms/SampleForm";

export const metadata = pageMeta({
  title: "Request Coffee Samples — Offer & Pre-shipment Samples",
  description: "Request green or sample-roasted offer samples of Kenyan, Ethiopian, Rwandan, Tanzanian and Ugandan coffee. Couriered worldwide in 3 – 6 business days.",
  path: "/samples",
  image: "scoop",
});

export default function SamplesPage() {
  return (
    <>
      <PageHero
        eyebrow="Samples"
        title="Taste before you commit."
        intro="We send 200 – 300 g of each lot, green or sample-roasted, by express courier. Sample costs are usually waived for qualified trade buyers."
        image="scoop"
        crumbs={[{ name: "Export & Wholesale", path: "/export" }, { name: "Request samples", path: "/samples" }]}
      />
      <section className="py-16 sm:py-24">
        <Container narrow>
          <Suspense>
            <SampleForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}

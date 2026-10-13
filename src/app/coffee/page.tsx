import { Suspense } from "react";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { CatalogBrowser } from "@/components/coffee/CatalogBrowser";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button, Arrow } from "@/components/ui/Button";

export const metadata = pageMeta({
  title: "Our Coffee — Green Coffee Beans Wholesale, Specialty Lots & Private Label",
  description:
    "Browse Belmont's catalogue of East African coffee: export-grade green beans (Kenya AA, AB, PB, Ethiopia Grade 1, Uganda Robusta), specialty micro-lots, roasted and ground coffee, private label and gift sets.",
  path: "/coffee",
  image: "greenBeans",
});

export default function CoffeePage() {
  return (
    <>
      <PageHero
        eyebrow="The catalogue"
        title="Our coffee"
        intro="From container-volume green coffee to traceable 30 kg micro-lots, roasted retail bags and private label. Every lot is cupped, scored and documented by our licensed quality team."
        image="greenBeans"
        crumbs={[{ name: "Our Coffee", path: "/coffee" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/samples">
            Request samples <Arrow />
          </Button>
          <Button href="/api/catalog" variant="outline-light">
            Download export catalogue
          </Button>
        </div>
      </PageHero>
      <section className="py-16 sm:py-24">
        <Container>
          <Suspense fallback={<p className="text-muted">Loading catalogue…</p>}>
            <CatalogBrowser />
          </Suspense>
        </Container>
      </section>
      <CtaBand title="Looking for something specific?" text="We source to specification across five origins. Share your target grade, profile, volume and price, and we'll come back with matching offer samples." />
    </>
  );
}

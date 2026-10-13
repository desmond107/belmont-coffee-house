import { faqs } from "@/content/company";
import { faqLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMeta({
  title: "FAQ — Minimum Order, Samples, Shipping, Payment & Certifications",
  description: "Answers to common questions from coffee buyers: MOQ, mixed containers, samples, Incoterms, transit times, payment terms, certifications, EUDR and retail delivery.",
  path: "/faq",
  image: "sacks",
});

export default function FaqPage() {
  const groups = [...new Set(faqs.map((f) => f.group))];
  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <PageHero eyebrow="FAQ" title="Frequently asked questions" intro="Can't find your answer? WhatsApp or email our team. We reply within one business day." image="sacks" crumbs={[{ name: "FAQ", path: "/faq" }]} />
      <section className="py-16 sm:py-24">
        <Container narrow>
          <nav aria-label="FAQ topics" className="mb-12 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a key={g} href={`#${g.toLowerCase()}`} className="rounded-full border border-line bg-parchment px-4 py-1.5 text-sm hover:border-espresso">{g}</a>
            ))}
          </nav>
          {groups.map((g) => (
            <div key={g} id={g.toLowerCase()} className="scroll-mt-28 pb-14">
              <h2 className="mb-4 text-3xl">{g}</h2>
              <FaqList items={faqs.filter((f) => f.group === g)} />
            </div>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

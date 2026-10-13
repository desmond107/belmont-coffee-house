import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProduct, categoryLabel } from "@/content/products";
import { images } from "@/content/images";
import { regions } from "@/content/origins";
import { site } from "@/content/site";
import { absoluteUrl, breadcrumbLd, pageMeta } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button, Arrow } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SpecTable } from "@/components/coffee/SpecTable";
import { ProductCard } from "@/components/coffee/ProductCard";
import { Price } from "@/components/providers";

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.name} — ${categoryLabel(p.category)}`,
    description: `${p.summary} ${p.originLabel}, ${p.altitude}, ${p.process}${p.cupScore ? `, ${p.cupScore} pts` : ""}. Tasting notes: ${p.tastingNotes.join(", ")}.`,
    path: `/coffee/${p.slug}`,
    image: p.image,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const region = regions.find((r) => r.slug === p.region);
  const related = products.filter((x) => x.slug !== p.slug && (x.category === p.category || x.origin === p.origin)).slice(0, 3);
  const minPrice = p.retail?.length ? Math.min(...p.retail.map((s) => s.priceUSD)) : null;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: absoluteUrl(images[p.image].src),
    sku: p.retail?.[0]?.sku ?? p.slug,
    category: categoryLabel(p.category),
    brand: { "@type": "Brand", name: site.name },
    countryOfOrigin: p.originLabel,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Altitude", value: p.altitude },
      { "@type": "PropertyValue", name: "Process", value: p.process },
      { "@type": "PropertyValue", name: "Grade", value: p.grade },
      { "@type": "PropertyValue", name: "Variety", value: p.varieties.join(", ") },
      ...(p.cupScore ? [{ "@type": "PropertyValue", name: "Cupping score", value: String(p.cupScore) }] : []),
    ],
    ...(p.retail?.length && {
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: Math.min(...p.retail.map((s) => s.priceUSD)),
        highPrice: Math.max(...p.retail.map((s) => s.priceUSD)),
        offerCount: p.retail.length,
        availability: "https://schema.org/InStock",
        url: absoluteUrl(`/shop/${p.slug}`),
      },
    }),
  };

  return (
    <>
      <JsonLd data={[productLd, breadcrumbLd([{ name: "Home", path: "/" }, { name: "Our Coffee", path: "/coffee" }, { name: p.name, path: `/coffee/${p.slug}` }])]} />
      <section className="bg-espresso pt-28 text-cream sm:pt-36">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-cream/70">
            <Link href="/coffee" className="hover:text-gold-light">Our Coffee</Link>
            <span aria-hidden> / </span>
            <Link href={`/coffee?category=${p.category}`} className="hover:text-gold-light">{categoryLabel(p.category)}</Link>
          </nav>
        </Container>
      </section>
      <section className="bg-espresso pb-0 text-cream">
        <Container>
          <div className="grid gap-12 pt-8 pb-16 lg:grid-cols-2 lg:pb-24">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[32rem]">
              <Photo name={p.image} priority sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow eyebrow-light">{p.originLabel} · {p.process} · {p.grade}</p>
              <h1 className="mt-4 text-5xl leading-[1.05] text-cream! sm:text-6xl">{p.name}</h1>
              <p className="mt-5 font-serif text-2xl italic text-gold-light">{p.tastingNotes.join(" · ")}</p>
              <p className="mt-6 text-lg leading-relaxed text-cream/80">{p.summary}</p>
              <dl className="mt-8 grid grid-cols-3 gap-px bg-cream/15 text-center">
                {[
                  ["Cup score", p.cupScore ? `${p.cupScore}` : "—"],
                  ["Altitude", p.altitude.replace(" m", "")],
                  ["MOQ", p.moq.split(" · ")[0]],
                ].map(([k, v]) => (
                  <div key={k} className="bg-espresso px-2 py-4">
                    <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-cream/60">{k}</dt>
                    <dd className="mt-1 font-serif text-xl text-cream">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={`/samples?coffee=${p.slug}`}>
                  Request a sample <Arrow />
                </Button>
                <Button href={`/quote?coffee=${p.slug}`} variant="outline-light">
                  Request a quote
                </Button>
                {minPrice !== null && (
                  <Button href={`/shop/${p.slug}`} variant="outline-light">
                    Buy retail · from <Price usd={minPrice} />
                  </Button>
                )}
              </div>
              <a href={`/api/spec-sheet/${p.slug}`} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-light hover:text-gold">
                <Icon name="download" className="h-4 w-4" /> Download spec sheet (PDF)
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">About this coffee</p>
              <h2 className="mt-4 text-4xl">In the cup</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{p.description}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {p.tastingNotes.map((n) => (
                  <li key={n} className="rounded-full border border-line bg-parchment px-4 py-1.5 font-serif text-lg italic text-espresso">{n}</li>
                ))}
              </ul>
              {region && (
                <Link href={`/origins/${region.slug}`} className="group mt-12 block bg-sand p-6 ring-1 ring-line">
                  <p className="eyebrow text-[0.62rem]!">Origin profile</p>
                  <p className="mt-2 font-serif text-2xl text-espresso group-hover:text-gold-deep">{region.name}</p>
                  <p className="mt-2 text-sm text-muted">{region.profile}</p>
                  <p className="mt-3 text-xs text-muted">{region.climate} · {region.soil}</p>
                </Link>
              )}
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow">Specifications</p>
              <h2 className="mb-6 mt-4 text-4xl">Technical data</h2>
              <SpecTable p={p} />
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Specifications are indicative and based on current-crop samples. Final quality is confirmed by the approved offer or pre-shipment sample.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-parchment py-20 sm:py-24">
          <Container>
            <h2 className="text-4xl">You may also consider</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { retailProducts, getProduct } from "@/content/products";
import { pageMeta } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { AddToCart } from "@/components/shop/AddToCart";

export const generateStaticParams = () => retailProducts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p?.retail) return {};
  return pageMeta({ title: `Buy ${p.name}`, description: `${p.summary} Tasting notes: ${p.tastingNotes.join(", ")}. Roasted in Nairobi and delivered worldwide.`, path: `/shop/${p.slug}`, image: p.image });
}

export default async function ShopProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p?.retail) notFound();
  return (
    <>
      <div className="h-24 bg-espresso sm:h-28" />
      <section className="py-12 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted">
            <Link href="/shop" className="hover:text-espresso">Shop</Link> <span aria-hidden>/</span> <span aria-current="page">{p.name}</span>
          </nav>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden bg-sand">
              <Photo name={p.image} priority sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <div>
              <p className="eyebrow">{p.originLabel} · {p.roast} roast</p>
              <h1 className="mt-3 text-5xl leading-tight">{p.name}</h1>
              <p className="mt-3 font-serif text-2xl italic text-gold-deep">{p.tastingNotes.join(" · ")}</p>
              <p className="mt-6 text-lg leading-relaxed text-muted">{p.description}</p>
              <div className="mt-8">
                <AddToCart slug={p.slug} sizes={p.retail} />
              </div>
              <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
                {[["Process", p.process], ["Altitude", p.altitude], ["Variety", p.varieties.join(", ")], ["Packaging", p.packaging[0]]].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">{k}</dt>
                    <dd className="mt-1 text-espresso">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-sm text-muted">
                Buying for a café, hotel or office?{" "}
                <Link href={`/quote?coffee=${p.slug}`} className="font-semibold text-gold-deep underline underline-offset-2">Ask for wholesale pricing</Link>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

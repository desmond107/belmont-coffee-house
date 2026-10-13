import { retailProducts, categories } from "@/content/products";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/coffee/ProductCard";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMeta({
  title: "Shop — Kenyan & East African Coffee, Roasted Fresh in Nairobi",
  description: "Buy freshly roasted Kenyan AA, Ethiopian Yirgacheffe, espresso blends, ground coffee and gift sets. Delivered across Nairobi, Kenya and worldwide.",
  path: "/shop",
  image: "roastedBeans",
});

export default function ShopPage() {
  const list = retailProducts();
  const groups = categories.filter((c) => list.some((p) => p.category === c.id));
  return (
    <>
      <PageHero
        eyebrow="Belmont retail"
        title="Roasted in Nairobi, delivered to your door."
        intro="Our finest single origins, blends and gift sets, roasted in small batches and shipped within days of roasting."
        image="roastedBeans"
        crumbs={[{ name: "Shop", path: "/shop" }]}
      />
      <section className="border-b border-line bg-parchment">
        <Container>
          <ul className="grid gap-6 py-8 text-sm sm:grid-cols-3">
            {[
              ["clock", "Roasted to order", "Shipped within 48 hours of roasting"],
              ["ship", "Local & international delivery", "Nairobi same-day · Kenya 1 – 3 days · Worldwide 3 – 7 days"],
              ["check", "Secure payment", "Card, M-Pesa or PayPal via a secure payment link"],
            ].map(([icon, t, d]) => (
              <li key={t} className="flex gap-4">
                <Icon name={icon} className="h-6 w-6 shrink-0 text-gold-deep" />
                <span>
                  <span className="block font-semibold text-espresso">{t}</span>
                  <span className="text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      {groups.map((g) => (
        <section key={g.id} className="py-16 sm:py-20">
          <Container>
            <h2 className="text-4xl">{g.label}</h2>
            <p className="mt-2 text-muted">{g.blurb}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list
                .filter((p) => p.category === g.id)
                .map((p) => (
                  <ProductCard key={p.slug} product={p} showPrice />
                ))}
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}

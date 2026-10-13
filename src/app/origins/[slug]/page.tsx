import { notFound } from "next/navigation";
import Link from "next/link";
import { regions, countryName } from "@/content/origins";
import { products } from "@/content/products";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ProductCard } from "@/components/coffee/ProductCard";
import { Button, Arrow } from "@/components/ui/Button";

export const generateStaticParams = () => regions.map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = regions.find((x) => x.slug === slug);
  if (!r) return {};
  return pageMeta({
    title: `${r.name}, ${countryName(r.country)} — Coffee Origin Profile`,
    description: `${r.name} coffee: ${r.altitude}, ${r.climate.toLowerCase()}, ${r.soil.toLowerCase()}. Varieties ${r.varieties.join(", ")}. Flavour: ${r.flavor.join(", ")}.`,
    path: `/origins/${r.slug}`,
    image: r.image,
  });
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = regions.find((x) => x.slug === slug);
  if (!r) notFound();
  const coffees = products.filter((p) => p.region === r.slug);
  const siblings = regions.filter((x) => x.country === r.country && x.slug !== r.slug);
  const facts = [
    ["sun", "Altitude", r.altitude],
    ["sun", "Climate", r.climate],
    ["water", "Rainfall", r.rainfall],
    ["leaf", "Soil", r.soil],
    ["leaf", "Varieties", r.varieties.join(", ")],
    ["lab", "Processing", r.processes.join(", ")],
    ["clock", "Harvest", r.harvest],
    ["pin", "Coordinates", `${Math.abs(r.lat).toFixed(2)}° ${r.lat < 0 ? "S" : "N"}, ${r.lng.toFixed(2)}° E`],
  ];
  return (
    <>
      <PageHero
        eyebrow={`Origin profile · ${countryName(r.country)}`}
        title={r.name}
        intro={r.profile}
        image={r.image}
        crumbs={[{ name: "Origins", path: "/origins" }, { name: r.name, path: `/origins/${r.slug}` }]}
      />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">The region</p>
              <p className="mt-5 font-serif text-3xl leading-snug text-espresso">{r.story}</p>
              <p className="eyebrow mt-12">Flavour profile</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {r.flavor.map((f) => (
                  <li key={f} className="rounded-full border border-line bg-parchment px-4 py-1.5 font-serif text-lg italic text-espresso">{f}</li>
                ))}
              </ul>
            </div>
            <dl className="grid gap-px self-start bg-line sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
              {facts.map(([icon, k, v]) => (
                <div key={k} className="bg-parchment p-5">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    <Icon name={icon} className="h-4 w-4 text-gold-deep" /> {k}
                  </dt>
                  <dd className="mt-2 text-espresso">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
      {coffees.length > 0 && (
        <section className="bg-parchment py-20 sm:py-24">
          <Container>
            <h2 className="text-4xl">Coffees from {r.name}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {coffees.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
      <section className="py-20">
        <Container>
          <div className="flex flex-col justify-between gap-8 border-t border-line pt-10 md:flex-row md:items-center">
            <div>
              {siblings.length > 0 && (
                <p className="text-sm text-muted">
                  Also from {countryName(r.country)}:{" "}
                  {siblings.map((s, i) => (
                    <span key={s.slug}>
                      {i > 0 && ", "}
                      <Link href={`/origins/${s.slug}`} className="font-semibold text-gold-deep underline underline-offset-2">{s.name}</Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <Button href={`/samples`} variant="dark">Request samples <Arrow /></Button>
              <Button href="/origins" variant="outline">All origins</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

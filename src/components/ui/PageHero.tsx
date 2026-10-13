import Link from "next/link";
import type { ImageKey } from "@/content/images";
import { Photo } from "./Photo";
import { Container } from "./Container";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

/** Interior page header: photo, breadcrumbs, H1 and intro. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image: ImageKey;
  crumbs: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="grain relative isolate overflow-hidden bg-espresso pt-36 pb-20 text-cream sm:pt-44 sm:pb-28">
      <div className="absolute inset-0 -z-10">
        <Photo name={image} priority className="kenburns opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/40" />
      </div>
      <JsonLd data={breadcrumbLd(all)} />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-xs tracking-wide text-cream/70">
          <ol className="flex flex-wrap items-center gap-2">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i < all.length - 1 ? (
                  <Link href={c.path} className="hover:text-gold-light">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-cream">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow eyebrow-light fade-up mb-5">{eyebrow}</p>
        <h1 className="fade-up max-w-4xl text-5xl leading-[1.04] text-cream! sm:text-6xl lg:text-7xl" style={{ animationDelay: "80ms" }}>
          {title}
        </h1>
        {intro && (
          <div className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-cream/85" style={{ animationDelay: "160ms" }}>
            {intro}
          </div>
        )}
        {children && <div className="fade-up mt-10" style={{ animationDelay: "240ms" }}>{children}</div>}
      </Container>
    </section>
  );
}

"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { usePrefs } from "@/components/providers";
import { Arrow } from "@/components/ui/Button";

/** Full-screen hero. The photo/video backdrop is passed in from the server page. */
export function HomeHero({ backdrop }: { backdrop: React.ReactNode }) {
  const { t } = usePrefs();
  return (
    <section className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-espresso text-cream">
      <div className="absolute inset-0 -z-10">
        {backdrop}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 to-transparent" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 sm:pb-28">
        <p className="eyebrow eyebrow-light fade-up">{t("hero.eyebrow")}</p>
        <h1 className="fade-up mt-6 max-w-5xl text-[2.9rem] leading-[1.02] text-cream! sm:text-7xl lg:text-[5.6rem]" style={{ animationDelay: "120ms" }}>
          {site.heroHeadline.replace(" the World's", " the World's")}
        </h1>
        <p className="fade-up mt-7 max-w-2xl text-lg leading-relaxed text-cream/85 sm:text-xl" style={{ animationDelay: "240ms" }}>
          {t("hero.sub")}
        </p>
        <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
          <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-gold px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-gold-light">
            {t("cta.wholesaleQuote")} <Arrow />
          </Link>
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-cream/50 px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-cream hover:text-espresso">
            {t("cta.shop")}
          </Link>
        </div>
      </div>
      <a href="#trust" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-cream/60 hover:text-cream sm:flex">
        Scroll
        <span aria-hidden className="h-10 w-px animate-pulse bg-cream/50" />
      </a>
    </section>
  );
}

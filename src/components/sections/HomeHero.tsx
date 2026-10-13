"use client";

import Link from "next/link";
import { usePrefs } from "@/components/providers";
import { Arrow } from "@/components/ui/Button";

/** Full-screen hero. The photo/video backdrop is passed in from the server page. */
export function HomeHero({ backdrop }: { backdrop: React.ReactNode }) {
  const { t } = usePrefs();
  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-espresso text-cream">
      <div className="absolute inset-0 -z-10">
        {backdrop}
        {/* Light scrims only where text sits, so the footage stays clearly visible. */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_70%_75%_at_15%_72%,rgb(43_26_18/0.85),rgb(43_26_18/0.52)_50%,transparent_78%)] sm:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/65 via-55% to-transparent sm:hidden" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-40 [text-shadow:0_1px_2px_rgb(0_0_0/0.35),0_2px_28px_rgb(0_0_0/0.45)] sm:px-8 sm:pb-28">
        <p className="fade-up inline-block rounded-full bg-espresso/70 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-light backdrop-blur-sm">{t("hero.eyebrow")}</p>
        <h1 className="fade-up mt-5 max-w-5xl text-balance text-[2.2rem] leading-[1.05] sm:mt-6 text-cream! sm:text-6xl lg:text-[4.6rem]" style={{ animationDelay: "120ms" }}>
          {t("hero.title")}
        </h1>
        <p className="fade-up mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-cream sm:mt-7 sm:text-xl" style={{ animationDelay: "240ms" }}>
          {t("hero.sub")}
        </p>
        <div className="fade-up mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row" style={{ animationDelay: "360ms" }}>
          <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-gold px-8 [text-shadow:none] py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-gold-light">
            {t("cta.wholesaleQuote")} <Arrow />
          </Link>
          <Link href="/samples" className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-cream/50 bg-espresso/20 px-8 backdrop-blur-[2px] py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-cream hover:text-espresso">
            {t("cta.samples")}
          </Link>
        </div>
      </div>
      <div id="hero-video-controls" className="absolute bottom-6 left-5 z-20 sm:left-8" />
      <a href="#trust" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-cream/60 hover:text-cream sm:flex">
        Scroll
        <span aria-hidden className="h-10 w-px animate-pulse bg-cream/50" />
      </a>
    </section>
  );
}

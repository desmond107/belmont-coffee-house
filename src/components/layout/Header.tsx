"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { useCart, usePrefs } from "@/components/providers";
import type { TKey } from "@/lib/i18n";
import { Logo } from "./Logo";
import { PrefSwitcher } from "./PrefSwitcher";
import { Icon } from "@/components/ui/Icon";

export function Header() {
  const pathname = usePathname();
  const { t } = usePrefs();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const solid = scrolled || mobile;
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
        solid ? "bg-cream/95 text-espresso shadow-[0_1px_0_rgba(43,26,18,0.08)] backdrop-blur-md" : "bg-transparent text-cream"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-espresso">
        Skip to content
      </a>

      {/* Utility bar */}
      <div className={`hidden overflow-hidden border-b transition-all duration-500 lg:block ${solid ? "max-h-0 border-transparent" : "max-h-12 border-cream/15"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-xs">
          <div className="flex items-center gap-6 opacity-85">
            <a href={site.contact.phoneHref} className="flex items-center gap-1.5 hover:text-gold-light">
              <Icon name="phone" className="h-3.5 w-3.5" /> {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-1.5 hover:text-gold-light">
              <Icon name="mail" className="h-3.5 w-3.5" /> {site.contact.email}
            </a>
            <span className="opacity-80">Licensed Kenyan coffee exporter since {site.founded}</span>
          </div>
          <PrefSwitcher dark />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Logo />

        <nav ref={navRef} aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.key} className="relative" onMouseEnter={() => "children" in item && setOpen(item.key)} onMouseLeave={() => setOpen(null)}>
                {"children" in item ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={open === item.key}
                      aria-controls={`menu-${item.key}`}
                      onClick={() => setOpen(open === item.key ? null : item.key)}
                      className={`flex items-center gap-1 px-3 py-2 text-[0.82rem] font-medium tracking-wide transition-colors hover:text-gold ${active(item.href) ? "text-gold" : ""}`}
                    >
                      {t(`nav.${item.key}` as TKey)}
                      <svg aria-hidden viewBox="0 0 12 12" className={`h-2.5 w-2.5 transition-transform ${open === item.key ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 4l4 4 4-4" />
                      </svg>
                    </button>
                    <div
                      id={`menu-${item.key}`}
                      className={`absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3 transition-all duration-300 ${open === item.key ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"}`}
                    >
                      <ul className="rounded-[2px] border border-line bg-parchment p-3 text-espresso shadow-2xl shadow-espresso/15">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block rounded-[2px] px-4 py-3 transition-colors hover:bg-sand">
                              <span className="block font-serif text-lg font-semibold">{c.label}</span>
                              <span className="block text-xs text-muted">{c.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={active(item.href) ? "page" : undefined}
                    className={`block px-3 py-2 text-[0.82rem] font-medium tracking-wide transition-colors hover:text-gold ${active(item.href) ? "text-gold" : ""}`}
                  >
                    {t(`nav.${item.key}` as TKey)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/shop/cart" className="relative p-2 transition-colors hover:text-gold" aria-label={`${t("ui.cart")} (${count})`}>
            <Icon name="cart" className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-espresso">{count}</span>
            )}
          </Link>
          <Link
            href="/quote"
            className="hidden rounded-[2px] bg-gold px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-gold-light sm:inline-flex"
          >
            {t("cta.quote")}
          </Link>
          <button
            type="button"
            className="p-2 xl:hidden"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile((m) => !m)}
          >
            <span className="sr-only">{mobile ? t("ui.close") : t("ui.menu")}</span>
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobile ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!mobile}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-cream px-5 pb-10 pt-4 text-espresso sm:px-8 xl:hidden"
      >
        <ul className="divide-y divide-line">
          {nav.map((item) => (
            <li key={item.key} className="py-1">
              {"children" in item ? (
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-serif text-2xl font-semibold">
                    {t(`nav.${item.key}` as TKey)}
                    <span aria-hidden className="text-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <ul className="pb-3 pl-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block py-2 text-muted hover:text-espresso">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link href={item.href} className="block py-3 font-serif text-2xl font-semibold">
                  {t(`nav.${item.key}` as TKey)}
                </Link>
              )}
            </li>
          ))}
          <li className="py-1">
            <Link href="/shop" className="block py-3 font-serif text-2xl font-semibold">
              Shop
            </Link>
          </li>
        </ul>
        <div className="mt-8 grid gap-3">
          <Link href="/quote" className="rounded-[2px] bg-gold px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-espresso">
            {t("cta.quote")}
          </Link>
          <Link href="/samples" className="rounded-[2px] border border-espresso/30 px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em]">
            {t("cta.samples")}
          </Link>
        </div>
        <div className="mt-8 space-y-2 text-sm text-muted">
          <a href={site.contact.phoneHref} className="block">{site.contact.phone}</a>
          <a href={`mailto:${site.contact.email}`} className="block">{site.contact.email}</a>
        </div>
        <PrefSwitcher className="mt-6" />
      </div>
    </header>
  );
}

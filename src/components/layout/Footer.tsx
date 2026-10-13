"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { licences } from "@/content/certifications";
import { usePrefs } from "@/components/providers";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Logo } from "./Logo";
import { Icon } from "@/components/ui/Icon";

const cols = [
  {
    key: "footer.coffee" as const,
    links: [
      ["Coffee catalogue", "/coffee"],
      ["Green coffee beans", "/coffee?category=green"],
      ["Specialty lots", "/coffee?category=specialty"],
      ["Private label", "/coffee?category=private-label"],
      ["Origins map", "/origins"],
      ["Shop retail", "/shop"],
    ],
  },
  {
    key: "footer.trade" as const,
    links: [
      ["Export & wholesale", "/export"],
      ["Request a quote", "/quote"],
      ["Request samples", "/samples"],
      ["Export catalogue (PDF)", "/api/catalog"],
      ["Buyer's guide", "/buyers-guide"],
      ["FAQ", "/faq"],
    ],
  },
  {
    key: "footer.company" as const,
    links: [
      ["About us", "/about"],
      ["Quality & certifications", "/quality"],
      ["Sustainability", "/sustainability"],
      ["Journal", "/journal"],
      ["Contact", "/contact"],
    ],
  },
];

const socialLabels: Record<string, string> = { linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook", x: "X", youtube: "YouTube" };

export function Footer() {
  const { t } = usePrefs();
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="grain relative bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-cream" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/75">{site.description}</p>
            <ul className="mt-8 space-y-3 text-sm text-cream/85">
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {site.contact.address.street}
                  <br />
                  {site.contact.address.city}, {site.contact.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={site.contact.phoneHref} className="hover:text-gold-light">{site.contact.phone}</a>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${site.contact.email}`} className="break-all hover:text-gold-light">{site.contact.email}</a>
              </li>
            </ul>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-4 text-sm">
                {socials.map(([k, url]) => (
                  <li key={k}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-cream/75 hover:text-gold-light">
                      {socialLabels[k]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {cols.map((c) => (
              <div key={c.key}>
                <h2 className="eyebrow eyebrow-light mb-5 font-sans! text-[0.68rem]!">{t(c.key)}</h2>
                <ul className="space-y-3 text-sm">
                  {c.links.map(([label, href]) => (
                    <li key={href}>
                      {href.startsWith("/api/") ? (
                        <a href={href} target="_blank" rel="noopener" className="text-cream/75 transition-colors hover:text-gold-light">{label}</a>
                      ) : (
                        <Link href={href} className="text-cream/75 transition-colors hover:text-gold-light">{label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-serif text-2xl text-cream!">{t("footer.newsletter")}</h2>
            <p className="mt-3 mb-5 text-sm leading-relaxed text-cream/75">{t("footer.newsletterBody")}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 border-t border-cream/15 pt-8">
          <p className="eyebrow eyebrow-light mb-4 text-[0.62rem]!">Licensed & documented</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream/70">
            {licences.map((l) => (
              <li key={l.id} className="flex items-center gap-2">
                <Icon name="check" className="h-3.5 w-3.5 text-gold" /> {l.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-cream/15 pt-8 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {t("footer.rights")}
          </p>
          <ul className="flex flex-wrap gap-5">
            <li><Link href="/privacy" className="hover:text-cream">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-cream">Terms</Link></li>
            <li><Link href="/cookies" className="hover:text-cream">Cookies</Link></li>
            <li>
              <button type="button" onClick={() => window.dispatchEvent(new Event("belmont:cookie-settings"))} className="hover:text-cream">
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

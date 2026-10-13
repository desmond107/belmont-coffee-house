"use client";

import { currencies, languages, type CurrencyCode, type LanguageCode } from "@/content/site";
import { usePrefs } from "@/components/providers";

export function PrefSwitcher({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const { lang, setLang, currency, setCurrency, t } = usePrefs();
  const sel = `appearance-none bg-transparent pr-4 text-xs font-medium tracking-wide cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-gold ${dark ? "text-cream" : ""}`;
  const opt = "text-charcoal";
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <label className="relative flex items-center gap-1.5">
        <span className="sr-only">{t("ui.language")}</span>
        <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        <select value={lang} onChange={(e) => setLang(e.target.value as LanguageCode)} className={sel}>
          {languages.map((l) => (
            <option key={l.code} value={l.code} className={opt}>
              {l.label}
            </option>
          ))}
        </select>
      </label>
      <label className="relative">
        <span className="sr-only">{t("ui.currency")}</span>
        <select value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)} className={sel}>
          {currencies.map((c) => (
            <option key={c.code} value={c.code} className={opt}>
              {c.code} {c.symbol}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

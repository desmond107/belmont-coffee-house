"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { currencies, languages, type CurrencyCode, type LanguageCode } from "@/content/site";
import { dictionaries, type TKey } from "@/lib/i18n";
import { formatPrice } from "@/lib/currency";

const store = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
};

/* ── Preferences: language + currency ─────────────────────────────────────── */

type Prefs = {
  lang: LanguageCode;
  currency: CurrencyCode;
  setLang: (l: LanguageCode) => void;
  setCurrency: (c: CurrencyCode) => void;
  t: (key: TKey) => string;
  price: (usd: number) => string;
};

const PrefsContext = createContext<Prefs | null>(null);

/* ── Cart ─────────────────────────────────────────────────────────────────── */

export type CartLine = { slug: string; size: string; qty: number };

type Cart = {
  lines: CartLine[];
  count: number;
  add: (line: CartLine) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
  ready: boolean;
};

const CartContext = createContext<Cart | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const l = store.get("belmont.lang");
    if (l && languages.some((x) => x.code === l)) setLangState(l as LanguageCode);
    const c = store.get("belmont.currency");
    if (c && currencies.some((x) => x.code === c)) setCurrencyState(c as CurrencyCode);
    try {
      const saved = JSON.parse(store.get("belmont.cart") ?? "[]");
      if (Array.isArray(saved)) setLines(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (ready) store.set("belmont.cart", JSON.stringify(lines));
  }, [lines, ready]);

  const setLang = useCallback((l: LanguageCode) => {
    setLangState(l);
    store.set("belmont.lang", l);
  }, []);
  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    store.set("belmont.currency", c);
  }, []);

  const prefs = useMemo<Prefs>(
    () => ({
      lang,
      currency,
      setLang,
      setCurrency,
      t: (key) => dictionaries[lang][key] ?? dictionaries.en[key],
      price: (usd) => formatPrice(usd, currency),
    }),
    [lang, currency, setLang, setCurrency],
  );

  const cart = useMemo<Cart>(
    () => ({
      lines,
      ready,
      count: lines.reduce((n, l) => n + l.qty, 0),
      add: (line) =>
        setLines((prev) => {
          const i = prev.findIndex((l) => l.slug === line.slug && l.size === line.size);
          if (i === -1) return [...prev, line];
          const next = [...prev];
          next[i] = { ...next[i], qty: Math.min(99, next[i].qty + line.qty) };
          return next;
        }),
      setQty: (slug, size, qty) =>
        setLines((prev) => prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l))),
      remove: (slug, size) => setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size))),
      clear: () => setLines([]),
    }),
    [lines, ready],
  );

  return (
    <PrefsContext.Provider value={prefs}>
      <CartContext.Provider value={cart}>{children}</CartContext.Provider>
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside <Providers>");
  return ctx;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <Providers>");
  return ctx;
}

/** Translated text for use inside server components. */
export function T({ k }: { k: TKey }) {
  return <>{usePrefs().t(k)}</>;
}

/** Price in the visitor's chosen currency. */
export function Price({ usd, className }: { usd: number; className?: string }) {
  return <span className={className}>{usePrefs().price(usd)}</span>;
}

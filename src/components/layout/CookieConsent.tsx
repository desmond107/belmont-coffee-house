"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

type Choice = { analytics: boolean; decided: boolean };
const KEY = "belmont.cookies";

function load(): Choice {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (v && typeof v.analytics === "boolean") return { analytics: v.analytics, decided: true };
  } catch {}
  return { analytics: false, decided: false };
}

/**
 * Cookie consent. Only strictly necessary storage (cart, preferences) is used
 * until the visitor opts in; analytics loads only after consent.
 */
export function CookieConsent() {
  const [choice, setChoice] = useState<Choice>({ analytics: false, decided: true });
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const c = load();
    setChoice(c);
    setAnalytics(c.analytics);
    const open = () => {
      setChoice((x) => ({ ...x, decided: false }));
      setSettings(true);
    };
    window.addEventListener("belmont:cookie-settings", open);
    return () => window.removeEventListener("belmont:cookie-settings", open);
  }, []);

  const save = (a: boolean) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ analytics: a, at: new Date().toISOString() }));
    } catch {}
    setChoice({ analytics: a, decided: true });
    setSettings(false);
  };

  const ga = site.gaMeasurementId;

  return (
    <>
      {choice.analytics && ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {!choice.decided && (
        <div role="dialog" aria-modal="false" aria-labelledby="cookie-title" className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md print:hidden">
          <div className="rounded-[2px] border border-line bg-parchment p-6 text-sm shadow-2xl shadow-espresso/20">
            <p id="cookie-title" className="font-serif text-xl font-semibold text-espresso">
              Your privacy
            </p>
            <p className="mt-2 leading-relaxed text-muted">
              We use essential storage to run the site (your cart and preferences). With your consent, we also use analytics cookies to improve it. See our{" "}
              <Link href="/cookies" className="text-gold-deep underline underline-offset-2">cookie policy</Link>.
            </p>
            {settings && (
              <div className="mt-4 space-y-3 border-t border-line pt-4">
                <label className="flex items-start gap-3">
                  <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-espresso" />
                  <span><strong className="text-espresso">Essential</strong> — always on. Cart, language, currency and consent choice.</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 h-4 w-4 accent-espresso" />
                  <span><strong className="text-espresso">Analytics</strong> — anonymous usage statistics (Google Analytics).</span>
                </label>
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {settings ? (
                <button onClick={() => save(analytics)} className="rounded-[2px] bg-espresso px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream">Save choices</button>
              ) : (
                <>
                  <button onClick={() => save(true)} className="rounded-[2px] bg-espresso px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream">Accept all</button>
                  <button onClick={() => save(false)} className="rounded-[2px] border border-espresso/30 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-espresso">Essential only</button>
                  <button onClick={() => setSettings(true)} className="px-2 py-2.5 text-xs font-semibold text-gold-deep underline underline-offset-2">Settings</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

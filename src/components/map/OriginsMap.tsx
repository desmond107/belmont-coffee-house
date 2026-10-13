"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { countries, regions } from "@/content/origins";

const Inner = dynamic(() => import("./OriginsMapInner"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center bg-sand text-sm text-muted">Loading map…</div>,
});

export function OriginsMap() {
  const [focus, setFocus] = useState<string | null>(null);
  return (
    <div className="grid overflow-hidden ring-1 ring-line lg:grid-cols-[1fr_20rem]">
      <div className="relative z-0 h-[26rem] sm:h-[34rem]">
        <Inner focus={focus} />
      </div>
      <div className="max-h-[34rem] overflow-y-auto bg-parchment p-6">
        <p className="eyebrow text-[0.62rem]!">Growing regions</p>
        {countries.map((c) => (
          <div key={c.slug} className="mt-5">
            <p className="font-serif text-xl font-semibold text-espresso">{c.name}</p>
            <ul className="mt-1">
              {regions
                .filter((r) => r.country === c.slug)
                .map((r) => (
                  <li key={r.slug}>
                    <button
                      onClick={() => setFocus(r.slug)}
                      aria-pressed={focus === r.slug}
                      className={`flex w-full items-center justify-between py-1.5 text-left text-sm transition-colors hover:text-espresso ${focus === r.slug ? "font-semibold text-espresso" : "text-muted"}`}
                    >
                      {r.name}
                      <span className="text-xs">{r.altitude.split(" – ")[0]}+ m</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        <p className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-xs text-muted">
          <span className="belmont-marker is-hq inline-block h-3! w-3! border-2!" /> Belmont HQ, Nairobi
        </p>
      </div>
    </div>
  );
}

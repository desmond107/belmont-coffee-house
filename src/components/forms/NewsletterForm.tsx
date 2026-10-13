"use client";

import { useSubmit } from "./useSubmit";
import { usePrefs } from "@/components/providers";

export function NewsletterForm({ dark = true, source = "footer" }: { dark?: boolean; source?: string }) {
  const { status, error, onSubmit } = useSubmit("newsletter");
  const { t } = usePrefs();
  if (status === "success")
    return (
      <div role="status" className={dark ? "text-cream" : "text-espresso"}>
        <p className="font-serif text-xl">Thank you for subscribing.</p>
        <a href="/api/buyers-guide" target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold underline-offset-4 hover:underline">
          Download the Green Coffee Buyer&apos;s Guide (PDF) →
        </a>
      </div>
    );
  return (
    <form onSubmit={onSubmit} className="relative" noValidate>
      <input type="hidden" name="source" value={source} />
      <div aria-hidden className="absolute -left-[9999px]">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor={`nl-${source}`} className="sr-only">
        Email address
      </label>
      <div className={`flex border ${dark ? "border-cream/25" : "border-line bg-white"}`}>
        <input
          id={`nl-${source}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          className={`min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm focus:outline-none ${dark ? "text-cream placeholder:text-cream/50" : "text-charcoal placeholder:text-muted"}`}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-gold px-5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {status === "sending" ? "…" : t("footer.subscribe")}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm text-[#e8a090]">
          {error}
        </p>
      )}
      <p className={`mt-2 text-xs ${dark ? "text-cream/55" : "text-muted"}`}>Monthly at most. Unsubscribe anytime.</p>
    </form>
  );
}

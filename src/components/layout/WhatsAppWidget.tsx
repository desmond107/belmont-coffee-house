"use client";

import { useState } from "react";
import { whatsappLink, site } from "@/content/site";
import { usePrefs } from "@/components/providers";

const topics = [
  { label: "Wholesale / export quote", msg: "Hello Belmont, I'd like a wholesale quote for green coffee." },
  { label: "Request samples", msg: "Hello Belmont, I'd like to request coffee samples." },
  { label: "Retail order / gift sets", msg: "Hello Belmont, I have a question about a retail order." },
  { label: "Something else", msg: "Hello Belmont Coffee House," },
];

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const { t } = usePrefs();
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div id="wa-panel" role="dialog" aria-label={t("ui.chatTitle")} className="w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-[2px] border border-line bg-parchment shadow-2xl shadow-espresso/25">
          <div className="bg-espresso px-5 py-4 text-cream">
            <p className="font-serif text-xl">{t("ui.chatTitle")}</p>
            <p className="mt-1 text-xs text-cream/75">{t("ui.chatBody")}</p>
          </div>
          <ul className="p-2">
            {topics.map((tp) => (
              <li key={tp.label}>
                <a href={whatsappLink(tp.msg)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-[2px] px-3 py-3 text-sm text-espresso hover:bg-sand">
                  {tp.label} <span aria-hidden className="text-gold-deep">→</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="border-t border-line px-5 py-3 text-xs text-muted">WhatsApp {site.contact.phone}</p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="wa-panel"
        className="flex items-center gap-2 rounded-full bg-[#1f7a4d] py-3 pl-3.5 pr-4 text-sm font-semibold text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.2z" />
        </svg>
        <span className="hidden sm:inline">{open ? t("ui.close") : t("ui.chat")}</span>
      </button>
    </div>
  );
}

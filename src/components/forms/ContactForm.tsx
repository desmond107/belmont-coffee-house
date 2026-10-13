"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { site, inquiryTopics } from "@/content/site";
import { useSubmit } from "./useSubmit";
import { Input, CountrySelect, Textarea, Consent, Honeypot, FormStatus, SubmitButton } from "./Fields";

const topics = inquiryTopics;

export function ContactForm() {
  const initial = useSearchParams().get("topic");
  const [topic, setTopic] = useState<string>(topics.some((t) => t.id === initial) ? initial! : "wholesale");
  const { status, error, invalid, onSubmit } = useSubmit("contact");

  if (status === "success")
    return (
      <FormStatus
        status={status}
        error=""
        success={
          <>
            <p className="font-serif text-2xl">Thank you. Your message has been sent.</p>
            <p className="mt-2 text-sm">It went straight to our {topics.find((t) => t.id === topic)?.label.toLowerCase()} team. We reply {site.contact.responseTime}.</p>
          </>
        }
      />
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-8">
      <Honeypot />
      <fieldset>
        <legend className="mb-4 text-[0.78rem] font-semibold tracking-wide text-espresso">What can we help with? *</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {topics.map((t) => (
            <label key={t.id} className="flex cursor-pointer items-start gap-3 border border-line bg-white p-4 has-[:checked]:border-espresso has-[:checked]:bg-parchment">
              <input type="radio" name="topic" value={t.id} checked={topic === t.id} onChange={() => setTopic(t.id)} className="mt-1 accent-espresso" />
              <span>
                <span className="block font-semibold text-espresso">{t.label}</span>
                <span className="text-xs text-muted">{t.desc}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input name="name" label="Full name" required autoComplete="name" invalid={invalid} />
        <Input name="company" label={topic === "press" ? "Publication" : "Company"} autoComplete="organization" invalid={invalid} />
        <Input name="email" type="email" label="Email" required autoComplete="email" invalid={invalid} />
        <Input name="phone" type="tel" label="Phone / WhatsApp" autoComplete="tel" invalid={invalid} />
        <CountrySelect name="country" label="Country" invalid={invalid} className="sm:col-span-2" />
        <Textarea name="message" label="Message" required rows={6} invalid={invalid} className="sm:col-span-2" />
      </div>
      <Consent invalid={invalid} />
      <FormStatus status={status} error={error} success={null} />
      <SubmitButton status={status}>Send message</SubmitButton>
    </form>
  );
}

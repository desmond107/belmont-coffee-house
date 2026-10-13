"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { useSubmit } from "./useSubmit";
import { Input, Select, CountrySelect, Textarea, Consent, Honeypot, FormStatus, SubmitButton } from "./Fields";

const sampleable = products.filter((p) => ["green", "specialty", "roasted", "private-label"].includes(p.category));

export function SampleForm() {
  const { status, error, invalid, onSubmit } = useSubmit("sample");
  const pre = useSearchParams().get("coffee");

  if (status === "success")
    return (
      <FormStatus
        status={status}
        error=""
        success={
          <>
            <p className="font-serif text-2xl">Sample request received.</p>
            <p className="mt-2 text-sm">Our quality team will confirm availability and courier details {site.contact.responseTime}. Samples usually arrive in 3 – 6 business days.</p>
          </>
        }
      />
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-10">
      <Honeypot />
      <fieldset>
        <legend className="mb-5 font-serif text-2xl font-semibold text-espresso">Which coffees would you like to cup?</legend>
        <p className="mb-4 text-sm text-muted">Choose up to six lots. We send 200 – 300 g of each, green or sample-roasted.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {sampleable.map((p) => (
            <label key={p.slug} className="flex cursor-pointer items-start gap-3 border border-line bg-white p-3.5 text-sm has-[:checked]:border-espresso has-[:checked]:bg-parchment">
              <input type="checkbox" name="coffees" value={p.name} defaultChecked={pre === p.slug} className="mt-0.5 h-4 w-4 accent-espresso" />
              <span>
                <span className="block font-semibold text-espresso">{p.name}</span>
                <span className="text-xs text-muted">{p.process} · {p.grade}{p.cupScore ? ` · ${p.cupScore} pts` : ""}</span>
              </span>
            </label>
          ))}
        </div>
        {invalid.includes("coffees") && <p className="mt-2 text-sm text-[#7a2a1d]">Please choose at least one coffee.</p>}
      </fieldset>
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 font-serif text-2xl font-semibold text-espresso">Sample type & delivery</legend>
        <Select name="sampleType" label="Sample type" options={["Offer sample (current stock)", "Pre-shipment sample (contracted lot)", "Type sample (for a programme)"]} invalid={invalid} />
        <Select name="sampleForm" label="Send as" options={["Green", "Sample-roasted", "Both"]} invalid={invalid} />
        <Input name="name" label="Full name" required autoComplete="name" invalid={invalid} />
        <Input name="company" label="Company" required autoComplete="organization" invalid={invalid} />
        <Input name="email" type="email" label="Business email" required autoComplete="email" invalid={invalid} />
        <Input name="phone" type="tel" label="Phone (for courier)" autoComplete="tel" invalid={invalid} />
        <CountrySelect name="country" label="Country" required invalid={invalid} />
        <Input name="courierAccount" label="Courier account no." hint="optional" placeholder="DHL / FedEx account" invalid={invalid} />
        <Textarea name="address" label="Delivery address" required rows={3} invalid={invalid} className="sm:col-span-2" />
        <Textarea name="message" label="Notes" hint="Intended use, volume, target profile" rows={3} invalid={invalid} className="sm:col-span-2" />
      </fieldset>
      <Consent invalid={invalid} />
      <FormStatus status={status} error={error} success={null} />
      <SubmitButton status={status}>Request samples</SubmitButton>
    </form>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/content/products";
import { incoterms } from "@/content/company";
import { site } from "@/content/site";
import { useSubmit } from "./useSubmit";
import { Input, Select, CountrySelect, Textarea, Checkboxes, Consent, Honeypot, FormStatus, SubmitButton } from "./Fields";

const coffeeOptions = products.filter((p) => p.category !== "gift").map((p) => ({ value: p.name, label: p.name }));

export function QuoteForm() {
  const { status, error, invalid, onSubmit } = useSubmit("quote");
  const coffee = useSearchParams().get("coffee");
  const pre = products.find((p) => p.slug === coffee);

  if (status === "success")
    return (
      <FormStatus
        status={status}
        error=""
        success={
          <>
            <p className="font-serif text-2xl">Thank you. Your quote request is with our export desk.</p>
            <p className="mt-2 text-sm">We reply {site.contact.responseTime}, usually with offer samples and an indicative price. For anything urgent, WhatsApp {site.contact.phone}.</p>
          </>
        }
      />
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-10">
      <Honeypot />
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 font-serif text-2xl font-semibold text-espresso">1 · Your company</legend>
        <Input name="name" label="Full name" required autoComplete="name" invalid={invalid} />
        <Input name="role" label="Job title" autoComplete="organization-title" invalid={invalid} />
        <Input name="company" label="Company" required autoComplete="organization" invalid={invalid} />
        <Select
          name="businessType"
          label="Business type"
          options={["Importer / trader", "Roaster", "Distributor / wholesaler", "Café / restaurant group", "Hotel / hospitality", "Retailer / supermarket", "Private label brand", "Other"]}
          invalid={invalid}
        />
        <Input name="email" type="email" label="Business email" required autoComplete="email" invalid={invalid} />
        <Input name="phone" type="tel" label="Phone / WhatsApp" autoComplete="tel" invalid={invalid} />
        <CountrySelect name="country" label="Country" required invalid={invalid} className="sm:col-span-2" />
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 font-serif text-2xl font-semibold text-espresso">2 · Coffee requirements</legend>
        <Select name="coffee" label="Coffee of interest" options={[...coffeeOptions, { value: "Not sure — please recommend", label: "Not sure — please recommend" }]} defaultValue={pre?.name} invalid={invalid} className="sm:col-span-2" />
        <Select name="volume" label="Volume" required options={["Under 10 bags (< 600 kg)", "10 – 50 bags", "50 – 160 bags (½ container)", "1 × 20' container (~19 t)", "2 – 5 containers", "Annual programme (5+ containers)", "Roasted / private label: 100 – 500 kg", "Roasted / private label: 500 kg+"]} invalid={invalid} />
        <Select name="grade" label="Grade / quality" options={["AA", "AB", "PB", "Grade 1", "Grade 2", "Specialty 86+", "Commercial / FAQ", "Robusta Screen 18", "Robusta Screen 15", "Other / to discuss"]} invalid={invalid} />
        <Checkboxes name="process" label="Processing" options={["Washed", "Natural", "Honey", "Any"]} />
        <Checkboxes name="packaging" label="Packaging" options={["60 kg jute", "Jute + GrainPro", "30 kg vacuum box", "Bulk liner", "Retail / branded bags"]} />
        <Checkboxes name="certification" label="Certification required" options={["None", "Organic", "Fairtrade", "Rainforest Alliance", "EUDR data"]} className="sm:col-span-2" />
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 font-serif text-2xl font-semibold text-espresso">3 · Shipping & timeline</legend>
        <Select name="incoterm" label="Preferred Incoterm" options={[...incoterms.map((i) => ({ value: i.term, label: `${i.term} — ${i.name}` })), { value: "Unsure", label: "Not sure — advise me" }]} invalid={invalid} />
        <Input name="port" label="Destination port / city" placeholder="e.g. Hamburg, Jebel Ali, Busan" invalid={invalid} />
        <Select name="timeline" label="Shipment timeline" options={["Immediately (spot)", "Within 1 – 2 months", "3 – 6 months (forward)", "Next harvest", "Ongoing programme"]} invalid={invalid} />
        <Select name="frequency" label="Purchase frequency" options={["One-off", "Monthly", "Quarterly", "Annually", "Not sure yet"]} invalid={invalid} />
        <Textarea name="message" label="Anything else?" hint="Target cup profile, price range, special requirements" rows={4} invalid={invalid} className="sm:col-span-2" />
      </fieldset>

      <Consent invalid={invalid} />
      <FormStatus status={status} error={error} success={null} />
      <SubmitButton status={status}>Request my quote</SubmitButton>
    </form>
  );
}

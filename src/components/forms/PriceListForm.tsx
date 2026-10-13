"use client";

import { useSubmit } from "./useSubmit";
import { Input, CountrySelect, Consent, Honeypot, FormStatus, SubmitButton } from "./Fields";

export function PriceListForm() {
  const { status, error, invalid, onSubmit } = useSubmit("price-list");
  if (status === "success")
    return <FormStatus status={status} error="" success={<p>Thank you. We&apos;ll email our current price list and position report shortly.</p>} />;
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <Input name="name" label="Full name" required autoComplete="name" invalid={invalid} />
      <Input name="company" label="Company" required autoComplete="organization" invalid={invalid} />
      <Input name="email" type="email" label="Business email" required autoComplete="email" invalid={invalid} />
      <CountrySelect name="country" label="Country" required invalid={invalid} />
      <div className="sm:col-span-2">
        <Consent invalid={invalid} />
      </div>
      <div className="sm:col-span-2">
        <FormStatus status={status} error={error} success={null} />
      </div>
      <div className="sm:col-span-2">
        <SubmitButton status={status}>Email me the price list</SubmitButton>
      </div>
    </form>
  );
}

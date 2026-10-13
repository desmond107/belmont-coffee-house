import Link from "next/link";
import { countryList } from "@/content/countries";
import { site } from "@/content/site";

type Base = { name: string; label: string; required?: boolean; invalid?: string[]; hint?: string; className?: string };

function Label({ name, label, required, hint }: Base) {
  return (
    <label htmlFor={`f-${name}`} className="mb-1.5 block text-[0.78rem] font-semibold tracking-wide text-espresso">
      {label}
      {required && <span className="text-gold-deep"> *</span>}
      {hint && <span className="ml-2 font-normal text-muted">{hint}</span>}
    </label>
  );
}

export function Input({ type = "text", autoComplete, placeholder, defaultValue, ...b }: Base & { type?: string; autoComplete?: string; placeholder?: string; defaultValue?: string }) {
  return (
    <div className={b.className}>
      <Label {...b} />
      <input
        id={`f-${b.name}`}
        name={b.name}
        type={type}
        required={b.required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={b.invalid?.includes(b.name) || undefined}
        className="field"
      />
    </div>
  );
}

export function Textarea({ rows = 5, placeholder, ...b }: Base & { rows?: number; placeholder?: string }) {
  return (
    <div className={b.className}>
      <Label {...b} />
      <textarea id={`f-${b.name}`} name={b.name} rows={rows} required={b.required} placeholder={placeholder} aria-invalid={b.invalid?.includes(b.name) || undefined} className="field resize-y" />
    </div>
  );
}

export function Select({ options, placeholder = "Select…", defaultValue, ...b }: Base & { options: (string | { value: string; label: string })[]; placeholder?: string; defaultValue?: string }) {
  return (
    <div className={b.className}>
      <Label {...b} />
      <select id={`f-${b.name}`} name={b.name} required={b.required} defaultValue={defaultValue ?? ""} aria-invalid={b.invalid?.includes(b.name) || undefined} className="field">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => {
          const v = typeof o === "string" ? { value: o, label: o } : o;
          return (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function CountrySelect(props: Base & { defaultValue?: string }) {
  return <Select {...props} options={countryList} placeholder="Select country…" />;
}

export function Checkboxes({ options, ...b }: Base & { options: string[] }) {
  return (
    <fieldset className={b.className}>
      <legend className="mb-2 block text-[0.78rem] font-semibold tracking-wide text-espresso">
        {b.label}
        {b.hint && <span className="ml-2 font-normal text-muted">{b.hint}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="checkbox" name={b.name} value={o} className="peer sr-only" />
            <span className="inline-block rounded-full border border-line bg-white px-3.5 py-1.5 text-sm transition-colors peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Consent({ invalid }: { invalid?: string[] }) {
  return (
    <label className="flex items-start gap-3 text-sm text-muted">
      <input type="checkbox" name="consent" value="true" required aria-invalid={invalid?.includes("consent") || undefined} className="mt-1 h-4 w-4 accent-espresso" />
      <span>
        I agree to Belmont Coffee House processing my details to respond to this request, as described in the{" "}
        <Link href="/privacy" className="text-gold-deep underline underline-offset-2">
          privacy policy
        </Link>
        .
      </span>
    </label>
  );
}

/** Hidden spam trap. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormStatus({ status, error, success }: { status: string; error: string; success: React.ReactNode }) {
  return (
    <div aria-live="polite" role="status">
      {status === "success" && <div className="rounded-[2px] border border-forest/30 bg-forest-soft p-5 text-forest">{success}</div>}
      {status === "error" && (
        <div className="rounded-[2px] border border-[#a43b2a]/30 bg-[#a43b2a]/5 p-4 text-sm text-[#7a2a1d]">
          {error}{" "}
          <span className="block pt-1">
            You can also reach us at{" "}
            <a className="underline" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>{" "}
            or {site.contact.phone}.
          </span>
        </div>
      )}
    </div>
  );
}

export function SubmitButton({ status, children }: { status: string; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={status === "sending"}
      className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-espresso px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-roast disabled:opacity-60"
    >
      {status === "sending" ? "Sending…" : children}
    </button>
  );
}

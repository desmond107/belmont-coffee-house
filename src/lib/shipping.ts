/**
 * Retail delivery options. Edit prices (USD) and thresholds here.
 */
export type ShippingId = "nairobi" | "kenya" | "east-africa" | "international";

const EAST_AFRICA = ["Uganda", "Tanzania", "Rwanda", "Burundi", "Ethiopia", "South Sudan"];

export const shippingOptions: { id: ShippingId; label: string; eta: string; priceUSD: number; freeOverUSD?: number; appliesTo: (country: string) => boolean }[] = [
  { id: "nairobi", label: "Nairobi same / next-day delivery", eta: "Same or next business day", priceUSD: 3, freeOverUSD: 50, appliesTo: (c) => c === "Kenya" },
  { id: "kenya", label: "Kenya countrywide courier", eta: "1 – 3 business days", priceUSD: 6, freeOverUSD: 80, appliesTo: (c) => c === "Kenya" },
  { id: "east-africa", label: "East Africa courier", eta: "3 – 5 business days", priceUSD: 22, appliesTo: (c) => EAST_AFRICA.includes(c) },
  { id: "international", label: "International express (DHL)", eta: "3 – 7 business days", priceUSD: 45, freeOverUSD: 250, appliesTo: (c) => c !== "Kenya" && !EAST_AFRICA.includes(c) },
];

export function optionsFor(country: string) {
  return shippingOptions.filter((o) => o.appliesTo(country));
}

export function shippingFor(country: string, id: ShippingId, subtotalUSD: number) {
  const opt = optionsFor(country).find((o) => o.id === id);
  if (!opt) return null;
  const free = opt.freeOverUSD !== undefined && subtotalUSD >= opt.freeOverUSD;
  return { ...opt, priceUSD: free ? 0 : opt.priceUSD };
}

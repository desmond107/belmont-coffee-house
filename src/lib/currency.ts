import { currencies, type CurrencyCode } from "@/content/site";

export function formatPrice(usd: number, code: CurrencyCode) {
  const c = currencies.find((x) => x.code === code) ?? currencies[0];
  const value = usd * c.rate;
  return new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency: c.code,
    maximumFractionDigits: c.code === "KES" ? 0 : 2,
  }).format(value);
}

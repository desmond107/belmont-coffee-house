/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE SETTINGS — edit this file to change company details everywhere.
 *  Anything in [square brackets] is a placeholder: search the project for "["
 *  and replace before launch (see GUIDE.md → "Placeholder checklist").
 * ─────────────────────────────────────────────────────────────────────────────
 */

const FOUNDED = 2016;

type VideoFiles = { mp4: string; webm?: string; poster: string };
export type HeroVideoSources = VideoFiles & { mobile?: VideoFiles };

export const site = {
  name: "Belmont Coffee House",
  shortName: "Belmont",
  legalName: "Belmont Coffee House Ltd [confirm registered name]",
  tagline: "Crafted by Origin. Trusted Worldwide.",
  heroHeadline: "Kenyan & East African Coffee, Cupped, Graded and Shipped to Your Port",
  description:
    "Belmont Coffee House is a Nairobi-based exporter of East African specialty and commercial coffee — green beans, roasted coffee and private label — serving importers, roasters and distributors worldwide.",
  /** Production URL, used for canonical links, sitemap and Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.belmontcoffeehouse.com",
  founded: FOUNDED,
  yearsInBusiness: new Date().getFullYear() - FOUNDED,

  contact: {
    phone: "+254 713 905 761",
    phoneHref: "tel:+254713905761",
    whatsapp: "254713905761", // digits only, international format, used for wa.me links
    // NOTE: the address supplied was "consult@belmont.coffee.com" — confirm the exact domain.
    email: "consult@belmont.coffee.com",
    address: {
      street: "[Office street address, building, floor]",
      city: "Nairobi",
      postalCode: "[Postal code]",
      country: "Kenya",
      countryCode: "KE",
    },
    warehouse: "[Warehouse / dry mill address], Nairobi or Mombasa",
    /** Google Maps embed query (no API key needed). Replace with your exact address. */
    mapQuery: "Nairobi, Kenya",
    geo: { lat: -1.2864, lng: 36.8172 },
    hours: [
      { days: "Monday – Friday", time: "08:00 – 17:30 EAT" },
      { days: "Saturday", time: "09:00 – 13:00 EAT" },
      { days: "Sunday & public holidays", time: "Closed" },
    ],
    responseTime: "within one business day",
  },

  /**
   * Inquiry routing. Each contact-form topic is delivered to its own inbox.
   * Override per environment with INQUIRY_EMAIL_WHOLESALE etc. (see .env.example).
   */
  inquiryRouting: {
    wholesale: "consult@belmont.coffee.com",
    retail: "consult@belmont.coffee.com",
    partnerships: "consult@belmont.coffee.com",
    press: "consult@belmont.coffee.com",
  },

  social: {
    // Social links — "to be updated". Leave empty strings to hide an icon.
    linkedin: "",
    instagram: "",
    facebook: "",
    x: "",
    youtube: "",
  },

  /** Trust bar figures shown on the home page. */
  stats: [
    { value: String(new Date().getFullYear() - FOUNDED), suffix: "+", label: "Years exporting" },
    { value: "[25]", suffix: "+", label: "Countries served" },
    { value: "[4,800]", suffix: " t", label: "Green coffee shipped" },
    { value: "5", suffix: "", label: "East African origins" },
  ],

  ports: ["Mombasa (KE)", "Dar es Salaam (TZ)"],

  /**
   * Home hero video (muted, looping). Set to null to show the hero photo instead.
   * To replace: export a short clip (8–20 s, 1280–1920 px wide, no audio) to
   * /public/video and update these paths — see GUIDE.md → "Hero video".
   * Phones get the `mobile` versions; visitors who prefer reduced motion see
   * the poster with a play button.
   */
  heroVideo: {
    mp4: "/video/hero.mp4",
    webm: "/video/hero.webm",
    poster: "/video/hero-poster.webp",
    /** Portrait crop for phones (about a fifth of the size). Optional. */
    mobile: {
      mp4: "/video/hero-mobile.mp4",
      webm: "/video/hero-mobile.webm",
      poster: "/video/hero-poster-mobile.webp",
    },
  } as HeroVideoSources | null,

  /** Analytics — only loads after the visitor accepts cookies. */
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;

export const currencies = [
  // Indicative rates vs USD. Update periodically (or wire to an FX API) — see GUIDE.md.
  { code: "USD", symbol: "$", rate: 1, locale: "en-US" },
  { code: "EUR", symbol: "€", rate: 0.92, locale: "de-DE" },
  { code: "GBP", symbol: "£", rate: 0.78, locale: "en-GB" },
  { code: "KES", symbol: "KSh", rate: 129, locale: "en-KE" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

export const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "zh", label: "中文" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const nav = [
  {
    key: "coffee",
    label: "Our Coffee",
    href: "/coffee",
    children: [
      { label: "Coffee catalogue", href: "/coffee", desc: "Green, roasted and specialty lots" },
      { label: "Origins map", href: "/origins", desc: "Kenya, Ethiopia, Rwanda, Tanzania, Uganda" },
      { label: "Private label", href: "/coffee?category=private-label", desc: "Your brand, our coffee" },
      { label: "Shop retail", href: "/shop", desc: "Bags and gift sets, shipped worldwide" },
    ],
  },
  {
    key: "export",
    label: "Export & Wholesale",
    href: "/export",
    children: [
      { label: "How exporting works", href: "/export", desc: "From cherry to container" },
      { label: "Request a quote", href: "/quote", desc: "FOB, CIF and more" },
      { label: "Request samples", href: "/samples", desc: "Pre-shipment and offer samples" },
      { label: "Buyer FAQ", href: "/faq", desc: "MOQ, payment, shipping" },
    ],
  },
  { key: "quality", label: "Quality", href: "/quality" },
  { key: "sustainability", label: "Sustainability", href: "/sustainability" },
  { key: "about", label: "About", href: "/about" },
  { key: "journal", label: "Journal", href: "/journal" },
  { key: "contact", label: "Contact", href: "/contact" },
] as const;

export function whatsappLink(message = "Hello Belmont Coffee House, I'd like to enquire about your coffee.") {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Contact-form topics; each routes to its inbox in `site.inquiryRouting`. */
export const inquiryTopics = [
  { id: "wholesale", label: "Wholesale & export", desc: "Green coffee, containers, private label" },
  { id: "retail", label: "Retail & orders", desc: "Shop orders, gift sets, deliveries" },
  { id: "partnerships", label: "Partnerships", desc: "Farmers, cooperatives, suppliers, NGOs" },
  { id: "press", label: "Press & media", desc: "Interviews, images, speaking" },
] as const;

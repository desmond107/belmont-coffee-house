# Belmont Coffee House: Website Guide

How to run, edit and deploy the site. No coding experience is needed for most content changes: edit the files below and redeploy.

## 1. Run it locally

```bash
npm install
cp .env.example .env.local   # optional locally
npm run dev                  # http://localhost:3000
```

In development, form submissions print to the terminal instead of being emailed. Every placeholder photo also shows a small label describing the real shot that should replace it.

## 2. Where everything lives

| What | File |
|---|---|
| Company name, phone, WhatsApp, email, address, hours, stats, socials, currencies | `src/content/site.ts` |
| Coffee catalogue (green, specialty, roasted, ground, private label, gift sets) and retail prices | `src/content/products.ts` |
| Origins and growing regions (map pins, climate, altitude, soil, flavour) | `src/content/origins.ts` |
| Licences and certification programmes | `src/content/certifications.ts` |
| Story, mission, team, timeline, testimonials, clients, FAQs, export terms, impact figures | `src/content/company.ts` |
| Journal articles | `content/journal/*.md` |
| Photos | `public/images/` + `src/content/images.ts` |
| Retail delivery options and prices | `src/lib/shipping.ts` |
| Interface translations (FR, DE, ZH) | `src/lib/i18n.ts` |
| Brand colours and fonts | `src/app/globals.css` (the `@theme` block) and `src/app/layout.tsx` |

## 3. Placeholder checklist (do before launch)

Search the project for `[`. Every bracketed value is a placeholder. Key items:

- [ ] **Email domain.** The address supplied was `consult@belmont.coffee.com`. Confirm it is correct (perhaps `consult@belmont.coffee` or `consult@belmontcoffee.com`?). Change it in `site.ts`.
- [ ] Registered company name, office and warehouse address, postal code (`site.ts`)
- [ ] Trust-bar stats: countries served and tonnage shipped (`site.ts → stats`)
- [ ] Licence and permit numbers (`certifications.ts`)
- [ ] **"EU Coffee Import Permit"**: confirm the exact document name. The site presents it as "EU Import Compliance (EUDR)".
- [ ] Certification programmes (Organic, Fairtrade, Rainforest Alliance, ISO, HACCP, SCA): set `available: false` for any you cannot evidence, and remove them from products' `certifications`. **Never claim a certification you don't hold.**
- [ ] Founder story, team names, bios and portraits; timeline years (`company.ts`)
- [ ] Testimonials, client names and case studies. Publish only with written permission.
- [ ] Impact figures and farmer stories (`company.ts → impact, impactStories`)
- [ ] Payment terms, lead times and MOQs: confirm these match your practice
- [ ] Micro-lot washing-station name and lot quantities (`products.ts`)
- [ ] Legal pages (`src/app/privacy`, `terms`, `cookies`): have a lawyer review them
- [ ] Social links (`site.ts → social`). Empty links are hidden automatically.
- [ ] Exchange rates (`site.ts → currencies`)
- [ ] Translations: have a native speaker review `src/lib/i18n.ts`

## 4. Replacing images

All photos are royalty-free **CC0 placeholders** (sources in `public/images/CREDITS.json`). To swap one:

1. Export your photo as **WebP** (or JPG), about **2000 px wide**, quality 75–80.
2. Put it in `public/images/`, e.g. `public/images/nyeri-drying-beds.webp`.
3. In `src/content/images.ts`, change that entry's `src`, `width`, `height` and `alt`, and set `placeholder: false`.

Each entry's `brief` describes the shot to commission (cherries on the branch, hand-picking, drying beds, sacks, roasting, pour-over, port and so on). Next.js automatically resizes images, converts them to AVIF/WebP and lazy-loads them.

- **Hero video:** the home hero plays `public/video/hero.webm` (Chrome, Firefox, Edge) and `hero.mp4` (Safari, iPhone) on a silent continuous loop, with `hero-poster.webp` shown while it loads. The original file is kept in `media-source/bel-vid.mp4`. To use a new clip, export web versions with:

  ```bash
  ffmpeg -i new.mp4 -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 -preset slow -movflags +faststart public/video/hero.mp4
  ffmpeg -i new.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 34 public/video/hero.webm
  ffmpeg -ss 0.2 -i new.mp4 -frames:v 1 public/video/hero-poster.webp
  ```

  Phones get a lighter portrait crop (`hero-mobile.*`, about 0.5 MB). Make those from the same clip. The crop below suits a 16:9 source 768 px tall; adjust `432:768` to the clip's height × 9/16:

  ```bash
  ffmpeg -i new.mp4 -an -vf "crop=432:768:(iw-432)/2:0" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset slow -movflags +faststart public/video/hero-mobile.mp4
  ffmpeg -i new.mp4 -an -vf "crop=432:768:(iw-432)/2:0" -c:v libvpx-vp9 -b:v 0 -crf 38 public/video/hero-mobile.webm
  ffmpeg -ss 0.2 -i new.mp4 -vf "crop=432:768:(iw-432)/2:0" -frames:v 1 public/video/hero-poster-mobile.webp
  ```

  If you skip the phone versions, delete the `mobile` block in `site.ts → heroVideo` and phones will use the desktop files. Visitors who prefer reduced motion or have data saver on see the poster with a play button instead of autoplay.

  Keep it short (8–20 s) and under about 4 MB. To switch back to a still photo, set `heroVideo: null` in `site.ts`.
- **Team portraits:** the About page currently shows monogram tiles. Replace them in `src/app/about/page.tsx`.
- **Client logos:** replace the text marks in `src/components/sections/Testimonials.tsx`.
- **Certification marks:** use official logos only once you are licensed to display them.

## 5. Updating products

Copy an entry in `src/content/products.ts`, change the `slug` (it becomes the URL `/coffee/<slug>`), and edit the fields. Then:

- Add `retail: [{ label: "250 g", priceUSD: 18, sku: "..." }]` to sell it in the Shop.
- Leave `retail` out for wholesale-only items. These show *Request a quote / sample*.
- Spec-sheet PDFs, the export catalogue PDF, the sitemap, filters and schema markup all update automatically.

## 6. Writing journal posts

Create `content/journal/my-article-slug.md`:

```markdown
---
title: "Your headline"
description: "One or two sentences for Google and social sharing."
date: "2026-11-01"
author: "Belmont Export Desk"
category: "Export Tips"        # Coffee Education · Market Insights · Brewing Guides · Export Tips
image: "sacks"                 # any key from src/content/images.ts
---

Write in Markdown. Use ## for headings, **bold**, lists, > quotes, tables and [links](/quote).
```

Want a visual editor? The content is plain Markdown in git, so a git-based CMS such as **Decap CMS** or **TinaCMS** can be added later without changing the site.

## 7. Forms, leads and orders

Every form posts to `/api/inquiry`. The checkout posts to `/api/order`. Submissions are delivered by:

- **Email via Resend:** set `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` (verify your domain in Resend), or
- **Webhook:** set `FORM_WEBHOOK_URL` (Zapier, Make, Google Sheets via Apps Script, HubSpot, etc.).

**In production, forms show an error until one of these is configured.** This stops leads being lost silently. Contact-form topics (Wholesale, Retail, Partnerships, Press) route to the inboxes in `site.ts → inquiryRouting`, or to the `INQUIRY_EMAIL_*` env vars.

Spam protection: a honeypot field, server-side validation and a per-IP rate limit.

## 8. Shop and payments (phase 2)

The shop has a cart, local and international delivery options (`src/lib/shipping.ts`), currency display and checkout. Prices are re-checked on the server. Currently, a placed order is emailed to your team, who reply with a **secure payment link** (card, M-Pesa or PayPal). No card data ever touches the site.

To take payment at checkout, integrate a provider in `src/app/api/order/route.ts`: create a checkout session and return its URL. Suitable providers: **Pesapal** or **Flutterwave** (cards and M-Pesa), **Stripe**, or **Safaricom Daraja** (M-Pesa STK push).

## 9. Languages and currencies

The language switcher (EN, FR, DE, 中文) translates navigation, calls to action, the hero, the footer and the chat widget. Long-form pages are in English. To translate full pages, move to locale routes with `next-intl` (e.g. `/fr/...`). The content files are already separated from layout, which makes this straightforward. To add Arabic, add RTL support (`dir="rtl"`) at the same time.

Currency display (USD, EUR, GBP, KES) uses the indicative rates in `site.ts`. Wholesale coffee is always quoted on request, in USD.

## 10. SEO

Built in: per-page titles and descriptions, canonical URLs, Open Graph and Twitter cards, a generated OG image, `sitemap.xml`, `robots.txt`, and JSON-LD for Organization, Product, FAQPage, Article and BreadcrumbList. After launch:

1. Set `NEXT_PUBLIC_SITE_URL` to your real domain.
2. Submit `https://yourdomain/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
3. Create a Google Business Profile for the Nairobi office.
4. Publish a journal article at least monthly.

## 11. Deploying

**Recommended: Vercel** (free tier is fine to start)

1. Push this folder to a GitHub repository.
2. On vercel.com, choose *New Project* and import the repo. The framework is detected automatically.
3. Add the environment variables from `.env.example`.
4. Deploy, then add your domain under *Settings → Domains* and update DNS as shown.

**Any Node host** (Render, Railway, a VPS):

```bash
npm ci && npm run build && npm start   # serves on PORT (default 3000)
```

Netlify also works with its Next.js runtime. Note that the site needs a Node server for the forms and checkout. It is not a pure static export.

## 12. Before you go live

- [ ] Placeholder checklist complete (section 3)
- [ ] A test quote, sample, contact, newsletter and order each arrive in the right inbox
- [ ] WhatsApp button opens a chat with the right number
- [ ] Lighthouse run (Chrome DevTools → Lighthouse) on the live URL, after real photos are in
- [ ] Search Console verified and sitemap submitted

# Belmont Coffee House — Website

Multi-page marketing, catalogue and retail site for Belmont Coffee House, an East African coffee exporter based in Nairobi.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Leaflet · pdf-lib

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

See **[GUIDE.md](GUIDE.md)** for editing content, replacing images, configuring form delivery, the placeholder checklist and deployment.

## Structure

```
content/journal/        Markdown journal articles
public/images/          Photos (CC0 placeholders, see CREDITS.json)
src/content/            All site data: settings, products, origins, certifications, company copy
src/app/                Pages and API routes (forms, orders, PDF spec sheets/catalogue/guide)
src/components/         Layout, UI primitives, sections, forms, shop, map
src/lib/                SEO/schema, journal loader, PDFs, i18n, currency, shipping, delivery
```
# belmont-coffee-house

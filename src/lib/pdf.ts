import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { site } from "@/content/site";
import { categories, type Product } from "@/content/products";
import { programmeName } from "@/content/certifications";

/**
 * Branded PDFs generated on demand: product spec sheets, the export
 * catalogue and the Green Coffee Buyer's Guide (newsletter lead magnet).
 * Content comes from the same data files as the website, so they never drift.
 */

const ESPRESSO = rgb(0.169, 0.102, 0.071);
const GOLD = rgb(0.722, 0.537, 0.231);
const CREAM = rgb(0.965, 0.937, 0.902);
const CHARCOAL = rgb(0.18, 0.169, 0.157);
const MUTED = rgb(0.42, 0.384, 0.353);
const LINE = rgb(0.886, 0.839, 0.776);

const W = 595.28;
const H = 841.89;
const M = 56;

// Standard PDF fonts only support Latin-1; replace anything else.
const clean = (s: string) =>
  s
    .replace(/→/g, "->")
    .replace(/[≈]/g, "~")
    .replace(/[^\x20-\x7E\xA0-\xFF–—‘’“”•…€×°·]/g, "");

type Ctx = { doc: PDFDocument; page: PDFPage; y: number; serif: PDFFont; serifBold: PDFFont; sans: PDFFont; sansBold: PDFFont };

async function init(): Promise<Ctx> {
  const doc = await PDFDocument.create();
  doc.setAuthor(site.name);
  doc.setCreator(site.name);
  const ctx: Ctx = {
    doc,
    page: doc.addPage([W, H]),
    y: H - M,
    serif: await doc.embedFont(StandardFonts.TimesRoman),
    serifBold: await doc.embedFont(StandardFonts.TimesRomanBold),
    sans: await doc.embedFont(StandardFonts.Helvetica),
    sansBold: await doc.embedFont(StandardFonts.HelveticaBold),
  };
  return ctx;
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = clean(text).split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(test, size) > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function header(ctx: Ctx, subtitle: string) {
  const { page } = ctx;
  page.drawRectangle({ x: 0, y: H - 92, width: W, height: 92, color: ESPRESSO });
  page.drawText("BELMONT", { x: M, y: H - 50, size: 22, font: ctx.serifBold, color: GOLD });
  page.drawText("COFFEE HOUSE", { x: M, y: H - 66, size: 8, font: ctx.sansBold, color: CREAM });
  const sub = clean(subtitle.toUpperCase());
  page.drawText(sub, { x: W - M - ctx.sansBold.widthOfTextAtSize(sub, 8), y: H - 56, size: 8, font: ctx.sansBold, color: CREAM });
  ctx.y = H - 130;
}

function footer(ctx: Ctx) {
  const { page } = ctx;
  page.drawLine({ start: { x: M, y: 58 }, end: { x: W - M, y: 58 }, thickness: 0.5, color: LINE });
  const left = clean(`${site.name} · ${site.contact.address.city}, ${site.contact.address.country}`);
  const right = clean(`${site.contact.phone} · ${site.contact.email} · ${site.url.replace(/^https?:\/\//, "")}`);
  page.drawText(left, { x: M, y: 42, size: 7.5, font: ctx.sans, color: MUTED });
  page.drawText(right, { x: W - M - ctx.sans.widthOfTextAtSize(right, 7.5), y: 42, size: 7.5, font: ctx.sans, color: MUTED });
}

function ensure(ctx: Ctx, needed: number, subtitle: string) {
  if (ctx.y - needed < 80) {
    footer(ctx);
    ctx.page = ctx.doc.addPage([W, H]);
    header(ctx, subtitle);
  }
}

function paragraph(ctx: Ctx, text: string, opts: { size?: number; font?: PDFFont; color?: ReturnType<typeof rgb>; indent?: number; gap?: number; subtitle: string }) {
  const size = opts.size ?? 10;
  const font = opts.font ?? ctx.sans;
  const indent = opts.indent ?? 0;
  const lh = size * 1.5;
  for (const line of wrap(text, font, size, W - 2 * M - indent)) {
    ensure(ctx, lh, opts.subtitle);
    ctx.page.drawText(line, { x: M + indent, y: ctx.y, size, font, color: opts.color ?? CHARCOAL });
    ctx.y -= lh;
  }
  ctx.y -= opts.gap ?? 6;
}

function heading(ctx: Ctx, text: string, size: number, subtitle: string) {
  ensure(ctx, size * 2.4, subtitle);
  ctx.page.drawText(clean(text), { x: M, y: ctx.y, size, font: ctx.serifBold, color: ESPRESSO });
  ctx.y -= size * 1.5;
}

function specRows(p: Product): [string, string][] {
  return [
    ["Category", categories.find((c) => c.id === p.category)?.label ?? p.category],
    ["Species", p.species],
    ["Origin", p.originLabel],
    ["Region", p.regionLabel],
    ["Altitude", p.altitude],
    ["Variety", p.varieties.join(", ")],
    ["Process", p.process],
    ["Grade / screen", `${p.grade} · ${p.screen}`],
    ["Cup score (SCA)", p.cupScore ? `${p.cupScore} pts` : "On request"],
    ["Tasting notes", p.tastingNotes.join(", ")],
    ["Harvest", p.harvest],
    ["Packaging", p.packaging.join("; ")],
    ["Minimum order", p.moq],
    ["Certified lots", p.certifications.length ? p.certifications.map(programmeName).join(", ") : "—"],
  ];
}

function specTable(ctx: Ctx, p: Product, subtitle: string, size = 9.5) {
  const labelW = 120;
  for (const [k, v] of specRows(p)) {
    const lines = wrap(v, ctx.sans, size, W - 2 * M - labelW);
    const h = lines.length * size * 1.45 + 8;
    ensure(ctx, h, subtitle);
    ctx.page.drawText(clean(k.toUpperCase()), { x: M, y: ctx.y, size: 7, font: ctx.sansBold, color: MUTED });
    lines.forEach((line, i) => ctx.page.drawText(line, { x: M + labelW, y: ctx.y - i * size * 1.45, size, font: ctx.sans, color: CHARCOAL }));
    ctx.y -= h - 4;
    ctx.page.drawLine({ start: { x: M, y: ctx.y + 2 }, end: { x: W - M, y: ctx.y + 2 }, thickness: 0.4, color: LINE });
    ctx.y -= 8;
  }
}

const disclaimer =
  "Specifications are indicative and based on current-crop samples. Final quality is confirmed by the approved offer or pre-shipment sample and the signed contract.";

export async function specSheetPdf(p: Product) {
  const ctx = await init();
  ctx.doc.setTitle(`${p.name} — Specification Sheet`);
  const sub = "Product specification";
  header(ctx, sub);
  ctx.page.drawText(clean(p.originLabel.toUpperCase()), { x: M, y: ctx.y, size: 8, font: ctx.sansBold, color: GOLD });
  ctx.y -= 26;
  for (const line of wrap(p.name, ctx.serifBold, 26, W - 2 * M)) {
    ctx.page.drawText(line, { x: M, y: ctx.y, size: 26, font: ctx.serifBold, color: ESPRESSO });
    ctx.y -= 30;
  }
  paragraph(ctx, p.summary, { size: 12, font: ctx.serif, color: MUTED, gap: 14, subtitle: sub });
  specTable(ctx, p, sub);
  ctx.y -= 8;
  heading(ctx, "About this coffee", 14, sub);
  paragraph(ctx, p.description, { subtitle: sub, gap: 14 });
  heading(ctx, "Samples & quotations", 14, sub);
  paragraph(ctx, `Request offer samples or a quotation (FOB Mombasa, CIF or DAP) from ${site.contact.email}, by phone or WhatsApp on ${site.contact.phone}, or at ${site.url}/quote.`, { subtitle: sub });
  paragraph(ctx, disclaimer, { size: 7.5, color: MUTED, subtitle: sub });
  footer(ctx);
  return ctx.doc.save();
}

export async function catalogPdf(list: Product[]) {
  const ctx = await init();
  ctx.doc.setTitle(`${site.name} — Export Catalogue`);
  const sub = `Export catalogue ${new Date().getFullYear()}`;

  // Cover
  ctx.page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: ESPRESSO });
  ctx.page.drawText("BELMONT", { x: M, y: H / 2 + 60, size: 54, font: ctx.serifBold, color: GOLD });
  ctx.page.drawText("COFFEE HOUSE", { x: M + 2, y: H / 2 + 34, size: 12, font: ctx.sansBold, color: CREAM });
  ctx.page.drawText(clean(`Export Catalogue ${new Date().getFullYear()}`), { x: M, y: H / 2 - 20, size: 22, font: ctx.serif, color: CREAM });
  ctx.page.drawText(clean(site.tagline), { x: M, y: H / 2 - 44, size: 11, font: ctx.serif, color: GOLD });
  ctx.page.drawText(clean("Kenya · Ethiopia · Rwanda · Tanzania · Uganda"), { x: M, y: 90, size: 9, font: ctx.sansBold, color: CREAM });
  ctx.page.drawText(clean(`${site.contact.phone} · ${site.contact.email}`), { x: M, y: 72, size: 9, font: ctx.sans, color: CREAM });

  for (const cat of categories) {
    const items = list.filter((p) => p.category === cat.id);
    if (!items.length) continue;
    ctx.page = ctx.doc.addPage([W, H]);
    header(ctx, sub);
    heading(ctx, cat.label, 22, sub);
    paragraph(ctx, cat.blurb, { color: MUTED, gap: 16, subtitle: sub });
    for (const p of items) {
      ensure(ctx, 160, sub);
      heading(ctx, p.name, 15, sub);
      paragraph(ctx, p.summary, { size: 9.5, color: MUTED, gap: 8, subtitle: sub });
      specTable(ctx, p, sub, 8.5);
      ctx.y -= 12;
    }
    footer(ctx);
  }
  ctx.page = ctx.doc.addPage([W, H]);
  header(ctx, sub);
  heading(ctx, "Terms at a glance", 18, sub);
  for (const line of [
    "Incoterms: EXW, FCA, FOB Mombasa, CFR, CIF and DAP (selected markets).",
    "Payment: Cash Against Documents, irrevocable L/C at sight, or T/T with advance.",
    "Documents: export licence, movement permit, phytosanitary certificate (KEPHIS), certificate of origin, ICO marks, quality and weight reports, bill of lading.",
    "Packaging: 60 kg jute bags, GrainPro liners, 30 kg vacuum boxes for specialty lots.",
    "Container: 20' FCL holds about 320 × 60 kg bags (19.2 t).",
    "Prices: on request, fixed or as a differential to ICE futures. Ask for our current price list.",
  ])
    paragraph(ctx, `•  ${line}`, { subtitle: sub, gap: 4 });
  ctx.y -= 10;
  paragraph(ctx, disclaimer, { size: 7.5, color: MUTED, subtitle: sub });
  footer(ctx);
  return ctx.doc.save();
}

const guide: { h: string; p?: string[]; b?: string[] }[] = [
  { h: "Introduction", p: ["This guide is for roasters, importers and coffee brands buying green coffee from East Africa, whether for the first time or looking to buy better. It covers specifications, sampling, contracts, logistics and the documents you should expect from a professional exporter."] },
  { h: "1. Write a clear specification", b: ["Origin and region, for example Kenya, Nyeri.", "Grade and screen size, for example AA, screen 17/18.", "Process: washed, natural or honey.", "Minimum cup score and maximum defects (for example 85+ points, 0 primary defects per 350 g).", "Moisture 10 – 12% and water activity below 0.60.", "Packaging (jute, GrainPro, vacuum) and marking requirements.", "Shipment window, destination port and Incoterm."] },
  { h: "2. Sample with discipline", p: ["Cup offer samples blind against a reference coffee. Record moisture on arrival. Approve a pre-shipment sample drawn from the actual bags, and keep it as the reference for any arrival claim."] },
  { h: "3. Understand pricing", p: ["Arabica is usually priced as a differential (plus or minus cents per lb) to the ICE \"C\" futures contract, or at a fixed price. Robusta references ICE London. Specialty micro-lots are often fixed-priced. Ask your exporter to show both, so you can manage market risk."] },
  { h: "4. Contracts", b: ["Use a standard form such as GCA (US) or ECF (Europe) contract terms.", "State quality basis: 'as per approved sample'.", "Agree arbitration, weights (shipped or landed) and claims procedure."] },
  { h: "5. Payment terms", b: ["Cash Against Documents (CAD), through banks.", "Letter of Credit (L/C) at sight, for first transactions.", "Telegraphic Transfer with advance, for small specialty lots."] },
  { h: "6. Logistics", p: ["A 20-foot container holds about 320 bags of 60 kg (19.2 tonnes). Specify container lining or desiccants for long voyages, and insure against moisture damage. Typical transit from Mombasa: 10 – 16 days to the Gulf, 28 – 35 days to Northern Europe, 30 – 42 days to North America."] },
  { h: "7. Documents checklist", b: ["Commercial invoice and packing list", "Bill of lading (original set)", "Phytosanitary certificate (KEPHIS for Kenya)", "Certificate of origin", "ICO marks on every bag", "Quality and weight certificates", "Certification documents (Organic, Fairtrade, Rainforest Alliance) where applicable", "EU-bound coffee: EUDR traceability and geolocation data"] },
  { h: "8. Red flags", b: ["Unwilling to send pre-shipment samples.", "No export licence number on the contract.", "Specifications given as grade only, with no cup score or defect limits.", "Pressure to pay 100% in advance on a first container."] },
  { h: "Work with Belmont", p: [`Belmont Coffee House has exported East African coffee from Nairobi since ${site.founded}. Request samples or a quotation: ${site.contact.email} · ${site.contact.phone} · ${site.url}/quote`] },
];

export async function buyersGuidePdf() {
  const ctx = await init();
  ctx.doc.setTitle("The Green Coffee Buyer's Guide — Belmont Coffee House");
  const sub = "Green Coffee Buyer's Guide";
  header(ctx, sub);
  ctx.page.drawText("FREE GUIDE", { x: M, y: ctx.y, size: 8, font: ctx.sansBold, color: GOLD });
  ctx.y -= 34;
  ctx.page.drawText("The Green Coffee", { x: M, y: ctx.y, size: 32, font: ctx.serifBold, color: ESPRESSO });
  ctx.y -= 36;
  ctx.page.drawText("Buyer's Guide", { x: M, y: ctx.y, size: 32, font: ctx.serifBold, color: ESPRESSO });
  ctx.y -= 28;
  paragraph(ctx, "Buying East African coffee with confidence: specifications, sampling, pricing, contracts and logistics.", { size: 12, font: ctx.serif, color: MUTED, gap: 18, subtitle: sub });
  for (const s of guide) {
    heading(ctx, s.h, 15, sub);
    s.p?.forEach((t) => paragraph(ctx, t, { subtitle: sub }));
    s.b?.forEach((t) => paragraph(ctx, `•  ${t}`, { subtitle: sub, gap: 2, indent: 6 }));
    ctx.y -= 8;
  }
  footer(ctx);
  return ctx.doc.save();
}

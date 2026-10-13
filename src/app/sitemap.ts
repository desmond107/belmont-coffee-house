import type { MetadataRoute } from "next";
import { products, retailProducts } from "@/content/products";
import { regions } from "@/content/origins";
import { getAllPosts } from "@/lib/journal";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["/", "/about", "/coffee", "/export", "/quote", "/samples", "/quality", "/sustainability", "/origins", "/journal", "/contact", "/shop", "/faq", "/buyers-guide", "/privacy", "/terms", "/cookies"];
  return [
    ...statics.map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : ["/coffee", "/export", "/quote"].includes(p) ? 0.9 : 0.6 })),
    ...products.map((p) => ({ url: absoluteUrl(`/coffee/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...retailProducts().map((p) => ({ url: absoluteUrl(`/shop/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...regions.map((r) => ({ url: absoluteUrl(`/origins/${r.slug}`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...getAllPosts().map((p) => ({ url: absoluteUrl(`/journal/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}

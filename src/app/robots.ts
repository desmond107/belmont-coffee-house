import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/shop/cart", "/shop/checkout", "/api/inquiry", "/api/order"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

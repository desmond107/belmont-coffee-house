import type { Metadata } from "next";
import { site } from "@/content/site";
import { images, type ImageKey } from "@/content/images";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Page-level metadata with canonical URL and Open Graph defaults. */
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: ImageKey;
  type?: "website" | "article";
}): Metadata {
  const ogImages = image ? [{ url: images[image].src, width: images[image].width, height: images[image].height, alt: images[image].alt }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type, siteName: site.name, ...(ogImages && { images: ogImages }) },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  foundingDate: String(site.founded),
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    addressLocality: site.contact.address.city,
    postalCode: site.contact.address.postalCode,
    addressCountry: site.contact.address.countryCode,
  },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "sales", telephone: site.contact.phone, email: site.inquiryRouting.wholesale, areaServed: "Worldwide", availableLanguage: ["English"] },
    { "@type": "ContactPoint", contactType: "customer service", telephone: site.contact.phone, email: site.inquiryRouting.retail },
  ],
  sameAs: Object.values(site.social).filter(Boolean),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

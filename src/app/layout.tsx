import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { organizationLd } from "@/lib/seo";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { JsonLd } from "@/components/ui/JsonLd";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Coffee Exporter — Green Coffee Beans Wholesale from Kenya & East Africa`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "coffee exporter",
    "Kenya coffee exporter",
    "green coffee beans wholesale",
    "specialty coffee Kenya",
    "buy coffee beans in bulk",
    "private label coffee",
    "East African coffee",
    "Kenya AA",
    "Ethiopian coffee exporter",
  ],
  openGraph: { type: "website", siteName: site.name, locale: "en_GB", url: "/" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#2B1A12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal animations only when JS runs, so content is never hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <JsonLd data={organizationLd()} />
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppWidget />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}

import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata = pageMeta({ title: "Terms & Conditions", description: `Terms of use and terms of sale for ${site.name}.`, path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="[Date]">
      <h2>1. About these terms</h2>
      <p>These terms govern your use of this website and retail purchases from the online shop. Wholesale and export transactions are governed by the individual sales contract agreed with each buyer, which takes precedence over these terms.</p>
      <h2>2. Website content</h2>
      <p>Product specifications, cup scores, transit times and exchange-rate conversions are indicative. Final quality for wholesale coffee is confirmed by the approved sample and the signed contract. Content is &copy; {site.legalName} and may not be reproduced without permission.</p>
      <h2>3. Retail orders</h2>
      <ul>
        <li>An order is accepted when we confirm it by email and payment is received through our secure payment link.</li>
        <li>Prices are charged in USD or KES. Prices shown in other currencies are converted for convenience only.</li>
        <li>Delivery times are estimates. International orders may incur import duties and taxes, payable by the recipient.</li>
        <li>Coffee is a perishable food product. If your order arrives damaged or incorrect, contact us within [7] days and we will replace or refund it. [Confirm your returns policy.]</li>
      </ul>
      <h2>4. Liability</h2>
      <p>To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of this website.</p>
      <h2>5. Governing law</h2>
      <p>These terms are governed by the laws of Kenya. Disputes are subject to the jurisdiction of the courts of Kenya.</p>
      <h2>6. Contact</h2>
      <p>{site.legalName}, {site.contact.address.city}, {site.contact.address.country} · {site.contact.email} · {site.contact.phone}</p>
    </LegalPage>
  );
}

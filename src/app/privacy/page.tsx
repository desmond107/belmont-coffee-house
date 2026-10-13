import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata = pageMeta({ title: "Privacy Policy", description: `How ${site.name} collects, uses and protects personal data.`, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="[Date]">
      <p>{site.legalName} (&quot;Belmont&quot;, &quot;we&quot;) respects your privacy. This policy explains how we handle personal data collected through this website, in line with Kenya&apos;s Data Protection Act, 2019 and, where it applies, the EU and UK General Data Protection Regulation (GDPR).</p>
      <h2>Data we collect</h2>
      <ul>
        <li><strong>Enquiries and quotes:</strong> name, company, job title, email, phone, country, delivery address and the details of your request.</li>
        <li><strong>Orders:</strong> contact and delivery details, order contents and payment preference. Card payments are handled entirely by our payment provider; we never see or store your card number.</li>
        <li><strong>Newsletter:</strong> your email address and signup date.</li>
        <li><strong>Usage data:</strong> anonymous analytics, only if you consent to analytics cookies.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To respond to enquiries, prepare quotations and samples, fulfil orders, send the newsletter you requested, meet legal and export-documentation obligations, and improve our website. Our lawful bases are your consent, steps taken at your request before entering a contract, performance of a contract, and our legitimate interest in running our business.</p>
      <h2>Sharing</h2>
      <p>We share data only with service providers who help us operate, such as email delivery, payment processing, couriers and freight forwarders, and with authorities where the law requires it for export documentation. We do not sell personal data.</p>
      <h2>International transfers</h2>
      <p>Some providers may process data outside Kenya. Where they do, we rely on appropriate safeguards as required by law.</p>
      <h2>Retention</h2>
      <p>Enquiry data is kept for up to [3] years, and order and export records for as long as tax and trade law require. You can unsubscribe from the newsletter at any time.</p>
      <h2>Your rights</h2>
      <p>You may request access to, correction of or deletion of your data, object to processing, or withdraw consent at any time. Contact <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. You may also complain to the Office of the Data Protection Commissioner (Kenya) or your local supervisory authority.</p>
      <h2>Contact</h2>
      <p>{site.legalName}, {site.contact.address.street}, {site.contact.address.city}, {site.contact.address.country}. Email: {site.contact.email}. Phone: {site.contact.phone}.</p>
    </LegalPage>
  );
}

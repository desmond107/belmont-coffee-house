import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata = pageMeta({ title: "Cookie Policy", description: `How ${site.name} uses cookies and local storage.`, path: "/cookies" });

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="[Date]">
      <p>We keep tracking to a minimum. This page explains what we store on your device and why.</p>
      <h2>Essential storage (always on)</h2>
      <table>
        <thead><tr><th>Name</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
          <tr><td>belmont.cart</td><td>Remembers the items in your shopping cart</td><td>Until cleared</td></tr>
          <tr><td>belmont.lang / belmont.currency</td><td>Remembers your language and currency choice</td><td>Until cleared</td></tr>
          <tr><td>belmont.cookies</td><td>Records your cookie consent choice</td><td>Until cleared</td></tr>
        </tbody>
      </table>
      <h2>Analytics (only with consent)</h2>
      <p>If you accept analytics, we use Google Analytics, with IP anonymisation, to understand how visitors use the site. These cookies (_ga, _ga_*) last up to 2 years.</p>
      <h2>Third-party content</h2>
      <p>The contact page embeds Google Maps and the origins page loads map tiles from OpenStreetMap. These providers may set their own cookies or log your IP address under their own policies.</p>
      <h2>Changing your choice</h2>
      <p>Use the &quot;Cookie settings&quot; link in the footer at any time, or clear your browser storage.</p>
    </LegalPage>
  );
}

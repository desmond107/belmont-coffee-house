import { Suspense } from "react";
import { site, whatsappLink, inquiryTopics as topics } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = pageMeta({
  title: "Contact Belmont Coffee House — Nairobi, Kenya",
  description: `Contact Belmont's wholesale, retail, partnerships and press teams. Phone and WhatsApp ${site.contact.phone}, email ${site.contact.email}. Offices in Nairobi, Kenya.`,
  path: "/contact",
  image: "latte",
});

export default function ContactPage() {
  const c = site.contact;
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk coffee." intro={`Whether you're planning a container or ordering a gift box, the right team will reply ${c.responseTime}.`} image="pourOverWindow" crumbs={[{ name: "Contact", path: "/contact" }]} />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_24rem]">
            <div>
              <h2 className="mb-8 text-4xl">Send us a message</h2>
              <Suspense>
                <ContactForm />
              </Suspense>
            </div>
            <aside className="space-y-10">
              <div className="bg-espresso p-8 text-cream">
                <p className="font-serif text-2xl text-cream">Fastest response</p>
                <p className="mt-2 text-sm text-cream/75">Chat to our export desk on WhatsApp during Nairobi business hours.</p>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#1f7a4d] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#186640]">
                  WhatsApp {c.phone}
                </a>
              </div>
              <ul className="space-y-6 text-sm">
                <li className="flex gap-4"><Icon name="phone" className="h-5 w-5 shrink-0 text-gold-deep" /><span><span className="block font-semibold text-espresso">Phone</span><a href={c.phoneHref} className="text-muted hover:text-espresso">{c.phone}</a></span></li>
                <li className="flex gap-4"><Icon name="mail" className="h-5 w-5 shrink-0 text-gold-deep" /><span><span className="block font-semibold text-espresso">Email</span><a href={`mailto:${c.email}`} className="break-all text-muted hover:text-espresso">{c.email}</a></span></li>
                <li className="flex gap-4"><Icon name="pin" className="h-5 w-5 shrink-0 text-gold-deep" /><span><span className="block font-semibold text-espresso">Office</span><span className="text-muted">{c.address.street}<br />{c.address.city}, {c.address.country}</span></span></li>
                <li className="flex gap-4"><Icon name="ship" className="h-5 w-5 shrink-0 text-gold-deep" /><span><span className="block font-semibold text-espresso">Warehouse</span><span className="text-muted">{c.warehouse}</span></span></li>
                <li className="flex gap-4"><Icon name="clock" className="h-5 w-5 shrink-0 text-gold-deep" /><span><span className="block font-semibold text-espresso">Business hours</span>
                  <dl className="text-muted">{c.hours.map((h) => <div key={h.days} className="flex justify-between gap-4"><dt>{h.days}</dt><dd>{h.time}</dd></div>)}</dl></span></li>
              </ul>
              <div>
                <p className="mb-3 text-sm font-semibold text-espresso">Direct inboxes</p>
                <dl className="space-y-2 text-sm">
                  {topics.map((t) => (
                    <div key={t.id} className="flex justify-between gap-4 border-b border-line pb-2">
                      <dt className="text-muted">{t.label}</dt>
                      <dd><a href={`mailto:${site.inquiryRouting[t.id]}`} className="break-all text-espresso hover:text-gold-deep">{site.inquiryRouting[t.id]}</a></dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <section aria-label="Map" className="h-[24rem] border-t border-line bg-sand sm:h-[28rem]">
        <iframe
          title={`Map showing ${site.name}, ${c.address.city}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`}
          className="h-full w-full grayscale-[40%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}

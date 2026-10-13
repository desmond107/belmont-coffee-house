import Link from "next/link";
import { site } from "@/content/site";
import { featuredProducts } from "@/content/products";
import { whyBelmont, exportSteps, story } from "@/content/company";
import { countries } from "@/content/origins";
import { getAllPosts } from "@/lib/journal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Icon } from "@/components/ui/Icon";
import { Button, Arrow } from "@/components/ui/Button";
import { HomeHero } from "@/components/sections/HomeHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProductCard } from "@/components/coffee/ProductCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { PostCard } from "@/components/sections/JournalTeaser";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  const featured = featuredProducts().slice(0, 6);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <HomeHero
        backdrop={
          site.heroVideo ? (
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster="/images/hero-drying-sunset.webp">
              <source src={site.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Photo name="hero" priority className="kenburns" />
          )
        }
      />

      <TrustBar />

      {/* Intro / positioning */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow">{site.tagline}</p>
              <h2 className="mt-5 text-4xl leading-[1.1] sm:text-5xl">
                East Africa&apos;s finest coffees, selected on the cupping table and delivered to your port.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                For {site.yearsInBusiness} years, Belmont Coffee House has connected the highland farms of Kenya, Ethiopia, Rwanda, Tanzania and Uganda with roasters, importers, cafés and hotels around the world. We are a licensed Kenyan exporter with our own cupping lab, so every lot we offer has been graded, scored and documented before it reaches you.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {countries.map((c) => (
                  <Link key={c.slug} href={`/origins#${c.slug}`} className="font-serif text-xl text-espresso underline decoration-gold/50 underline-offset-[6px] transition-colors hover:text-gold-deep">
                    {c.name}
                  </Link>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo name="handPicked" sizes="(min-width:1024px) 50vw, 100vw" />
              </div>
              <div className="absolute -bottom-8 -left-4 hidden w-56 bg-espresso p-6 text-cream shadow-xl sm:block lg:-left-10">
                <p className="font-serif text-5xl text-gold">86+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-cream/75">Typical cup score of our specialty offer</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Featured coffees */}
      <section className="bg-parchment py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Current offer" title="Featured coffees" intro="A selection from this season's offer list, from export-grade green lots to roasted coffee for retail." />
            <Button href="/coffee" variant="outline">
              View full catalogue <Arrow />
            </Button>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 100} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Belmont */}
      <section className="grain relative bg-espresso py-24 text-cream sm:py-32">
        <Container>
          <SectionHeading light eyebrow="Why Belmont" title="The partner international buyers trust with a container-load order." />
          <div className="mt-16 grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {whyBelmont.map((w, i) => (
              <Reveal key={w.title} delay={i * 100} className="bg-espresso p-8 lg:p-10">
                <Icon name={w.icon} className="h-9 w-9 text-gold" />
                <h3 className="mt-8 text-2xl text-cream!">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Story teaser */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <Reveal className="relative lg:col-span-6">
              <div className="grid grid-cols-5 gap-4">
                <div className="relative col-span-3 aspect-[3/4] overflow-hidden">
                  <Photo name="plantation" sizes="(min-width:1024px) 30vw, 60vw" />
                </div>
                <div className="col-span-2 flex flex-col gap-4 pt-16">
                  <div className="relative aspect-square overflow-hidden">
                    <Photo name="dryingBeds" sizes="(min-width:1024px) 20vw, 40vw" />
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Photo name="greenBeans" sizes="(min-width:1024px) 20vw, 40vw" />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
              <p className="eyebrow">Our story · Since {site.founded}</p>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">Born in Nairobi, built on the farms of Mount Kenya.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{story.mission}</p>
              <p className="mt-4 leading-relaxed text-muted">{story.growth}</p>
              <Button href="/about" variant="outline" className="mt-9">
                Read our story <Arrow />
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Export process snapshot */}
      <section className="bg-sand py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="From cherry to container" title="How we export" intro="A licensed, fully documented process with quality checkpoints at every stage." />
            <Button href="/export" variant="outline">
              Export & wholesale <Arrow />
            </Button>
          </div>
          <ol className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-7">
            {exportSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70} className="bg-sand p-6 lg:pt-8">
                <span className="font-serif text-4xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{s.text.split(". ")[0].replace(/\.$/, "")}.</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <Testimonials />

      {/* Journal */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Journal" title="Insights from origin" intro="Coffee education, market notes, brewing guides and export know-how from our team." />
            <Button href="/journal" variant="outline">
              All articles <Arrow />
            </Button>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
            {posts.map((p, i) => (
              <PostCard key={p.slug} post={p} i={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Lead magnet / newsletter */}
      <section className="border-t border-line bg-parchment py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex items-center gap-8">
              <div aria-hidden className="hidden h-44 w-32 shrink-0 flex-col justify-between bg-espresso p-4 shadow-xl shadow-espresso/25 sm:flex">
                <span className="font-serif text-sm text-gold">BELMONT</span>
                <span className="font-serif text-lg leading-tight text-cream">Green Coffee Buyer&apos;s Guide</span>
                <span className="h-px w-8 bg-gold" />
              </div>
              <div>
                <p className="eyebrow">Free download</p>
                <h2 className="mt-3 text-3xl sm:text-4xl">The Green Coffee Buyer&apos;s Guide</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Specifications, sampling, pricing, contracts and logistics for buying East African coffee with confidence. Subscribe to our monthly harvest letter and download it instantly.
                </p>
              </div>
            </div>
            <NewsletterForm dark={false} source="home-lead-magnet" />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

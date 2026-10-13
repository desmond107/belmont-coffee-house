import { getAllPosts } from "@/lib/journal";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { PostCard } from "@/components/sections/JournalTeaser";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata = pageMeta({
  title: "Journal — Coffee Education, Market Insights, Brewing Guides & Export Tips",
  description: "Articles from Belmont's team on Kenyan coffee grades, processing methods, Incoterms, importing green coffee, EUDR and brewing.",
  path: "/journal",
  image: "pourOver",
});

export default function JournalPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];
  return (
    <>
      <PageHero eyebrow="Journal" title="Insights from origin" intro="Coffee education, market notes, brewing guides and export know-how from our quality and trade teams." image="pourOver" crumbs={[{ name: "Journal", path: "/journal" }]} />
      <section className="py-20 sm:py-24">
        <Container>
          <p className="text-sm text-muted">Topics: {categories.join(" · ")}</p>
          <div className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <PostCard key={p.slug} post={p} i={i % 3} />
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-line bg-parchment py-20">
        <Container narrow>
          <div className="text-center">
            <h2 className="text-4xl">Get the Belmont Letter</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">New articles, harvest reports and offer lists, once a month. Includes our free Green Coffee Buyer&apos;s Guide.</p>
          </div>
          <div className="mx-auto mt-8 max-w-lg">
            <NewsletterForm dark={false} source="journal" />
          </div>
        </Container>
      </section>
    </>
  );
}

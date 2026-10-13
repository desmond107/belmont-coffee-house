import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost, formatDate } from "@/lib/journal";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { absoluteUrl, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PostCard } from "@/components/sections/JournalTeaser";
import { CtaBand } from "@/components/sections/CtaBand";

export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.description, path: `/journal/${post.slug}`, image: post.image, type: "article" });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: absoluteUrl(images[post.image].src),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/belmont-logo.jpg") } },
    mainEntityOfPage: absoluteUrl(`/journal/${post.slug}`),
  };
  return (
    <>
      <JsonLd data={articleLd} />
      <PageHero
        eyebrow={`${post.category} · ${post.readingMinutes} min read`}
        title={post.title}
        intro={post.description}
        image={post.image}
        crumbs={[{ name: "Journal", path: "/journal" }, { name: post.title, path: `/journal/${post.slug}` }]}
      />
      <article className="py-16 sm:py-24">
        <Container narrow>
          <p className="mb-10 border-b border-line pb-6 text-sm text-muted">
            By <span className="font-semibold text-espresso">{post.author}</span> · <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <div className="prose-belmont overflow-x-auto" dangerouslySetInnerHTML={{ __html: post.html }} />
          <p className="mt-16 border-t border-line pt-6 text-sm">
            <Link href="/journal" className="font-semibold text-gold-deep underline underline-offset-4">← All articles</Link>
          </p>
        </Container>
      </article>
      {more.length > 0 && (
        <section className="border-t border-line bg-parchment py-20">
          <Container>
            <h2 className="text-4xl">Keep reading</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              {more.map((p, i) => (
                <PostCard key={p.slug} post={p} i={i} />
              ))}
            </div>
          </Container>
        </section>
      )}
      <CtaBand />
    </>
  );
}

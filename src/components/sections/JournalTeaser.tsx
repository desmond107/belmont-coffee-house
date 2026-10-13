import Link from "next/link";
import type { Post } from "@/lib/journal";
import { formatDate } from "@/lib/journal";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export function PostCard({ post, i = 0 }: { post: Post; i?: number }) {
  return (
    <Reveal delay={i * 100} as="article" className="group">
      <Link href={`/journal/${post.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden bg-sand">
          <Photo name={post.image} sizes="(min-width:1024px) 33vw, 100vw" className="transition-transform duration-[1.2s] group-hover:scale-105" />
        </div>
        <p className="eyebrow mt-6 text-[0.62rem]!">
          {post.category} · {post.readingMinutes} min read
        </p>
        <h3 className="mt-3 text-2xl leading-snug transition-colors group-hover:text-gold-deep">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{post.description}</p>
        <p className="mt-4 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </Link>
    </Reveal>
  );
}

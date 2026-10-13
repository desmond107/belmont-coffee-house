import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { marked } from "marked";
import type { ImageKey } from "@/content/images";

/**
 * Journal posts live in /content/journal/*.md — one file per article.
 * The filename (without .md) becomes the URL: /journal/<filename>.
 */
const DIR = path.join(process.cwd(), "content", "journal");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: ImageKey;
  readingMinutes: number;
  html: string;
};

/** Splits a Markdown file into its YAML front matter and body. */
function frontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  return { data: (parseYaml(m[1]) as Record<string, unknown>) ?? {}, content: m[2] };
}

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = frontmatter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date),
    author: String(data.author ?? "Belmont Coffee House"),
    category: String(data.category ?? "Journal"),
    image: (data.image ?? "hero") as ImageKey,
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(read)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";

export type Heading = { id: string; text: string };

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  /** Last real change to the text; the publish date until one is set. */
  updated: string;
  description: string;
  draft: boolean;
  tags: string[];
  /** Header image under /public, with the words it stands for. */
  image?: { src: string; alt: string };
  /** A picture for the post's card on the index, not shown on the post. */
  card?: { src: string; alt: string };
  minutes: number;
  /** The post's h2s, for the contents list. */
  headings: Heading[];
};

const POSTS_DIR = path.join(process.cwd(), "content/writing");
const WORDS_PER_MINUTE = 230;

/**
 * Drafts exist only on the dev server. Everything else, Vercel previews
 * included, runs as production, so a draft can't leak from a preview link.
 */
const SHOW_DRAFTS = process.env.NODE_ENV === "development";

/**
 * The words a reader sees, for the reading time: body text with code taken
 * out, plus the text a post part carries in its props (a summary point, a
 * lesson card). Paths and links in props don't count.
 */
function prose(body: string): string {
  const text = body.replace(/```[\s\S]*?```/g, " ");
  const props = [...text.matchAll(/<[A-Z][^>]*>/g)]
    .flatMap(([tag]) => [...tag.matchAll(/"([^"]*)"|`([^`]*)`/g)])
    .map((m) => m[1] ?? m[2])
    .filter((s) => !/^(\/|https?:)/.test(s));
  return [
    text
      .replace(/<[^>]+>/g, " ")
      .replace(/\{[^}]*\}/g, " "),
    ...props,
  ].join(" ");
}

/**
 * The h2s, with the same ids rehype-slug gives them. Both use github-slugger,
 * so a link from the contents list lands on its heading.
 */
function headingsOf(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const outsideCode = body.replace(/```[\s\S]*?```/g, "");
  return [...outsideCode.matchAll(/^## +(.+?)\s*$/gm)].map(([, raw]) => {
    const text = raw.replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    return { id: slugger.slug(text), text };
  });
}

/** A broken post should stop the build, not ship with a blank title. */
function readPost(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const fail = (problem: string) =>
    new Error(`content/writing/${file}: ${problem}`);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    throw fail("file name must be lowercase words joined by hyphens");
  }

  const { data, content } = matter(
    readFileSync(path.join(POSTS_DIR, file), "utf8"),
  );
  const { title, date, updated, description, draft = false, tags = [], image, imageAlt, card, cardAlt } = data;

  if (typeof title !== "string" || !title.trim()) throw fail("needs a title");
  if (typeof description !== "string" || !description.trim()) {
    throw fail("needs a description");
  }
  // YAML turns an unquoted date into a Date; a quoted one stays a string.
  const day = date instanceof Date ? date.toISOString().slice(0, 10) : date;
  if (typeof day !== "string" || Number.isNaN(Date.parse(day))) {
    throw fail("needs a date as YYYY-MM-DD");
  }
  const changed = updated instanceof Date ? updated.toISOString().slice(0, 10) : (updated ?? day);
  if (typeof changed !== "string" || Number.isNaN(Date.parse(changed)) || changed < day) {
    throw fail("updated must be a YYYY-MM-DD on or after the date");
  }
  if (typeof draft !== "boolean") throw fail("draft must be true or false");
  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string")) {
    throw fail("tags must be a list of words");
  }
  if (image !== undefined) {
    if (typeof image !== "string" || !image.startsWith("/")) {
      throw fail("image must be a path under /public, starting with /");
    }
    if (!existsSync(path.join(process.cwd(), "public", image))) {
      throw fail(`image ${image} is not in /public`);
    }
    if (typeof imageAlt !== "string" || !imageAlt.trim()) {
      throw fail("an image needs imageAlt, the words it stands for");
    }
  }

  if (card !== undefined) {
    if (typeof card !== "string" || !card.startsWith("/")) {
      throw fail("card must be a path under /public, starting with /");
    }
    if (!existsSync(path.join(process.cwd(), "public", card))) {
      throw fail(`card ${card} is not in /public`);
    }
    if (typeof cardAlt !== "string" || !cardAlt.trim()) {
      throw fail("a card needs cardAlt, the words it stands for");
    }
  }

  if (!draft && content.includes("<Todo")) {
    throw fail("still has a <Todo>; finish it or keep draft: true");
  }

  const words = prose(content).split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title,
    date: day,
    updated: changed,
    description,
    draft,
    tags,
    image: image ? { src: image, alt: imageAlt } : undefined,
    card: card ? { src: card, alt: cardAlt } : undefined,
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    headings: headingsOf(content),
  };
}

/** Visible posts, newest first. */
export function getPosts(): Post[] {
  return readdirSync(POSTS_DIR)
    // The template shows how a post is written; it is never a post itself.
    .filter((file) => file.endsWith(".mdx") && file !== "draft-placeholder.mdx")
    .map(readPost)
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

/** Up to `count` other posts, the ones sharing the most tags first. */
export function getMorePosts(post: Post, count = 3): Post[] {
  const shared = (other: Post) =>
    other.tags.filter((tag) => post.tags.includes(tag)).length;
  return getPosts()
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => shared(b) - shared(a) || b.date.localeCompare(a.date))
    .slice(0, count);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

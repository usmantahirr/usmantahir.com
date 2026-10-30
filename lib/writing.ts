import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  draft: boolean;
};

const POSTS_DIR = path.join(process.cwd(), "content/writing");

/**
 * Drafts exist only on the dev server. Everything else, Vercel previews
 * included, runs as production, so a draft can't leak from a preview link.
 */
const SHOW_DRAFTS = process.env.NODE_ENV === "development";

/** A broken post should stop the build, not ship with a blank title. */
function readPost(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const fail = (problem: string) =>
    new Error(`content/writing/${file}: ${problem}`);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    throw fail("file name must be lowercase words joined by hyphens");
  }

  const { data } = matter(readFileSync(path.join(POSTS_DIR, file), "utf8"));
  const { title, date, description, draft = false } = data;

  if (typeof title !== "string" || !title.trim()) throw fail("needs a title");
  if (typeof description !== "string" || !description.trim()) {
    throw fail("needs a description");
  }
  // YAML turns an unquoted date into a Date; a quoted one stays a string.
  const day = date instanceof Date ? date.toISOString().slice(0, 10) : date;
  if (typeof day !== "string" || Number.isNaN(Date.parse(day))) {
    throw fail("needs a date as YYYY-MM-DD");
  }
  if (typeof draft !== "boolean") throw fail("draft must be true or false");

  return { slug, title, date: day, description, draft };
}

/** Visible posts, newest first. */
export function getPosts(): Post[] {
  return readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readPost)
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

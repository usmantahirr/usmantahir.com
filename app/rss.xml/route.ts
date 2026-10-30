import { getPosts } from "@/lib/writing";
import { FEED_DESCRIPTION, FEED_PATH, FEED_TITLE, SITE_URL } from "@/lib/site";

// Built once with the site, so the feed never reads the content folder at runtime.
export const dynamic = "force-static";

const escapeXml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const rfc822 = (date: string) => new Date(date).toUTCString();

export function GET() {
  const posts = getPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/writing/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");

  const lastBuildDate = posts[0]
    ? `\n    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>`
    : "";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/writing</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en</language>${lastBuildDate}
    <atom:link href="${SITE_URL}${FEED_PATH}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

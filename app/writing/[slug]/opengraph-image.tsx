import { ImageResponse } from "next/og";
import { formatDate, getPost, getPosts } from "@/lib/writing";

// The card a post shows when it is shared: its title on the site's paper, so
// every post gets its own instead of the home page's card.
export const alt = "A post from Usman Tahir's writing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Blog";
  const fontSize = title.length > 70 ? 58 : title.length > 45 ? 68 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f1e8",
          color: "#22190f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#6f5e47" }}>
          <div style={{ width: 40, height: 4, background: "#9a4a35" }} />
          Blog
        </div>
        <div
          style={{
            display: "flex",
            fontSize,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #d9cdbb",
            paddingTop: 28,
            fontSize: 26,
            color: "#4a3d2e",
          }}
        >
          <span>Usman Tahir · Senior Product Engineer</span>
          <span style={{ color: "#6f5e47" }}>
            {post ? `${formatDate(post.date)} · ${post.minutes} min read` : "usmantahir.com"}
          </span>
        </div>
      </div>
    ),
    size,
  );
}

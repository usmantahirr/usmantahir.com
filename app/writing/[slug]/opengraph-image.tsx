import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { formatDate, getPost, getPosts } from "@/lib/writing";

// The card a post shows when it is shared on LinkedIn, X or in a chat: the
// post's own picture beside its title, in the site's fonts and colours.
export const alt = "A post from Usman Tahir's blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

const font = (file: string) => readFileSync(path.join(process.cwd(), "assets/fonts", file));

/**
 * The post's card picture as a data URI. The image renderer can't read webp,
 * so each card keeps a .jpg twin next to it; without one the card is text only.
 */
function picture(src?: string): string | null {
  if (!src) return null;
  const jpg = path.join(process.cwd(), "public", src.replace(/\.webp$/, ".jpg"));
  if (!existsSync(jpg)) return null;
  return `data:image/jpeg;base64,${readFileSync(jpg).toString("base64")}`;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Blog";
  const pic = picture(post?.card?.src);
  const fontSize = pic
    ? title.length > 60 ? 50 : title.length > 40 ? 58 : 66
    : title.length > 70 ? 60 : title.length > 45 ? 70 : 82;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f7f1e8", color: "#22190f" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 56px 52px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "Hanken",
              fontSize: 24,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7d3a29",
            }}
          >
            <div style={{ width: 36, height: 4, background: "#9a4a35" }} />
            Blog
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Bricolage",
              fontSize,
              lineHeight: 1.06,
              letterSpacing: "-0.015em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              borderTop: "2px solid #22190f",
              paddingTop: 22,
              fontFamily: "Hanken",
              fontSize: 23,
              color: "#4a3d2e",
            }}
          >
            <span>Usman Tahir · Senior Product Engineer</span>
            <span style={{ color: "#6f5e47" }}>
              {post ? `usmantahir.com · ${formatDate(post.date)} · ${post.minutes} min read` : "usmantahir.com"}
            </span>
          </div>
        </div>
        {pic && (
           
          <img src={pic} alt="" width={520} height={630} style={{ width: 520, height: 630, objectFit: "cover" }} />
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: font("bricolage-grotesque-latin-800-normal.woff"), weight: 800, style: "normal" },
        { name: "Hanken", data: font("hanken-grotesk-latin-500-normal.woff"), weight: 500, style: "normal" },
      ],
    },
  );
}

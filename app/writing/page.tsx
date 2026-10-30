import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/writing";
import { FEED_ALTERNATE, FEED_DESCRIPTION, FEED_PATH, OG_IMAGE, SITE_NAME } from "@/lib/site";

const TITLE = "Writing · Usman Tahir";

export const metadata: Metadata = {
  title: TITLE,
  description: FEED_DESCRIPTION,
  alternates: { canonical: "/writing", types: FEED_ALTERNATE },
  openGraph: {
    type: "website",
    url: "/writing",
    title: TITLE,
    description: FEED_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: FEED_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function WritingIndex() {
  const posts = getPosts();

  return (
    <main className="section writing">
      <div className="wrap">
        <h1 className="writetitle disp">Writing</h1>
        <p className="secintro">
          Notes on how I build things and what I learned doing it.
        </p>

        {posts.length > 0 ? (
          <ul className="postlist">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link className="postrow" href={`/writing/${post.slug}`}>
                  <span className="posttitle disp">{post.title}</span>
                  <span className="postdesc">{post.description}</span>
                  <span className="postdate">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.draft && " · Draft"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="postempty">Nothing published yet.</p>
        )}

        <a className="feedlink" href={FEED_PATH}>
          RSS feed
        </a>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getPosts, type Post } from "@/lib/writing";
import {
  FEED_ALTERNATE,
  FEED_DESCRIPTION,
  FEED_PATH,
  LINKEDIN_URL,
  OG_IMAGE,
  PITCH,
  SITE_NAME,
  X_HANDLE,
  X_URL,
} from "@/lib/site";

const TITLE = "Blog · Usman Tahir";

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
    site: X_HANDLE,
    creator: X_HANDLE,
    title: TITLE,
    description: FEED_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

function Meta({ post }: { post: Post }) {
  return (
    <span className="postdate">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {" · "}
      {post.minutes} min read
    </span>
  );
}

export default function WritingIndex() {
  const [latest, ...rest] = getPosts();

  return (
    <main className="section writing">
      <div className="wrap">
        <h1 className="writetitle disp">Blog</h1>
        <p className="secintro">
          How I build products with AI: what I tried, what broke, and the rule
          that came out of it. {PITCH}
        </p>
        <p className="follow">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            Follow on LinkedIn
          </a>
          {X_URL && (
            <a href={X_URL} target="_blank" rel="noopener noreferrer">
              Follow on X
            </a>
          )}
          <a href={FEED_PATH}>RSS feed</a>
          <Link href="/#contact">Work with me</Link>
        </p>

        {latest ? (
          <>
            <Link className={latest.card ? "postlead withcard" : "postlead"} href={`/writing/${latest.slug}`}>
              {latest.card && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="leadcard" src={latest.card.src} alt={latest.card.alt} width={1600} height={905} />
              )}
              <span className="leadtext">
                <span className="leadlabel">Latest</span>
                <span className="leadtitle disp">{latest.title}</span>
                <span className="postdesc">{latest.description}</span>
                {latest.tags.length > 0 && (
                  <span className="tags">
                    {latest.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                )}
                <Meta post={latest} />
              </span>
            </Link>

            {rest.length > 0 && (
              <ul className="postlist">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <Link className={post.card ? "postrow withthumb" : "postrow"} href={`/writing/${post.slug}`}>
                      {post.card && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="rowthumb" src={post.card.src} alt="" width={1600} height={905} loading="lazy" />
                      )}
                      <span className="posttitle disp">{post.title}</span>
                      <span className="postdesc">{post.description}</span>
                      <Meta post={post} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="postempty">Nothing published yet.</p>
        )}
      </div>
    </main>
  );
}

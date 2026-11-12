import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostMotion } from "@/components/PostMotion";
import { ReadingBar } from "@/components/ReadingBar";
import { ShareLinks } from "@/components/ShareLinks";
import { formatDate, getMorePosts, getPost, getPosts } from "@/lib/writing";
import {
  FEED_ALTERNATE,
  FEED_PATH,
  LINKEDIN_URL,
  PERSON,
  PERSON_ID,
  PITCH,
  SITE_NAME,
  SITE_URL,
  X_HANDLE,
  X_URL,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

// The share image comes from opengraph-image.tsx next to this page, so it is
// left out here; X falls back to it too.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/writing/${slug}`;
  const title = `${post.title} · Usman Tahir`;

  return {
    title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url, types: FEED_ALTERNATE },
    openGraph: {
      type: "article",
      url,
      title,
      description: post.description,
      siteName: SITE_NAME,
      locale: "en_US",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [SITE_URL],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
      title,
      description: post.description,
    },
    ...(post.draft && { robots: { index: false, follow: false } }),
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/writing/${slug}.mdx`);
  const url = `${SITE_URL}/writing/${slug}`;
  const more = getMorePosts(post);

  // For search engines: who wrote it and when.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", "@id": PERSON_ID, name: PERSON.name, url: PERSON.url },
    publisher: { "@id": PERSON_ID },
  };

  return (
    <main className="section writing">
      <article className="wrap postpage">
        {!post.draft && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
        )}
        <header className="posthead">
          {post.draft && (
            <p className="draftnote">
              Draft. This page only shows on the dev server.
            </p>
          )}
          <Link className="backlink" href="/writing">
            Blog
          </Link>
          <h1 className="writetitle disp">{post.title}</h1>
          <p className="poststand">{post.description}</p>
          <p className="postdate">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {" · "}
            {post.minutes} min read
            {post.tags.length > 0 && (
              <span className="posttags"> · {post.tags.join(", ")}</span>
            )}
          </p>
        </header>

        {post.image && (
          <figure className="postcover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image.src} alt={post.image.alt} />
          </figure>
        )}

        {post.headings.length >= 3 && (
          <ReadingBar headings={post.headings} />
        )}
        <div className="post">
          <Content />
        </div>
        <PostMotion />

        <footer className="postfoot">
          <ShareLinks url={url} title={post.title} />

          <section className="author" aria-label="About the author">
            <p className="authorname disp">Usman Tahir</p>
            <p>
              Senior product engineer and founder in Amsterdam. I take on hard
              product problems and help teams scale, automate the busywork and
              get more out of their time. {PITCH}
            </p>
            <p className="authorlinks">
              <Link href="/#contact">Work with me</Link>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                Follow on LinkedIn
              </a>
              {X_URL && (
                <a href={X_URL} target="_blank" rel="noopener noreferrer">
                  Follow on X
                </a>
              )}
              <a href={FEED_PATH}>RSS</a>
            </p>
          </section>

          {more.length > 0 && (
            <section className="more" aria-label="More posts">
              <span className="contentslabel">More posts</span>
              <ul className="postlist">
                {more.map((other) => (
                  <li key={other.slug}>
                    <Link className="postrow" href={`/writing/${other.slug}`}>
                      <span className="posttitle disp">{other.title}</span>
                      <span className="postdesc">{other.description}</span>
                      <span className="postdate">
                        <time dateTime={other.date}>{formatDate(other.date)}</time>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </footer>
      </article>
    </main>
  );
}

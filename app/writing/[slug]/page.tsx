import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/lib/writing";
import { FEED_ALTERNATE, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/writing/${slug}`;
  const title = `${post.title} · Usman Tahir`;

  return {
    title,
    description: post.description,
    alternates: { canonical: url, types: FEED_ALTERNATE },
    openGraph: {
      type: "article",
      url,
      title,
      description: post.description,
      siteName: SITE_NAME,
      locale: "en_US",
      publishedTime: post.date,
      authors: [SITE_URL],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [OG_IMAGE.url],
    },
    ...(post.draft && { robots: { index: false, follow: false } }),
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/writing/${slug}.mdx`);

  return (
    <main className="section writing">
      <article className="wrap">
        <header className="posthead">
          {post.draft && (
            <p className="draftnote">
              Draft. This page only shows on the dev server.
            </p>
          )}
          <h1 className="writetitle disp">{post.title}</h1>
          <p className="poststand">{post.description}</p>
          <p className="postdate">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        </header>

        <div className="post">
          <Content />
        </div>

        <footer className="postfoot">
          <p>
            If this was useful, or you think I got it wrong, write to me at{" "}
            <a href="mailto:hello@usmantahir.com">hello@usmantahir.com</a>.
          </p>
          <Link className="feedlink" href="/writing">
            All writing
          </Link>
        </footer>
      </article>
    </main>
  );
}

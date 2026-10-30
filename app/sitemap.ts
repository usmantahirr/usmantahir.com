import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/writing";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/writing`, lastModified: posts[0]?.date },
    ...posts.map((post) => ({
      url: `${SITE_URL}/writing/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}

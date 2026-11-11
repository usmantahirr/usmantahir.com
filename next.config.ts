import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // People type /blog by habit; /writing stays the one real address.
  async redirects() {
    return [
      { source: "/blog", destination: "/writing", permanent: true },
      { source: "/blog/:slug", destination: "/writing/:slug", permanent: true },
    ];
  },
};

// Turbopack can only take plugins by name, so these stay strings.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    // Ids on headings, so the contents list and shared links can point at a section.
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);

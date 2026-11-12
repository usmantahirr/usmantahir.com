export const SITE_URL = "https://usmantahir.com";
export const SITE_NAME = "Usman Tahir";

export const LINKEDIN_URL = "https://www.linkedin.com/in/usmantahirr/";
export const GITHUB_URL = "https://github.com/usmantahirr";
/** His personal X profile. Until it's set, no X follow link shows. */
export const X_URL: string | null = "https://x.com/usman_tahirr";
/** Shown as the author on X link cards. */
export const X_HANDLE = "@usman_tahirr";

/** Every profile that is him, so search engines join them into one person. */
export const SAME_AS = [LINKEDIN_URL, X_URL, GITHUB_URL].filter(
  (url): url is string => Boolean(url),
);

/**
 * One id for him across the site. The home page describes the person once;
 * every post's author points back to it.
 */
export const PERSON_ID = "https://usmantahir.com/#person";
export const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Usman Tahir",
  url: "https://usmantahir.com",
  jobTitle: "Senior Product Engineer",
  description: "Senior product engineer and founder in Amsterdam. Solves hard product problems, usually with AI, and helps teams scale and automate.",
  sameAs: SAME_AS,
};
export const PITCH =
  "Bring me a hard product problem, and I'll solve it, usually with AI.";

export const FEED_PATH = "/rss.xml";
export const FEED_TITLE = "Usman Tahir, Blog";
export const FEED_DESCRIPTION =
  "Usman Tahir, senior product engineer and founder in Amsterdam, on building products with AI: what broke, what fixed it, and the numbers behind it.";

/** `alternates.types` entry; a page that sets `alternates` has to repeat it. */
export const FEED_ALTERNATE = {
  "application/rss+xml": [{ url: FEED_PATH, title: FEED_TITLE }],
};

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Usman Tahir, senior product engineer. I build and own products end-to-end, from the problem to what ships.",
};

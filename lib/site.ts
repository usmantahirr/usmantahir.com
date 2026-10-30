export const SITE_URL = "https://usmantahir.com";
export const SITE_NAME = "Usman Tahir";

export const FEED_PATH = "/rss.xml";
export const FEED_TITLE = "Usman Tahir, Writing";
export const FEED_DESCRIPTION =
  "Notes from Usman Tahir, a senior product engineer in Amsterdam.";

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

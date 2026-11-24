import type { Metadata } from "next";
import { Young_Serif, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { Analytics } from "@vercel/analytics/next";
import { FEED_ALTERNATE, OG_IMAGE, SITE_URL, X_HANDLE } from "@/lib/site";

const display = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const hanken = Source_Sans_3({
  subsets: ["latin"],
  // variable: any weight from 200 to 900, so body text can sit at 450
  weight: "variable",
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-code",
  display: "swap",
});

const DESCRIPTION =
  "Usman Tahir, senior product engineer in Amsterdam. 10+ years building and owning products end-to-end across fintech, insurance, and healthcare.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Usman Tahir · Senior Product Engineer",
  description: DESCRIPTION,
  authors: [{ name: "Usman Tahir", url: SITE_URL }],
  keywords: [
    "Usman Tahir",
    "Senior Product Engineer",
    "Full-stack engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Amsterdam",
    "Fintech",
    "Insurtech",
    "Healthcare",
  ],
  alternates: { canonical: "/", types: FEED_ALTERNATE },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Usman Tahir · Senior Product Engineer",
    description: DESCRIPTION,
    siteName: "Usman Tahir",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    title: "Usman Tahir · Senior Product Engineer",
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('ut-theme');if(t!=='dark'&&t!=='light'){t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';}if(t==='dark'){document.body.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${hanken.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="site" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <ThemeProvider>
          <Nav />
          {children}
        </ThemeProvider>
        {/* Cookieless page views (Vercel Web Analytics); no consent banner needed. */}
        <Analytics />
      </body>
    </html>
  );
}

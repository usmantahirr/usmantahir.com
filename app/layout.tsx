import type { Metadata } from "next";
import { Onest, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-onest",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://usmantahir.com";
const DESCRIPTION =
  "Usman Tahir — senior product engineer, Amsterdam. 10+ years building and owning products end-to-end across fintech, insurance, and healthcare.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Usman Tahir — Senior Product Engineer",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Usman Tahir — Senior Product Engineer",
    description: DESCRIPTION,
    siteName: "Usman Tahir",
    locale: "en_US",
    images: [
      {
        url: "/portrait.png",
        width: 1200,
        height: 1600,
        alt: "Usman Tahir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Tahir — Senior Product Engineer",
    description: DESCRIPTION,
    images: ["/portrait.png"],
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
      className={`${onest.variable} ${hanken.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="site" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <ThemeProvider>
          <div className="grain" />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

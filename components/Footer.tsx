import Link from "next/link";
import { FEED_PATH, GITHUB_URL, LINKEDIN_URL, X_URL } from "@/lib/site";

const SOCIALS = [
  {
    name: "LinkedIn",
    url: LINKEDIN_URL,
    icon: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  {
    name: "X",
    url: X_URL,
    icon: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25H8.1l4.71 6.23 5.43-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z",
  },
  {
    name: "GitHub",
    url: GITHUB_URL,
    icon: "M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .31.21.69.82.57A12 12 0 0 0 12 .3",
  },
];

/** Brand and socials on top, the pages in a row, then the small print. */
export function Footer() {
  return (
    <footer className="foot">
      <div className="footin">
        <div className="foottop">
          <Link className="mark" href="/">
            usman<span className="markdot">·</span>tahir
          </Link>
          <nav className="footlinks" aria-label="Footer">
            <Link href="/#work">Work</Link>
            <Link href="/writing">Blog</Link>
            <Link href="/#skills">Capabilities</Link>
            <Link href="/#contact">Contact</Link>
            <a href={FEED_PATH}>RSS</a>
            <a href="/usman-tahir-cv.pdf" download="Usman-Tahir-CV.pdf">
              CV
            </a>
          </nav>
          <ul className="footsocial" aria-label="Usman Tahir on social media">
            {SOCIALS.filter((s) => s.url).map((s) => (
              <li key={s.name}>
                <a
                  href={s.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Usman Tahir on ${s.name}`}
                  title={s.name}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d={s.icon} fill="currentColor" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <small className="footsmall">
          © 2026 Usman Tahir · Senior product engineer and founder · Amsterdam
        </small>
      </div>
    </footer>
  );
}

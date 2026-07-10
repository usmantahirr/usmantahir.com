"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="navin">
        <div className="mark">
          usman<span className="markdot">·</span>tahir
        </div>
        <div className="navlinks">
          <a className="navlink" href="#work">
            Work
          </a>
          <a className="navlink" href="#about">
            About
          </a>
          <a className="navlink" href="#contact">
            Contact
          </a>
          <a className="navcontact" href="#contact">
            Contact
          </a>
          <a
            className="tbtn navsocial"
            href="https://www.linkedin.com/in/usmantahirr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Usman Tahir on LinkedIn"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

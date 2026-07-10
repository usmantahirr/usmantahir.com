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
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

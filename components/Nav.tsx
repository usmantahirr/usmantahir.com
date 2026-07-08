"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export function Nav() {
  const { theme, toggleTheme } = useTheme();
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
          Usman Tahir<span className="marktag">SPE</span>
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
          <button
            className="tbtn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useTheme } from "@/components/ThemeProvider";

/**
 * Animated theme toggle. A sun (disc + rays) and a crescent moon are stacked;
 * toggling rotates/scales/fades one out and the other in. Both draw in
 * `currentColor`, so they inherit the nav's ink → ember hover treatment and
 * stay on-brand in either theme.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className="tbtn tbtn-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className={`tt${isDark ? " dark" : ""}`} aria-hidden="true">
        <svg className="tt-ico tt-sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <g
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <line x1="19" y1="12" x2="21" y2="12" />
            <line x1="16.95" y1="16.95" x2="18.36" y2="18.36" />
            <line x1="12" y1="19" x2="12" y2="21" />
            <line x1="7.05" y1="16.95" x2="5.64" y2="18.36" />
            <line x1="5" y1="12" x2="3" y2="12" />
            <line x1="7.05" y1="7.05" x2="5.64" y2="5.64" />
            <line x1="12" y1="5" x2="12" y2="3" />
            <line x1="16.95" y1="7.05" x2="18.36" y2="5.64" />
          </g>
        </svg>
        <svg className="tt-ico tt-moon" viewBox="0 0 24 24">
          <path
            d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
}

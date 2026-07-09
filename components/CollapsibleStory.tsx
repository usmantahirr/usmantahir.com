"use client";

import { useState } from "react";

/**
 * Wraps a case study's prose so it collapses by default — the card shows only
 * its skim layer (lead + outcomes) until the reader opts into the full story.
 * Only this nested subtree re-renders on toggle, so the parent <article>'s
 * scroll-reveal `in` class (added imperatively by RevealObserver) is untouched.
 */
export function CollapsibleStory({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={`casestory${expanded ? " open" : ""}`}>
        <div className="casestory-inner prose">{children}</div>
      </div>
      <button
        className="casetoggle"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        {expanded ? "Show less" : "Read the full story"}
        <span className="casetoggle-arrow" aria-hidden="true">
          →
        </span>
      </button>
    </>
  );
}

import type { ReactNode } from "react";

/**
 * An inline SVG in a post. Borrows the specimen strip's drawing classes from
 * globals.css, so lines and fills follow the theme: `ln` ink line, `lt` hairline,
 * `sf` surface fill, `cls clf` the one clay element, `t2` title text, `tc` clay text.
 *
 * Give it two drawings, `<svg className="sw">` for wide screens and
 * `<svg className="sm">` for phones. A wide drawing scaled to phone width
 * leaves the labels too small to read. A simple drawing can pass one SVG
 * with neither class and it just scales.
 */
export function Diagram({
  label,
  caption,
  children,
}: {
  label: string; // what the drawing says, for screen readers
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="strip">
      <div role="img" aria-label={label}>
        {children}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

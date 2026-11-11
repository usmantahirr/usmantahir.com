import type { ReactNode } from "react";

/**
 * Pieces a post can use in its MDX besides plain Markdown. Each one follows the
 * theme through the site's tokens, so it reads in light and dark.
 */

/** The rule a section ends on: a short label and one sentence. */
export function Rule({ label = "Rule", children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="postrule">
      <span className="rulelabel">{label}</span>
      <div className="ruletext">{children}</div>
    </aside>
  );
}

type Step = { name: string; note: string; mark?: string };

/**
 * A process in order, left to right on wide screens and top to bottom on
 * phones. A step with `mark` is drawn in clay with the mark under it. Where
 * the browser supports scroll-driven animation and the reader allows motion,
 * the steps light up one by one as the figure scrolls in (CSS only).
 */
export function Steps({
  label,
  caption,
  steps,
}: {
  label: string; // the whole process in words, for screen readers
  caption?: string;
  steps: Step[];
}) {
  return (
    <figure className="steps">
      <ol aria-label={label} style={{ ["--n" as string]: steps.length }}>
        {steps.map((step, i) => (
          <li
            key={step.name}
            className={step.mark ? "marked" : undefined}
            style={{ ["--i" as string]: i }}
          >
            <b>{step.name}</b>
            <span>{step.note}</span>
            {step.mark && <em>{step.mark}</em>}
          </li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/**
 * An image with a caption. Without `src` it draws a marked empty frame, so a
 * draft can show where a picture goes before the file exists.
 */
export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
  who,
  side,
}: {
  src?: string;
  alt: string;
  caption?: string;
  /** The cast in the picture, named, since the faces alone don't say who's who. */
  who?: string[];
  /** A smaller picture beside the text on wide screens, on this side. */
  side?: "left" | "right";
  width?: number;
  height?: number;
}) {
  return (
    <figure className={side ? `pfig side ${side}` : "pfig"}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      ) : (
        <div className="pfigempty" style={{ aspectRatio: `${width} / ${height}` }}>
          <span>Image to come: {alt}</span>
        </div>
      )}
      {(caption || who) && (
        <figcaption>
          {who && (
            <span className="pfigwho">
              {who.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Words in a draft that still need the author: highlighted, never shipped. */
export function Todo({ children }: { children: ReactNode }) {
  return <mark className="todo">{children}</mark>;
}

/** The post in a few lines, at the top, for readers who stop there. */
export function Summary({ label = "In short", points }: { label?: string; points: ReactNode[] }) {
  return (
    <aside className="summary" aria-label={label}>
      <span className="summarylabel">{label}</span>
      <ol>
        {points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ol>
    </aside>
  );
}

/**
 * A failure and what changed because of it, side by side: the short form of
 * a story paragraph plus its rule.
 */
export function Lesson({
  when,
  broke,
  rule,
  ruleLabel = "The rule now",
}: {
  when?: string;
  broke: ReactNode;
  rule: ReactNode;
  ruleLabel?: string;
}) {
  return (
    <aside className="lesson">
      <div className="lessonbroke">
        <span className="lessonlabel">What broke{when ? ` · ${when}` : ""}</span>
        <p>{broke}</p>
      </div>
      <div className="lessonrule">
        <span className="lessonlabel">{ruleLabel}</span>
        <p>{rule}</p>
      </div>
    </aside>
  );
}

type Member = { name: string; src: string; job?: ReactNode; never?: ReactNode };

/** A cast of characters, one picture and two short lines each. */
export function Cast({ caption, members }: { caption?: string; members: Member[] }) {
  return (
    <figure className="cast">
      <ul>
        {members.map((m) => (
          <li key={m.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.src} alt={`${m.name}, as a knitted character`} width={480} height={600} loading="lazy" />
            <b>{m.name}</b>
            {m.job && <span className="castjob">{m.job}</span>}
            {m.never && <span className="castnever">Never {m.never}</span>}
          </li>
        ))}
      </ul>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

type CycleStep = { name: string; note?: string; mine?: boolean };

/**
 * A process that goes round: the steps sit on a ring, the ring draws itself
 * and the steps light up as it scrolls into view (CSS only). Steps marked
 * `mine` carry the author's mark.
 */
export function Cycle({
  label,
  center,
  caption,
  steps,
}: {
  label: string; // the whole cycle in words, for screen readers
  center?: ReactNode;
  caption?: string;
  steps: CycleStep[];
}) {
  return (
    <figure className="cycle">
      <div className="ring" style={{ ["--n" as string]: steps.length }}>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle className="ringbase" cx="50" cy="50" r="38" pathLength="100" />
          <circle className="ringdraw" cx="50" cy="50" r="38" pathLength="100" />
          {steps.map((_, i) => {
            // a small chevron halfway to the next step, pointing along the ring
            const deg = ((i + 0.5) / steps.length) * 360 - 90;
            const rad = (deg * Math.PI) / 180;
            const x = 50 + 38 * Math.cos(rad);
            const y = 50 + 38 * Math.sin(rad);
            return (
              <path
                key={i}
                className="ringarrow"
                d="M -1.4 -1.6 L 1.2 0 L -1.4 1.6"
                transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(deg + 90).toFixed(1)})`}
              />
            );
          })}
        </svg>
        <ol aria-label={label}>
          {steps.map((step, i) => (
            <li
              key={step.name}
              className={step.mine ? "mine" : undefined}
              style={{ ["--i" as string]: i }}
            >
              <b>{step.name}</b>
              {step.note && <span>{step.note}</span>}
            </li>
          ))}
        </ol>
        {center && <div className="ringcenter">{center}</div>}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Dated moments on one line: the spine of a story. */
export function Dates({
  caption,
  items,
}: {
  caption?: string;
  items: { when: string; what: string; strong?: boolean }[];
}) {
  return (
    <figure className="dates">
      <ol>
        {items.map((item, i) => (
          <li key={item.when + i} className={item.strong ? "strong" : undefined} style={{ ["--i" as string]: i }}>
            <time>{item.when}</time>
            <span>{item.what}</span>
          </li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** One thing becoming many: a single source on the left fanning out to groups. */
export function Split({
  from,
  groups,
  caption,
}: {
  from: string;
  groups: { label: string; items?: string[]; count?: number }[];
  caption?: string;
}) {
  const ys = groups.map((_, k) => ((k + 0.5) / groups.length) * 100);
  return (
    <figure className="split">
      <div className="splitrow">
        <div className="splitfrom">{from}</div>
        <svg className="splitlines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {ys.map((y) => (
            <path key={y} d={`M0 50 C 55 50, 45 ${y}, 100 ${y}`} pathLength="100" />
          ))}
        </svg>
        <div className="splitto">
          {groups.map((group) => (
            <div key={group.label} className="splitgroup">
              {group.items ? (
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <span className="splitdots" aria-hidden="true">
                  {Array.from({ length: group.count ?? 0 }, (_, i) => (
                    <i key={i} style={{ ["--i" as string]: i }} />
                  ))}
                </span>
              )}
              <span className="splitlabel">{group.label}</span>
            </div>
          ))}
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/**
 * A small ring beside a scene: the cycle's steps as dots, with the one where
 * this part of the story broke drawn in clay. It ties each scene back to the
 * cycle the post ends on.
 */
export function RingMark({
  steps,
  at,
  rule,
  label = "Where it broke",
}: {
  steps: string[];
  at: string;
  /** The rule this break left, so a reader skimming headings gets the point. */
  rule?: string;
  label?: string;
}) {
  const n = steps.length;
  const k = steps.indexOf(at);
  const arc = (i: number) => {
    const a0 = ((i - 0.42) / n) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 0.42) / n) * 2 * Math.PI - Math.PI / 2;
    const p = (a: number) => `${(20 + 15 * Math.cos(a)).toFixed(2)} ${(20 + 15 * Math.sin(a)).toFixed(2)}`;
    return `M ${p(a0)} A 15 15 0 0 1 ${p(a1)}`;
  };
  return (
    <p className="ringmark">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        {steps.map((step, i) => (
          <path key={step} d={arc(i)} className={i === k ? "lit" : undefined} pathLength="1" />
        ))}
      </svg>
      {rule ? (
        <span>
          <b>{at}</b> <span className="ringmarkrule">{rule}</span>
        </span>
      ) : (
        <span>
          {label}: <b>{at}</b>
        </span>
      )}
    </p>
  );
}

/**
 * Many lists narrowing into one card: three columns of short bars on the
 * left, lines drawing in to one note on the right.
 */
export function Funnel({
  columns,
  to,
  caption,
}: {
  columns: { label: string; bars: number }[];
  to: string;
  caption?: string;
}) {
  // Each list's middle, as a share of the column's height, so every line
  // leaves from its own list. Label ≈ 22px, bar 7px + 6px gap, 16px between.
  const LABEL = 22, BAR = 13, GAP = 16;
  const heights = columns.map((c) => LABEL + c.bars * BAR);
  const total = heights.reduce((a, b) => a + b, 0) + GAP * (columns.length - 1);
  const ys = heights.map((h, k) => {
    const top = heights.slice(0, k).reduce((a, b) => a + b + GAP, 0);
    return ((top + LABEL + (h - LABEL) / 2) / total) * 100;
  });
  const widths = [100, 74, 88, 62, 94];
  const mine = columns[columns.length - 1];
  return (
    <figure className="funnel">
      <div className="funnelrow">
        <div className="funnelcols">
          {columns.map((col) => (
            <div key={col.label} className="funnelcol">
              <span className="funnellabel">{col.label}</span>
              <span className="funnelbars" aria-hidden="true">
                {Array.from({ length: col.bars }, (_, i) => (
                  <i key={i} style={{ ["--i" as string]: i, ["--w" as string]: `${widths[i % widths.length]}%` }} />
                ))}
              </span>
            </div>
          ))}
        </div>
        <svg className="funnellines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {ys.map((y) => (
            <path key={y} d={`M0 ${y.toFixed(1)} C 55 ${y.toFixed(1)}, 45 50, 100 50`} pathLength="100" />
          ))}
        </svg>
        <div className="funnelto">
          <span>{to}</span>
          <span className="funnelnote" aria-hidden="true">
            {Array.from({ length: mine.bars }, (_, i) => (
              <i key={i} style={{ ["--w" as string]: `${widths[i % widths.length]}%` }} />
            ))}
          </span>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

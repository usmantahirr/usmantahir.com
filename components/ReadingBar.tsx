"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/writing";

/**
 * A slim bar under the nav while the post is being read: which section you're
 * in, how far through you are, and the full contents a tap away. It is the
 * post's only contents list, so the story starts right under the title.
 */
export function ReadingBar({ headings }: { headings: Heading[] }) {
  const [shown, setShown] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const post = document.querySelector<HTMLElement>(".post");
    if (!post) return;
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = document.querySelector<HTMLElement>(".nav");
      const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
      if (barRef.current) barRef.current.style.top = `${navBottom}px`;
      const line = navBottom + 60; // just under the nav and the bar
      const box = post.getBoundingClientRect();
      const visible = box.top < line && box.bottom > line + 40;
      setShown(visible);
      if (!visible) setOpen(false);

      let index = 0;
      targets.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line + 8) index = i;
      });
      setCurrent(index);

      const progress = Math.min(1, Math.max(0, (line - box.top) / (box.height - innerHeight + line)));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    addEventListener("keydown", onKey);
    addEventListener("click", onClick);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("click", onClick);
    };
  }, [open]);

  const n = String(headings.length).padStart(2, "0");
  const at = current >= 0 ? headings[current] : null;

  return (
    <div ref={barRef} className={`readbar${shown ? " shown" : ""}`} aria-hidden={!shown}>
      <div className="readbarin">
        <button
          type="button"
          className="readbarnow"
          aria-expanded={open}
          aria-controls="readbar-list"
          tabIndex={shown ? 0 : -1}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="readbarcount">
            {at ? String(current + 1).padStart(2, "0") : "00"}/{n}
          </span>
          <span className="readbartitle">{at ? at.text : "Contents"}</span>
          <span className="readbarchev" aria-hidden="true" />
        </button>
        {open && (
          <ol id="readbar-list" className="readbarlist">
            {headings.map((h, i) => (
              <li key={h.id} className={i === current ? "now" : undefined}>
                <a href={`#${h.id}`} onClick={() => setOpen(false)}>
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
      <span className="readbarline" aria-hidden="true">
        <span ref={fillRef} />
      </span>
    </div>
  );
}

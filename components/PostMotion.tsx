"use client";

import { useEffect } from "react";

const DIAGRAMS = ".split, .funnel, .cycle, .ringmark, .steps, .dates, .bars, .flow, .seatmap, .paircheck, .evidence";

/**
 * Diagrams draw themselves once, when they come into view, and then stay
 * whole. Without this script, or when the reader asks for less motion, they
 * are simply shown complete: the hidden starting state only applies once
 * `.motion` is on the post.
 */
export function PostMotion() {
  useEffect(() => {
    const post = document.querySelector<HTMLElement>(".post");
    if (!post || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("play");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.35 },
    );

    // Diagrams already on screen when the page opens play straight away.
    post.querySelectorAll<HTMLElement>(DIAGRAMS).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("play");
      else io.observe(el);
    });
    post.classList.add("motion");

    return () => io.disconnect();
  }, []);

  return null;
}

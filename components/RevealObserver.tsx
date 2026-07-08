"use client";

import { useEffect } from "react";

/**
 * Replicates the prototype's global scroll-reveal: any element carrying the
 * `.reveal` class fades/slides in once it enters the viewport. Kept as a single
 * mounted observer (rather than a wrapper component) so the DOM matches the
 * design 1:1 and grid/flex children aren't disturbed by an extra wrapper.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const t = window.setTimeout(() => {
      document
        .querySelectorAll(".reveal:not(.in)")
        .forEach((el) => io.observe(el));
    }, 60);

    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

// The character walks in and waves once on load, then we hand off to the
// final standing frame so he simply stays — no re-looping. The freeze frame
// is stacked underneath the clip (always mounted, so it is downloaded and
// decoded up front) and the clip crossfades away when it ends, so the handoff
// is imperceptible — no element swap, no image to load at the last moment.
// Each theme has its own clip + matching freeze frame (light = cream bg,
// dark = chocolate bg) so the masked edges blend into the current background.
// The light clip is transparent (its background was removed), so it sits on
// whatever the page ground is. Safari only plays alpha as HEVC in a .mov;
// Chrome and Firefox take VP9 alpha in WebM. Listing the .mov as
// video/quicktime keeps Chrome from choosing it (it would play it opaque).
const MEDIA = {
  light: {
    sources: [
      { src: "/hero-walk-light.mov", type: "video/quicktime" },
      { src: "/hero-walk-light.webm", type: "video/webm" },
    ],
    poster: "/hero-poster-light.webp",
    hold: "/hero-hold-light.webp",
  },
  dark: {
    sources: [{ src: "/hero-walk-dark.mp4", type: "video/mp4" }],
    poster: "/hero-poster-dark.jpg",
    hold: "/hero-hold-dark.jpg",
  },
} as const;

export function HeroMedia() {
  const { theme } = useTheme();
  const key = theme === "dark" ? "dark" : "light";
  const videoRef = useRef<HTMLVideoElement>(null);
  // `ended` → the clip finished; reveal the still and fade the clip out.
  // `settled` → the crossfade is done, so we can drop the <video> element.
  const [ended, setEnded] = useState(false);
  const [settled, setSettled] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Reduced-motion users skip the walk-in and get the static portrait.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setEnded(true);
      setSettled(true);
    }
  }, []);

  // Play the entrance once, but only after the page has painted: the still is
  // the LCP image, and the alpha clip (~470 KB, software-decoded) must not race
  // it. preload="none" below keeps the browser from fetching the clip early;
  // we kick it off on window load (or at once if the page is already loaded).
  useEffect(() => {
    const v = videoRef.current;
    if (!v || ended) return;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      v.muted = true;
      v.load();
      v.play().catch(() => {});
    };
    if (document.readyState === "complete") {
      const t = window.setTimeout(start, 120);
      return () => {
        cancelled = true;
        window.clearTimeout(t);
      };
    }
    window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, [key, ended]);

  // Depth on scroll (desktop only): the character moves at half the page's
  // speed, so the copy leaves the hero first. Off for reduced motion.
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced) return;
    const mq = window.matchMedia("(min-width: 901px)");
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (!mq.matches) {
        el.style.transform = "";
        return;
      }
      const hero = el.parentElement;
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      el.style.transform = `translateY(${t * r.height * 0.5}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const { sources, poster, hold } = MEDIA[key];
  // Keep the clip mounted through the crossfade, then drop it.
  const showClip = !reduced && !settled;

  return (
    <div className="hmedia" aria-hidden="true" ref={wrapRef}>
      {/* Freeze frame — always mounted so it's ready before the clip ends. */}
      <img
        className={`hmedia-hold${ended ? " shown" : ""}`}
        src={hold}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
      {showClip && (
        <video
          key={key}
          ref={videoRef}
          className={`hmedia-clip${ended ? " ended" : ""}`}
          poster={poster}
          playsInline
          muted
          preload="none"
          onEnded={() => {
            setEnded(true);
            // Remove the element only once the crossfade has finished.
            window.setTimeout(() => setSettled(true), 700);
          }}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </div>
  );
}

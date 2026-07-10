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
const MEDIA = {
  light: {
    video: "/hero-walk-light.mp4",
    poster: "/hero-poster-light.jpg",
    hold: "/hero-hold-light.jpg",
  },
  dark: {
    video: "/hero-walk-dark.mp4",
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

  // Play the entrance once (muted autoplay); play() is a backstop for browsers
  // that don't honor the autoPlay attribute.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || ended) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [key, ended]);

  const { video, poster, hold } = MEDIA[key];
  // Keep the clip mounted through the crossfade, then drop it.
  const showClip = !reduced && !settled;

  return (
    <div className="hmedia" aria-hidden="true">
      {/* Freeze frame — always mounted so it's ready before the clip ends. */}
      <img
        className={`hmedia-hold${ended ? " shown" : ""}`}
        src={hold}
        alt=""
        decoding="async"
      />
      {showClip && (
        <video
          key={key}
          ref={videoRef}
          className={`hmedia-clip${ended ? " ended" : ""}`}
          src={video}
          poster={poster}
          autoPlay
          playsInline
          muted
          preload="auto"
          onEnded={() => {
            setEnded(true);
            // Remove the element only once the crossfade has finished.
            window.setTimeout(() => setSettled(true), 700);
          }}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

// The character walks in and waves once on load, then we freeze on the final
// standing frame so he simply stays — no re-looping. Each theme has its own
// clip + matching freeze frame (light = cream bg, dark = chocolate bg) so the
// masked edges blend into the current theme background.
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
  const [entered, setEntered] = useState(false);

  // Reduced-motion users skip the walk-in and get the static portrait.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
    }
  }, []);

  // Play the entrance once (muted autoplay); play() is a backstop for browsers
  // that don't honor the autoPlay attribute.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || entered) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [key, entered]);

  const { video, poster, hold } = MEDIA[key];

  return (
    <div className="hmedia" aria-hidden="true">
      {entered ? (
        <img src={hold} alt="" />
      ) : (
        <video
          key={key}
          ref={videoRef}
          src={video}
          poster={poster}
          autoPlay
          playsInline
          muted
          preload="auto"
          onEnded={() => setEntered(true)}
        />
      )}
    </div>
  );
}

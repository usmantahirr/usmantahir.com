"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

export function HeroMedia() {
  const { theme } = useTheme();
  const lightRef = useRef<HTMLVideoElement>(null);
  const darkRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only the active theme's video is fetched and played; the other stays on
    // its poster (preload="none") until the theme is switched to it.
    const active = theme === "dark" ? darkRef.current : lightRef.current;
    const inactive = theme === "dark" ? lightRef.current : darkRef.current;
    if (active) {
      active.muted = true;
      active.play().catch(() => {});
    }
    if (inactive) inactive.pause();
  }, [theme]);

  return (
    <div className="hmedia" aria-hidden="true">
      <video
        ref={lightRef}
        className="mvid-light"
        src="/character-light-loop.mp4"
        poster="/character-light.jpg"
        loop
        playsInline
        muted
        preload="none"
      />
      <video
        ref={darkRef}
        className="mvid-dark"
        src="/character-dark-loop.mp4"
        poster="/character-dark.jpg"
        loop
        playsInline
        muted
        preload="none"
      />
    </div>
  );
}

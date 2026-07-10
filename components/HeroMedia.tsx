"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

export function HeroMedia() {
  const { theme } = useTheme();
  const lightRef = useRef<HTMLVideoElement>(null);
  const darkRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const dark = theme === "dark";
    const light = lightRef.current;
    const darkv = darkRef.current;
    [light, darkv].forEach((v) => {
      if (v) v.muted = true;
    });
    if (light) {
      if (dark) light.pause();
      else light.play().catch(() => {});
    }
    if (darkv) {
      if (dark) darkv.play().catch(() => {});
      else darkv.pause();
    }
  }, [theme]);

  return (
    <div className="hmedia" aria-hidden="true">
      <video
        ref={lightRef}
        className="mvid-light"
        src="/character-light-loop.mp4"
        poster="/character-light.jpg"
        autoPlay
        loop
        playsInline
        muted
        preload="metadata"
      />
      <video
        ref={darkRef}
        className="mvid-dark"
        src="/character-dark-loop.mp4"
        poster="/character-dark.jpg"
        autoPlay
        loop
        playsInline
        muted
        preload="metadata"
      />
    </div>
  );
}

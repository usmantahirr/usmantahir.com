"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A short looping clip in place of a GIF: a muted video, about a tenth of the
 * size. It plays only while on screen, never on its own when the reader asks
 * for reduced motion, and always has a pause button.
 */
export function Clip({
  src,
  webm,
  poster,
  label,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string; // H.264 MP4, plays everywhere
  webm?: string; // smaller WebM/AV1, tried first
  poster: string;
  label: string; // what the clip shows, for screen readers
  caption?: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const held = useRef(false); // the reader paused it, or asked for less motion

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      held.current = true;
      return;
    }
    const seen = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !held.current) video.play().catch(() => {});
      else video.pause();
    });
    seen.observe(video);
    return () => seen.disconnect();
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      held.current = false;
      video.play().catch(() => {});
    } else {
      held.current = true;
      video.pause();
    }
  }

  return (
    <figure className="clip">
      <div className="clipframe">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          width={width}
          height={height}
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
        <button type="button" className="clipbtn" onClick={toggle}>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

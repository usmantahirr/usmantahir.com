"use client";

import { useState } from "react";

/** Share on LinkedIn or X, or copy the link. No scripts from either site. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const x = `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  // The clipboard API is refused in some in-app browsers (LinkedIn's, X's),
  // so fall back to copying from a hidden field, and never to a dialog.
  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      field.remove();
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="share">
      <span className="sharelabel">Share</span>
      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href={x} target="_blank" rel="noopener noreferrer">
        X
      </a>
      <button type="button" onClick={copy} aria-live="polite">
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}

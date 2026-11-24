"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One row of "Problems I've solved": where, the problem, and what changed.
 * "Read the full story" opens the original case study, word for word, in a
 * sheet that rises from the bottom: a centred panel on laptops and tablets,
 * an app-style sheet on phones that can be dragged down to close. A native
 * <dialog> gives Escape, focus trapping and the backdrop.
 */
/** Slide the sheet down, then close it (at once if motion is reduced). */
function slideClosed(d: HTMLDialogElement | null) {
  if (!d || d.classList.contains("closing")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    d.close();
    return;
  }
  d.style.transform = "";
  d.classList.add("closing");
  window.setTimeout(() => d.close(), 260);
}

export function CaseRow({
  name,
  next,
  where,
  problem,
  result,
  outs,
  figure,
  children,
}: {
  name: string;
  next: string; // the case the footer links to
  where: string;
  problem: string;
  result: string;
  outs: React.ReactNode; // the outcome bullets
  figure: React.ReactNode; // the diagram
  children: React.ReactNode; // the lead and the story itself
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const drag = useRef<{ y: number; dy: number } | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      setOpen(false);
      d.classList.remove("closing");
      d.style.transform = "";
      document.documentElement.classList.remove("storyopen");
    };
    // Escape: slide down first, then close
    const onCancel = (e: Event) => {
      e.preventDefault();
      slideClosed(d);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("cancel", onCancel);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("cancel", onCancel);
    };
  }, []);

  const show = () => {
    ref.current?.showModal();
    document.documentElement.classList.add("storyopen");
    setOpen(true);
  };

  const dismiss = () => slideClosed(ref.current);

  const openNext = () => {
    ref.current?.close();
    const btn = document.querySelector<HTMLButtonElement>(
      `[data-case="${next}"] .casetoggle`
    );
    btn?.click();
  };

  // Phone: drag the sheet down by its header to close it.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch" || !ref.current) return;
    if ((e.target as HTMLElement).closest("button")) return;
    drag.current = { y: e.clientY, dy: 0 };
    ref.current.style.transition = "none";
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = ref.current;
    if (!drag.current || !d) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.y);
    d.style.transform = `translateY(${drag.current.dy}px)`;
  };
  const onPointerUp = () => {
    const d = ref.current;
    if (!drag.current || !d) return;
    const far = drag.current.dy > 110;
    drag.current = null;
    d.style.transition = "";
    if (far) dismiss();
    else d.style.transform = "";
  };

  return (
    <article className="prow" data-case={name}>
      <header className="pwho">
        <h3 className="disp">{name}</h3>
        <p>{where}</p>
      </header>
      <div className="pprob">
        <p>{problem}</p>
        <button className="casetoggle" onClick={show} aria-haspopup="dialog">
          Read the full story
        </button>
      </div>
      <p className="pgot disp">{result}</p>

      <dialog
        ref={ref}
        className="story"
        aria-label={`${name}: the full story`}
        onClick={(e) => {
          // a click on the backdrop (the dialog box itself, not its content) closes it
          if (e.target === e.currentTarget) dismiss();
        }}
      >
        <div className={`storyin case${open ? " in" : ""}`}>
          <header
            className="storyhead"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <span className="storygrab" aria-hidden="true" />
            <div>
              <p className="storywhere">{where}</p>
              <h2 className="disp">{name}</h2>
            </div>
            <button className="storyclose" onClick={dismiss} aria-label="Close">
              ×
            </button>
          </header>
          {/* wide sheets: the diagram across the top, then the story in a
              reading column beside a pinned column of facts and outcomes */}
          <div className="storyfig">{figure}</div>
          <aside className="storyaside">
            <div className="storyfacts">
              <div>
                <p className="storylab">The problem</p>
                <p>{problem}</p>
              </div>
              <div>
                <p className="storylab">What changed</p>
                <p className="disp storygot">{result}</p>
              </div>
            </div>
            <div className="storyouts">
              <p className="storylab">What I did</p>
              {outs}
            </div>
          </aside>
          <div className="storybody">
            <p className="storylab">The story</p>
            {children}
          </div>
          <footer className="storyfoot">
            <button className="storynext" onClick={openNext}>
              <span className="storylab">Next</span>
              <span className="disp">{next} &rarr;</span>
            </button>
            <button className="storydone" onClick={dismiss}>
              Close
            </button>
          </footer>
        </div>
      </dialog>
    </article>
  );
}

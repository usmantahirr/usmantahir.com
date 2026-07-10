"use client";

import { useEffect, useRef, useState } from "react";

const ROWS = [
  {
    company: "Nationale Nederlanden",
    role: "Senior Full-Stack Engineer",
    year: "2022–2023",
    detail:
      "Built the frontend for a greenfield mortgage-intake platform inside a regulated bank, integrating legacy and government systems.",
  },
  {
    company: "MobileLive",
    role: "Software Engineer III",
    year: "2017–2019",
    detail:
      "Led the Freedom Mobile → Rogers post-acquisition integration for two of Canada's largest telecoms.",
  },
  {
    company: "BlueEast (Orient Group)",
    role: "Software Engineer",
    year: "2016–2017",
    detail:
      "Built an IoT home-automation platform with MQTT device-to-cloud messaging; shipped the first market release.",
  },
  {
    company: "Ebryx / FireEye",
    role: "Software Engineer",
    year: "2015–2016",
    detail:
      "Built the UI for a security-analytics platform visualizing real-time threat data alongside FireEye appliances.",
  },
];

export function Timeline() {
  const [showDetail, setShowDetail] = useState(false);
  // React owns the scroll-reveal `in` state for this element. The global
  // RevealObserver mutates className imperatively, which React would clobber
  // on every showDetail re-render (hiding the whole timeline). Managing it in
  // state keeps `in` across re-renders.
  const [revealed, setRevealed] = useState(false);
  const tlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tlRef.current;
    if (!el) return;
    if (el.classList.contains("in")) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="career">
      <div className="wrap">
        <div className="sechead reveal">
          <h2 className="sectitle disp">Earlier career</h2>
        </div>
        <p className="secintro reveal">
          A decade of shipping before the case studies above — regulated
          banking, telecom integration, IoT, and security tooling.
        </p>
        <div
          ref={tlRef}
          className={`tl reveal${revealed ? " in" : ""}${
            showDetail ? " open" : ""
          }`}
        >
          {ROWS.map((r) => (
            <div className="tlrow" key={r.company}>
              <div className="tlmain">
                <span className="tlco">{r.company}</span>
                <span className="tlrole">{r.role}</span>
              </div>
              <span className="tlyear">{r.year}</span>
              <div className="tldetail">
                <span>{r.detail}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="tltogglewrap">
          <button
            className="tltoggle"
            onClick={() => setShowDetail((s) => !s)}
            aria-expanded={showDetail}
          >
            <span className="pm">+</span>
            {showDetail ? "Hide detail" : "Show what I did"}
          </button>
        </div>
      </div>
    </section>
  );
}

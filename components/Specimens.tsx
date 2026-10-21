/**
 * Specimen strips: one line drawing per case study, placed after the outcomes.
 *
 * Every strip is built from the same small drawing system so the four read as
 * one hand: Node (a rounded box with a title, optional icon and a muted label
 * under it), Edge (an S-curve between two box edges), Person and a few glyphs.
 * Widths come from the text, so labels never overrun their boxes.
 *
 * Desktop drawing `.sw` is 1100 x 180 (Mustaa 1100 x 200); the phone drawing
 * `.sm` is a separate 360 x 120 ribbon with three beats. CSS shows one or the
 * other.
 *
 * Choreography lives in globals.css and keys off `.case.in` (added by
 * RevealObserver): `.d1` frames draw, `.d2` flow lines draw, `.p1` to `.p5`
 * pieces land, then the `.dot` travels the flow path. Ink lines everywhere;
 * one clay element per strip marks the result.
 */

import type { ReactNode } from "react";

/* JetBrains Mono advances 0.6em per glyph; the two text sizes used in strips. */
const T2 = 11.5 * 0.64; // title size, 0.6em glyph + 0.04em tracking
const LB = 10.5 * 0.64; // label size
const tw = (s: string, size = T2) => Math.round(s.length * size);

/** Box width for a title, with padding and room for an optional icon. */
export const nodeW = (title: string, icon = false, min = 96) =>
  Math.max(min, tw(title) + 28 + (icon ? 26 : 0));

type NodeProps = {
  x: number; // centre
  y: number; // centre
  title: string;
  line2?: string; // second line inside the box, label size
  sub?: string; // label under the box
  subAbove?: boolean;
  w?: number;
  h?: number;
  clay?: boolean;
  light?: boolean; // hairline box for context objects
  cls?: string; // animation class
  icon?: ReactNode; // drawn at the box's left, 18 x 18
};

function Node({ x, y, title, line2, sub, subAbove, w, h, clay, light, cls = "", icon }: NodeProps) {
  const width = w ?? Math.max(nodeW(title, !!icon), line2 ? tw(line2, LB) + 28 + (icon ? 26 : 0) : 0);
  const height = h ?? (line2 ? 58 : 44);
  const left = x - width / 2;
  const top = y - height / 2;
  const rectCls = clay ? "cls clf" : light ? "lt sf" : "ln sf";
  const tx = icon ? left + 40 : x;
  const anchor = icon ? "start" : "middle";
  const ty = line2 ? y - 4 : y + 4;
  return (
    <g className={cls}>
      <rect className={rectCls} x={left} y={top} width={width} height={height} rx={7} />
      {icon && <g className="ic" transform={`translate(${left + 14} ${y - 9})`}>{icon}</g>}
      <text className={clay ? "t2 tc" : "t2"} x={tx} y={ty} textAnchor={anchor}>{title}</text>
      {line2 && <text className={clay ? "tc" : ""} x={tx} y={ty + 16} textAnchor={anchor}>{line2}</text>}
      {sub && (
        <text x={x} y={subAbove ? top - 10 : top + height + 17} textAnchor="middle">{sub}</text>
      )}
    </g>
  );
}

/** S-curve from one point to another, horizontal tangents at both ends. */
/* The S-curve every edge uses; also reused for invisible dot tracks. */
const curve = (from: [number, number], to: [number, number], move = true) => {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = Math.max(24, (x2 - x1) * 0.5);
  return `${move ? `M${x1} ${y1} ` : ""}C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};
function Edge({ from, to, cls = "ln d2", id }: { from: [number, number]; to: [number, number]; cls?: string; id?: string }) {
  return <path id={id} className={cls} d={curve(from, to)} />;
}

function Person({ x, y, clay }: { x: number; y: number; clay?: boolean }) {
  return (
    <g className={clay ? "person clay" : "person"}>
      <circle cx={x} cy={y - 6} r={3.6} />
      <path d={`M${x - 7} ${y + 7} a7 7 0 0 1 14 0`} />
    </g>
  );
}

/* Three stacked storefront cards. */
function Storefronts({ x, y, s = 1, cls = "d1" }: { x: number; y: number; s?: number; cls?: string }) {
  return (
    <g className={cls} transform={`translate(${x} ${y}) scale(${s})`}>
      <rect className="lt sf" x="-36" y="-40" width="92" height="56" rx="6" />
      <rect className="lt sf" x="-44" y="-32" width="92" height="56" rx="6" />
      <rect className="ln sf" x="-52" y="-24" width="92" height="56" rx="6" />
      <line className="lt" x1="-40" y1="-10" x2="28" y2="-10" />
      <rect className="lt" x="-40" y="-2" width="24" height="24" rx="3" />
      <line className="lt" x1="-8" y1="4" x2="26" y2="4" />
      <line className="lt" x1="-8" y1="14" x2="16" y2="14" />
    </g>
  );
}

/* A document card. */
function Document({ x, y, cls = "d3" }: { x: number; y: number; cls?: string }) {
  return (
    <g className={cls}>
      <rect className="ln sf" x={x - 44} y={y - 32} width="88" height="64" rx="7" />
      <line className="lt" x1={x - 28} y1={y - 12} x2={x + 28} y2={y - 12} />
      <line className="lt" x1={x - 28} y1={y} x2={x + 16} y2={y} />
      <line className="lt" x1={x - 28} y1={y + 12} x2={x + 24} y2={y + 12} />
    </g>
  );
}

const HospitalIcon = (
  <g className="ln">
    <path d="M2 18 V 3 h14 v15" />
    <path d="M9 6 v6 M6 9 h6" />
    <path d="M7 18 v-5 h4 v5" />
  </g>
);
const ServerIcon = (
  <g className="ln">
    <rect x="1" y="2" width="16" height="6" rx="1.5" />
    <rect x="1" y="11" width="16" height="6" rx="1.5" />
    <path d="M4 5 h.01 M4 14 h.01" />
  </g>
);
const SignalIcon = (
  <g className="ln">
    <path d="M2 17 v-5 M7 17 v-9 M12 17 v-13" />
    <path className="lt" d="M17 17 v-16" />
  </g>
);
const IdIcon = (
  <g className="ln">
    <rect x="1" y="3" width="16" height="12" rx="2" />
    <circle cx="6" cy="9" r="2" />
    <path d="M10 7 h4 M10 11 h4" />
  </g>
);
const GateIcon = (
  <g className="ln">
    <path d="M3 17 V 3 h12 v14" />
    <path className="lt" d="M1 10 h16" />
  </g>
);

function Strip({ cap, children }: { cap: string; children: ReactNode }) {
  return (
    <div className="strip" aria-hidden="true">
      {children}
      <p className="cap">{cap}</p>
    </div>
  );
}

function Dot({ path, dur, r = 3.5, phase }: { path: string; dur: string; r?: number; phase?: "first" | "second" }) {
  const motion = phase === "first" ? { keyPoints: "0;1;1", keyTimes: "0;0.5;1" } : phase === "second" ? { keyPoints: "0;0;1", keyTimes: "0;0.5;1" } : {};
  const radius = phase === "first" ? `${r};${r};0;0` : `0;0;${r};${r}`;
  return (
    <circle className="dot" r={r}>
      <animateMotion dur={dur} repeatCount="indefinite" begin="2.4s" calcMode={phase ? "linear" : undefined} {...motion}>
        <mpath href={`#${path}`} />
      </animateMotion>
      {phase && <animate attributeName="r" dur={dur} repeatCount="indefinite" begin="2.4s" calcMode="discrete" values={radius} keyTimes="0;0.5;0.5;1" />}
    </circle>
  );
}

/* An open e-gate with a traveller walking through: the clay result for Abu Dhabi. */
function Gate({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="lt" d="M-36 22 H 36" />
      <rect className="cls clf" x="-30" y="-20" width="9" height="40" rx="2" />
      <rect className="cls clf" x="21" y="-20" width="9" height="40" rx="2" />
      <path className="cls" d="M-21 4 L -10 -8 M21 4 L 10 -8" />
      <g className="cls">
        <circle cx="0" cy="-12" r="4" />
        <path d="M0 -8 V 4 M0 -4 L -6 1 M0 -4 L 6 -1 M0 4 L -5 14 M0 4 L 5 14" />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ Fidamy */

export function FidamySpecimen() {
  const chk = { x: 300, y: 90, w: 222, h: 84 };
  const top = 52, bot = 128;
  const peakW = nodeW("Peak3 pricing", false, 140);
  const cacheW = nodeW("price cache + bulk endpoint");
  const twW = nodeW("Twikey", false, 120);
  const nnW = nodeW("NN and the regulator");
  const c1 = 560, c2 = 810, pol = 1010;
  return (
    <Strip cap="Three retail partners, one checkout, and the vendors behind it">
      <svg className="sw" viewBox="0 0 1100 180">
        <Storefronts x={92} y={88} />
        <text x="92" y="146" textAnchor="middle">retail partners</text>
        <text x="92" y="162" textAnchor="middle">a growing set</text>

        {/* one checkout, with the four steps the dot walks */}
        <g className="d1">
          <rect className="ln sf" x={chk.x - chk.w / 2} y={chk.y - chk.h / 2} width={chk.w} height={chk.h} rx={8} />
          <line className="lt" x1="236" y1="96" x2="364" y2="96" />
          <circle className="ln sf" cx="236" cy="96" r="5" />
          <circle className="ln sf" cx="279" cy="96" r="5" />
          <circle className="ln sf" cx="321" cy="96" r="5" />
          <circle className="ln sf" cx="364" cy="96" r="5" />
        </g>
        <text className="t2" x="300" y="74" textAnchor="middle">one checkout</text>
        <text x="300" y="120" textAnchor="middle">four steps, each its own URL</text>

        {/* flow */}
        <path id="flowF" className="ln d2" d={`M132 88 C 165 88, 176 96, 236 96 H 364 C 390 96, 396 90, 411 90 C 460 90, 460 ${top}, ${c1 - peakW / 2} ${top} M${c1 + peakW / 2} ${top} H ${c2 - twW / 2} M${c2 + twW / 2} ${top} C ${c2 + twW / 2 + 60} ${top}, ${pol - 44 - 50} 90, ${pol - 44} 90`} />
        <Edge from={[411, 90]} to={[c1 - cacheW / 2, bot]} />
        <path className="ln d2" d={`M${c1 + cacheW / 2} ${bot} H ${c2 - nnW / 2}`} />
        <Edge from={[c2 + nnW / 2, bot]} to={[pol - 44, 90]} />

        {/* vendors: pricing above, payment and approval below; the cache is the result */}
        <Node cls="p1" x={c1} y={top} title="Peak3 pricing" sub="metered, no bulk endpoint" w={peakW} />
        <Node cls="p2" x={c1} y={bot} title="price cache + bulk endpoint" sub="quotes in under 100 ms" w={cacheW} clay />
        <Node cls="p3" x={c2} y={top} title="Twikey" sub="iDEAL and SEPA mandates" w={twW} />
        <Node cls="p4" x={c2} y={bot} title="NN and the regulator" sub="every version cleared" w={nnW} />

        <Document x={pol} y={90} />
        <text className="p5" x={pol} y="146" textAnchor="middle">policy issued</text>
        <Dot path="flowF" dur="10s" />
      </svg>

      <svg className="sm" viewBox="0 0 360 120">
        <Storefronts x={52} y={56} s={0.62} />
        <path id="flowFm" className="ln d2" d="M80 56 H 118 M222 56 H 238" />
        <g className="d1">
          <rect className="ln sf" x="118" y="30" width="104" height="52" rx="6" />
          <line className="lt" x1="136" y1="64" x2="204" y2="64" />
          <circle className="ln sf" cx="136" cy="64" r="4" />
          <circle className="ln sf" cx="159" cy="64" r="4" />
          <circle className="ln sf" cx="181" cy="64" r="4" />
          <circle className="ln sf" cx="204" cy="64" r="4" />
        </g>
        <text className="t2" x="170" y="48" textAnchor="middle">one checkout</text>
        <Node cls="p2" x={296} y={56} title="under 100 ms" h={40} clay />
        <text x="52" y="108" textAnchor="middle">3 partners</text>
        <text x="170" y="108" textAnchor="middle">four steps</text>
        <text x="296" y="108" textAnchor="middle">quotes</text>
        <Dot path="flowFm" dur="6s" r={3} />
      </svg>
    </Strip>
  );
}

/* ------------------------------------------------------------------ Droobi */

export function DroobiSpecimen() {
  const rows = [
    { y: 34, label: "backend", n: 3 },
    { y: 70, label: "Android", n: 2 },
    { y: 106, label: "iOS", n: 2 },
    { y: 142, label: "web", n: 3, me: true },
  ];
  const bus = 262;
  const lead = { x: 470, y: 90, w: 230, h: 64 };
  const hospW = nodeW("Hamad Medical Corporation", true);
  const hx = 790;
  const pat = { x: 1000, w: 150, h: 48 };
  const leadR = lead.x + lead.w / 2;
  const fork = leadR + 44;
  return (
    <Strip cap="Ten engineers in four disciplines, one lead on site, two hospitals">
      <svg className="sw" viewBox="0 0 1100 180">
        {rows.map((r) => (
          <g key={r.label} className="d1">
            <text className="t2" x="40" y={r.y + 4}>{r.label}</text>
            {Array.from({ length: r.n }).map((_, i) => (
              <Person key={i} x={126 + i * 22} y={r.y} clay={r.me && i === r.n - 1} />
            ))}
          </g>
        ))}
        <text className="tc" x="152" y="166">me, hands-on</text>
        <path className="ln d2" d={`M196 34 H ${bus} M196 70 H ${bus} M196 106 H ${bus} M196 142 H ${bus} M${bus} 34 V 142 M${bus} 90 H ${lead.x - lead.w / 2}`} />
        {rows.map((r, i) => (
          <path key={r.label} id={`trackD${i}`} className="track" d={`M196 ${r.y} H ${bus} V 90 H ${lead.x - lead.w / 2}`} />
        ))}
        {/* out of the lead as one, then splitting to both hospitals */}
        <path className="ln d2" d={`M${leadR} 90 H ${fork}`} />
        <Edge from={[fork, 90]} to={[hx - hospW / 2, 56]} />
        <Edge from={[fork, 90]} to={[hx - hospW / 2, 124]} />
        <Edge from={[hx + hospW / 2, 56]} to={[pat.x - pat.w / 2, 90]} />
        <Edge from={[hx + hospW / 2, 124]} to={[pat.x - pat.w / 2, 90]} />
        <path id="trackDa" className="track" d={`M${leadR} 90 H ${fork} ${curve([fork, 90], [hx - hospW / 2, 56], false)} ${curve([hx + hospW / 2, 56], [pat.x - pat.w / 2, 90])}`} />
        <path id="trackDb" className="track" d={`M${leadR} 90 H ${fork} ${curve([fork, 90], [hx - hospW / 2, 124], false)} ${curve([hx + hospW / 2, 124], [pat.x - pat.w / 2, 90])}`} />

        <Node cls="d1" x={lead.x} y={lead.y} title="technical lead" line2="the only engineer on site" w={lead.w} h={lead.h} sub="standards · cadence · vendor budget · hiring" />
        <Node cls="p1" x={hx} y={56} title="Hamad Medical Corporation" w={hospW} icon={HospitalIcon} />
        <Node cls="p2" x={hx} y={124} title="Al Ahli Hospital" w={hospW} icon={HospitalIcon} />
        <Node cls="p3" x={pat.x} y={90} title="diabetes patients" w={pat.w} h={pat.h} light />
        {rows.map((_, i) => <Dot key={i} path={`trackD${i}`} dur="8s" phase="first" />)}
        <Dot path="trackDa" dur="8s" phase="second" />
        <Dot path="trackDb" dur="8s" phase="second" />
      </svg>

      <svg className="sm" viewBox="0 0 360 120">
        <g className="d1">
          {Array.from({ length: 5 }).map((_, i) => <Person key={"a" + i} x={22 + i * 20} y={42} />)}
          {Array.from({ length: 5 }).map((_, i) => <Person key={"b" + i} x={22 + i * 20} y={72} clay={i === 4} />)}
        </g>
        <path className="ln d2" d="M116 57 H 142 M238 57 H 264" />
        <path id="trackDm0" className="track" d="M116 42 H 128 V 57 H 142 M238 57 H 264" />
        <path id="trackDm1" className="track" d="M116 72 H 128 V 57 H 142 M238 57 H 264" />
        <Node cls="d1" x={190} y={57} title="me, lead" h={40} />
        <Node cls="p1" x={306} y={40} title="Hamad" w={84} h={28} />
        <Node cls="p2" x={306} y={74} title="Al Ahli" w={84} h={28} />
        <text x="62" y="108" textAnchor="middle">10 engineers</text>
        <text x="190" y="108" textAnchor="middle">on site</text>
        <text x="306" y="108" textAnchor="middle">2 hospitals</text>
        <Dot path="trackDm0" dur="6s" r={3} />
        <Dot path="trackDm1" dur="6s" r={3} />
      </svg>
    </Strip>
  );
}

/* ------------------------------------------------------------------ Mustaa */

/* A yacht seen from the side, the hull split into four shares; one is owned. */
function Hull({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="inkf" d="M-44 0 L -34 14 H -22 V 0 Z" opacity="0.9" />
      <path className="ln" d="M-44 0 L -34 14 H 30 L 46 0 Z" />
      <path className="lt" d="M-22 0 V 14 M0 0 V 14 M22 0 V 14" />
      <path className="ln" d="M-14 0 V -8 H 12 L 18 0" />
      <path className="lt" d="M-52 20 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" />
    </g>
  );
}
/* A calendar leaf with one day marked. */
function Calendar({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className="ln sf" x="-15" y="-13" width="30" height="27" rx="3" />
      <path className="lt" d="M-15 -5 H 15 M-9 -17 V -10 M9 -17 V -10" />
      <rect className="inkf" x="2" y="0" width="7" height="7" rx="1.5" />
    </g>
  );
}
/* A small sailboat on water, the clay result. */
function Sailboat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className="cl" d="M-2 -22 L 14 2 H -2 Z" />
      <path className="cls" d="M-4 -22 L -16 2 H -4 Z" />
      <path className="cls" d="M-22 8 H 22 L 16 16 H -16 Z" />
      <path className="lt" d="M-30 22 q6 -4 12 0 t12 0 t12 0 t12 0 t12 0" />
    </g>
  );
}

export function MustaaSpecimen() {
  const y = 78;
  const shareW = nodeW("buys a share of a boat", false, 0);
  const daysW = nodeW("gets days to use", false, 0);
  const bookW = nodeW("books a real date", false, 0);
  const b1 = 250, b2 = 475, b3 = 700, sail = 940;
  const bandY = 168;
  return (
    <Strip cap="A member's path through the product, and where each promise is kept">
      <svg className="sw" viewBox="0 0 1100 200">
        {/* the member */}
        <g className="d1 people">
          <Person x={74} y={y} />
        </g>
        <text x="74" y={y + 30} textAnchor="middle">a member</text>

        {/* beats */}
        <Node cls="d1" x={b1} y={y - 14} title="buys a share of a boat" w={shareW} h={40} />
        <g className="p1"><Hull x={b1} y={y + 22} s={0.8} /></g>
        <text className="p1" x={b1} y={y + 68} textAnchor="middle">one of four per boat</text>

        <Node cls="d1" x={b2} y={y - 14} title="gets days to use" w={daysW} h={40} />
        <g className="p2">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} className={i < 2 ? "ln inkf" : "ln sf"} x={b2 - 52 + i * 15} y={y + 24} width="11" height="11" rx="2" />
          ))}
        </g>
        <text className="p2" x={b2} y={y + 68} textAnchor="middle">one token per day, tradable</text>

        <Node cls="d1" x={b3} y={y - 14} title="books a real date" w={bookW} h={40} />
        <g className="p3"><Calendar x={b3} y={y + 34} /></g>
        <text className="p3" x={b3} y={y + 68} textAnchor="middle">a second booking is refused</text>

        {/* flow between the beats, stopping at each box edge */}
        <path id="flowM" className="ln d2" d={`M86 ${y - 14} H ${b1 - shareW / 2} M${b1 + shareW / 2} ${y - 14} H ${b2 - daysW / 2} M${b2 + daysW / 2} ${y - 14} H ${b3 - bookW / 2} M${b3 + bookW / 2} ${y - 14} C ${b3 + bookW / 2 + 60} ${y - 14}, ${sail - 90} ${y - 6}, ${sail - 34} ${y - 6}`} />

        {/* the result */}
        <g className="p5"><Sailboat x={sail} y={y - 6} /></g>
        <text className="p5 t2 tc" x={sail} y={y + 48} textAnchor="middle">goes sailing</text>
        <text className="p5" x={sail} y={y + 66} textAnchor="middle">trips and events, the first revenue</text>

        {/* where each part lives: two brackets under the journey */}
        <g className="p4">
          <path className="lt" d={`M${b1 - shareW / 2} ${bandY - 6} V ${bandY} H ${b2 + daysW / 2} V ${bandY - 6}`} />
          <text x={(b1 - shareW / 2 + b2 + daysW / 2) / 2} y={bandY + 16} textAnchor="middle">on the blockchain: who owns what, and nothing else</text>
          <path className="lt" d={`M${b3 - bookW / 2} ${bandY - 6} V ${bandY} H ${sail + 30} V ${bandY - 6}`} />
          <text x={(b3 - bookW / 2 + sail + 30) / 2} y={bandY + 16} textAnchor="middle">on AWS: everything members actually use</text>
        </g>
        <Dot path="flowM" dur="9s" />
      </svg>

      <svg className="sm" viewBox="0 0 360 120">
        <g className="d1 people"><Person x={24} y={54} /></g>
        <path id="flowMm" className="ln d2" d="M36 54 H 54 M156 54 H 176 M278 54 H 296" />
        <Node cls="d1" x={105} y={54} title="a share" w={102} h={40} />
        <Node cls="d1" x={227} y={54} title="a real date" w={102} h={40} />
        <g className="p5"><Sailboat x={326} y={50} /></g>
        <text x="105" y="104" textAnchor="middle">on the chain</text>
        <text x="227" y="104" textAnchor="middle">on AWS</text>
        <text className="tc" x="326" y="104" textAnchor="middle">sailing</text>
        <Dot path="flowMm" dur="6s" r={3} />
      </svg>
    </Strip>
  );
}

/* --------------------------------------------------------------- Abu Dhabi */

export function AbuDhabiSpecimen() {
  const visa = { x: 110, w: nodeW("visa application", true) };
  const lab = { x: 350, w: nodeW("anywhere in the world", true) };
  const rec = { x: 600, w: nodeW("central record", true, 170) };
  const gateW = nodeW("e-gate reads passport", true);
  const gx = 840;
  const ok = 1034;
  const fork = rec.x + rec.w / 2 + 40;
  const lead = `M${visa.x + visa.w / 2} 90 H ${lab.x - lab.w / 2} M${lab.x + lab.w / 2} 90 H ${rec.x - rec.w / 2} M${rec.x + rec.w / 2} 90`;
  return (
    <Strip cap="An ID issued at visa time, a result uploaded from anywhere, a gate that already knows">
      <svg className="sw" viewBox="0 0 1100 180">
        <Node cls="d1" x={visa.x} y={90} title="visa application" line2="issues an ID" w={visa.w} icon={IdIcon} />
        <Node cls="d1" x={lab.x} y={90} title="lab or embassy" line2="anywhere in the world" w={lab.w} icon={SignalIcon} sub="upload built for 2G" />
        <Node cls="d1" x={rec.x} y={90} title="central record" line2="on-prem + Azure" w={rec.w} icon={ServerIcon} />
        <Node cls="p1" x={rec.x} y={32} title="GraphQL layer hides the real APIs" h={24} light />
        <path className="lt p1" d={`M${rec.x} 44 V 61`} />
        <path className="ln d2" d={`M${visa.x + visa.w / 2} 90 H ${lab.x - lab.w / 2} M${lab.x + lab.w / 2} 90 H ${rec.x - rec.w / 2} M${rec.x + rec.w / 2} 90 H ${fork}`} />
        <Edge from={[fork, 90]} to={[gx - gateW / 2, 56]} />
        <Edge from={[fork, 90]} to={[gx - gateW / 2, 124]} />
        <Edge from={[gx + gateW / 2, 56]} to={[ok - 36, 90]} />
        <Edge from={[gx + gateW / 2, 124]} to={[ok - 36, 90]} />
        <path id="trackAa" className="track" d={`${lead} H ${fork} ${curve([fork, 90], [gx - gateW / 2, 56], false)} ${curve([gx + gateW / 2, 56], [ok - 36, 90])}`} />
        <path id="trackAb" className="track" d={`${lead} H ${fork} ${curve([fork, 90], [gx - gateW / 2, 124], false)} ${curve([gx + gateW / 2, 124], [ok - 36, 90])}`} />
        <Node cls="p2" x={gx} y={56} title="e-gate reads passport" w={gateW} icon={GateIcon} />
        <Node cls="p3" x={gx} y={124} title="officer scans" w={gateW} icon={GateIcon} sub="status comes straight back" />
        <g className="p5">
          <Gate x={ok} y={86} />
          <text className="t2 tc" x={ok} y="130" textAnchor="middle">walks through</text>
          <text x={ok} y="146" textAnchor="middle">500,000+ travellers</text>
        </g>
        <Dot path="trackAa" dur="9s" />
        <Dot path="trackAb" dur="9s" />
      </svg>

      <svg className="sm" viewBox="0 0 360 120">
        <Node cls="d1" x={72} y={56} title="lab upload" h={44} icon={SignalIcon} />
        <path id="flowAm" className="ln d2" d="M138 56 H 146 M278 56 H 288" />
        <Node cls="d1" x={212} y={56} title="central record" h={44} />
        <g className="p5"><Gate x={316} y={54} s={0.72} /></g>
        <text x="72" y="108" textAnchor="middle">built for 2G</text>
        <text x="212" y="108" textAnchor="middle">on-prem + Azure</text>
        <text className="tc" x="316" y="108" textAnchor="middle">cleared</text>
        <Dot path="flowAm" dur="6s" r={3} />
      </svg>
    </Strip>
  );
}

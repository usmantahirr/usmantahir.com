/**
 * Diagrams for posts about decision tables. Plain SVG and CSS on the site's
 * tokens; each one draws itself once when it comes into view (PostMotion adds
 * .play) and is shown whole without the script or with reduced motion.
 */

/** Two or more values as bars on one scale, each labelled with its number. */
export function Bars({
  label,
  caption,
  rows,
}: {
  label: string; // the chart in words, for screen readers
  caption?: string;
  rows: { name: string; value: number; shown?: string; mine?: boolean }[];
}) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <figure className="bars">
      <div role="img" aria-label={label}>
        {rows.map((r, i) => (
          <div key={r.name} className={r.mine ? "barsrow mine" : "barsrow"} style={{ ["--i" as string]: i }}>
            <span className="barsname">{r.name}</span>
            <span className="barstrack">
              <i style={{ ["--w" as string]: `${(r.value / max) * 100}%` }} />
              <b>{r.shown ?? r.value.toLocaleString("en-GB")}</b>
            </span>
          </div>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** A left-to-right pipeline of boxes; the `mine` box is drawn in clay. */
export function Flow({
  label,
  note,
  caption,
  steps,
}: {
  label: string;
  note?: string; // a short line over the arrow out of the `mine` box's left
  caption?: string;
  steps: { name: string; sub?: string; mine?: boolean }[];
}) {
  return (
    <figure className="flow">
      <ol aria-label={label}>
        {steps.map((s, i) => (
          <li key={s.name} className={s.mine ? "mine" : undefined} style={{ ["--i" as string]: i }}>
            <b>{s.name}</b>
            {s.sub && <span>{s.sub}</span>}
            {s.mine && note && <em className="flownote">{note}</em>}
          </li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/**
 * Every situation as a seat on a grid: one list across, one down. Rule A
 * claims a column, rule B a row; the seat they share lights up last.
 */
export function SeatMap({
  across,
  down,
  cols,
  rows,
  a,
  b,
  caption,
}: {
  across: string;
  down: string;
  cols: string[];
  rows: string[];
  a: { label: string; col: string };
  b: { label: string; row: string };
  caption?: string;
}) {
  const W = 360;
  const x0 = 96;
  const y0 = 44;
  const cw = (W - x0 - 8) / cols.length;
  const rh = 52;
  const H = y0 + rh * rows.length;
  const ci = cols.indexOf(a.col);
  const ri = rows.indexOf(b.row);
  return (
    <figure className="seatmap">
      <svg
        viewBox={`0 0 ${W} ${H + 30}`}
        role="img"
        aria-label={`A grid with ${across} across and ${down} down. ${a.label} claims the ${a.col} column. ${b.label} claims the ${b.row} row. They share one seat.`}
      >
        <text className="smlabel" x={x0 + (cw * cols.length) / 2} y="12" textAnchor="middle">
          {across}
        </text>
        <text className="smlabel" x={x0 - 10} y="32" textAnchor="end">
          {down}
        </text>
        {cols.map((c, i) => (
          <text key={c} x={x0 + cw * i + cw / 2} y="34" textAnchor="middle">
            {c}
          </text>
        ))}
        {rows.map((r, j) => (
          <text key={r} x={x0 - 10} y={y0 + rh * j + rh / 2 + 4} textAnchor="end">
            {r}
          </text>
        ))}
        {rows.map((r, j) =>
          cols.map((c, i) => (
            <rect
              key={r + c}
              className="smseat"
              x={x0 + cw * i + 3}
              y={y0 + rh * j + 3}
              width={cw - 6}
              height={rh - 6}
              rx="5"
              style={{ ["--i" as string]: j * cols.length + i }}
            />
          )),
        )}
        <rect className="sma" x={x0 + cw * ci} y={y0} width={cw} height={rh * rows.length} rx="7" pathLength="100" />
        <rect className="smb" x={x0} y={y0 + rh * ri} width={cw * cols.length} height={rh} rx="7" pathLength="100" />
        <text className="smtag a" x={x0 + cw * ci + cw - 12} y={y0 + 16} textAnchor="middle">
          A
        </text>
        <text className="smtag b" x={x0 + 12} y={y0 + rh * ri + rh - 10} textAnchor="middle">
          B
        </text>
        <rect className="smboth" x={x0 + cw * ci + 6} y={y0 + rh * ri + 6} width={cw - 12} height={rh - 12} rx="4" />
        <text className="smbothtext" x={x0 + cw * ci + cw / 2} y={y0 + rh * ri + rh / 2 + 4} textAnchor="middle">
          both
        </text>
        <text className="smlabel" x={x0} y={H + 22}>
          Solid: {a.label}. Dashed: {b.label}.
        </text>
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** The overlap test as a few pairs, each with its verdict, the last failing. */
export function PairCheck({
  caption,
  pairs,
}: {
  caption?: string;
  pairs: { pair: string; result: string; fail?: boolean }[];
}) {
  return (
    <figure className="paircheck">
      <ol>
        {pairs.map((p, i) => (
          <li key={p.pair} className={p.fail ? "fail" : undefined} style={{ ["--i" as string]: i }}>
            <span className="pcpair">{p.pair}</span>
            <span className="pcresult">{p.result}</span>
          </li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/**
 * What the model hands to code: each fact with the words it quotes. A fact
 * whose words are in the message is kept; one whose words aren't is dropped.
 */
export function Evidence({
  message,
  facts,
  caption,
}: {
  message: string;
  facts: { fact: string; quote: string; kept?: boolean }[];
  caption?: string;
}) {
  return (
    <figure className="evidence">
      <p className="evmsg">“{message}”</p>
      <ol>
        {facts.map((f, i) => (
          <li key={f.fact} className={f.kept ? "kept" : "dropped"} style={{ ["--i" as string]: i }}>
            <span className="evfact">{f.fact}</span>
            <span className="evquote">“{f.quote}”</span>
            <span className="evverdict">{f.kept ? "in the message: kept" : "not in the message: dropped"}</span>
          </li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The console's charts, drawn by hand in SVG.
 *
 * No charting library. Four forms is not enough work to justify shipping one
 * into a marketing site's bundle, and hand-drawing them is the only way to
 * hold the marks to the specification the rest of this file follows.
 *
 * COLOUR. Almost every chart here is a single series, which is the right
 * answer more often than dashboards admit: in a bar chart of four channels
 * the bars are told apart by their labels, not their hues, so painting them
 * four colours encodes nothing and spends the reader's attention for
 * nothing. One chart carries two series, enquiries against purchases, and
 * they are counts on one scale, so they share one axis. There is no
 * dual-axis chart in here and there should never be one.
 *
 * The two hues used were run through the palette validator rather than
 * picked by eye: brand green #15803d and amber #b45309 pass the lightness
 * band, the chroma floor, the normal-vision floor at ΔE 22.0 and contrast
 * on white, with a colour-vision warning at ΔE 6.8 for protanopia. That
 * warning is legal only with a second encoding, so the two-series chart
 * direct-labels both lines at their right-hand end and keeps a legend. If
 * you add a third series, re-run the validator; do not guess a hue.
 *
 * Text never wears the series colour. Values, ticks and legends are ink;
 * the mark beside them carries the identity.
 */

const SERIES_1 = "#15803d";
const SERIES_2 = "#b45309";
const GRID = "#e2e8f0";
const MUTE = "#64748b";
const INK = "#0f172a";

/** Draws at the width it is actually given rather than scaling a fixed
 *  viewBox, because scaling a viewBox scales the type with it and an axis
 *  tick at 6px on a phone is not a tick. */
function useWidth(initial = 320) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(260, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function Tooltip({
  x,
  y,
  width,
  children,
}: {
  x: number;
  y: number;
  width: number;
  children: React.ReactNode;
}) {
  /* Flip before the tooltip runs off its own chart rather than letting the
     browser clip it. */
  const flip = x > width - 150;
  return (
    <div
      className="pointer-events-none absolute z-10 min-w-[8.5rem] rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[0.74rem] shadow-[0_8px_24px_rgba(15,23,42,.14)]"
      style={{
        left: flip ? undefined : x + 12,
        right: flip ? width - x + 12 : undefined,
        top: Math.max(4, y - 18),
      }}
    >
      {children}
    </div>
  );
}

const TipRow = ({
  swatch,
  label,
  value,
}: {
  swatch?: string;
  label: string;
  value: string;
}) => (
  <p className="flex items-center justify-between gap-4">
    <span className="flex items-center gap-1.5 text-slate-500">
      {swatch && (
        <span
          aria-hidden
          className="size-2 rounded-[2px]"
          style={{ background: swatch }}
        />
      )}
      {label}
    </span>
    <span className="font-semibold text-slate-900 tabular-nums">{value}</span>
  </p>
);

export function Legend({ items }: { items: { label: string; colour: string }[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5 text-[0.74rem] text-slate-600">
          <span
            aria-hidden
            className="size-2.5 rounded-[3px]"
            style={{ background: i.colour }}
          />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Area: one measure over time                                         */
/* ------------------------------------------------------------------ */

export function AreaChart({
  data,
  format,
  height = 230,
}: {
  data: { label: string; value: number }[];
  format: (n: number) => string;
  height?: number;
}) {
  const [ref, w] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const pad = { l: 52, r: 14, t: 14, b: 26 };
  const iw = Math.max(10, w - pad.l - pad.r);
  const ih = height - pad.t - pad.b;
  const max = Math.max(...data.map((d) => d.value)) * 1.12 || 1;
  const x = (i: number) => pad.l + (data.length === 1 ? iw / 2 : (i * iw) / (data.length - 1));
  const y = (v: number) => pad.t + ih - (v / max) * ih;

  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.value)}`).join(" ");
  const area = `${line} L${x(data.length - 1)},${pad.t + ih} L${x(0)},${pad.t + ih} Z`;
  const ticks = [0, 0.5, 1].map((t) => max * t);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <svg width={w} height={height} role="img" aria-label="Payout by month">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth="1" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill={MUTE}>
              {format(t)}
            </text>
          </g>
        ))}

        <defs>
          <linearGradient id="kpc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SERIES_1} stopOpacity="0.22" />
            <stop offset="100%" stopColor={SERIES_1} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#kpc-area)" />
        <path d={line} fill="none" stroke={SERIES_1} strokeWidth="2" strokeLinejoin="round" />

        {data.map((d, i) => (
          <g key={d.label}>
            <text x={x(i)} y={height - 8} textAnchor="middle" fontSize="11" fill={MUTE}>
              {d.label}
            </text>
            {/* A 2px surface ring keeps the marker legible where it sits on
                the line it belongs to. */}
            <circle
              cx={x(i)}
              cy={y(d.value)}
              r={hover === i ? 5 : 3.5}
              fill={SERIES_1}
              stroke="#fff"
              strokeWidth="2"
            />
          </g>
        ))}

        {hover !== null && (
          <line
            x1={x(hover)}
            x2={x(hover)}
            y1={pad.t}
            y2={pad.t + ih}
            stroke={INK}
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        )}

        {/* Hit targets wider than the marks, so a pointer does not have to
            find a 3.5px dot. */}
        {data.map((d, i) => (
          <rect
            key={`hit-${d.label}`}
            x={x(i) - iw / data.length / 2}
            y={pad.t}
            width={iw / data.length}
            height={ih}
            fill="transparent"
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
          />
        ))}
      </svg>

      {hover !== null && (
        <Tooltip x={x(hover)} y={y(data[hover].value)} width={w}>
          <p className="mb-1 font-semibold text-slate-900">{data[hover].label}</p>
          <TipRow swatch={SERIES_1} label="Paid out" value={format(data[hover].value)} />
        </Tooltip>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Two lines, one scale                                                */
/* ------------------------------------------------------------------ */

export function DualLineChart({
  data,
  height = 230,
}: {
  data: { label: string; a: number; b: number }[];
  height?: number;
}) {
  const [ref, w] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const pad = { l: 34, r: 74, t: 14, b: 26 };
  const iw = Math.max(10, w - pad.l - pad.r);
  const ih = height - pad.t - pad.b;
  const max = Math.max(...data.flatMap((d) => [d.a, d.b])) * 1.18 || 1;
  const x = (i: number) => pad.l + (i * iw) / (data.length - 1);
  const y = (v: number) => pad.t + ih - (v / max) * ih;
  const path = (key: "a" | "b") =>
    data.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d[key])}`).join(" ");

  const series = [
    { key: "a" as const, colour: SERIES_1, label: "Enquiries" },
    { key: "b" as const, colour: SERIES_2, label: "Purchases" },
  ];

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <svg width={w} height={height} role="img" aria-label="Enquiries and purchases by month">
        {[0, 0.5, 1].map((t) => (
          <g key={t}>
            <line
              x1={pad.l}
              x2={w - pad.r}
              y1={y(max * t)}
              y2={y(max * t)}
              stroke={GRID}
              strokeWidth="1"
            />
            <text x={pad.l - 8} y={y(max * t) + 4} textAnchor="end" fontSize="11" fill={MUTE}>
              {Math.round(max * t)}
            </text>
          </g>
        ))}

        {series.map((s) => (
          <path
            key={s.key}
            d={path(s.key)}
            fill="none"
            stroke={s.colour}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        ))}

        {data.map((d, i) => (
          <g key={d.label}>
            <text x={x(i)} y={height - 8} textAnchor="middle" fontSize="11" fill={MUTE}>
              {d.label}
            </text>
            {series.map((s) => (
              <circle
                key={s.key}
                cx={x(i)}
                cy={y(d[s.key])}
                r={hover === i ? 5 : 3.5}
                fill={s.colour}
                stroke="#fff"
                strokeWidth="2"
              />
            ))}
          </g>
        ))}

        {/* The second encoding the colour-vision warning obliges: each line
            says its own name at the end, so the pair never relies on hue. */}
        {series.map((s) => (
          <text
            key={`lbl-${s.key}`}
            x={w - pad.r + 8}
            y={y(data[data.length - 1][s.key]) + 4}
            fontSize="11"
            fontWeight="600"
            fill={INK}
          >
            {s.label}
          </text>
        ))}

        {hover !== null && (
          <line
            x1={x(hover)}
            x2={x(hover)}
            y1={pad.t}
            y2={pad.t + ih}
            stroke={INK}
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        )}
        {data.map((d, i) => (
          <rect
            key={`hit-${d.label}`}
            x={x(i) - iw / data.length / 2}
            y={pad.t}
            width={iw / data.length}
            height={ih}
            fill="transparent"
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
          />
        ))}
      </svg>

      {hover !== null && (
        <Tooltip x={x(hover)} y={pad.t + 10} width={w}>
          <p className="mb-1 font-semibold text-slate-900">{data[hover].label}</p>
          <TipRow swatch={SERIES_1} label="Enquiries" value={String(data[hover].a)} />
          <TipRow swatch={SERIES_2} label="Purchases" value={String(data[hover].b)} />
        </Tooltip>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vertical bars                                                       */
/* ------------------------------------------------------------------ */

export function BarChart({
  data,
  height = 220,
  format = String,
}: {
  data: { label: string; value: number; sub?: string }[];
  height?: number;
  format?: (n: number) => string;
}) {
  const [ref, w] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const pad = { l: 34, r: 10, t: 18, b: 34 };
  const iw = Math.max(10, w - pad.l - pad.r);
  const ih = height - pad.t - pad.b;
  const max = Math.max(...data.map((d) => d.value)) * 1.15 || 1;
  const slot = iw / data.length;
  /* 2px of surface between neighbours, which is what keeps a row of bars
     reading as separate marks rather than one striped block. */
  const bw = Math.min(48, slot - 14);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <svg width={w} height={height} role="img" aria-label="Enquiries by channel">
        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1={pad.l}
            x2={w - pad.r}
            y1={pad.t + ih - t * ih}
            y2={pad.t + ih - t * ih}
            stroke={GRID}
            strokeWidth="1"
          />
        ))}

        {data.map((d, i) => {
          const h = (d.value / max) * ih;
          const x = pad.l + slot * i + (slot - bw) / 2;
          return (
            <g
              key={d.label}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
            >
              <rect x={x - 7} y={pad.t} width={bw + 14} height={ih} fill="transparent" />
              {/* Rounded only at the data end; the baseline end stays square
                  so the bar is anchored rather than floating. */}
              <path
                d={`M${x},${pad.t + ih} L${x},${pad.t + ih - h + 4} Q${x},${pad.t + ih - h} ${x + 4},${pad.t + ih - h} L${x + bw - 4},${pad.t + ih - h} Q${x + bw},${pad.t + ih - h} ${x + bw},${pad.t + ih - h + 4} L${x + bw},${pad.t + ih} Z`}
                fill={SERIES_1}
                opacity={hover === null || hover === i ? 1 : 0.45}
              />
              <text
                x={x + bw / 2}
                y={pad.t + ih - h - 6}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={INK}
              >
                {format(d.value)}
              </text>
              <text
                x={x + bw / 2}
                y={height - 14}
                textAnchor="middle"
                fontSize="11"
                fill={MUTE}
              >
                {d.label}
              </text>
              {d.sub && (
                <text
                  x={x + bw / 2}
                  y={height - 2}
                  textAnchor="middle"
                  fontSize="10"
                  fill={MUTE}
                  opacity="0.75"
                >
                  {d.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal bars                                                     */
/* ------------------------------------------------------------------ */

export function HBarChart({
  data,
  format,
  labelWidth = 150,
}: {
  data: { label: string; value: number; note?: string }[];
  format: (n: number) => string;
  labelWidth?: number;
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1;
  return (
    <ul className="space-y-2.5">
      {data.map((d) => (
        <li key={d.label} className="flex items-center gap-3">
          <span
            className="shrink-0 truncate text-[0.78rem] text-slate-600"
            style={{ width: labelWidth }}
            title={d.label}
          >
            {d.label}
          </span>
          <span className="relative h-5 min-w-0 flex-1 rounded bg-slate-100">
            <span
              className="absolute inset-y-0 left-0 rounded-r-[4px] rounded-l-[2px]"
              style={{ width: `${Math.max(2, (d.value / max) * 100)}%`, background: SERIES_1 }}
            />
          </span>
          <span className="w-20 shrink-0 text-right text-[0.78rem] font-semibold text-slate-900 tabular-nums">
            {format(d.value)}
          </span>
          {d.note && (
            <span className="hidden w-16 shrink-0 text-right text-[0.72rem] text-slate-400 sm:block">
              {d.note}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Funnel                                                              */
/* ------------------------------------------------------------------ */

/**
 * The pipeline, as a funnel rather than a pie.
 *
 * The stages are ordered, so their order is the information and the chart
 * keeps them in it. A doughnut would throw that away and ask the reader to
 * compare six arc lengths, which is the comparison people are worst at.
 */
export function Funnel({
  data,
  total,
}: {
  data: { stage: string; count: number }[];
  total: number;
}) {
  const max = Math.max(...data.map((d) => d.count)) || 1;
  return (
    <ol className="space-y-2">
      {data.map((d) => {
        const pct = Math.round((d.count / total) * 100);
        return (
          <li key={d.stage}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.78rem] text-slate-600">{d.stage}</span>
              <span className="text-[0.78rem] text-slate-400 tabular-nums">
                <b className="font-semibold text-slate-900">{d.count}</b> · {pct}%
              </span>
            </div>
            <div className="mt-1 h-2.5 rounded bg-slate-100">
              <div
                className="h-full rounded-r-[4px] rounded-l-[2px]"
                style={{
                  width: `${Math.max(1.5, (d.count / max) * 100)}%`,
                  background: SERIES_1,
                }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export const CHART_COLOURS = { series1: SERIES_1, series2: SERIES_2 };

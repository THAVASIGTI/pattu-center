"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The console's charts, drawn by hand in SVG.
 *
 * No charting library, for two forms. Two is nowhere near enough work to
 * justify shipping one into a marketing site's bundle.
 *
 * THERE IS NO CHART OF CHANGE OVER TIME HERE, and that is deliberate. This
 * console manages content, and content is not a time series: there is no
 * honest way to plot "branches per month" from a list of branches. An area
 * chart and a two-line chart used to live in this file, drawn over a
 * generated CRM, and they went when the generated data went. Inventing a
 * trend is the only way to draw one, and a chart nobody can check is worse
 * than no chart.
 *
 * What is left answers the questions content can answer: how much of each
 * thing there is, and how it is spread. Both forms are a single series,
 * which is the right answer more often than dashboards admit: in a bar
 * chart of four areas the bars are told apart by their labels, not their
 * hues, so painting them four colours encodes nothing.
 *
 * The one hue was run through the palette validator rather than picked by
 * eye: brand green #15803d clears the lightness band, the chroma floor and
 * 3:1 contrast on white. If a second series is ever added here, re-run the
 * validator; do not guess a hue.
 *
 * Text never wears the series colour. Values and ticks are ink; the mark
 * beside them carries the identity.
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
/* Vertical bars                                                       */
/* ------------------------------------------------------------------ */

/**
 * Vertical bars, one series.
 *
 * Every bar is direct-labelled, which with four of them is clearer than
 * making someone hunt for a tooltip. The tooltip is still here and still
 * earns its place, because the axis label underneath is abbreviated to fit
 * and the tooltip is where the full name lives.
 */
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
  const slotOf = () => (w - 34 - 10) / data.length;
  const centreOf = (i: number) => 34 + slotOf() * i + slotOf() / 2;
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

      {hover !== null && (
        <Tooltip x={centreOf(hover)} y={28} width={w}>
          <p className="mb-1 font-semibold text-slate-900">{data[hover].label}</p>
          <TipRow swatch={SERIES_1} label="Count" value={format(data[hover].value)} />
          {data[hover].sub && (
            <p className="mt-1 text-slate-500">{data[hover].sub}</p>
          )}
        </Tooltip>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal bars                                                     */
/* ------------------------------------------------------------------ */

/**
 * Horizontal bars, one series, for a list too long to stand up.
 *
 * No hover layer, and that is the documented exception rather than an
 * omission: every bar already prints its value and its note beside it, so
 * there is nothing a tooltip could reveal. The label carries a title
 * attribute for the rare case where a long town name is truncated.
 */
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

export const CHART_COLOURS = { series1: SERIES_1, series2: SERIES_2 };

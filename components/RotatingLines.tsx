"use client";

import { useEffect, useState } from "react";

export type Line = { ta: string; en: string };

/**
 * Cycles a promise line, showing the Tamil and the English together and
 * swapping to the next pair on a timer. Height is reserved so nothing shifts.
 */
export default function RotatingLines({
  lines,
  interval = 3200,
}: {
  lines: Line[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % lines.length), interval);
    return () => clearInterval(id);
  }, [lines.length, interval]);

  return (
    <div
      // height reserved for the tallest line (measured 49px / 58px) plus a
      // small buffer, so swapping lines never shifts the layout
      className="relative mt-3.5 min-h-[3.6rem] sm:min-h-[4.1rem]"
      aria-live="polite"
    >
      {lines.map((l, idx) => {
        const active = idx === i;
        return (
          <div
            key={l.en}
            aria-hidden={!active}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              active ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <p className="font-tamil text-[clamp(1.05rem,4vw,1.45rem)] leading-snug text-yellow-light">
              {l.ta}
            </p>
            <p className="mt-1 text-[0.92rem] tracking-wide text-cream/60">{l.en}</p>
          </div>
        );
      })}
    </div>
  );
}

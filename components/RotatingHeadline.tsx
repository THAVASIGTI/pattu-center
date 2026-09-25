"use client";

import { Fragment, useEffect, useState } from "react";
import type { Segment } from "./AnimatedHeading";

/** Which gold to use: the bright foil on dark grounds, the deep one on light. */
export type FoilTone = "light" | "deep";

const INTERVAL = 3800;

/** Splits segments into words, numbering them across the whole line. */
function toGroups(segments: readonly Segment[]): { words: { word: string; idx: number }[]; foil?: boolean }[] {
  let total = 0;
  return segments.map((seg) => {
    const words = seg.text.trim().split(/\s+/).filter(Boolean);
    const group = { foil: seg.foil, words: words.map((word, i) => ({ word, idx: total + i })) };
    total += words.length;
    return group;
  });
}

/**
 * The hero headline, cycling through the slogans. Each one lifts in word by
 * word as the one before it drops away.
 *
 * Every slogan is rendered into the same grid cell, so the heading is always
 * as tall as the longest of them and the page never jumps as they change.
 * Only the slogan on show is exposed to a screen reader; the rest would
 * otherwise all be read out at once.
 *
 * Reduced motion is handled in CSS via .rotating-line: the slogans keep
 * changing, because that is the content, they just swap instead of lifting.
 */
export default function RotatingHeadline({
  slogans,
  className = "",
  stagger = 55,
  foilTone = "light",
}: {
  slogans: readonly (readonly Segment[])[];
  className?: string;
  stagger?: number;
  foilTone?: FoilTone;
}) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  // One frame after mount, so the hidden state paints before the first lift.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (slogans.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slogans.length), INTERVAL);
    return () => clearInterval(id);
  }, [slogans.length]);

  return (
    <h1 className={className}>
      <span className="grid">
        {slogans.map((segments, si) => {
          const shown = ready && si === index;
          return (
            <span key={si} aria-hidden={si !== index} className="[grid-area:1/1]">
              {toGroups(segments).map((group, gi) => (
                <span key={gi}>
                  {/* The space after each word sits outside the clipping
                      wrapper. Trailing whitespace inside an inline-block is
                      collapsed away, which ran every word of the heading
                      together in the accessible name. */}
                  {group.words.map(({ word, idx }) => (
                    <Fragment key={idx}>
                      <span className="inline-block overflow-hidden align-bottom">
                        {/* The gradient sits on the word itself; background-clip:text
                            does not reach through these inline-block wrappers. */}
                        <span
                          data-word
                          // Words stagger on the way in. On the way out they leave
                          // together, or the old slogan would still be clearing as
                          // the new one arrives.
                          style={{ transitionDelay: shown ? `${idx * stagger}ms` : "0ms" }}
                          className={`rotating-line inline-block transition-all duration-700 ease-out ${
                            shown ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
                          } ${group.foil ? `${foilTone === "deep" ? "foil-text-deep" : "foil-text"} foil-shimmer` : ""}`}
                        >
                          {word}
                        </span>
                      </span>{" "}
                    </Fragment>
                  ))}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </h1>
  );
}

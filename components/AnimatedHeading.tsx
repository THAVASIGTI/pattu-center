"use client";

import { useEffect, useState } from "react";

export type Segment = { text: string; foil?: boolean };

type Word = { word: string; idx: number };

/** Splits segments into words, numbering them across the whole heading. */
function toGroups(segments: Segment[]): { words: Word[]; foil?: boolean }[] {
  return segments.reduce<{ groups: { words: Word[]; foil?: boolean }[]; total: number }>(
    (acc, seg) => {
      const words = seg.text.trim().split(/\s+/).filter(Boolean);
      return {
        groups: [
          ...acc.groups,
          { foil: seg.foil, words: words.map((word, i) => ({ word, idx: acc.total + i })) },
        ],
        total: acc.total + words.length,
      };
    },
    { groups: [], total: 0 },
  ).groups;
}

/**
 * Splits a heading into words and lifts them in one after another on mount.
 * Words keep their natural wrapping, so this does not affect the layout.
 */
export default function AnimatedHeading({
  segments,
  className = "",
  stagger = 55,
}: {
  segments: Segment[];
  className?: string;
  stagger?: number;
}) {
  const [ready, setReady] = useState(false);

  // One frame after mount so the hidden state paints first.
  // Reduced motion is handled in CSS via [data-word].
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <h1 className={className}>
      {toGroups(segments).map((group, gi) => (
        <span key={gi}>
          {group.words.map(({ word, idx }) => (
            <span key={idx} className="inline-block overflow-hidden align-bottom">
              {/* The gradient sits on the word itself, background-clip:text does
                  not reach through these inline-block wrappers from a parent. */}
              <span
                data-word
                style={{ transitionDelay: `${idx * stagger}ms` }}
                className={`inline-block transition-all duration-700 ease-out ${
                  ready ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
                } ${group.foil ? "foil-text foil-shimmer" : ""}`}
              >
                {word}
              </span>
              {" "}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

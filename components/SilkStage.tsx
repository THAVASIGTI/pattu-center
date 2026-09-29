"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "./Icons";
import { Wrap } from "./ui";
import { img, sareeTypes } from "@/config/content";

/**
 * The hero's ground and the controls for it, which have to be one component
 * because they share an index.
 *
 * The silk is the section now, not a card hung beside the copy. There is no
 * frame, no zari ring and no caption laid over the picture: the photograph
 * fills the right of the hero and dissolves into the cream before it reaches
 * the words, and the panel on the right names whichever silk is currently up.
 *
 * Slides cross-fade in place. Nothing travels, because a full-bleed
 * photograph sliding behind the reading line is movement across most of the
 * viewport rather than inside a 440px box.
 *
 * The name, the row of small frames and the link all sit on one pale plate.
 * Over a photograph that changes every few seconds there is no ground a piece
 * of loose text can be trusted on: five images means five different things
 * under the same words, and the greens and golds this site writes in fail
 * against at least one of them.
 *
 * Change INTERVAL to alter the pace. It sits at 2600ms so the name is
 * readable before it changes, and because five photographs at this size
 * cross-fading is already real work for a mid-range phone.
 */
const INTERVAL = 2600;
const FADE = 620;
const SHOWN = 5;

export default function SilkStage({ children }: { children: ReactNode }) {
  // The hero shows the first few categories rather than every one, so a
  // visitor sees the whole cycle without waiting through eight photographs,
  // and so the row of small frames stays wide enough to press on a phone.
  const slides = sareeTypes.filter((t) => t.slug !== "silver").slice(0, SHOWN);
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(id);
  }, [paused, count]);

  const current = slides[index];

  return (
    <>
      {/* The ground. From lg it covers the right 64% and its own gradient
          dissolves it into the cream before it reaches the copy: solid to
          17%, gone by about a third, then deepening to green at the edge so
          the panel has something to sit against.

          The dissolve is what keeps it a backdrop rather than a second
          column. It surfaces in the gap between the copy and the panel, so
          the eye never finds the hard edge where the picture starts.

          Below lg the copy is centred over the full width, so the photograph
          runs behind all of it at a near-flat 88 to 94% cream, where it is a
          texture and nothing more. The rings and motes of HeroBackdrop sit
          under this layer; the two on the right are covered by it, which is
          the point. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[64%]">
        {slides.map((t, i) => (
          <div
            key={t.slug}
            style={{ transitionDuration: `${FADE}ms` }}
            className={`cat-slide absolute inset-0 transition-opacity ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img(t.imageId)}
              alt=""
              fill
              // next/image rejects priority together with loading, so the
              // opening photograph takes priority and the rest take loading
              // on its own. They are eager because all five are already in
              // the viewport, only hidden by opacity, and one that has not
              // loaded fades up blank.
              {...(i === 0 ? { priority: true as const } : { loading: "eager" as const })}
              sizes="(max-width: 1024px) 100vw, 64vw"
              className="object-cover"
            />
          </div>
        ))}

        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,253,249,.94)_0%,rgba(251,253,249,.88)_45%,rgba(251,253,249,.93)_100%)] lg:hidden" />
        <span className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fbfdf9_0%,rgba(251,253,249,.97)_24%,rgba(251,253,249,.55)_40%,rgba(237,246,239,.34)_58%,rgba(10,46,26,.48)_100%)] lg:block" />
      </div>

      <Wrap className="relative z-10 grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:py-20">
        {children}

        <div
          className="order-2 mx-auto w-full max-w-[440px] lg:mr-0 lg:ml-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="glass-soft rounded-[22px] border border-white/60 p-3.5 shadow-mid">
            {/* The name of whatever is behind, which is the only thing that
                says the ground is not wallpaper. */}
            <div className="px-1 pb-3.5 text-center">
              {current.ta && (
                <p className="font-tamil text-[0.88rem] text-yellow-ink">{current.ta}</p>
              )}
              <p className="mt-0.5 font-serif text-[clamp(1.15rem,3vw,1.5rem)] leading-tight text-green-deep">
                {current.name}
              </p>
            </div>

            {/* Wider than tall, so five fit across the plate without dropping
                under the 44px a finger needs. */}
            <div className="flex items-stretch gap-2 sm:gap-2.5">
              {slides.map((t, i) => {
                const active = i === index;
                return (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${t.name}`}
                    aria-current={active}
                    className={`group relative min-h-11 flex-1 cursor-pointer overflow-hidden rounded-[13px] transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green ${
                      active
                        ? "ring-2 ring-yellow ring-offset-2 ring-offset-cream"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <span className="relative block aspect-4/5">
                      <Image
                        src={img(t.imageId)}
                        alt=""
                        fill
                        sizes="90px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </span>
                    {/* Holds the small frames to one green, so the row reads
                        as a set rather than five loose photographs. */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                        active ? "opacity-0" : "bg-[rgba(10,46,26,.34)] opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-3.5 border-t border-line pt-3.5 text-center">
              <Link
                href="/what-we-buy"
                className="inline-flex min-h-9 items-center gap-2 text-[0.9rem] font-semibold text-green underline-offset-4 hover:underline"
              >
                See everything we buy
                <ArrowRight className="size-[16px]" />
              </Link>
            </p>
          </div>
        </div>
      </Wrap>
    </>
  );
}

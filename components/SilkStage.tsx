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
 * The name, the row of small frames and the link sit ON the photograph, with
 * no plate under them. What holds them is the picture darkening where they
 * are: one soft ellipse per text block, faded to nothing inside its own box,
 * so it reads as depth in the image rather than a panel laid over it. Below
 * lg there is no scrim, because the ground there is 88 to 94% cream and a
 * dark patch would be a bruise on a pale section, so the copy stays dark.
 *
 * Either way the colours are measured, not chosen by eye. A photograph that
 * changes every few seconds is five different grounds under the same words,
 * and scratchpad/probe.py checks every one of them.
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
          className="relative order-2 mx-auto w-full max-w-[440px] lg:mr-0 lg:ml-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative">
            {/* The name of whatever is behind, which is the only thing that
                says the ground is not wallpaper.

                No plate: the words go on the photograph and what keeps them
                readable is the photograph darkening under them. Each text
                block carries its OWN ellipse rather than sharing one over the
                whole column, because one gradient cannot serve text at
                different heights: centred on the row of frames it left the
                name 90px out in its falloff, at 1.77:1 against the palest of
                the five. Held tight to the words it is 7:1 and the fade is
                shorter, so it reads less like a panel, not more.

                The 50%/50% ending shape is the part that has to be right. It
                puts the zero stop exactly on the span's own edge. Sized past
                100% the gradient is cut off mid-tone and what lands is a hard
                dark rectangle, which is the thing this replaced.

                Only from lg, where the photograph is at full strength. Below
                that the ground is 88 to 94% cream, a dark patch would be a
                bruise on a pale section, and the copy simply stays dark,
                which is also where it measures best. */}
            <div className="relative px-1 pb-3.5 text-center">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-x-16 -inset-y-9 hidden bg-[radial-gradient(50%_50%_at_50%_46%,rgba(10,46,26,.96)_0%,rgba(10,46,26,.93)_52%,rgba(10,46,26,0)_100%)] lg:block"
              />
              {current.ta && (
                <p className="relative font-tamil text-[0.88rem] text-yellow-ink lg:text-yellow-light">
                  {current.ta}
                </p>
              )}
              <p className="relative mt-0.5 font-serif text-[clamp(1.15rem,3vw,1.5rem)] leading-tight text-green-deep lg:text-white">
                {current.name}
              </p>
            </div>

            {/* Wider than tall, so five fit across without dropping under the
                44px a finger needs.

                Each carries a hairline and a drop shadow because there is no
                plate any more: five photographs laid on a sixth have no edge
                of their own, and a pale one at 60% opacity, which is what the
                plate allowed, simply dissolved into whatever was behind it. */}
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
                    className={`group relative min-h-11 flex-1 cursor-pointer overflow-hidden rounded-[13px] shadow-[0_8px_22px_rgba(10,46,26,.42)] transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green ${
                      active
                        ? "ring-2 ring-yellow ring-offset-2 ring-offset-cream lg:ring-offset-0"
                        : "opacity-75 ring-1 ring-white/45 hover:opacity-100"
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

            <p className="relative mt-3.5 text-center">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-x-20 -inset-y-6 hidden bg-[radial-gradient(50%_50%_at_50%_50%,rgba(10,46,26,.95)_0%,rgba(10,46,26,.9)_46%,rgba(10,46,26,0)_100%)] lg:block"
              />
              <Link
                href="/what-we-buy"
                className="relative inline-flex min-h-9 items-center gap-2 text-[0.9rem] font-semibold text-green underline-offset-4 hover:underline lg:text-yellow-light"
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

"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Wrap } from "./ui";
import { img, keepsakeImg, sareeTypes } from "@/config/content";

/**
 * The hero's ground: the silk itself, changing under the copy.
 *
 * Over it sits one thing: a banner carrying the name of the silk that is up.
 * The photograph fills the right of the section and dissolves into the cream
 * before it reaches the words.
 * The copy stays in page.tsx and passes through as children.
 *
 * prefers-reduced-motion lengthens the dwell, it does not stop the cycle.
 * Stopping it was tried and was wrong twice over: it left anyone with that
 * setting on looking at one frozen photograph and no way to tell the page was
 * not broken, and it contradicted the rule already in globals.css, which
 * eases .cat-slide to 1500ms rather than killing it. A cross-fade is not the
 * kind of motion that setting is aimed at; travel, parallax and zoom are.
 * So the fade slows to 1500ms through that rule and the dwell goes to
 * SLOW_INTERVAL here, which is the same picture at a calmer pace.
 *
 * Change INTERVAL to alter the pace. It sits at 2600ms because five
 * photographs at this size cross-fading is already real work for a mid-range
 * phone, and because a ground that changes faster than the eye settles reads
 * as a fault rather than a feature.
 */
/* Swallowtail ends: the band runs full width and both edges are notched back
   into it by NOTCH. Used twice, once for the zari edge and once for the green
   inset over it, so the two silhouettes agree. */
const NOTCH = "26px";
const BANNER = `polygon(0% 0%, 100% 0%, calc(100% - ${NOTCH}) 50%, 100% 100%, 0% 100%, ${NOTCH} 50%)`;

const INTERVAL = 2600;
const SLOW_INTERVAL = 6000;
const FADE = 620;
const SHOWN = 5;

export default function SilkStage({ children }: { children: ReactNode }) {
  // The hero shows the first few categories rather than every one, so a
  // visitor sees the whole cycle without waiting through eight photographs.
  const slides = sareeTypes.filter((t) => t.slug !== "silver").slice(0, SHOWN);
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const current = slides[index];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: ReturnType<typeof setInterval> | undefined;

    const sync = () => {
      clearInterval(id);
      const every = mq.matches ? SLOW_INTERVAL : INTERVAL;
      id = setInterval(() => setIndex((i) => (i + 1) % count), every);
    };

    sync();
    mq.addEventListener("change", sync);
    return () => {
      clearInterval(id);
      mq.removeEventListener("change", sync);
    };
  }, [count]);

  return (
    <>
      {/* From lg the photograph covers the right 64% and its own gradient
          dissolves it into the cream before it reaches the copy: solid to
          24%, gone by 40%, then deepening to green at the edge.

          Those stops are measured, not guessed. The gold in the eyebrow and
          the headline is the tightest thing in the section, and at 17% it
          fell to 3.01:1 against the darkest of the five photographs, which is
          the large-text floor to two decimal places. At 24% the worst case is
          3.1:1 and the body copy is above 11:1. scratchpad/probe.py hides the
          copy, shoots the bare ground under each of the five, and samples the
          real line boxes of every text run over it.

          Below lg it takes two layers, because one gradient cannot be open
          at the sides and closed behind the words at the same time. A flat
          base carries the foot of the section, and a radial over it puts the
          cream back where the copy is, which is the upper middle. What is
          left uncovered is the sides and the bottom corners, and that is
          where the saree shows.

          It has to be done that way round. The copy runs to within 20px of
          both edges at 360, 390 and 430, so there is no side margin to open
          up: the reveal can only widen as it goes down, past the buttons,
          which are opaque and do not care what is behind them.

          The flat band from 148 to 392px is the condition tags and the row
          of four promises, which is the real text down in the open part. The
          numbers are measured, not chosen: the block sits 163 to 368px off
          the foot at 360, 390 and 430, and 190 to 293 at 768. Below it the
          only thing left is the banner, at 48 to 123, and the banner is
          opaque, so the last 118px can open right up.

          Those stops are in px measured up from the bottom, not percentages.
          The copy rewraps at every width and the section changes height with
          it, so a percentage would slide the reveal up into the words. At 390
          the microcopy's lowest glyph is 169px off the foot and the banner
          spans 48 to 129; at 768 it is 190 and 64 to 150. The ramp is clear
          of both. The rings and motes of HeroBackdrop sit
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

        <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(251,253,249,.10)_0px,rgba(251,253,249,.14)_118px,rgba(251,253,249,.88)_148px,rgba(251,253,249,.88)_392px,rgba(251,253,249,.55)_430px,rgba(251,253,249,.5)_100%)] lg:hidden" />
        <span className="absolute inset-0 bg-[radial-gradient(78%_62%_at_50%_22%,rgba(251,253,249,.92)_0%,rgba(251,253,249,.86)_52%,rgba(251,253,249,.5)_88%,rgba(251,253,249,.16)_100%)] lg:hidden" />
        <span className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fbfdf9_0%,rgba(251,253,249,.97)_24%,rgba(251,253,249,.55)_40%,rgba(237,246,239,.34)_58%,rgba(10,46,26,.48)_100%)] lg:block" />
      </div>

      <Wrap className="relative z-10 grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:py-20">
        {children}

        {/* The name of the silk that is up, on a banner.

            A ribbon, not a mask. The soft ellipse this replaces was doing the
            same job by dimming the photograph under the words, which meant it
            had to be strong enough for the palest silk in the set and so read
            as a smudge on the picture. An opaque banner has no such problem:
            it does not care what is behind it, so the white sits above 15:1
            on every one of the five instead of scraping 5.7:1 on the worst.

            The shape is a swallowtail, both ends notched back into the band,
            which is what makes it a banner rather than a box. Two stacked
            clips do it: a zari one behind and the green one inset 2.5px, so
            the gold edge follows the notches instead of being cut square by
            them. The horizontal padding clears the notch depth, or the first
            letter would sit in the fold.

            The same at every width now. The old version had to swap to dark
            text below lg because there was no scrim down there and the
            ground was pale cream; the banner brings its own ground, so there
            is one set of colours to reason about. */}
        <div className="order-2 mx-auto w-full max-w-[310px] sm:max-w-[440px] lg:mr-0 lg:ml-auto">
          {/* Keepsakes over a zari swirl: the reference this was built from
              has a fan of old photographs lifting out of the trunk on a
              ribbon of gold. These are three silks in cream mounts, tilted
              and overlapped, with the ribbon drawn under them.

              Photographs, not an illustration. The mounts and the drop
              shadow are what let them read at all, because unlike the
              reference's plain wall the thing behind them here is another
              photograph at full strength.

              The three are chosen, not picked by id: a woman wearing silk,
              gold on silk, and a zari close-up, so the fan reads as what a
              saree is kept for. The first attempt took three ids off the
              list without looking at them and got a market floor, a loom and
              a shop rack.

              From sm only. On a 360px column three overlapping cards and a
              banner is more than the space can hold. */}
          <div aria-hidden className="relative mb-8 hidden h-[178px] sm:block">
            <svg
              viewBox="0 0 420 200"
              preserveAspectRatio="none"
              className="absolute -inset-x-8 -top-2 h-[200px] w-[calc(100%+4rem)]"
              fill="none"
            >
              <defs>
                <linearGradient id="kpc-swirl" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a87f0a" stopOpacity="0" />
                  <stop offset="28%" stopColor="#fde047" stopOpacity=".85" />
                  <stop offset="58%" stopColor="#fffbe6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#a87f0a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M8 168C48 58 150 14 244 52c94 38 148 96 168 132"
                stroke="url(#kpc-swirl)"
                strokeWidth="14"
                strokeLinecap="round"
                opacity=".3"
                style={{ filter: "blur(9px)" }}
              />
              <path
                d="M8 168C48 58 150 14 244 52c94 38 148 96 168 132"
                stroke="url(#kpc-swirl)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M28 186C74 92 158 52 252 88c94 36 134 78 152 104"
                stroke="url(#kpc-swirl)"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity=".7"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center gap-0">
              {[
                { n: 1, tilt: "-9deg", y: "10px", z: "z-10" },
                { n: 2, tilt: "4deg", y: "-14px", z: "z-20" },
                { n: 3, tilt: "11deg", y: "14px", z: "z-10" },
              ].map(({ n, tilt, y, z }, i) => (
                <span
                  key={n}
                  className={`relative block rounded-[10px] bg-cream p-1.5 pb-5 shadow-[0_14px_30px_rgba(10,46,26,.34)] ring-1 ring-yellow/35 ${z} ${
                    i === 1 ? "-mx-3" : ""
                  }`}
                  style={{ transform: `rotate(${tilt}) translateY(${y})` }}
                >
                  <span className="relative block h-[104px] w-[86px] overflow-hidden rounded-[6px]">
                    <Image
                      src={keepsakeImg(n)}
                      alt=""
                      fill
                      sizes="86px"
                      className="object-cover"
                    />
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(100deg,#a87f0a_0%,#fde047_26%,#fffbe6_46%,#fde047_66%,#a87f0a_100%)] shadow-[0_14px_36px_rgba(10,46,26,.42)]"
              style={{ clipPath: BANNER }}
            />
            <span
              aria-hidden
              className="absolute inset-[2.5px] bg-[linear-gradient(180deg,rgba(20,83,45,.86)_0%,rgba(10,46,26,.9)_100%)]"
              style={{ clipPath: BANNER }}
            />

            <div className="relative px-9 py-3.5 text-center sm:px-14 sm:py-4">
              {current.ta && (
                <p className="font-tamil text-[0.95rem] leading-snug text-yellow-light">
                  {current.ta}
                </p>
              )}
              <p className="mt-0.5 font-serif text-[clamp(1.2rem,3.2vw,1.85rem)] leading-tight text-white">
                {current.name}
              </p>
            </div>
          </div>
        </div>
      </Wrap>
    </>
  );
}

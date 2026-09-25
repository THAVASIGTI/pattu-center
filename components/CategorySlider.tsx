"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "./Icons";
import { img, sareeTypes } from "@/config/content";

/**
 * One full-width frame that advances through the saree categories on its own,
 * each slide entering from the right as the last leaves to the left.
 *
 * Change INTERVAL to alter the pace. It sits at 2600ms so the category name is
 * readable; 1000 gives the faster rhythm the hero slideshow used to have.
 */
const INTERVAL = 2600;
const SLIDE = 620;
const SHOWN = 5;

export default function CategorySlider() {
  // The frame shows the first few categories rather than every one, so a
  // visitor sees the whole cycle without waiting through eight slides.
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

  return (
    <div
      className="relative mx-auto w-full max-w-[440px] lg:mr-0 lg:ml-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* A stack of framed boxes rather than one window. The front card holds
          the image; behind it the next two sit offset and tilted, so their
          gold edges show as layers. On each tick the front card lifts away to
          the left and every card behind it steps forward one slot. */}
      {/* The cards behind lean out to the right, so on a phone the front card
          gives up that width rather than letting the stack run off screen. */}
      <div
        className="relative aspect-4/5 w-[84%] [perspective:1200px] sm:w-full"
        aria-roledescription="carousel"
        aria-label="Silk we buy"
      >
        {slides.map((t, i) => {
          // shortest way round, so a wrapping card still travels one step
          let offset = i - index;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          const active = offset === 0;
          const leaving = offset === -1;
          // Anything further back than the third card is parked out of sight,
          // which is also where a card is recycled from the front of the stack
          // to the back, so the jump is never seen.
          const parked = offset < -1 || offset > 2;

          const slot = leaving
            ? "translate3d(-124%,-4%,0) rotate(-7deg) scale(.92)"
            : `translate3d(${offset * 7}%, ${offset * 4.5}%, 0) rotate(${offset * 2.4}deg) scale(${1 - offset * 0.055})`;

          return (
            <div
              key={t.slug}
              aria-hidden={!active}
              style={{
                transform: slot,
                zIndex: 30 - offset,
                opacity: parked ? 0 : leaving ? 0 : 1,
                visibility: parked ? "hidden" : "visible",
                transitionDuration: parked ? "0ms" : `${SLIDE}ms`,
              }}
              className="cat-slide absolute inset-0 origin-bottom-left transition-[transform,opacity] [transition-timing-function:cubic-bezier(.34,.9,.3,1)]"
            >
              {/* every card carries its own zari edge, so the layers read as
                  boxes stacked on each other rather than one framed window */}
              <span aria-hidden className="foil absolute -inset-2 rounded-[32px] shadow-[0_18px_44px_rgba(10,46,26,.2)]" />
              <span aria-hidden className="absolute -inset-[3px] rounded-[30px] bg-cream" />

              <div className="relative size-full overflow-hidden rounded-[27px] bg-green-deep">
                <Image
                  src={img(t.imageId)}
                  alt={active ? `${t.name} silk` : ""}
                  fill
                  // next/image rejects priority together with loading, and the
                  // first card's offset grows past 2 as the stack advances,
                  // which would have set both. Priority covers the opening
                  // card; the rest use loading alone, eager while they are in
                  // or near the stack so none arrives blank.
                  {...(i === 0
                    ? { priority: true as const }
                    : { loading: (Math.abs(offset) <= 2 ? "eager" : "lazy") as "eager" | "lazy" })}
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,46,26,.88)_0%,rgba(10,46,26,.35)_42%,transparent_72%)]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-1.5 rounded-[22px] border border-yellow-pale/70"
                />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-6 text-center">
                  {t.ta && <p className="font-tamil text-[0.95rem] text-yellow-light">{t.ta}</p>}
                  <p className="mt-0.5 font-serif text-[clamp(1.2rem,3.4vw,1.9rem)] text-white">
                    {t.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* dots */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {slides.map((t, i) => (
          <button
            key={t.slug}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show ${t.name}`}
            aria-current={i === index}
            className="group cursor-pointer p-2"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-7 bg-yellow" : "w-1.5 bg-green/25 group-hover:bg-green/50"
              }`}
            />
          </button>
        ))}
      </div>

      <p className="mt-2 text-center">
        <Link
          href="/what-we-buy"
          className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-green underline-offset-4 hover:underline"
        >
          See everything we buy
          <ArrowRight className="size-[16px]" />
        </Link>
      </p>
    </div>
  );
}

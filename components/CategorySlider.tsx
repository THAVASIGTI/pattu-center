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
      {/* zari-style frame: gold plate, cream gap, inset hairline */}
      <div className="relative">
        <span
          aria-hidden
          className="foil absolute -inset-2.5 rounded-[34px] shadow-[0_18px_50px_rgba(10,46,26,.18)]"
        />
        <span aria-hidden className="absolute -inset-[3px] rounded-[31px] bg-cream" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1.5 z-20 rounded-[24px] border border-yellow-pale/70"
        />

        <div
          className="relative aspect-4/5 w-full overflow-hidden rounded-[28px] bg-green-deep"
          aria-roledescription="carousel"
          aria-label="Silk we buy"
        >
          {slides.map((t, i) => {
            // shortest way round, so wrapping still travels one step sideways
            let offset = i - index;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const active = offset === 0;

            return (
              <div
                key={t.slug}
                aria-hidden={!active}
                style={{
                  transform: `translate3d(${offset * 100}%, 0, 0)`,
                  transitionDuration: `${SLIDE}ms`,
                  visibility: Math.abs(offset) <= 1 ? "visible" : "hidden",
                }}
                className="cat-slide absolute inset-0 transition-transform [transition-timing-function:cubic-bezier(.4,0,.2,1)]"
              >
                <Image
                  src={img(t.imageId)}
                  alt={active ? `${t.name} silk` : ""}
                  fill
                  // next/image rejects priority together with loading, and the
                  // first slide's offset grows past 2 as the frame advances,
                  // which would have set both. Priority covers the opening slide;
                  // every other slide uses loading alone. Near neighbours load
                  // eagerly so none arrives blank as it slides in, while the far
                  // ones stay lazy to keep the hero off 1.5MB on open.
                  {...(i === 0
                    ? { priority: true as const }
                    : { loading: (Math.abs(offset) <= 2 ? "eager" : "lazy") as "eager" | "lazy" })}
                  sizes="100vw"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,46,26,.88)_0%,rgba(10,46,26,.35)_42%,transparent_72%)]"
                />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-6 text-center">
                  {t.ta && (
                    <p className="font-tamil text-[0.95rem] text-yellow-light">{t.ta}</p>
                  )}
                  <p className="mt-0.5 font-serif text-[clamp(1.2rem,3.4vw,1.9rem)] text-white">
                    {t.name}
                  </p>
                </div>
              </div>
              );
            })}
        </div>
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

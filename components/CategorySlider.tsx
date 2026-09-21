"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "./Icons";
import { img, sareeTypes, shopImg } from "@/config/content";

/**
 * One full-width frame that advances through the saree categories on its own,
 * each slide entering from the right as the last leaves to the left.
 *
 * Change INTERVAL to alter the pace. It sits at 2600ms so the category name is
 * readable; 1000 gives the faster rhythm the hero slideshow used to have.
 */
const INTERVAL = 2600;
const SLIDE = 620;

export default function CategorySlider() {
  const slides = sareeTypes.filter((t) => t.slug !== "silver");
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
      className="relative left-1/2 w-screen -translate-x-1/2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative h-[280px] overflow-hidden border-y border-yellow/40 bg-green-deep sm:h-[360px] lg:h-[440px]"
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
                src={t.boardShop ? shopImg(t.boardShop) : img(t.imageId)}
                alt={active ? `${t.name}: a saree border from our own stock` : ""}
                fill
                priority={i === 0}
                // Slides two steps out are hidden, so a lazy one could arrive
                // blank as it slides in. Load the near neighbours eagerly and
                // leave the far ones lazy so the hero is not 1.5MB on open.
                loading={Math.abs(offset) <= 2 ? "eager" : "lazy"}
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

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = { src: string; alt: string; caption: string; captionTa: string };

/**
 * How long each slide holds, in ms — one second, as specified.
 * Slides swap cleanly rather than sliding across: at this cadence any drift
 * reads as a smear, so FADE is kept short and there is no transform.
 * Raise INTERVAL to ~3500 if you ever want the captions to be readable.
 */
const INTERVAL = 1000;
const FADE = 200;

/**
 * Auto-advancing hero slideshow. Each image swaps for the next once a second;
 * the rotation pauses on hover/focus and is disabled entirely for
 * reduced-motion users, who simply get the first image.
 */
export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length]);

  return (
    <div
      className="relative mx-auto w-full max-w-[440px] lg:mr-0 lg:ml-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 -right-3.5 left-3.5 -z-10 translate-y-3.5 rounded-[30px] border border-yellow/40"
      />

      <div
        className="relative aspect-4/5 w-full overflow-hidden rounded-[30px] border border-yellow/40 shadow-deep"
        aria-roledescription="carousel"
        aria-label="Silk we buy"
      >
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.src}
              style={{ transitionDuration: `${FADE}ms` }}
              className={`hero-slide absolute inset-0 transition-opacity ease-linear ${
                active ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
              aria-hidden={!active}
            >
              <Image
                src={s.src}
                alt={active ? s.alt : ""}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(10,46,26,.9),transparent)] px-5 pt-12 pb-4">
                <p className="font-tamil text-[0.95rem] leading-tight text-yellow-light">
                  {s.captionTa}
                </p>
                <p className="mt-0.5 font-serif text-[1.05rem] text-white">{s.caption}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hold indicator */}
      <div aria-hidden className="mt-3 h-[3px] overflow-hidden rounded-full bg-cream/15">
        <span
          key={`${index}-${paused}`}
          className="foil block h-full w-full origin-left"
          style={{
            animation: paused ? "none" : `drain ${INTERVAL}ms linear forwards`,
          }}
        />
      </div>

      {/* Slide controls */}
      <div className="mt-1.5 flex items-center justify-center gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show slide ${i + 1}: ${s.caption}`}
            aria-current={i === index}
            className="group cursor-pointer p-2"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-7 bg-yellow-light"
                  : "w-1.5 bg-cream/40 group-hover:bg-cream/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

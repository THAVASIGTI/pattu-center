"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "./Icons";
import { img, sareeTypes } from "@/config/content";

/**
 * One large frame with the row of small ones under it: the big frame shows
 * the silk that is currently up, and the small boxes are both the preview of
 * what is coming and the way to jump straight to one.
 *
 * The small boxes replace the dot row that used to sit here. They do the same
 * job, so the frame still has exactly one set of controls, and they say which
 * silk each one is rather than leaving it to a numbered position.
 *
 * Slides cross-fade in place rather than travelling. The frame no longer
 * leans off its own edges, so there is no direction for a slide to come from,
 * and a fade keeps the big frame still while the small boxes carry the
 * movement.
 *
 * Change INTERVAL to alter the pace. It sits at 2600ms so the category name
 * is readable before it changes.
 */
const INTERVAL = 2600;
const FADE = 620;
const SHOWN = 5;

export default function CategorySlider() {
  // The frame shows the first few categories rather than every one, so a
  // visitor sees the whole cycle without waiting through eight slides, and so
  // the row of small boxes stays wide enough to press on a phone.
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
      {/* The big frame. Its zari edge and cream gap sit outside the image, so
          framing it costs the picture none of its own width. */}
      <div className="relative">
        <span
          aria-hidden
          className="foil absolute -inset-2 rounded-[32px] shadow-[0_18px_44px_rgba(10,46,26,.2)]"
        />
        <span aria-hidden className="absolute -inset-[3px] rounded-[30px] bg-cream" />

        <div
          className="relative aspect-4/5 overflow-hidden rounded-[27px] bg-green-deep"
          aria-roledescription="carousel"
          aria-label="Silk we buy"
        >
          {slides.map((t, i) => {
            const active = i === index;
            return (
              <div
                key={t.slug}
                aria-hidden={!active}
                style={{ transitionDuration: `${FADE}ms` }}
                className={`cat-slide absolute inset-0 transition-opacity ease-out ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={img(t.imageId)}
                  alt={active ? `${t.name} silk` : ""}
                  fill
                  // next/image rejects priority together with loading, so the
                  // opening slide takes priority and the rest take loading on
                  // its own. They are eager because all five sit inside the
                  // viewport already, only hidden by opacity, and a slide that
                  // has not loaded fades up blank.
                  {...(i === 0
                    ? { priority: true as const }
                    : { loading: "eager" as const })}
                  sizes="(max-width: 1024px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
            );
          })}

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(10,46,26,.88)_0%,rgba(10,46,26,.35)_42%,transparent_72%)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-1.5 rounded-[22px] border border-yellow-pale/70"
          />

          {/* The caption sits outside the fading slides, so the name changes
              once, cleanly, instead of two names crossing over each other. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-6 text-center">
            {slides[index].ta && (
              <p className="font-tamil text-[0.95rem] text-yellow-light">{slides[index].ta}</p>
            )}
            <p className="mt-0.5 font-serif text-[clamp(1.2rem,3.4vw,1.9rem)] text-white">
              {slides[index].name}
            </p>
          </div>
        </div>
      </div>

      {/* The row of small frames. Wider than tall, so five of them fit across
          the frame above without dropping under the 44px a finger needs.

          They sit on a pale plate because the hero now has a photograph
          behind it: five small pictures laid straight onto a sixth large one
          read as one busy field, and the gold ring on the active thumbnail
          disappears into whatever the photo happens to be doing there. The
          plate is glass-soft, which is fill only. A backdrop-blur here would
          be the fourth compositing layer in the section for a difference
          nobody would name. */}
      <div className="glass-soft mt-6 rounded-[20px] border border-white/60 p-2.5 shadow-mid">
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
                {/* Holds the small frames to the same green as the big one, so
                    the row reads as part of it rather than five loose photos. */}
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

        {/* The link rides on the plate rather than under it. Loose on the
            page it would land on whatever the hero photograph is doing at
            that point, and green type on lit yellow silk measures about
            3.3:1. On the plate the ground is settled and it clears 5.5:1. */}
        <p className="mt-2.5 border-t border-line pt-2.5 text-center">
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
  );
}

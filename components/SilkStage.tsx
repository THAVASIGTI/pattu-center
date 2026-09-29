"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Wrap } from "./ui";
import { img, sareeTypes } from "@/config/content";

/**
 * The hero's ground: the silk itself, changing under the copy.
 *
 * Nothing is laid over it but the name of the silk that is up. No frame, no
 * plate, no row of small frames: the photograph fills the right of the section
 * and dissolves into the cream before it reaches the words.
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

        {/* The name of the silk that is up, laid on the picture rather than
            in anything. What keeps it readable is the photograph darkening
            under it: a soft ellipse faded to nothing inside its own box, so
            it reads as depth in the image and not as a panel.

            The 50%/50% ending shape is the part that has to be right. It puts
            the zero stop exactly on the span's edge; sized past 100% the
            gradient is cut off mid-tone and what lands is a hard rectangle.

            Only from lg, where the photograph is at full strength. Below that
            the ground is 88 to 94% cream, a dark patch would be a bruise on a
            pale section, and the name stays green and gold instead.

            Not a live region. It changes on its own every 2.6s, and a live
            region would read the whole list out to a screen reader on a
            loop. The pictures are decorative and this is their caption. */}
        <div className="relative order-2 mx-auto w-full max-w-[440px] text-center lg:mr-0 lg:ml-auto">
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-x-40 -inset-y-14 hidden bg-[radial-gradient(50%_50%_at_50%_48%,rgba(10,46,26,.94)_0%,rgba(10,46,26,.88)_44%,rgba(10,46,26,0)_100%)] lg:block"
          />
          {current.ta && (
            <p className="relative font-tamil text-[0.95rem] text-yellow-ink lg:text-yellow-light">
              {current.ta}
            </p>
          )}
          <p className="relative mt-1 font-serif text-[clamp(1.4rem,3.4vw,2rem)] leading-tight text-green-deep lg:text-white">
            {current.name}
          </p>
        </div>
      </Wrap>
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Wrap } from "./ui";
import { cardImg, heroSubject, sareeTypes } from "@/config/content";

/**
 * The hero's right half: a woman in Kanchipuram silk, with a fan of keepsake
 * photographs lifting away from her on a ribbon of zari.
 *
 * The subject is one still photograph now. Five silks used to cross-fade in
 * this space, and the movement has moved rather than gone: it is the fan that
 * cycles, which is where it belongs, because those cards are the old sarees
 * and she is the person who kept them. The banner names whichever is at the
 * front.
 *
 * prefers-reduced-motion lengthens the dwell rather than stopping it. Nothing
 * on the page can pause this, so the setting is the only control anyone has,
 * but a cross-fade is not the motion it is aimed at; travel, parallax and
 * zoom are. globals.css eases .cat-slide to 1500ms and the dwell goes to
 * SLOW_INTERVAL here.
 */
const INTERVAL = 2600;
const SLOW_INTERVAL = 6000;
const FADE = 620;
const SHOWN = 5;

/* Swallowtail ends: the band runs full width and both edges are notched back
   into it by NOTCH. Used twice, once for the zari edge and once for the green
   inset over it, so the two silhouettes agree. */
const NOTCH = "26px";
const BANNER = `polygon(0% 0%, 100% 0%, calc(100% - ${NOTCH}) 50%, 100% 100%, 0% 100%, ${NOTCH} 50%)`;

/* Where each of the three cards sits. The front one is the silk the banner
   names; the other two are what is coming. */
const FAN = [
  { tilt: "-9deg", y: "10px", z: "z-10", nudge: "" },
  { tilt: "4deg", y: "-14px", z: "z-20", nudge: "-mx-3" },
  { tilt: "11deg", y: "14px", z: "z-10", nudge: "" },
];

export default function SilkStage({ children }: { children: ReactNode }) {
  const slides = sareeTypes.filter((t) => t.slug !== "silver").slice(0, SHOWN);
  const count = slides.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(id);
      id = setInterval(() => setIndex((i) => (i + 1) % count),
        mq.matches ? SLOW_INTERVAL : INTERVAL);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => { clearInterval(id); mq.removeEventListener("change", sync); };
  }, [count]);

  const current = slides[index];
  // Front card first, so the fan reads left, front, right with the named silk
  // in the middle where the eye lands.
  const fan = [1, 0, 2].map((k) => slides[(index + k) % count]);

  return (
    <>
      {/* From lg the photograph covers the right 64% and its own gradient
          dissolves it into the cream before it reaches the copy: solid to
          24%, gone by 40%, then deepening to green at the edge. Those stops
          are measured; scratchpad/probe.py shoots the bare ground and samples
          the real line boxes of every run over it.

          Below lg it takes two layers, because one gradient cannot be open at
          the sides and closed behind the words at once. A flat base carries
          the foot of the section and a radial over it puts the cream back
          where the copy is. What is left uncovered is the sides and the
          bottom corners, and that is where the saree shows.

          The flat band from 148 to 392px is the condition tags and the row of
          four promises, the real text down in the open part: measured at 163
          to 368px off the foot at 360, 390 and 430, and 190 to 293 at 768.
          Below that the only thing left is the banner, which is opaque, so
          the last 118px can open right up.

          object-position holds her near the top: the source is a 2:3 portrait
          and this panel is close to square on a laptop, so a centred crop cuts
          the face away and leaves only cloth.

          She is mirrored, and that is not a flourish. The panel is barely
          wider than the photograph once it covers, so there is almost no
          horizontal crop to play with, and in the original her face and
          necklace sit in the LEFT half, which is precisely the half the cream
          dissolve exists to swallow. Flipped, the jewellery lands on the side
          that is actually visible.

          The right edge only tints now. It used to deepen to rgba(10,46,26,.48)
          so the banner had something to stand against, which was right for an
          abstract close-up of cloth and wrong for a person: it put her in
          shadow. The banner is opaque and does not need the help. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[64%]">
        <Image
          src={heroSubject}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 64vw"
          className="scale-x-[-1] object-cover object-[46%_14%] lg:object-[52%_17%]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(251,253,249,.10)_0px,rgba(251,253,249,.14)_118px,rgba(251,253,249,.88)_148px,rgba(251,253,249,.88)_392px,rgba(251,253,249,.55)_430px,rgba(251,253,249,.5)_100%)] lg:hidden" />
        <span className="absolute inset-0 bg-[radial-gradient(78%_62%_at_50%_22%,rgba(251,253,249,.92)_0%,rgba(251,253,249,.86)_52%,rgba(251,253,249,.5)_88%,rgba(251,253,249,.16)_100%)] lg:hidden" />
        <span className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fbfdf9_0%,rgba(251,253,249,.97)_24%,rgba(251,253,249,.55)_40%,rgba(237,246,239,.2)_58%,rgba(10,46,26,.14)_100%)] lg:block" />
      </div>

      <Wrap className="relative z-10 grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:py-20">
        {children}

        <div className="order-2 mx-auto w-full max-w-[310px] sm:max-w-[440px] lg:mr-0 lg:ml-auto">
          {/* The fan, on a ribbon of zari. Cream mounts and a drop shadow are
              load-bearing rather than styling: what sits behind them is a
              photograph at full strength, not a plain wall.

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
              <path d="M8 168C48 58 150 14 244 52c94 38 148 96 168 132"
                stroke="url(#kpc-swirl)" strokeWidth="14" strokeLinecap="round"
                opacity=".3" style={{ filter: "blur(9px)" }} />
              <path d="M8 168C48 58 150 14 244 52c94 38 148 96 168 132"
                stroke="url(#kpc-swirl)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M28 186C74 92 158 52 252 88c94 36 134 78 152 104"
                stroke="url(#kpc-swirl)" strokeWidth="1.2" strokeLinecap="round" opacity=".7" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              {fan.map((t, i) => (
                <span
                  key={FAN[i].tilt}
                  className={`relative block rounded-[10px] bg-cream p-1.5 pb-5 shadow-[0_14px_30px_rgba(10,46,26,.34)] ring-1 ring-yellow/35 ${FAN[i].z} ${FAN[i].nudge}`}
                  style={{ transform: `rotate(${FAN[i].tilt}) translateY(${FAN[i].y})` }}
                >
                  <span className="relative block h-[104px] w-[86px] overflow-hidden rounded-[6px] bg-cream-2">
                    {slides.map((s) => (
                      <Image
                        key={s.slug}
                        src={cardImg(s.slug)}
                        alt=""
                        fill
                        sizes="86px"
                        style={{ transitionDuration: `${FADE}ms` }}
                        className={`cat-slide object-cover transition-opacity ease-out ${
                          s.slug === t.slug ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ))}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <span aria-hidden
              className="absolute inset-0 bg-[linear-gradient(100deg,#a87f0a_0%,#fde047_26%,#fffbe6_46%,#fde047_66%,#a87f0a_100%)] shadow-[0_14px_36px_rgba(10,46,26,.42)]"
              style={{ clipPath: BANNER }} />
            <span aria-hidden
              className="absolute inset-[2.5px] bg-[linear-gradient(180deg,rgba(20,83,45,.86)_0%,rgba(10,46,26,.9)_100%)]"
              style={{ clipPath: BANNER }} />

            <div className="relative px-9 py-3.5 text-center sm:px-14 sm:py-4">
              {current.ta && (
                <p className="font-tamil text-[0.95rem] leading-snug text-yellow-light">
                  {current.ta}
                </p>
              )}
              <p className="mt-1 font-serif text-[clamp(1.2rem,3.2vw,1.85rem)] leading-tight text-white">
                {current.name}
              </p>
            </div>
          </div>
        </div>
      </Wrap>
    </>
  );
}

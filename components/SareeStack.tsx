"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { stackImg } from "@/config/content";

/**
 * A pile of the shop's own sarees, with the top one lifting away every few
 * seconds to show the next.
 *
 * This stands where a single piece of supplied artwork used to. The artwork
 * was a painting of the idea of the business; this is the business. Every
 * card is a saree that actually came over a counter, photographed by the
 * shop, so the first thing a visitor sees is the real thing she is being
 * asked to sell rather than an illustration of it.
 *
 * The pile is the point and not a transition effect. A stack is how silk is
 * kept, how it is carried in, and how it is handed over, and one saree laid
 * flat reads as one saree where a stack reads as a trade.
 *
 * It is also the one thing on the page a visitor can work. Tapping it brings
 * the next saree up, which is why the whole stack is a real button with a
 * label rather than a div with a click handler: it is reachable by keyboard,
 * it is announced, and it is comfortably bigger than a thumb.
 *
 * Without JavaScript the first saree is simply the one showing, and the
 * others sit behind it, which is a perfectly good picture. Nothing here is
 * hidden until a script runs.
 */

/* Five of the shop's own, chosen for colour and weave rather than at random,
   and cropped to one 3:4 ratio so the pile reads as a pile rather than as
   five differently shaped cards. Replace freely: nothing below counts them. */
const SAREES = [
  { n: 13, alt: "A lavender pattu saree with gold butta scattered across the body, bought over our counter" },
  { n: 18, alt: "A red and gold tissue saree, its pallu almost solid zari, bought over our counter" },
  { n: 21, alt: "A teal and magenta saree with a wide gold zari border, bought over our counter" },
  { n: 3, alt: "A slate blue saree with gold butta and broad zari bands, bought over our counter" },
  { n: 26, alt: "A blue-violet saree with a heavy gold brocade pallu, bought over our counter" },
];

/* Where a card sits once it is this many places back from the front. Kept as
   data because the whole component is one lookup into it, and because the
   depth beyond the last entry is simply "not shown yet". */
const DEPTH = [
  { x: "0%", y: "0%", rot: 0, scale: 1, z: 50, o: 1 },
  { x: "-7%", y: "5%", rot: -7, scale: 0.95, z: 40, o: 1 },
  { x: "8%", y: "9%", rot: 8, scale: 0.9, z: 30, o: 1 },
  { x: "-9%", y: "13%", rot: -11, scale: 0.85, z: 20, o: 0.55 },
];

export default function SareeStack() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % SAREES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setActive((a) => (a + 1) % SAREES.length)}
        aria-label="Show the next saree"
        /* aspect-3/4 matches the crop, and the cards are inset inside it so
           the rotated ones have somewhere to go instead of being clipped by
           the button's own box. */
        className="relative block aspect-3/4 w-full cursor-pointer"
      >
        {SAREES.map((s, i) => {
          const depth = (i - active + SAREES.length) % SAREES.length;
          const d = DEPTH[depth];
          return (
            <span
              key={s.n}
              className="saree-card absolute inset-[10%] block overflow-hidden rounded-[18px] border border-line-yellow bg-cream shadow-mid transition-all duration-[900ms] ease-out"
              style={{
                transform: d
                  ? `translate(${d.x}, ${d.y}) rotate(${d.rot}deg) scale(${d.scale})`
                  : "translate(0,0) rotate(0deg) scale(0.82)",
                zIndex: d ? d.z : 10,
                opacity: d ? d.o : 0,
              }}
            >
              <Image
                src={stackImg(s.n)}
                alt={s.alt}
                fill
                sizes="(max-width: 1279px) 340px, 420px"
                priority={i === 0}
                className="object-cover"
              />
              {/* The catch of light along the zari, only on the card in
                  front, so the pile has one lit face the way a real one
                  does. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,transparent_40%,rgba(255,251,230,.16)_52%,transparent_64%)] transition-opacity duration-700"
                style={{ opacity: depth === 0 ? 1 : 0 }}
              />
            </span>
          );
        })}
      </button>

      <p className="mt-5 flex items-center justify-center gap-3 text-[0.82rem] text-ink-soft xl:justify-start">
        <span className="flex gap-1.5">
          {SAREES.map((s, i) => (
            <span
              key={s.n}
              aria-hidden
              className={`block size-1.5 rounded-full transition-colors duration-500 ${
                i === active ? "bg-yellow-ink" : "bg-line-yellow"
              }`}
            />
          ))}
        </span>
        Sarees that came over our counters
      </p>
    </div>
  );
}

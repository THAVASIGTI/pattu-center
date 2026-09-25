import Image from "next/image";
import { logoNav } from "@/config/content";

/**
 * Animated hero ground: the mark as a faint watermark, with zari rings and
 * gold motes drifting over a flat cream field. No grid and no gradient wash, so what moves is the only thing there
 * is to see. All pure CSS, so the static export needs no JavaScript for it.
 *
 * Everything is parked away from the middle, because the copy sits there and
 * nothing here is allowed to make it harder to read.
 *
 * Reduced-motion users get the same picture, slowed rather than stopped.
 */

// [top, left, size, border, colour, duration, delay]
// Sizes are viewport-relative with a floor, or a ring drawn for a 1440px
// section would swing right across the copy on a phone.
const RINGS: [string, string, string, string, string, string, string][] = [
  ["-8%", "-6%", "clamp(150px, 20.8vw, 300px)", "2px", "rgba(202,154,4,.30)", "34s", "0s"],
  ["58%", "-12%", "clamp(200px, 29.2vw, 420px)", "1px", "rgba(21,128,61,.20)", "46s", "-12s"],
  ["6%", "72%", "clamp(130px, 18vw, 260px)", "2px", "rgba(202,154,4,.24)", "39s", "-22s"],
  ["64%", "80%", "clamp(170px, 23.6vw, 340px)", "1px", "rgba(21,128,61,.16)", "52s", "-6s"],
  ["34%", "40%", "clamp(90px, 12.5vw, 180px)", "1px", "rgba(202,154,4,.14)", "43s", "-30s"],
];

// [left, size, colour, duration, delay]
const MOTES: [string, string, string, string, string][] = [
  ["8%", "7px", "rgba(202,154,4,.5)", "19s", "0s"],
  ["21%", "4px", "rgba(21,128,61,.4)", "25s", "-8s"],
  ["37%", "6px", "rgba(202,154,4,.38)", "22s", "-15s"],
  ["54%", "4px", "rgba(202,154,4,.45)", "27s", "-4s"],
  ["69%", "7px", "rgba(21,128,61,.32)", "21s", "-19s"],
  ["83%", "5px", "rgba(202,154,4,.42)", "24s", "-11s"],
  ["94%", "4px", "rgba(202,154,4,.3)", "29s", "-24s"],
];

export default function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The mark, printed into the ground rather than placed on it. Kept far
          enough down in opacity that the copy over it is unaffected, with a
          soft shadow so it reads as pressed into the paper. */}
      <Image
        src={logoNav}
        alt=""
        aria-hidden
        width={256}
        height={256}
        className="hero-watermark absolute top-1/2 left-[4%] w-[clamp(200px,30vw,420px)] -translate-y-1/2 opacity-[0.07] [filter:drop-shadow(0_12px_26px_rgba(10,46,26,.45))]"
        style={{ animation: "ring-drift 96s ease-in-out infinite" }}
      />

      {RINGS.map(([top, left, size, border, colour, duration, delay], i) => (
        <span
          key={`r${i}`}
          className="hero-ring absolute rounded-full"
          style={{
            top,
            left,
            width: size,
            height: size,
            border: `${border} solid ${colour}`,
            animation: `ring-drift ${duration} ease-in-out ${delay} infinite`,
          }}
        />
      ))}

      {MOTES.map(([left, size, colour, duration, delay], i) => (
        <span
          key={`m${i}`}
          className="hero-mote absolute rounded-full"
          style={{
            left,
            bottom: "-12px",
            width: size,
            height: size,
            background: colour,
            animation: `mote-rise ${duration} linear ${delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

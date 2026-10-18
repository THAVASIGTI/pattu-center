import Image from "next/image";
import { logoNavLight } from "@/config/content";

/**
 * Animated hero ground: the mark as a faint watermark, with zari rings and
 * gold motes drifting across the section. All pure CSS, so the static export
 * needs no JavaScript for it.
 *
 * Everything is parked away from the middle, because the copy sits there and
 * nothing here is allowed to make it harder to read. That was the intent from
 * the start; the alphas did not honour it. Rings are drawn viewport-relative,
 * so at some widths two of them cross under the copy, and two passes of
 * rgba(21,128,61,.20) paint the ground (160,203,175), which took the hero's
 * subline to 4.18:1 against a 4.5:1 body floor. It had been that way since
 * these rings were written and nothing had measured it.
 *
 * So the alphas are set by what survives a DOUBLE pass, not a single one.
 *
 * The field under all of this used to be flat cream and is now a photograph
 * under a dark scrim, which changes which colours are even visible. The
 * green rings and green motes were a shade off the cream ground and vanish
 * against the scrim, so they are gold and cream here, and the watermark is
 * lifted because it was ink on cream and the page is no longer cream. Light
 * on dark reverses the arithmetic too: this layer now ADDS luminance where
 * it used to take it away, so no alpha went up and the hero was re-measured
 * with the lot in place.
 *
 * Reduced-motion users get the same picture, slowed rather than stopped.
 */

// [top, left, size, border, colour, duration, delay]
// Sizes are viewport-relative with a floor, or a ring drawn for a 1440px
// section would swing right across the copy on a phone.
const RINGS: [string, string, string, string, string, string, string][] = [
  ["-8%", "-6%", "clamp(150px, 20.8vw, 300px)", "2px", "rgba(253,224,71,.17)", "34s", "0s"],
  ["58%", "-12%", "clamp(200px, 29.2vw, 420px)", "1px", "rgba(251,253,249,.11)", "46s", "-12s"],
  ["6%", "72%", "clamp(130px, 18vw, 260px)", "2px", "rgba(253,224,71,.15)", "39s", "-22s"],
  ["64%", "80%", "clamp(170px, 23.6vw, 340px)", "1px", "rgba(251,253,249,.10)", "52s", "-6s"],
  ["34%", "40%", "clamp(90px, 12.5vw, 180px)", "1px", "rgba(253,224,71,.09)", "43s", "-30s"],
];

// [left, size, colour, duration, delay]
const MOTES: [string, string, string, string, string][] = [
  ["8%", "7px", "rgba(253,224,71,.28)", "19s", "0s"],
  ["21%", "4px", "rgba(251,253,249,.24)", "25s", "-8s"],
  ["37%", "6px", "rgba(253,224,71,.22)", "22s", "-15s"],
  ["54%", "4px", "rgba(253,224,71,.26)", "27s", "-4s"],
  ["69%", "7px", "rgba(251,253,249,.20)", "21s", "-19s"],
  ["83%", "5px", "rgba(253,224,71,.24)", "24s", "-11s"],
  ["94%", "4px", "rgba(253,224,71,.18)", "29s", "-24s"],
];

export default function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The mark, printed into the ground rather than placed on it. The
          light variant, because the dark one was drawn to sit on cream and
          the ground is a scrimmed photograph now. Kept far enough down in
          opacity that the copy over it is unaffected. */}
      <Image
        src={logoNavLight}
        alt=""
        aria-hidden
        width={256}
        height={256}
        className="hero-watermark absolute top-1/2 left-[4%] w-[clamp(200px,30vw,420px)] -translate-y-1/2 opacity-[0.055] [filter:drop-shadow(0_12px_26px_rgba(0,0,0,.5))]"
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

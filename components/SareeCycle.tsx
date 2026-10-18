import Image from "next/image";
import { buyCategories, catImg } from "@/config/content";

/**
 * The hero's ground: stacks of silk, one at a time, under a wash.
 *
 * The section's field was drawn gold on flat cream. This puts photographs of
 * the goods behind that instead, each holding for two seconds and dissolving
 * into the next, with the drawn borders still running over the top.
 *
 * Two decisions are worth recording.
 *
 * The photographs are the SAME SIX FILES the category board further down the
 * page already loads, at the same 620px. A hero-sized set would have been
 * sharper and would have cost the page another 150KB on top of the ones it
 * downloads anyway, for pictures that are about to be covered by a wash.
 * 620px stretched across a 1440px section is a little over two times up, and
 * soft is what a ground should be; it is the copy that has to be crisp. If
 * the shop ever supplies large photographs of their own counter, point
 * `catImg` at them and this gets better for nothing.
 *
 * The wash is not decoration. Six photographs of coloured silk is the most
 * hostile ground this site has ever put under type, so the alphas below were
 * set by measuring glyph pixels against the rendered ground, once per phase
 * of the cycle, and the worst phase is the one they answer to.
 *
 * What it cost, worst case over all six photographs and three widths:
 *
 *     gold headline   5.23 -> 4.38   floor 3.0, large text
 *     lead paragraph  4.84 -> 4.54   floor 4.5
 *     goods chips     5.15 -> 4.84   floor 4.5
 *     condition tags  4.35 -> 5.35   floor 4.5, see below
 *
 * The lead was the binding constraint and is what fixed the core of the
 * desktop wash at 0.97: at 0.94 it measured 4.39, under the floor. The
 * condition tags went UP because this change forced a fix that was already
 * outstanding, the green used as small type, now --color-green-ink.
 *
 * Thinning any of these to show more silk costs contrast directly, and the
 * numbers above are the whole margin there is. Re-measure, do not guess.
 */

/* The keyframes in globals.css cut the cycle into six equal slots, so this
   takes six. Slicing rather than trusting the length means adding a seventh
   category to the board cannot quietly break the loop. */
const STACKS = buyCategories.slice(0, 6);

/** Seconds each stack holds the ground, the client's number. */
const SLOT = 2;
const CYCLE = SLOT * STACKS.length;

export default function SareeCycle() {
  /* The bottom layer is a static copy of the LAST stack in the cycle, which
     is the one the sixth slot leaves showing. It is what the cycling layers
     dissolve against, so there is always an opaque picture under them and
     never a flash of bare cream between two of them. */
  const base = STACKS[STACKS.length - 1];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image
        src={catImg(base.imageId)}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />

      {STACKS.map((c, i) => (
        <Image
          key={c.slug}
          src={catImg(c.imageId)}
          alt=""
          fill
          sizes="100vw"
          className="saree-cycle object-cover object-center opacity-0"
          style={{ animation: `saree-cycle ${CYCLE}s linear ${i * SLOT}s infinite` }}
        />
      ))}

      {/* The wash, shaped to the copy rather than spread evenly.

          An even wash is the obvious thing and it is the wrong thing: set
          dense enough for the headline it flattens the whole section to
          cream and there is no point having put photographs there, and set
          light enough to see the silk it puts a maroon border under a line
          of type. So it is a radial centred on the block of copy, heavy in
          the middle where every word is and thinning towards the edges,
          where the only things over it are the artwork and empty field.

          Two of them, because the copy is not in the same place at both
          layouts: centred over the full width below xl, a left column with
          the artwork beside it from xl. Two elements rather than one
          responsive gradient, because Tailwind can only swap a whole
          background-image at a breakpoint and interpolating the stops into
          one declaration would hide which number belongs to which layout. */}
      <span className="absolute inset-0 bg-[radial-gradient(120%_64%_at_50%_33%,rgba(251,253,249,.95)_0%,rgba(251,253,249,.92)_58%,rgba(251,253,249,.70)_100%)] xl:hidden" />
      <span className="absolute inset-0 hidden bg-[radial-gradient(60%_80%_at_30%_53%,rgba(251,253,249,.97)_0%,rgba(251,253,249,.95)_52%,rgba(251,253,249,.64)_86%,rgba(251,253,249,.48)_100%)] xl:block" />
    </div>
  );
}

import Image from "next/image";
import { buyCategories, catImg } from "@/config/content";

/**
 * The hero's ground: stacks of silk, full bleed, one at a time.
 *
 * This is the whole hero now. There was a piece of supplied artwork beside
 * the copy, a woman with a trunk of sarees, and the photographs sat behind
 * everything under a cream wash dense enough that they read as a tint
 * rather than as cloth. The artwork is gone at the client's request and the
 * silk is the picture: full width, each stack holding two seconds and
 * dissolving into the next.
 *
 * That flipped the section from light to dark, and it had to. A cream wash
 * heavy enough to carry dark type over a photograph is heavy enough to hide
 * the photograph, which is the trap the first version fell into: at 0.97
 * the hero was cream with a faint stain of colour in it. A dark scrim does
 * the opposite. Light type needs the ground DARKER, and darkening a
 * photograph of coloured silk deepens it rather than erasing it, so the
 * sarees read more strongly at 0.80 dark than they ever did at 0.90 light.
 * Everything in the copy had to be restyled for a dark ground; see page.tsx.
 *
 * The photographs are the SAME SIX FILES the category board further down the
 * page already loads, at the same 620px. A hero-sized set would have been
 * sharper and would have cost the page another 150KB on top of the ones it
 * downloads anyway. 620px stretched across a 1440px section is a little over
 * two times up, and soft is what a ground should be; it is the copy that has
 * to be crisp. If the shop ever supplies large photographs of their own
 * counter, point `catImg` at them and this gets better for nothing.
 *
 * The scrim is not decoration, but it is thinner than it was, twice over.
 * The client asked to see more of the silk, and the way to afford that was
 * not to thin the scrim and hope: it was to find more contrast elsewhere
 * first and spend it here. Two things paid for it.
 *
 * A soft dark halo on the copy, `on-silk` in globals.css, which darkens the
 * ground only where there is a glyph instead of everywhere. And the second
 * line of the headline going from the brand's gold foil to white, at the
 * client's request, which happened to retire the single tightest colour on
 * the site: gold over a photograph ran 3.48:1 against a 3.0 floor with
 * nothing to spare and was the one thing holding the scrim up. White on the
 * same ground measures around 8:1.
 *
 * Between them the compounded scrim came down from about 0.88 over the copy
 * to about 0.65, and every run of type still clears its floor with room.
 *
 * The alphas were set by measuring glyph pixels against the rendered
 * ground, once per phase of the cycle and at three widths, and the worst
 * phase is the one they answer to. Worst case of eighteen measurements per
 * run of text:
 *
 *     promise sub     5.12:1   floor 4.5
 *     goods chips     5.44:1   floor 4.5
 *     welcome line    5.45:1   floor 4.5
 *     condition tags  5.70:1   floor 4.5
 *     lead            5.80:1   floor 4.5
 *     call button     5.96:1   floor 4.5
 *     headline        7.43:1   floor 3.0, large text
 *
 * The promise row is the binding constraint now. Thinning further comes
 * straight out of its 0.62. Re-measure, do not guess.
 */

/* The keyframes in globals.css cut the cycle into six equal slots, so this
   takes six. Slicing rather than trusting the length means adding a seventh
   category to the board cannot quietly break the loop. */
const STACKS = buyCategories.slice(0, 6);

/* Two seconds a stack, the client's number, lives in globals.css beside the
   keyframes as --slot, with the cycle as --cycle. It cannot be written here
   as an inline `animation:` shorthand, which is what it was: a shorthand
   sets animation-play-state and animation-duration along with everything
   else, and inline it outranks any stylesheet rule that is not !important.
   That left no way to slow the cycle for prefers-reduced-motion without
   also hard-coding the six delays, so the only thing the rule there could
   do was cut it dead, and anyone with that setting on got a frozen
   photograph instead of the feature. All this passes now is the layer's
   index; the stylesheet multiplies it by the slot. */

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
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}

      {/* The scrim, in two passes, one element each so the two jobs stay
          separable.

          The first is the floor: the whole frame goes down to the brand's
          darkest green, a little heavier at the very top where the header
          sits over it and at the foot where the temple rule closes the
          section. It is what makes every pixel of the hero dark enough to
          take light type at all.

          The second is the pool under the copy. The copy is centred at
          every width now that the artwork beside it is gone, so one
          centred radial does it, and the corners are left alone: at the
          four corners of the hero only the floor applies and the silk is
          as clear as it gets. Compounded in the middle the two come to
          about 0.65, at the edges about 0.52.

          The scrim colour is darker and much less saturated than the
          brand's green-deep, and that is the one choice here that is about
          the photographs rather than the type. At this alpha the scrim's
          own hue is most of what you see, so a saturated green turned every
          stack of silk green and the magenta and gold went with it. Pulling
          it down to near-black with a green cast lets the cloth keep its
          own colour while doing the same work on luminance.

          Separate elements rather than stacked background-images, because
          each has to be able to change without disturbing the other.

          Worth knowing before reaching for more of this: when the hero's
          type came up short the obvious suspect was the photographs, and a
          third pass was added here to hold them down. It made almost no
          difference, because the bright ground under those glyphs was not a
          photograph at all. It was the drawn zari bands, which sit ABOVE
          this component and which, on a cream hero, darkened the ground and
          on a dark one light it. The fix was in Zari.tsx. Measure what is
          actually under the glyph before thickening the scrim; the scrim
          costs the silk and might not even be the thing in the way. */}
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,24,14,.66)_0%,rgba(5,24,14,.50)_26%,rgba(5,24,14,.52)_62%,rgba(5,24,14,.70)_100%)]" />
      <span className="absolute inset-0 bg-[radial-gradient(95%_80%_at_50%_50%,rgba(5,24,14,.30)_0%,rgba(5,24,14,.20)_58%,rgba(5,24,14,0)_100%)]" />
    </div>
  );
}

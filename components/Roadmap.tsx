import { ArrowRight, stepIcons } from "./Icons";
import Reveal from "./Reveal";

/**
 * The stops as a horizontal timeline: a zari spine running left to right with
 * a marked node for each stop, and the stops themselves in frosted cards
 * hung alternately above and below the line.
 *
 * From `xl` the six stops share the width equally. Below that they become a
 * snap rail that scrolls sideways, because six columns at 1024px leaves each
 * blurb around eighteen characters of measure. In the rail every card sits
 * below the line: alternating only reads as a path when several stops are
 * in view at once, and a rail shows barely more than one.
 *
 * The cards are taken out of flow and given the exact height of their half
 * of the track, so all six are the same size whatever their blurb runs to.
 * Sizing them to their content instead left the row ragged along the top,
 * because a card hung above the line is anchored by its bottom edge, and it
 * also let a long blurb drag its own node out of line with the other five.
 *
 * TRACK therefore has to stay at least twice CLEAR plus the tallest content
 * in `roadmap`. At 1280px and up the six stops need between 261px and 285px,
 * so 662px is the floor and this leaves about 24px of headroom. It is kept
 * close to that floor on purpose: every pixel above it is empty space at the
 * foot of the five cards that are not the tallest. Lengthen a blurb by more
 * than a line or so and this number has to go up with it, or that stop will
 * overflow its card.
 */
const TRACK = 710; // px, the full height of the desktop track
const CLEAR = 46; // px from the centre line to the nearest card edge

export default function Roadmap({
  stops,
}: {
  stops: { icon: string; stop: string; when: string; blurb: string }[];
}) {
  return (
    <div className="relative">
      {/* The spine sits on the centre line of the track on desktop, and level
          with the middle of the node discs in the rail. It stops short at
          both ends so it reads as a path rather than a rule. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[38px] right-0 left-0 z-0 h-px bg-[linear-gradient(90deg,transparent,rgba(202,154,4,.5)_6%,rgba(202,154,4,.5)_94%,transparent)] xl:top-1/2 xl:right-[6%] xl:left-[6%]"
      />

      {/* Below `xl` this is a scroll container whose cards hold nothing
          focusable, so without a tab stop of its own a keyboard user could
          not reach stops four to six at all. Focused, it takes arrow keys
          like any scroll region. */}
      <ol
        tabIndex={0}
        aria-label="The six stops, in order"
        style={{ ["--track" as string]: `${TRACK}px`, ["--clear" as string]: `${CLEAR}px` }}
        className="rail rounded-[24px] outline-offset-4 focus-visible:outline-2 focus-visible:outline-green -mx-5 px-5 [grid-auto-columns:76%] sm:[grid-auto-columns:46%] lg:[grid-auto-columns:32%] xl:mx-0 xl:grid xl:h-[var(--track)] xl:grid-flow-col xl:auto-cols-fr xl:gap-3 xl:overflow-visible xl:px-0"
      >
        {stops.map((s, i) => {
          const Icon = stepIcons[s.icon];
          const above = i % 2 === 0;
          return (
            <li key={s.stop} className="relative pt-[76px] xl:h-full xl:pt-0">
              <span
                aria-hidden
                className="absolute top-[10px] left-0 z-10 grid size-[56px] place-items-center rounded-full border border-line-yellow bg-cream text-green shadow-[0_2px_12px_rgba(10,46,26,.12)] xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2"
              >
                <Icon className="size-[26px]" />
              </span>

              <Reveal
                delay={i * 80}
                from={above ? "up" : "scale"}
                className={`xl:absolute xl:inset-x-0 xl:h-[calc(50%-var(--clear))] ${
                  above ? "xl:bottom-[calc(50%+var(--clear))]" : "xl:top-[calc(50%+var(--clear))]"
                }`}
              >
                <div className="glass-soft h-full rounded-[22px] border border-line p-4 shadow-soft xl:p-[18px] transition-colors duration-300 hover:border-line-yellow">
                  {/* The timing sits under the heading rather than beside the
                      numeral. On the line with it, a label like "Before you
                      decide" had about ten characters of room in a 186px
                      column and broke across three lines. */}
                  <p className="flex items-center gap-2.5">
                    <span className="font-serif text-[0.95rem] leading-none text-yellow-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="foil h-px w-6 shrink-0" />
                  </p>

                  <h3 className="mt-2.5 font-serif text-[1.18rem] leading-tight text-green-deep">
                    {s.stop}
                  </h3>

                  <p className="mt-1.5 text-[0.65rem] font-semibold tracking-[0.14em] text-yellow-ink uppercase">
                    {s.when}
                  </p>

                  <p className="mt-2 text-[0.86rem] leading-[1.5] text-ink-soft">{s.blurb}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* The same hint the testimonial rail carries, because at these widths
          three of the six stops are off the right edge with nothing to say so. */}
      <p className="mt-4 flex items-center justify-center gap-2 text-[0.76rem] font-medium tracking-[0.09em] text-ink-mute uppercase xl:hidden">
        <ArrowRight className="size-[15px] animate-nudge" />
        Swipe for the rest
      </p>
    </div>
  );
}

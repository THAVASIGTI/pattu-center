import Link from "next/link";
import { branchCities } from "@/config/business";

/**
 * A band of the places we buy in, scrolling past on its own.
 *
 * The track holds three copies of the list and travels exactly one copy's
 * width, so the loop is seamless. Three rather than two because two copies
 * leave a gap on a very wide screen. Change this and the `marquee-x` keyframe
 * has to change with it: the two are a pair.
 */
const REPEATS = 3;

export default function BranchMarquee() {
  return (
    <section
      aria-label="Where we buy"
      className="relative overflow-hidden border-y border-yellow/30 bg-[linear-gradient(90deg,#0a2e1a_0%,#15803d_50%,#0a2e1a_100%)]"
    >
      {/* Hovering or tabbing into the band holds it still, so a name can
          actually be read and clicked rather than chased. */}
      <div className="marquee flex w-max hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {Array.from({ length: REPEATS }, (_, copy) => (
          <ul
            key={copy}
            // Only the first copy is read out; the rest are there to make the
            // loop seamless and would otherwise repeat every name three times.
            aria-hidden={copy > 0}
            className="flex shrink-0 items-center py-3.5"
          >
            {branchCities.map((b) => (
              <li key={b.slug} className="flex items-center">
                <Link
                  href={`/branches/${b.slug}`}
                  tabIndex={copy > 0 ? -1 : undefined}
                  className="px-6 font-serif text-[clamp(1rem,2.6vw,1.22rem)] whitespace-nowrap text-cream transition-colors hover:text-yellow-light"
                >
                  {b.city}
                </Link>
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rotate-45 bg-yellow/70"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* The band runs to both edges, so the ends are faded rather than cut. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-[linear-gradient(90deg,#0a2e1a,transparent)] sm:w-24"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-[linear-gradient(270deg,#0a2e1a,transparent)] sm:w-24"
      />
    </section>
  );
}

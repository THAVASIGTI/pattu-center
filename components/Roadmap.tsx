import { stepIcons } from "./Icons";
import Reveal from "./Reveal";

/**
 * The stops laid out as a row of steps: icon, numbered heading, blurb. One
 * column on phones so the blurbs keep a readable measure, widening to the full
 * six-across row from `xl`, where a hairline runs behind the icons to tie the
 * stops together as one journey.
 */
export default function Roadmap({
  stops,
}: {
  stops: { icon: string; stop: string; when: string; blurb: string }[];
}) {
  return (
    <div className="relative mx-auto max-w-[1120px]">
      {/* The connector sits level with the middle of the icon discs, and stops
          short at both ends so it reads as a path rather than a rule. */}
      <span
        aria-hidden
        className="absolute top-[38px] right-[8%] left-[8%] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(202,154,4,.42)_12%,rgba(202,154,4,.42)_88%,transparent)] xl:block"
      />

      <ol className="grid gap-x-6 gap-y-7 sm:gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stops.map((s, i) => {
          const Icon = stepIcons[s.icon];
          return (
            <li key={s.stop} className="relative">
              {/* Phones get the icon beside the text, which halves the height
                  of a six-stop list. The centred column starts at `sm`. */}
              <Reveal
                delay={i * 70}
                className="flex items-start gap-4 text-left sm:block sm:text-center"
              >
                <span
                  aria-hidden
                  className="grid size-[58px] shrink-0 place-items-center rounded-full border border-line-yellow bg-white text-green shadow-[0_2px_10px_rgba(10,46,26,.07)] sm:mx-auto sm:size-[76px]"
                >
                  <Icon className="size-[26px] sm:size-[34px]" />
                </span>

                {/* The text needs its own box, or the flex row on phones would
                    set heading, caption and blurb side by side. */}
                <div className="min-w-0 sm:contents">
                  <h3 className="mt-0 font-serif text-[1.15rem] leading-tight text-green-deep sm:mt-5 sm:text-[1.22rem] xl:min-h-[2.5em]">
                    <span className="text-yellow-ink">{i + 1}</span> {s.stop}
                  </h3>

                  <p className="mt-1.5 text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-yellow-ink">
                    {s.when}
                  </p>

                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-soft sm:mx-auto sm:max-w-[30ch]">
                    {s.blurb}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

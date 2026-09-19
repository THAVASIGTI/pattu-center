import Reveal from "./Reveal";

/**
 * Vertical roadmap. On small screens the spine sits on the left with every
 * stop beside it; from `lg` up the spine centres and stops alternate sides.
 */
export default function Roadmap({
  stops,
}: {
  stops: { stop: string; when: string; blurb: string }[];
}) {
  return (
    <div className="relative mx-auto max-w-[980px]">
      {/* the spine */}
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[19px] w-px bg-[linear-gradient(180deg,transparent,rgba(253,224,71,.55)_8%,rgba(253,224,71,.55)_92%,transparent)] lg:left-1/2 lg:-translate-x-1/2"
      />

      <ol className="grid gap-6 lg:gap-0">
        {stops.map((s, i) => {
          const right = i % 2 === 1;
          return (
            <li key={s.stop} className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
              {/* node */}
              <span
                aria-hidden
                className="absolute top-1 left-0 z-10 grid size-10 place-items-center rounded-full border border-yellow/45 bg-green-deep font-serif text-[0.95rem] text-yellow-light shadow-[0_0_0_6px_rgba(10,46,26,1)] lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <Reveal
                delay={i * 70}
                className={`pl-16 lg:pl-0 lg:py-7 ${
                  right ? "lg:col-start-2 lg:pl-12" : "lg:col-start-1 lg:pr-12 lg:text-right"
                }`}
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-yellow-light">
                  {s.when}
                </p>
                <h3 className="mt-1.5 font-serif text-[1.3rem] text-white">{s.stop}</h3>
                <p className="mt-2 text-[0.93rem] text-cream/72">{s.blurb}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

import Reveal from "./Reveal";

/**
 * Staircase stepper. Each step sits one tread lower than the last on desktop,
 * so the four read as a descent from first contact to payment, and they slide
 * in from alternating sides. On mobile they simply stack.
 */
const TREAD = 28; // px each step drops below the previous one, from `lg` up

export default function StepStair({
  steps,
}: {
  steps: { title: string; blurb: string }[];
}) {
  return (
    <div
      // reserve the descent so the last tread cannot overlap whatever follows
      style={{ ["--tread" as string]: `${TREAD}px`, ["--drop" as string]: `${(steps.length - 1) * TREAD}px` }}
      className="grid gap-4 lg:grid-cols-4 lg:gap-5 lg:pb-[var(--drop)]"
    >
      {steps.map((s, i) => (
        <Reveal
          key={s.title}
          from={i % 2 === 0 ? "left" : "right"}
          delay={i * 130}
          duration={800}
        >
          <article
            style={{ ["--i" as string]: i }}
            className="group relative h-full overflow-hidden rounded-[22px] border border-yellow/25 bg-cream/[0.06] p-6 transition-all duration-500 hover:border-yellow/55 hover:bg-cream/[0.10] lg:translate-y-[calc(var(--i)*var(--tread))]"
          >
            {/* watermark numeral */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-3 -right-1 font-serif text-[5.5rem] leading-none text-cream/[0.07] transition-all duration-500 group-hover:text-cream/[0.12]"
            >
              {i + 1}
            </span>

            {/* tread rule that grows on hover */}
            <span
              aria-hidden
              className="foil absolute top-0 left-0 h-[3px] w-10 transition-all duration-500 group-hover:w-full"
            />

            <span className="foil-text relative block font-serif text-[1.9rem] leading-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="relative mt-3 font-serif text-[1.12rem] text-white">{s.title}</h3>
            <p className="relative mt-2 text-[0.9rem] text-cream/70">{s.blurb}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

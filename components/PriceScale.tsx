import Reveal from "./Reveal";

/**
 * Balance-scale layout for the valuation factors, apt for a trade that prices
 * by weight. The factor sits on a central pivot with what raises the price
 * weighing out to one side and what lowers it to the other; both arms grow
 * outward from the pivot as the row scrolls into view.
 */
export default function PriceScale({
  rows,
}: {
  rows: { factor: string; detail: string; raises: string; lowers: string }[];
}) {
  return (
    <div className="grid gap-4">
      {rows.map((row, i) => (
        <Reveal key={row.factor} from="scale" delay={i * 110} duration={800}>
          <article className="group grid items-stretch gap-0 overflow-hidden rounded-[22px] border border-line bg-white shadow-soft transition-shadow duration-500 hover:shadow-mid lg:grid-cols-[1fr_auto_1fr]">
            {/* raises, weighs the price up */}
            <div className="order-2 flex items-center gap-3 border-t border-line bg-green-soft/[0.07] px-5 py-4 lg:order-1 lg:justify-end lg:border-t-0 lg:border-r lg:px-6 lg:py-6 lg:text-right">
              <span className="order-2 text-[0.92rem] text-ink-soft lg:order-1">
                <span className="mb-0.5 block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-green">
                  Raises
                </span>
                {row.raises}
              </span>
              <span
                aria-hidden
                className="order-1 h-6 w-1 shrink-0 origin-bottom scale-y-50 rounded-full bg-green-soft transition-transform duration-700 group-hover:scale-y-100 lg:order-2"
              />
            </div>

            {/* pivot */}
            <div className="order-1 flex items-center gap-4 bg-cream-2/60 px-5 py-5 lg:order-2 lg:w-[248px] lg:flex-col lg:justify-center lg:gap-2 lg:px-6 lg:text-center">
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line-yellow bg-white transition-transform duration-500 group-hover:rotate-12"
              >
                <svg viewBox="0 0 24 24" className="size-5 text-yellow" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4v16M5 20h14M3 8h18M3 8l-2.2 5.5a3.2 3.2 0 0 0 4.4 0zM21 8l2.2 5.5a3.2 3.2 0 0 1-4.4 0z" />
                </svg>
              </span>
              <span>
                <h3 className="font-serif text-[1.16rem] text-green-deep">{row.factor}</h3>
                <p className="mt-0.5 text-[0.82rem] text-ink-mute">{row.detail}</p>
              </span>
            </div>

            {/* lowers, weighs it down */}
            <div className="order-3 flex items-center gap-3 border-t border-line bg-yellow/[0.07] px-5 py-4 lg:border-t-0 lg:border-l lg:px-6 lg:py-6">
              <span
                aria-hidden
                className="h-6 w-1 shrink-0 origin-top scale-y-50 rounded-full bg-yellow transition-transform duration-700 group-hover:scale-y-100"
              />
              <span className="text-[0.92rem] text-ink-soft">
                <span className="mb-0.5 block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-yellow-ink">
                  Lowers
                </span>
                {row.lowers}
              </span>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

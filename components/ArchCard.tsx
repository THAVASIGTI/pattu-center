import Image from "next/image";
import type { SareeType } from "@/config/content";
import { img } from "@/config/content";

/**
 * Temple-arch card: the image sits under a semicircular arch top, a gold ring
 * traces the arch on hover, and a shimmer sweeps across it. The text stays
 * visible at all sizes so nothing depends on hover.
 */
export default function ArchCard({ item }: { item: SareeType }) {
  return (
    <article className="group relative flex h-full flex-col text-center">
      {/* Arch */}
      <div className="relative mx-auto w-full max-w-[320px]">
        <div className="relative aspect-3/4 overflow-hidden rounded-t-[999px] rounded-b-[22px] border border-line-yellow bg-cream-2 shadow-mid transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-deep">
          <Image
            src={img(item.imageId)}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 78vw, (max-width: 1024px) 42vw, 320px"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />

          {/* shimmer sweep */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_38%,rgba(255,251,230,.42)_50%,transparent_62%)] transition-transform duration-[1100ms] ease-out group-hover:translate-x-full"
          />

          {/* bottom scrim so the arch reads against pale sections */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(10,46,26,.55),transparent)]"
          />
        </div>

        {/* gold ring that traces the arch on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-t-[999px] rounded-b-[26px] border border-yellow/0 transition-all duration-500 group-hover:border-yellow/55"
        />

        {/* numbered medallion sitting on the arch shoulder */}
        <span
          aria-hidden
          className="absolute -bottom-4 left-1/2 grid size-9 -translate-x-1/2 place-items-center rounded-full border border-yellow/45 bg-green-deep transition-transform duration-500 group-hover:scale-110"
        >
          <span className="foil-text font-serif text-[0.8rem] leading-none">✦</span>
        </span>
      </div>

      {/* Copy */}
      <div className="mx-auto mt-8 max-w-[320px] px-1">
        <h3 className="font-serif text-[1.18rem] text-green-deep">{item.name}</h3>
        {item.ta && (
          <p className="mt-1.5 font-tamil text-[0.83rem] text-yellow transition-opacity duration-500 sm:opacity-80 sm:group-hover:opacity-100">
            {item.ta}
          </p>
        )}
        <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-soft">{item.blurb}</p>
      </div>
    </article>
  );
}

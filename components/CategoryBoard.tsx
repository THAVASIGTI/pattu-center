import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./Icons";
import { img, sareeTypes } from "@/config/content";

/**
 * Full-bleed board of saree categories sitting under the hero copy. Tiles run
 * edge to edge so the strip reads as a banner rather than a boxed grid: a
 * swipeable rail on phones, an even row from md up.
 */
export default function CategoryBoard() {
  const tiles = sareeTypes.filter((t) => t.slug !== "silver").slice(0, 8);

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2">
      <div className="rail gap-2 px-4 [grid-auto-columns:60%] sm:[grid-auto-columns:38%] md:grid md:grid-flow-row md:grid-cols-4 md:gap-2.5 md:overflow-visible md:px-5 lg:grid-cols-8 lg:gap-2">
        {tiles.map((t) => (
          <Link
            key={t.slug}
            href="/what-we-buy"
            className="group relative block aspect-3/4 overflow-hidden rounded-[14px] border border-yellow/35 shadow-[0_6px_18px_rgba(10,46,26,.12)] transition-transform duration-300 hover:-translate-y-1"
          >
            <Image
              src={img(t.imageId)}
              alt={t.alt}
              fill
              sizes="(max-width: 768px) 60vw, (max-width: 1024px) 25vw, 12vw"
              className="object-cover transition-transform duration-[900ms] group-hover:scale-110"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,46,26,.92)_0%,rgba(10,46,26,.45)_38%,transparent_70%)]"
            />
            <span className="absolute inset-x-0 bottom-0 p-3">
              {t.ta && (
                <span className="block font-tamil text-[0.76rem] leading-tight text-yellow-light">
                  {t.ta}
                </span>
              )}
              <span className="mt-0.5 block font-serif text-[0.92rem] leading-tight text-white">
                {t.name}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-4 text-center">
        <Link
          href="/what-we-buy"
          className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-green underline-offset-4 hover:underline"
        >
          See everything we buy
          <ArrowRight className="size-[16px]" />
        </Link>
      </p>
    </div>
  );
}

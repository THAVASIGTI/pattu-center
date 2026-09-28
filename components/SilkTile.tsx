import Image from "next/image";
import type { SareeType } from "@/config/content";
import { img } from "@/config/content";

/**
 * A framed portrait tile: the photo runs to the edges of the frame and the
 * name sits on a frosted plate laid over the foot of it, with the blurb
 * underneath on the page itself.
 *
 * The plate is the one place on the site where frosted glass has to carry
 * text over a photograph, and a photograph can be any colour. Its fill is
 * held at 0.72 for that reason: against the worst case, a blown-out white
 * area of an image, the cream name still measures 5.67:1, where the 0.62 it
 * started at gave 4.2:1 and missed. The gradient beneath it does the same
 * job for the tile's lower edge, so the plate never has to work alone.
 */
export default function SilkTile({ item }: { item: SareeType }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-3/4 overflow-hidden rounded-[26px] border border-line-yellow bg-cream-2 shadow-mid transition-all duration-500 group-hover:-translate-y-2 group-hover:border-yellow/55 group-hover:shadow-deep">
        <Image
          src={img(item.imageId)}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 78vw, (max-width: 1024px) 42vw, 340px"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />

        {/* A zari sweep across the photo on hover, the same one the arches had. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_38%,rgba(255,251,230,.42)_50%,transparent_62%)] transition-transform duration-[1100ms] ease-out group-hover:translate-x-full"
        />

        {/* Darkens the foot of the image so the plate is never the only thing
            standing between the name and a pale photo. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(0deg,rgba(10,46,26,.72),transparent)]"
        />

        <div className="absolute inset-x-3 bottom-3 rounded-[18px] border border-white/25 bg-[rgba(10,46,26,.72)] px-4 py-3 text-center backdrop-blur-md backdrop-saturate-150 sm:inset-x-4 sm:bottom-4">
          <h3 className="font-serif text-[1.1rem] leading-tight text-white sm:text-[1.16rem]">
            {item.name}
          </h3>
          {item.ta && (
            <p className="mt-0.5 font-tamil text-[0.78rem] text-yellow-light">{item.ta}</p>
          )}
        </div>
      </div>

      <p className="mt-4 px-1 text-[0.9rem] leading-relaxed text-ink-soft">{item.blurb}</p>
    </article>
  );
}

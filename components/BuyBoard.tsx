import Image from "next/image";
import { buyCategories, shopImg } from "@/config/content";
import Reveal from "./Reveal";

/**
 * The six headline categories, as a board of named photographs.
 *
 * This replaces the tiles that used to stand here, and the difference is the
 * point. Those carried a paragraph each; they were a page you read. This is a
 * poster: six photographs with a name under each and nothing else, so the
 * whole set can be taken in at a glance and someone can find the thing that
 * is in her almirah without reading a word of prose.
 *
 * It is laid out from the client's own poster. Their ground is maroon and
 * ours is the deep green the rest of the site uses; everything else carries
 * over, the gold hairline, the photograph to the edges of it, the name on a
 * darker plate at the foot, the gold pill below the grid.
 *
 * The photographs are square. The shop files are all 0.56 portrait, so a
 * square crop drops 44% of the height, and that is deliberate: it lands on
 * the border and pallu, which is the part of a saree that says which kind it
 * is. A 4:3 card would have kept more of the frame and less of the subject.
 *
 * The cards are not links. Six of them pointing at the same page reads as
 * six identical links to a screen reader and buys nothing; the one gold
 * button under the grid is the way through.
 */
export default function BuyBoard() {
  // The grid is capped well inside the wrapper. Left to fill it, three
  // columns put each card at 357px at 1440, which is larger than a card
  // carrying two short lines needs to be and larger than the poster's own
  // proportions. 900px holds them at about 284.
  return (
    <ul className="mx-auto grid max-w-[900px] grid-cols-2 gap-3.5 sm:max-w-[620px] sm:gap-4 lg:max-w-[900px] lg:grid-cols-3 lg:gap-5">
      {buyCategories.map((c, i) => (
        <li key={c.slug} className="h-full">
          <Reveal className="h-full" from="scale" delay={(i % 3) * 110} duration={850}>
            {/* flex column with an h-full chain from the grid cell down, so
                every card in a row ends on the same line. Without it a name
                that wraps to two lines makes its card taller than the one
                beside it, which the poster this is drawn from never does. */}
            <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-yellow/45 bg-[rgba(10,46,26,.5)] shadow-deep transition-all duration-500 hover:-translate-y-1.5 hover:border-yellow/75">
              <div className="relative aspect-square shrink-0 overflow-hidden">
                <Image
                  src={shopImg(c.shop)}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 639px) 46vw, (max-width: 1023px) 300px, 290px"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />

                {/* The same zari sweep the silk tiles use, so the two grids
                    behave alike even though they no longer look alike. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_38%,rgba(255,251,230,.42)_50%,transparent_62%)] transition-transform duration-[1100ms] ease-out group-hover:translate-x-full"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center border-t border-yellow/40 bg-[rgba(8,38,21,.86)] px-2.5 py-3 text-center sm:px-3.5 sm:py-3.5">
                <h3 className="font-serif text-[0.92rem] leading-snug text-cream sm:text-[1.02rem]">
                  {c.name}
                </h3>
                <p className="mt-1 font-tamil text-[0.68rem] leading-snug text-yellow-light sm:text-[0.74rem]">
                  {c.ta}
                </p>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

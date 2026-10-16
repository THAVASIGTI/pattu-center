/**
 * Zari, drawn rather than photographed.
 *
 * This replaces a pair of components that laid real brocade under the hero
 * and across the foot of every inner page. The photograph was the wrong
 * material for the job twice over: it was a silver-ivory cloth that read as
 * its own object sitting behind the page rather than as the page's ground,
 * and a 1600px picture had to be downloaded before a ground could be seen at
 * all. Everything here is a gradient and one short path, so it weighs
 * nothing, scales to any size, and is the brand's gold rather than a
 * photograph's.
 *
 * It is also the only version of this that can actually move the way cloth
 * does. A photograph can be slid about; threads can be woven. The two
 * thread layers below pan along different axes at different speeds, so the
 * points where they cross travel, and the field reads as being made rather
 * than being scrolled.
 *
 * On contrast: the threads are 1px every 12px, so they cover about a sixth
 * of the field between them. That is the whole trick of letting this be
 * clearly visible. Locally a thread is strong enough to see; averaged over
 * any glyph it barely moves the ground, and the worst case for the hero's
 * gold headline, a stroke lying along a thread, still measures well clear of
 * its 3:1 floor. Raising the alphas or tightening the spacing changes that,
 * so re-measure rather than guess.
 */

/* The two directions are deliberately NOT matched. Equal lines crossing at
   equal spacing is graph paper, which is what the first version of this
   looked like: a technical grid laid over the page rather than cloth. Real
   zari does not look like that. The warp is dense and fine, a thread every
   6px, and it is what you actually see; the weft is four times as far apart
   and half as strong, so it reads as the cloth's grain rather than as the
   other half of a lattice.

   Both spacings divide the 240px travel in the thread-x / thread-y keyframes
   exactly, 40 periods and 10, so neither loop jumps. Change a spacing and
   you must change the travel with it. */
const WARP =
  "repeating-linear-gradient(90deg, rgba(202,154,4,.26) 0 1px, rgba(0,0,0,0) 1px 6px)";
const WEFT =
  "repeating-linear-gradient(0deg, rgba(21,128,61,.12) 0 1px, rgba(202,154,4,.08) 1px 2px, rgba(0,0,0,0) 2px 24px)";

/** The hero's field: a woven zari ground, in motion. */
export default function ZariWeave() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Warp: the threads held on the loom, running sideways. */}
      <span
        className="thread-x absolute inset-0"
        style={{ backgroundImage: WARP, animation: "thread-x 44s linear infinite" }}
      />
      {/* Weft: the thread carried across, running down. Slower, and green
          rather than gold, because on a real pattu the body colour is the
          weft and the zari is the warp. */}
      <span
        className="thread-y absolute inset-0"
        style={{ backgroundImage: WEFT, animation: "thread-y 67s linear infinite" }}
      />

      {/* Butta: the small motif repeated across the body of a pattu saree,
          between the borders. Drifting diagonally at a crawl, so the field
          is never quite the same twice. */}
      <svg className="absolute inset-0 size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Two motifs per 150px tile, offset from each other, which is
              about the density a pattu body carries. The first version put
              four of them in a 96px tile and the result read as wallpaper:
              on real cloth the butta is sparse and the ground between them
              is most of what you see. */}
          <pattern id="kpc-butta" width="150" height="150" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="rgba(202,154,4,.26)" strokeWidth="1">
              <path d="M38 22 L45 34 L38 46 L31 34 Z" />
              <path d="M113 97 L120 109 L113 121 L106 109 Z" />
            </g>
            <circle cx="38" cy="34" r="1.3" fill="rgba(202,154,4,.22)" />
            <circle cx="113" cy="109" r="1.3" fill="rgba(202,154,4,.22)" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#kpc-butta)"
          style={{ animation: "weave-pan 90s linear infinite" }}
        />
      </svg>

      {/* The catch of light that gives silver-gilt thread its name. One slow
          pass every two minutes rather than a loop, so it is noticed once and
          then forgotten, which is the most a background should ask for. */}
      <span
        className="zari-sheen absolute inset-y-0 left-0 w-[36%] bg-[linear-gradient(100deg,transparent_0%,rgba(255,251,230,.55)_46%,rgba(254,240,138,.3)_62%,transparent_100%)]"
        style={{ animation: "zari-sheen 115s ease-in-out infinite" }}
      />
    </div>
  );
}

/**
 * A woven border for the foot of a section, in place of the brocade strip
 * that used to sit here.
 *
 * The motif is the temple border, the stepped triangles down the selvedge of
 * a Kanchipuram saree. preserveAspectRatio="none" stretches one authored
 * path to whatever height the band is given, which is what lets a 32px band
 * and a 48px one be the same markup.
 *
 * The catch is that it stretches the WIDTH too, so the number of teeth fixes
 * how wide each one ends up. Eight of them across a 1440px page came out
 * 180px wide and 32px tall, which is a wide zigzag and not a temple border:
 * the real thing is always taller than it is broad. So the count is chosen
 * per breakpoint instead, thirty on a wide screen and ten on a phone, which
 * lands both at roughly 50px and 39px wide against a 48px and 32px band.
 * Two SVGs rather than one is the price, and it is cheap: they are each one
 * path.
 */
const teeth = (n: number) => {
  const w = 100 / n;
  const path = Array.from(
    { length: n },
    (_, i) => `L${((i + 0.5) * w).toFixed(2)} 1.5 L${((i + 1) * w).toFixed(2)} 12`,
  ).join(" ");
  return `M0 12 ${path}`;
};

function Teeth({ n, className }: { n: number; className: string }) {
  const d = teeth(n);
  return (
    <svg
      className={`absolute inset-0 size-full ${className}`}
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={`${d} L100 12 Z`} fill="rgba(202,154,4,.30)" />
      <path d={d} fill="none" stroke="rgba(253,224,71,.55)" strokeWidth="0.7" />
    </svg>
  );
}

export function ZariRule({ className = "h-9 sm:h-12" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative w-full overflow-hidden bg-green-deep ${className}`}>
      <span
        className="thread-x absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(253,224,71,.42) 0 1px, rgba(202,154,4,.16) 1px 3px, rgba(0,0,0,0) 3px 12px)",
          animation: "thread-x 30s linear infinite",
        }}
      />
      <Teeth n={10} className="sm:hidden" />
      <Teeth n={30} className="hidden sm:block" />
      <span className="foil absolute inset-x-0 top-0 h-[2px]" />
      <span className="foil absolute inset-x-0 bottom-0 h-[2px]" />
    </div>
  );
}

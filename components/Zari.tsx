/**
 * Zari, drawn rather than photographed.
 *
 * This replaces components that laid real brocade under the hero and across
 * the foot of every inner page. The photograph was the wrong material for
 * the job twice over: a silver-ivory cloth that read as its own object
 * sitting behind the page rather than as the page's ground, and a 1600px
 * download before a ground could be seen at all. Everything here is a few
 * small SVG tiles, so it weighs nothing, scales to any size, and is the
 * brand's gold rather than a photograph's.
 *
 * The ground is made of BORDERS. An earlier version wove it from a warp and
 * a weft, fine threads crossing, and however carefully the two were
 * unbalanced it still read as ruled columns rather than as cloth: at the
 * size a browser draws them, parallel hairlines are graph paper to the eye
 * whatever they are called. So the motif is no longer the weave of the body
 * but the border down a saree's edge, which is the part anyone would
 * actually recognise, and the field is bands of it laid down the section.
 *
 * Each band is one small tile repeating sideways, and each pans at its own
 * speed, some left and some right, so the bands slide past one another the
 * way lengths of cloth do when they are lifted.
 *
 * On contrast: every stroke here is about 1.3px and the bands are far apart,
 * so coverage over any line of type is small and the ground between them
 * stays cream. Measured, the hero's gold headline, which has the least room
 * of any type on the site, sits well clear of its 3:1 floor. Raising the
 * alphas or thickening the strokes changes that, so re-measure rather than
 * guess.
 */

/* A motif as a repeating background. Inline SVG rather than a file: these
   are a few hundred bytes each, they need no request, and keeping them as
   source means the motifs can be read and edited here instead of in a
   binary. encodeURIComponent, not base64, so they stay legible in devtools. */
const tile = (w: number, h: number, body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`,
  )}")`;

const GOLD = "rgba(202,154,4,.34)";
const SOFT = "rgba(202,154,4,.20)";
const LEAF = "rgba(21,128,61,.16)";

/* Every one of these is a real border off a south Indian saree, and each is
   built the way a woven one is: a plain zari stripe, the motif row, another
   stripe. The stripes are part of the tile rather than separate layers so
   they travel with the motif, which is what keeps a band reading as one
   piece of cloth rather than as a drawing on top of some lines. */

/** Kumbam: the stepped temple triangles off a Kanchipuram selvedge. */
const KUMBAM = tile(
  56,
  30,
  `<path d="M0 2.5 H56 M0 27.5 H56" stroke="${SOFT}" stroke-width="1"/>` +
    `<path d="M0 25 L14 7 L28 25 L42 7 L56 25" fill="none" stroke="${GOLD}" stroke-width="1.3" stroke-linejoin="round"/>` +
    `<circle cx="14" cy="12" r="1.3" fill="${SOFT}"/><circle cx="42" cy="12" r="1.3" fill="${SOFT}"/>`,
);

/** Rudraksha: the bead row, alternating with the thread that strings it. */
const RUDRAKSHA = tile(
  40,
  24,
  `<path d="M0 2 H40 M0 22 H40" stroke="${SOFT}" stroke-width="1"/>` +
    `<g fill="none" stroke="${GOLD}" stroke-width="1.2">` +
    `<circle cx="10" cy="12" r="4.6"/><circle cx="30" cy="12" r="4.6"/>` +
    `<path d="M0 12 H5 M15 12 H25 M35 12 H40"/></g>` +
    `<circle cx="20" cy="12" r="1.4" fill="${LEAF}"/>`,
);

/** Butta: the small repeated motif of the body, run as a border row. */
const BUTTA = tile(
  48,
  26,
  `<path d="M0 2 H48 M0 24 H48" stroke="${SOFT}" stroke-width="1"/>` +
    `<path d="M24 6 L30 13 L24 20 L18 13 Z" fill="none" stroke="${GOLD}" stroke-width="1.2"/>` +
    `<circle cx="24" cy="13" r="1.4" fill="${SOFT}"/>` +
    `<path d="M4 13 h4 M40 13 h4" stroke="${LEAF}" stroke-width="1.2"/>`,
);

/** The plain chevron that separates two heavier borders on a nine-yard. */
const CHEVRON = tile(
  36,
  20,
  `<path d="M0 2 H36 M0 18 H36" stroke="${SOFT}" stroke-width="1"/>` +
    `<path d="M0 14 L9 6 L18 14 L27 6 L36 14" fill="none" stroke="${GOLD}" stroke-width="1.2"/>`,
);

/** Mayil kann: the row of arches off a pallu, peacock-eye fashion. */
const ARCH = tile(
  52,
  28,
  `<path d="M0 2.5 H52 M0 25.5 H52" stroke="${SOFT}" stroke-width="1"/>` +
    `<path d="M0 22 A13 13 0 0 1 26 22 A13 13 0 0 1 52 22" fill="none" stroke="${GOLD}" stroke-width="1.3"/>` +
    `<circle cx="13" cy="17" r="1.5" fill="${SOFT}"/><circle cx="39" cy="17" r="1.5" fill="${SOFT}"/>`,
);

/* top is a percentage so the bands spread over a hero that runs from 900px
   on a laptop to 1400 on a phone. dur is seconds for ONE tile of travel, so
   it sets a speed rather than a period: these all work out between four and
   six pixels a second, which is movement you notice only if you look for
   it. Alternating `rev` is what makes the bands slide past one another. */
const BANDS: {
  top: string;
  h: number;
  tile: number;
  src: string;
  dur: number;
  rev?: boolean;
}[] = [
  { top: "2%", h: 30, tile: 56, src: KUMBAM, dur: 11 },
  { top: "16%", h: 24, tile: 40, src: RUDRAKSHA, dur: 10, rev: true },
  { top: "30%", h: 26, tile: 48, src: BUTTA, dur: 8.5 },
  { top: "44%", h: 20, tile: 36, src: CHEVRON, dur: 8, rev: true },
  { top: "58%", h: 28, tile: 52, src: ARCH, dur: 9.5 },
  { top: "72%", h: 26, tile: 48, src: BUTTA, dur: 10.5, rev: true },
  { top: "86%", h: 30, tile: 56, src: KUMBAM, dur: 9 },
];

/** The hero's field: bands of saree border, each running at its own pace. */
export default function ZariWeave() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BANDS.map((b, i) => (
        <span
          key={i}
          className="zari-border absolute inset-x-0 block"
          style={
            {
              top: b.top,
              height: `${b.h}px`,
              backgroundImage: b.src,
              backgroundRepeat: "repeat-x",
              backgroundSize: `${b.tile}px ${b.h}px`,
              /* band-pan travels exactly one tile, so the loop has no seam.
                 The width has to reach the keyframe somehow, and a custom
                 property is the only way to vary it per band without seven
                 near-identical @keyframes blocks. */
              "--tile": `${b.tile}px`,
              animation: `band-pan ${b.dur}s linear infinite${b.rev ? " reverse" : ""}`,
            } as React.CSSProperties
          }
        />
      ))}

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

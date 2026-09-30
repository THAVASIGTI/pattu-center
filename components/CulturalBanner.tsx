/**
 * The ground under the hero copy: a saree border, drawn rather than
 * photographed.
 *
 * Two motifs, both from the cloth the shop actually buys. A temple border,
 * the stepped triangles that run down the selvedge of a Kanchipuram saree,
 * held in the page's left margin where no word ever lands. And a pulli kolam,
 * the dotted lattice drawn on a threshold, laid behind the copy itself.
 *
 * The kolam is the part that has to be restrained. Anything behind body text
 * is paid for in contrast, and the gold in this hero already measures near
 * the 3:1 floor for large text, so the lattice sits at alpha 0.055 and the
 * dots at 0.09. That is far enough down to read as texture in the paper and
 * not far enough to move the numbers: with it in, the gold holds and the body
 * copy stays above 11:1. Raising those alphas means re-running probe.py, not
 * guessing.
 *
 * The border strip earns a much heavier hand, 0.32, precisely because it is
 * outside the text column. It is the only piece here allowed to be seen
 * rather than felt.
 *
 * All of it is one inline SVG with two patterns, so it costs no request and
 * scales to any section height.
 *
 * The z-index is not decoration. Below lg the photograph covers the whole
 * section, so in DOM order this layer is painted over and simply never seen;
 * z-[1] lifts it above. From lg it must go back under, because the feather
 * below paints cream, and cream over the photograph would bleach the right
 * of the hero rather than fading the kolam out.
 */
export default function CulturalBanner() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Temple border: triangles stepping in from the edge, the band and
              the bead row that sit beside them on a woven border. */}
          <pattern id="kpc-temple" width="34" height="46" patternUnits="userSpaceOnUse">
            <path
              d="M34 0 L14 23 L34 46"
              fill="none"
              stroke="rgba(202,154,4,.32)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M34 11 L24 23 L34 35"
              fill="none"
              stroke="rgba(202,154,4,.22)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="23" r="2" fill="rgba(202,154,4,.26)" />
          </pattern>

          {/* Pulli kolam: the dots, and the single looping line drawn around
              them without lifting the hand. */}
          <pattern id="kpc-kolam" width="72" height="72" patternUnits="userSpaceOnUse">
            <path
              d="M36 8 Q60 20 64 36 Q60 52 36 64 Q12 52 8 36 Q12 20 36 8 Z"
              fill="none"
              stroke="rgba(21,128,61,.055)"
              strokeWidth="1.2"
            />
            <path
              d="M36 20 Q50 28 52 36 Q50 44 36 52 Q22 44 20 36 Q22 28 36 20 Z"
              fill="none"
              stroke="rgba(202,154,4,.055)"
              strokeWidth="1.2"
            />
            <circle cx="36" cy="36" r="1.7" fill="rgba(202,154,4,.09)" />
            <circle cx="0" cy="36" r="1.4" fill="rgba(21,128,61,.09)" />
            <circle cx="72" cy="36" r="1.4" fill="rgba(21,128,61,.09)" />
            <circle cx="36" cy="0" r="1.4" fill="rgba(21,128,61,.09)" />
            <circle cx="36" cy="72" r="1.4" fill="rgba(21,128,61,.09)" />
          </pattern>
        </defs>

        {/* The kolam keeps to the left of the section, so it never has to
            compete with the photograph for the same pixels. */}
        <rect className="w-full xl:w-[56%]" height="100%" fill="url(#kpc-kolam)" />

        {/* The border runs down the very edge, in the gutter. */}
        <rect width="34" height="100%" fill="url(#kpc-temple)" />
        <rect x="36" width="1" height="100%" fill="rgba(202,154,4,.22)" />
        <rect x="40" width="1" height="100%" fill="rgba(202,154,4,.12)" />
      </svg>

      {/* Feathers the kolam out before it reaches the photograph, so there is
          no line where the pattern stops. */}
      <span className="absolute inset-y-0 right-0 hidden w-[52%] bg-[linear-gradient(90deg,rgba(251,253,249,0)_0%,#fbfdf9_42%)] xl:block" />
    </div>
  );
}

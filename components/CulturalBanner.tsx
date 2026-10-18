/**
 * The ornament over the hero's ground: a saree border down each gutter and
 * a pulli kolam across the field behind the copy.
 *
 * Two motifs, both from the cloth the shop actually buys. A temple border,
 * the stepped triangles that run down the selvedge of a Kanchipuram saree,
 * held in the page's margins where no word ever lands. And a pulli kolam,
 * the dotted lattice drawn on a threshold, laid behind the copy itself.
 *
 * All of it was drawn for a cream section and all of it is restated here in
 * gold, because the hero is dark now and a photograph runs under the whole
 * of it. Two things changed as a result:
 *
 * The strokes are --color-yellow-light rather than --color-yellow. The
 * darker gold is the one tuned for light grounds; against the scrim it goes
 * muddy and the kolam simply disappears. The ALPHAS did not go up with it,
 * and that is the point: a lighter colour at the same alpha reads better
 * without putting more light under the type.
 *
 * The kolam runs the full width, and the border runs down both edges rather
 * than one. The old composition had a left edge and a piece of artwork on
 * the right; this one is a centred column, which wants a frame. The
 * right-hand border is the same drawing mirrored by a CSS transform,
 * because an SVG transform attribute will not take a percentage and the
 * page is fluid.
 *
 * The patterns are defined once, in the field's own <defs>, and referenced
 * from the two border SVGs. In inline SVG a url(#id) resolves against the
 * whole document, so one definition serves all three and there are no
 * duplicate ids to go wrong.
 *
 * The kolam is the part that has to stay restrained: anything behind body
 * text is paid for in contrast, and the gold headline here has the least to
 * spare of any type on the site. Raising these alphas means re-running the
 * hero contrast probe, not guessing.
 *
 * The border strip earns a heavier hand precisely because it is outside the
 * text column. It is the only piece here allowed to be seen rather than
 * felt.
 */

const GOLD = "rgba(253,224,71,";

/** One gutter's worth of selvedge. The pattern it fills with is defined in
 *  the field SVG below. */
function TempleBorder({ className }: { className: string }) {
  return (
    <svg
      className={`absolute inset-y-0 w-[41px] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="34" height="100%" fill="url(#kpc-temple)" />
      <rect x="36" width="1" height="100%" fill={`${GOLD}.26)`} />
      <rect x="40" width="1" height="100%" fill={`${GOLD}.14)`} />
    </svg>
  );
}

export default function CulturalBanner() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 size-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Temple border: triangles stepping in from the edge, the band
              and the bead row that sit beside them on a woven border. */}
          <pattern id="kpc-temple" width="34" height="46" patternUnits="userSpaceOnUse">
            <path
              d="M34 0 L14 23 L34 46"
              fill="none"
              stroke={`${GOLD}.40)`}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M34 11 L24 23 L34 35"
              fill="none"
              stroke={`${GOLD}.26)`}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="23" r="2" fill={`${GOLD}.30)`} />
          </pattern>

          {/* Pulli kolam: the dots, and the single looping line drawn around
              them without lifting the hand. */}
          <pattern id="kpc-kolam" width="72" height="72" patternUnits="userSpaceOnUse">
            <path
              d="M36 8 Q60 20 64 36 Q60 52 36 64 Q12 52 8 36 Q12 20 36 8 Z"
              fill="none"
              stroke={`${GOLD}.07)`}
              strokeWidth="1.2"
            />
            <path
              d="M36 20 Q50 28 52 36 Q50 44 36 52 Q22 44 20 36 Q22 28 36 20 Z"
              fill="none"
              stroke={`${GOLD}.07)`}
              strokeWidth="1.2"
            />
            <circle cx="36" cy="36" r="1.7" fill={`${GOLD}.13)`} />
            <circle cx="0" cy="36" r="1.4" fill={`${GOLD}.10)`} />
            <circle cx="72" cy="36" r="1.4" fill={`${GOLD}.10)`} />
            <circle cx="36" cy="0" r="1.4" fill={`${GOLD}.10)`} />
            <circle cx="36" cy="72" r="1.4" fill={`${GOLD}.10)`} />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#kpc-kolam)" />
      </svg>

      <TempleBorder className="left-0" />
      <TempleBorder className="right-0 scale-x-[-1]" />
    </div>
  );
}

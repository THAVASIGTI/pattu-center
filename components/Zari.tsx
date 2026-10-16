import Image from "next/image";
import { zariBand, zariCloth } from "@/config/content";

/**
 * Real woven zari, used as ground.
 *
 * The idea these two pieces share: a saree is a plain body with a woven
 * border down its edges, so the hero is built the same way. The cloth runs
 * under the whole section but is held back to a whisper where the words are,
 * and it is let out to full strength exactly where a saree keeps its zari:
 * along the selvedge at the left and in the band across the foot.
 *
 * That is also why the contrast survives. Everything here is decoration under
 * live text, and the hero's gold headline already measured near the 3:1 floor
 * for large text before any of this existed. The veil below is therefore not
 * a look, it is a budget: .94 and up across the whole middle of the section,
 * where every line of copy sits, and the cloth is only visible in the top
 * eighteenth and in the two borders, none of which a word ever crosses.
 *
 * Raising any alpha here means re-measuring, not guessing. The hero carries
 * foil-text-deep, which has the least room of any type on the site.
 */

/** The hero's field: cloth under a cream veil, drifting. */
export default function ZariGround() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image
        src={zariCloth}
        alt=""
        fill
        sizes="100vw"
        className="zari-ground object-cover object-center"
        style={{ animation: "zari-drift 120s ease-in-out infinite" }}
      />

      {/* The budget. Cloth reads at the top, where the greeting sits on its
          own frosted chip and no bare text lands, then shuts down to .96
          through the whole reading column and stays there to the foot. */}
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,253,249,.60)_0%,rgba(251,253,249,.94)_18%,rgba(251,253,249,.96)_62%,rgba(251,253,249,.94)_94%,rgba(251,253,249,.88)_100%)]" />

      {/* Below xl the scene photograph sits in the lower half of the section
          and fades its own edges out to flat cream. Against a ground that now
          has cloth in it, that fade stopped reading as a fade and started
          reading as a pale rectangle: same brightness, but texture on one
          side of the line and none on the other. So the ground goes properly
          flat before the photograph begins, and the cloth keeps to the top of
          the section, which is the only part of a phone hero it was visible
          in anyway. From xl the photograph is beside the copy, not over the
          ground, and none of this applies. */}
      <span className="absolute inset-x-0 bottom-0 h-[52%] bg-[linear-gradient(180deg,rgba(251,253,249,0)_0%,#fbfdf9_22%)] xl:hidden" />

      {/* The selvedge, from xl only. Below that width the copy runs the full
          measure and there is no margin to give it. The drawn temple border
          in CulturalBanner paints over this, so the triangles sit on real
          cloth rather than on paper. */}
      <span className="absolute inset-y-0 left-0 hidden w-[76px] overflow-hidden xl:block">
        <Image src={zariCloth} alt="" fill sizes="76px" className="object-cover object-left" />
        <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,253,249,.18),rgba(251,253,249,.62)_72%,#fbfdf9_100%)]" />
      </span>
    </div>
  );
}

/**
 * A woven border across the full width, for the foot of a section.
 *
 * Three layers: the cloth, a row of gold threads running across it, and a
 * green wash that ties it to whatever it borders. The threads are what move.
 * They are a repeating gradient rather than a second photograph because a
 * photograph cannot be tiled without a seam, and a gradient pans forever: the
 * period is 6px and the travel 1200px, an exact multiple, so it never jumps.
 */
export function ZariBand({ className = "h-12 sm:h-16" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative w-full overflow-hidden ${className}`}>
      <Image src={zariBand} alt="" fill sizes="100vw" className="object-cover object-center" />
      <span
        className="zari-band absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(254,249,195,.42) 0 1px, rgba(202,154,4,.14) 1px 3px, rgba(0,0,0,0) 3px 6px)",
          animation: "zari-weave 30s linear infinite",
        }}
      />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,46,26,.34)_0%,rgba(10,46,26,.04)_46%,rgba(10,46,26,.38)_100%)]" />
      <span className="foil absolute inset-x-0 top-0 h-[2px]" />
      <span className="foil absolute inset-x-0 bottom-0 h-[2px]" />
    </div>
  );
}

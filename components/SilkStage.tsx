import Image from "next/image";
import type { ReactNode } from "react";
import { Wrap } from "./ui";
import { heroScene } from "@/config/content";

/**
 * The hero's right half: the scene, with the copy laid beside it.
 *
 * Everything in the picture is in the picture. The woman, the trunk of folded
 * sarees, the photographs lifting away on a ribbon of zari, the diya, the
 * petals: all of it is the supplied artwork. What this file used to draw over
 * the top of a photograph, a fan of cards and a swirl of its own, is gone,
 * because the scene already has both and two swirls is one too many.
 *
 * The copy is NOT part of the picture. The original had its headline, buttons
 * and feature row baked into the pixels, which cannot be read by a screen
 * reader, selected, translated, or clicked, and cannot reflow on a phone. So
 * the artwork is cropped away from that column and real HTML sits where it
 * was.
 *
 * No state, so no client boundary. This used to cross-fade five silks and
 * then cycle a fan of keepsakes; the scene is one still image and needs
 * neither.
 */
export default function SilkStage({ children }: { children: ReactNode }) {
  return (
    <>
      {/* From lg the scene covers the right 58% and its own gradient dissolves
          it into the page before it reaches the copy: solid to 24%, gone by
          40%. The artwork's own left edge is a plain wall, so the two creams
          meet inside the dissolve rather than at a line.

          Below lg it takes two layers, because one gradient cannot be open at
          the sides and closed behind the words at once. A flat base carries
          the foot of the section and a radial over it puts the cream back
          where the copy is. What is left uncovered is the sides and the
          bottom corners, and that is where the scene shows.

          The flat band from 185 to 425px is the row of four promises, the
          real text down in the open part: measured at 200 to 405px off the
          foot at 360, 390 and 430, and 220 to 323 at 768. These numbers move
          whenever the section's height does, and they have already caught
          one regression that way, so re-measure rather than assume.

          58%, not 64%, and that is arithmetic rather than taste. The artwork
          is 824x1024; at 64% of 1440 the panel is 920x900, cover scales it to
          920x1144 and throws away 244px of height, which took the trunk of
          sarees off the bottom. At 58% the panel is 835 wide, the scale drops
          to 1.01 and the loss is 137px, so the trunk stays in frame.

          object-position then sits at 38% rather than centred, because what
          is left to give up is at the top, where the wall is, not at the
          bottom, where the sarees are. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image
          src={heroScene}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-[52%_26%] lg:object-[55%_38%]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(251,253,249,.10)_0px,rgba(251,253,249,.14)_150px,rgba(251,253,249,.88)_185px,rgba(251,253,249,.88)_425px,rgba(251,253,249,.55)_465px,rgba(251,253,249,.5)_100%)] lg:hidden" />
        <span className="absolute inset-0 bg-[radial-gradient(78%_62%_at_50%_22%,rgba(251,253,249,.92)_0%,rgba(251,253,249,.86)_52%,rgba(251,253,249,.5)_88%,rgba(251,253,249,.16)_100%)] lg:hidden" />
        <span className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fbfdf9_0%,rgba(251,253,249,.97)_24%,rgba(251,253,249,.5)_40%,rgba(251,253,249,.12)_62%,rgba(251,253,249,0)_100%)] lg:block" />
      </div>

      {/* One column of copy in a two column grid. The second cell is left
          empty on purpose, so the words keep to the left half and the scene
          has the right half to itself.

          The deep bottom padding below lg is the scene's only room. On a
          phone there is no second column, so without it the copy runs to the
          foot of the section and the picture has nowhere to be seen at all.
          It also keeps the text clear of the trunk, which is the darkest
          thing in the artwork: when the banner was removed the section got
          shorter, the promises slid down into the open part of the scrim and
          the bottom two measured 1.04:1 sitting on bare wood. */}
      <Wrap className="relative z-10 grid items-center gap-10 pt-12 pb-[200px] sm:pt-16 sm:pb-[220px] lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:py-20 lg:pb-20">
        {children}
      </Wrap>
    </>
  );
}

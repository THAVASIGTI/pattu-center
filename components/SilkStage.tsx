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
      {/* A framed portrait below xl, the right hand panel from xl.

          It used to be one full bleed layer at every width, and that was the
          fault. A single 824x1024 portrait cannot cover panels whose aspect
          runs from 0.37 on a phone to 1.67 at 1920, and measured, it was
          discarding 53% of the picture's WIDTH at 360 and 52% of its height
          at 1920. Half the artwork was not on the page.

          A fixed height band was no better: full width at 1024 it kept 30% of
          the height and showed a strip of trunk with the woman cropped off
          the top entirely. So below xl the box holds close to the picture's
          own 824:1024 instead, capped at 380 and 430px wide, and almost
          nothing is lost. It reads as a framed photograph under the copy,
          which suits an upright composition better than a letterbox.

          From xl the panel is capped at 860px, and the section carries an
          xl:min-h of 900 so the panel is tall enough to hold her. Those two
          together take the loss at 1440 from 36% to 13%, and object-position
          sits at 18% so only 2.4% of that comes off the top, which is what
          the floating photographs need.

          Below xl the copy no longer sits over the picture at all, so there
          is no scrim.

          From xl the picture bleeds top and bottom again and is faded at
          BOTH edges: solid cream at the left edge, gone by 9%, then clear
          until 86% and softening to 45% at the right. Her hair begins 9.5%
          across the artwork, so the left fade stops just short of her.

          The left fade is barely needed. The copy always ends at almost
          exactly half the viewport, because Wrap is centred at 1180px and
          its right edge works out to (100vw - 1180)/2 + 28 + 561, which is
          50vw - 1px; measured, 719 at 1440, 639 at 1280, 959 at 1920. So the
          panel is w-1/2 and starts where the words stop. The fade is there
          to keep the picture from beginning on a hard vertical line, not to
          hide anything.

          Only the HEIGHT is cropped. The panel is 50vw wide, so the picture
          would need 62vw of height to fit whole, and the section is shorter
          than that at every width: the full width is always in frame and the
          crop is 14% at 1440, 16% at 1280, 21% at 1920. object-position 20%
          down keeps the highest floating photograph, at 7%, in frame.

          Those stops are measured; scratchpad/probe.py shoots the bare
          ground and samples the real line boxes over it. Widen the copy and
          they have to move. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-7 mx-auto h-[440px] w-full max-w-[380px] overflow-hidden rounded-[26px] shadow-[0_18px_44px_rgba(10,46,26,.18)] sm:bottom-9 sm:h-[520px] sm:max-w-[430px] xl:top-0 xl:right-0 xl:bottom-0 xl:left-auto xl:mx-0 xl:h-auto xl:w-1/2 xl:max-w-none xl:translate-y-0 xl:aspect-auto xl:rounded-none xl:shadow-none">
        <Image
          src={heroScene}
          alt=""
          fill
          priority
          sizes="(max-width: 1279px) 100vw, 58vw"
          className="object-cover object-[50%_30%] xl:object-[15%_20%]"
        />
      </div>

      {/* One column of copy in a two column grid. The second cell is left
          empty on purpose, so the words keep to the left half and the scene
          has the right half to itself.

          The deep bottom padding below xl is the scene's only room. On a
          phone there is no second column, so without it the copy runs to the
          foot of the section and the picture has nowhere to be seen at all.
          It also keeps the text clear of the trunk, which is the darkest
          thing in the artwork: when the banner was removed the section got
          shorter, the promises slid down into the open part of the scrim and
          the bottom two measured 1.04:1 sitting on bare wood. */}
      <Wrap className="relative z-10 grid items-center gap-10 pt-12 pb-[510px] sm:pt-16 sm:pb-[600px] xl:grid-cols-[1.05fr_.95fr] xl:gap-14 xl:py-20 xl:pb-20">
        {children}
      </Wrap>
    </>
  );
}

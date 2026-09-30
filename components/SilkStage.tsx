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

          One treatment at every width now: a picture held to the artwork's
          own 824:1024, with an overlay that fades it out on all four edges
          into the page. Below xl it sits under the copy, from xl beside it.
          Nothing is cropped at 1280 and up, and 3 to 8% of height on a phone
          and tablet where the box is a little squarer than the picture.

          The overlay is sized 50%/50%, and that is the part that has to be
          right. A radial sized past that never reaches its last stop at the
          edge midpoints: at 118%/108% the left edge sits at r=0.85, so the
          fade stopped partway and the picture still ended on a visible line.
          At 50%/50% the zero stop lands exactly on the edge, so it goes to
          cream on every side and the corners with it.

          The picture is 38vw from xl, down from 44 and 50 before that, and
          the crop fell with it: 38vw needs only 47vw of height to fit whole,
          which the section always has.          Those stops are measured; scratchpad/probe.py shoots the bare
          ground and samples the real line boxes over it. Widen the copy and
          they have to move. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto h-[400px] w-full max-w-[350px] overflow-hidden sm:bottom-8 sm:h-[470px] sm:max-w-[390px] xl:top-1/2 xl:right-0 xl:bottom-auto xl:left-auto xl:mx-0 xl:h-auto xl:w-[38%] xl:max-w-none xl:-translate-y-1/2 xl:aspect-[824/1024]">
        <Image
          src={heroScene}
          alt=""
          fill
          priority
          sizes="(max-width: 1279px) 390px, 38vw"
          className="object-cover object-center"
        />
        {/* The overlay. Cream at both edges so the picture is laid into the
            page rather than butted against it, and a light 8% veil across
            the middle so it sits back from the copy instead of shouting over
            it. Her hair begins 9.5% across the artwork and the left fade is
            clear by 12%, so it reaches the wall beside her and stops. */}
        <span className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(251,253,249,0)_56%,rgba(251,253,249,.5)_84%,#fbfdf9_100%)]" />
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

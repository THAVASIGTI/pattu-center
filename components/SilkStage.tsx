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
          xl:min-h so the panel is tall enough to hold her: those two together
          take the loss at 1440 from 36% to 17%.

          Below xl the copy no longer sits over the picture at all, so there
          is no scrim. From xl the horizontal dissolve stays: solid to 22%,
          gone by 40%, so the two creams meet inside the fade rather than at
          a line. Those stops are measured; scratchpad/probe.py shoots the
          bare ground and samples the real line boxes over it. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-7 mx-auto h-[440px] w-full max-w-[380px] overflow-hidden rounded-[26px] shadow-[0_18px_44px_rgba(10,46,26,.18)] sm:bottom-9 sm:h-[520px] sm:max-w-[430px] xl:bottom-0 xl:top-0 xl:left-auto xl:mx-0 xl:h-auto xl:max-w-[860px] xl:w-[58%] xl:rounded-none xl:shadow-none">
        <Image
          src={heroScene}
          alt=""
          fill
          priority
          sizes="(max-width: 1279px) 100vw, 58vw"
          className="object-cover object-[50%_30%] xl:object-[55%_32%]"
        />
        <span className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fbfdf9_0%,rgba(251,253,249,.97)_22%,rgba(251,253,249,.5)_40%,rgba(251,253,249,.12)_64%,rgba(251,253,249,0)_100%)] xl:block" />
        <span className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fbfdf9_0%,rgba(251,253,249,.97)_24%,rgba(251,253,249,.5)_40%,rgba(251,253,249,.12)_62%,rgba(251,253,249,0)_100%)] xl:block" />
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

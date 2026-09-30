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

          From xl there is a horizontal dissolve, solid to 4%, mostly gone
          by 6% and clear by 8.5%: a fade about 35px wide, and that is all.

          The panel is 52%, and going NARROWER is what made her visible.
          Every widening made it worse, because the mask exists only to cover
          the copy: a wider panel begins further left, so the copy sits
          proportionally deeper into it and the cream has to follow. At 68%
          the solid cream ran to 20% of the panel while her hair begins at
          9.5% across the artwork, so the mask was over her face; at 74% it
          swallowed her.

          At 52% the panel starts almost exactly where the copy ends, and the
          overlap is 3.7% at 1280, 1440, 1680 and 1920 alike, because Wrap is
          centred so the copy's right edge scales with the viewport just as a
          percentage panel does.

          object-position is 15% across and 20% down, also measured. At 1280
          the panel is narrower than the picture renders and 13.8% of width
          is cropped; at 15% only a sixth of that comes off the left, which
          keeps her hair at 8.6% and clear of the fade. At 1920 the height
          crops instead, and 20% keeps the highest floating photograph, which
          sits at 7%, in frame.

          Those stops are measured; scratchpad/probe.py shoots the bare
          ground and samples the real line boxes over it. Widen the copy and
          they have to move. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-7 mx-auto h-[440px] w-full max-w-[380px] overflow-hidden rounded-[26px] shadow-[0_18px_44px_rgba(10,46,26,.18)] sm:bottom-9 sm:h-[520px] sm:max-w-[430px] xl:bottom-0 xl:top-0 xl:left-auto xl:mx-0 xl:h-auto xl:max-w-[1000px] xl:w-[52%] xl:rounded-none xl:shadow-none">
        <Image
          src={heroScene}
          alt=""
          fill
          priority
          sizes="(max-width: 1279px) 100vw, 58vw"
          className="object-cover object-[50%_30%] xl:object-[15%_20%]"
        />
        <span className="absolute inset-0 hidden bg-[linear-gradient(90deg,#fbfdf9_0%,rgba(251,253,249,.96)_4%,rgba(251,253,249,.3)_6%,rgba(251,253,249,0)_8.5%)] xl:block" />
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

import Image from "next/image";
import type { ReactNode } from "react";
import { heroScene } from "@/config/content";
import { Wrap } from "./ui";

/**
 * The hero's two columns: the words on the left, the supplied artwork on the
 * right.
 *
 * The artwork is back after a spell with a stack of the shop's own sarees in
 * its place. What has NOT come back is how it used to be positioned: it was
 * an absolute layer, and the copy beside it carried a 510px bottom padding
 * to leave it room, a number measured once against one image. It is an
 * ordinary grid cell now, so the hero's height follows its content and a
 * different picture can be dropped in without re-measuring anything.
 *
 * The edges are masked rather than faded to cream, and that is the one real
 * decision here. The artwork's own ground is a warm cream wall, so the old
 * treatment, a radial that went to solid #fbfdf9 at the rim, used to lay it
 * into a flat cream page invisibly. The page is not flat cream any more: it
 * is a woven field. Anything that fades to opaque cream on a textured ground
 * stops reading as a fade and starts reading as a pale lozenge, texture on
 * one side of the line and none on the other, which is the same trap the
 * phone layout hit earlier. A mask makes the picture genuinely transparent
 * at its rim instead, so the weave runs on through it and there is no edge
 * to see at all.
 *
 * The copy keeps order-1 so it leads on a phone. Nobody arriving on a 390px
 * screen should meet a photograph before they are told what this shop does.
 */

/* closest-side, not a percentage pair. A radial sized "72% 70%" draws an
   ellipse 72% of the box WIDE from the centre, which is wider than the box's
   own half-width, so its last stop falls outside the picture and the mask
   was still 77% opaque where the edge actually is: a hard line, which is
   exactly what it was there to prevent. closest-side ends the ellipse on the
   nearest edge on each axis, so zero lands on the edge itself.

   The opaque core runs to 62%, which keeps her face and the trunk of silk
   whole. Pull that number down and the fade starts eating the picture;
   push it up and the rim comes back. */
const FADE = "radial-gradient(closest-side at 50% 47%, #000 62%, rgba(0,0,0,0) 100%)";

export default function SilkStage({ children }: { children: ReactNode }) {
  return (
    <Wrap className="relative z-10 grid items-center gap-10 py-12 sm:gap-12 sm:py-16 xl:grid-cols-[1.05fr_.95fr] xl:gap-14 xl:py-20">
      {children}
      <div className="order-2 mx-auto w-full max-w-[330px] sm:max-w-[400px] xl:mx-0 xl:ml-auto xl:max-w-[520px]">
        <Image
          src={heroScene}
          alt=""
          aria-hidden
          width={824}
          height={1024}
          priority
          sizes="(max-width: 639px) 330px, (max-width: 1279px) 400px, 520px"
          className="block h-auto w-full"
          style={{ WebkitMaskImage: FADE, maskImage: FADE }}
        />
      </div>
    </Wrap>
  );
}

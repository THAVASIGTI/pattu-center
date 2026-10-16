import type { ReactNode } from "react";
import SareeStack from "./SareeStack";
import { Wrap } from "./ui";

/**
 * The hero's two columns: the words on the left, the silk on the right.
 *
 * What used to be here was a single supplied painting, positioned absolutely
 * and given room by a 510px bottom padding on the copy below xl. That hack
 * is gone with the painting. The picture is now a real grid cell, so the
 * section is an ordinary two-column layout that collapses to one, and the
 * height of the hero is decided by its content rather than by a number
 * someone measured once against one image.
 *
 * It also had to go for a plainer reason: the thing on the right is now a
 * stack a visitor can tap through, and an absolutely positioned layer marked
 * pointer-events-none cannot be tapped.
 *
 * The copy keeps order-1 so it leads on a phone. Nobody arriving on a 390px
 * screen should meet a photograph before they are told what this shop does.
 */
export default function SilkStage({ children }: { children: ReactNode }) {
  return (
    <Wrap className="relative z-10 grid items-center gap-10 py-12 sm:gap-12 sm:py-16 xl:grid-cols-[1.05fr_.95fr] xl:gap-14 xl:py-20">
      {children}
      <div className="order-2 mx-auto w-full max-w-[320px] sm:max-w-[360px] xl:mx-0 xl:ml-auto xl:max-w-[440px]">
        <SareeStack />
      </div>
    </Wrap>
  );
}

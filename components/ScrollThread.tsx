"use client";

import { useEffect, useRef } from "react";

/**
 * A single zari thread drawn across the top of the window as you read down
 * the page.
 *
 * It is a progress indicator, but it is one the subject already owns: a
 * thread pulled the length of the cloth. That is the only reason it is here
 * rather than a bar, and it is why it is gold and 3px rather than a chunky
 * rail.
 *
 * Transform only, written from a rAF so a fast scroll coalesces into one
 * write per frame rather than one per event. It sits above the sticky header
 * (z-50) and below the mobile drawer (z-88), so it hems the header without
 * ever covering the menu.
 *
 * Nothing on the page depends on it: it is aria-hidden, it carries no text,
 * and if the script never runs it stays at scaleX(0) and is invisible.
 * Reduced motion keeps it, because it does not travel on its own, it only
 * reports where the reader already is.
 */
export default function ScrollThread() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const write = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 8 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      el.style.transform = `scaleX(${p})`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="foil pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0"
    />
  );
}

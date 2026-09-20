"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type From = "up" | "left" | "right" | "scale" | "arch";

const HIDDEN: Record<From, string> = {
  up: "translate-y-5 opacity-0",
  left: "-translate-x-8 opacity-0",
  right: "translate-x-8 opacity-0",
  scale: "scale-94 opacity-0",
  arch: "translate-y-8 scale-96 opacity-0",
};

/**
 * Fades content in as it scrolls into view, from a chosen direction.
 * Reduced-motion users get the content immediately, handled in CSS via
 * [data-reveal], so no state is written during the effect body.
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  duration = 700,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  from?: From;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={shown ? "in" : "out"}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
      className={`transition-all ease-out ${
        shown ? "translate-x-0 translate-y-0 scale-100 opacity-100" : HIDDEN[from]
      } ${className}`}
    >
      {children}
    </div>
  );
}

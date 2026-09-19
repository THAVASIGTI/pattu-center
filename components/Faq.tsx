"use client";

import { useState } from "react";

/** Accordion that keeps a single answer open at a time. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto grid max-w-[820px] gap-2.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-[14px] border bg-white shadow-soft transition-colors ${
              isOpen ? "border-line-gold" : "border-line"
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-btn-${i}`}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-serif text-[1.02rem] text-royal-deep"
              >
                {item.q}
                <span
                  aria-hidden
                  className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <path d="m6 9 6 6 6-6" className="text-gold" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              hidden={!isOpen}
              className="mx-5 border-t border-line py-3.5 pb-[18px] text-[0.94rem] text-ink-soft"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

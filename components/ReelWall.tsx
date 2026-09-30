"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { reels, type Reel } from "@/config/content";
import { ArrowRight, Close, Facebook, Instagram, Play, YouTube } from "./Icons";

/**
 * The shop's own videos, played on the page.
 *
 * Nothing third party loads until a card is clicked. Five embeds mounted up
 * front would pull in YouTube's and Facebook's players, and their cookies,
 * on every visit to the home page, for something most visitors never press.
 * So each card is a still frame with a play button, and the iframe is
 * created only when one is opened, one at a time.
 *
 * Every poster is a local file. Facebook's own poster URLs are signed and
 * expire, so a page that hotlinked them would quietly lose its images.
 *
 * The cards carry no title. The titles on these posts are upload dates, and
 * inventing descriptions for footage this file cannot see would be worse
 * than the position in the row, which is what the accessible name uses.
 */

const PLATFORM = {
  youtube: { label: "YouTube", Icon: YouTube, tint: "bg-[#ff0000]" },
  facebook: { label: "Facebook", Icon: Facebook, tint: "bg-[#1877f2]" },
  instagram: { label: "Instagram", Icon: Instagram, tint: "bg-[#d62976]" },
} as const;

/* Shared by the two kinds of card, because a reel that will not embed has to
   be an <a> and one that will has to be a <button>, and they must look the
   same. */
const CARD =
  "group relative block aspect-9/16 w-full cursor-pointer overflow-hidden rounded-[20px] border border-line-yellow bg-green-deep shadow-mid transition-all duration-500 hover:-translate-y-1.5 hover:border-yellow/60 hover:shadow-deep focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-green";

function Card({
  reel,
  index,
  label,
  onOpen,
  children,
}: {
  reel: Reel;
  index: number;
  label: string;
  onOpen: (el: HTMLButtonElement) => void;
  children: ReactNode;
}) {
  if (reel.linkOnly) {
    return (
      <a
        href={reel.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open video ${index + 1} of ${reels.length} on ${label}, in a new tab`}
        className={CARD}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      aria-label={`Play video ${index + 1} of ${reels.length}, on ${label}`}
      aria-haspopup="dialog"
      className={CARD}
    >
      {children}
    </button>
  );
}

export default function ReelWall() {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Where focus has to go back to when the panel closes.
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;

    closeRef.current?.focus();
    document.body.classList.add("overflow-hidden");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      // Hold Tab inside the panel. Without this, tabbing walks out of the
      // dialog and onto the page behind it, which is still there and still
      // scrolled to wherever the visitor was.
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, close]);

  const current = open === null ? null : reels[open];

  return (
    <>
      {/* One card at a time on a phone, a grid from sm. Eleven of these in a
          two-up grid is a wall of thumbnails nobody scrolls past; as a snap
          carousel each one is nearly full width and the next is visibly
          waiting. The negative margin lets it run to the screen edge while
          the padding keeps the first and last card off it. */}
      <ul className="-mx-7 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-7 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {reels.map((r, i) => {
          const { label, Icon, tint } = PLATFORM[r.platform];
          return (
            <li key={r.slug} className="w-[76%] shrink-0 snap-center sm:w-auto sm:shrink">
              <Card
                reel={r}
                index={i}
                label={label}
                onOpen={(el) => {
                  openerRef.current = el;
                  setOpen(i);
                }}
              >
                <Image
                  src={r.poster}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 200px"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />

                {/* Keeps the play mark and the badge legible whatever frame
                    the poster happens to be. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(10,46,26,.62),transparent_46%),linear-gradient(180deg,rgba(10,46,26,.42),transparent_32%)]"
                />

                <span
                  aria-hidden
                  className={`absolute top-2.5 left-2.5 grid size-7 place-items-center rounded-full text-white ring-1 ring-white/40 ${tint}`}
                >
                  <Icon className="size-[14px]" />
                </span>

                {/* Said on the card, not just in the accessible name. A
                    viewer should know which of these leave the site before
                    they tap, not after. */}
                {r.linkOnly && (
                  <span
                    aria-hidden
                    className="absolute top-3 right-2.5 rounded-full bg-[rgba(10,46,26,.72)] px-2 py-0.5 text-[0.58rem] font-semibold tracking-[0.08em] text-yellow-light uppercase ring-1 ring-white/25"
                  >
                    Opens on {label}
                  </span>
                )}

                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 grid size-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-[rgba(10,46,26,.52)] text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"
                >
                  {r.linkOnly ? (
                    <ArrowRight className="size-[20px]" />
                  ) : (
                    <Play className="size-[20px] translate-x-[1px]" />
                  )}
                </span>
              </Card>
            </li>
          );
        })}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Video ${(open ?? 0) + 1} of ${reels.length}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          className="fixed inset-0 z-[120] grid place-items-center bg-[rgba(5,26,14,.84)] p-4 backdrop-blur-sm"
        >
          <div ref={panelRef} className="w-full max-w-[400px]">
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <a
                href={current.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.82rem] font-semibold text-cream/85 underline-offset-4 hover:text-yellow-light hover:underline"
              >
                Open on {PLATFORM[current.platform].label}
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close video"
                className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-yellow/35 text-yellow-light transition-colors hover:border-yellow hover:bg-yellow hover:text-green-deep"
              >
                <Close className="size-[18px]" />
              </button>
            </div>

            <div className="aspect-9/16 overflow-hidden rounded-[20px] border border-yellow/40 bg-black">
              {/* Keyed on the slug so switching videos mounts a fresh iframe
                  rather than reusing one that is already playing. */}
              <iframe
                key={current.slug}
                src={current.embed}
                title={`Video ${(open ?? 0) + 1} of ${reels.length}`}
                allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; web-share"
                allowFullScreen
                className="size-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

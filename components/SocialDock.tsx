"use client";

import { useSyncExternalStore } from "react";
import { business, waLink } from "@/config/business";
import { Facebook, Instagram, WhatsApp, YouTube } from "./Icons";

const links = [
  {
    href: business.social.facebook,
    label: "Facebook",
    Icon: Facebook,
    // Each sits in its own brand colour, which is what makes them readable as
    // social buttons at this size rather than two more green circles.
    tint: "bg-[#1877f2] shadow-[0_6px_18px_rgba(24,119,242,.36)]",
  },
  {
    href: business.social.instagram,
    label: "Instagram",
    Icon: Instagram,
    tint: "bg-[linear-gradient(45deg,#f09433,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888)] shadow-[0_6px_18px_rgba(220,39,67,.36)]",
  },
  {
    href: business.social.youtube,
    label: "YouTube",
    Icon: YouTube,
    tint: "bg-[#ff0000] shadow-[0_6px_18px_rgba(255,0,0,.32)]",
  },
  {
    // A chat rather than a profile, so it carries the same prefilled message
    // as every other WhatsApp entry point on the site.
    href: waLink(),
    label: "WhatsApp",
    Icon: WhatsApp,
    tint: "bg-[#25d366] shadow-[0_6px_18px_rgba(37,211,102,.36)]",
  },
];

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange, { passive: true });
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** Past the hero, roughly. Keeps the dock off the opening call to action. */
const isPastHero = () => window.scrollY > window.innerHeight * 0.45;

/**
 * Floating social buttons, pinned to the right edge and vertically centred.
 * They clear the fixed bottom action bar on small screens by sitting above the
 * middle of the viewport, and the bar itself is hidden from `xl`, where the
 * dock centres properly.
 *
 * On a phone the column would otherwise land on the hero's call and WhatsApp
 * buttons, the green circle sitting straight on the green button, so it stays
 * out of the way until the first screenful has been scrolled past.
 */
export default function SocialDock() {
  const shown = useSyncExternalStore(subscribeScroll, isPastHero, () => false);

  return (
    <div
      aria-hidden={!shown}
      className={`fixed right-3 bottom-[calc(58px+env(safe-area-inset-bottom)+14px)] z-[70] flex flex-col gap-2.5 transition-all duration-300 ease-out sm:right-4 xl:top-1/2 xl:bottom-auto xl:-translate-y-1/2 xl:gap-3 ${
        shown
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-4 opacity-0"
      }`}
    >
      {links.map(({ href, label, Icon, tint }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${business.name} on ${label}`}
          tabIndex={shown ? undefined : -1}
          className={`grid size-[42px] place-items-center rounded-full text-white ring-1 ring-white/45 transition-transform duration-300 hover:scale-110 sm:size-[46px] ${tint}`}
        >
          <Icon className="size-[19px] sm:size-[21px]" />
        </a>
      ))}
    </div>
  );
}

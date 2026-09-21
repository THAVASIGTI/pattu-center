import { business } from "@/config/business";
import { Facebook, Instagram } from "./Icons";

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
];

/**
 * Floating Facebook and Instagram buttons, pinned to the right edge and
 * vertically centred. They clear the fixed bottom action bar on small screens
 * by sitting above the middle of the viewport, and the bar itself is hidden
 * from `xl`, where the dock centres properly.
 */
export default function SocialDock() {
  return (
    <div className="fixed right-3 bottom-[calc(58px+env(safe-area-inset-bottom)+14px)] z-[70] flex flex-col gap-2.5 sm:right-4 xl:top-1/2 xl:bottom-auto xl:-translate-y-1/2 xl:gap-3">
      {links.map(({ href, label, Icon, tint }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${business.name} on ${label}`}
          className={`grid size-[42px] place-items-center rounded-full text-white ring-1 ring-white/45 transition-transform duration-300 hover:scale-110 sm:size-[46px] ${tint}`}
        >
          <Icon className="size-[19px] sm:size-[21px]" />
        </a>
      ))}
    </div>
  );
}

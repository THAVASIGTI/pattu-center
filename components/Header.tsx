"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { business, waLink } from "@/config/business";
import { logoMark } from "@/config/content";
import { Close, Menu, Phone, WhatsApp } from "./Icons";
import { Wrap } from "./ui";

/** Every entry is a real route, navigation is a page load, never an anchor jump. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/what-we-buy", label: "What We Buy" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/branches", label: "Branches" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${business.name} home`}>
      {/* Ring sits on the wrapper so the padding does not shrink the mark. */}
      <span className="grid size-[50px] shrink-0 place-items-center rounded-full border border-yellow/55 bg-white/70 p-[3px] shadow-[0_1px_6px_rgba(10,46,26,.08)] lg:size-[62px]">
        <Image
          src={logoMark}
          alt=""
          aria-hidden
          width={192}
          height={192}
          priority
          className="size-full object-contain"
        />
      </span>
      <span className={`min-w-0 font-serif text-[1.02rem] leading-tight lg:whitespace-nowrap lg:text-[1.08rem] ${dark ? "text-white" : "text-green-deep"}`}>
        {business.name}
        <span className="mt-0.5 block font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-yellow-ink">
          Old Silk Saree Buyers
        </span>
      </span>
    </Link>
  );
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > 8;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  // Scroll position is external state, so subscribe to it rather than
  // mirroring it into React state from an effect.
  const stuck = useSyncExternalStore(subscribeScroll, isScrolled, () => false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-yellow/25 bg-[linear-gradient(90deg,#0a2e1a_0%,#15803d_50%,#0a2e1a_100%)] text-[0.79rem] text-yellow-pale lg:text-[0.82rem]">
        <Wrap className="flex min-h-[34px] flex-wrap items-center justify-center gap-4 lg:min-h-10 lg:justify-between">
          <span className="font-tamil text-yellow-light">{business.tagline}</span>
          <div className="hidden gap-4 lg:flex">
            {business.phones.map((p) => (
              <a key={p.href} href={p.href} className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
                <Phone className="size-3 opacity-70" />
                {p.label}
              </a>
            ))}
          </div>
        </Wrap>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur-md transition-shadow duration-300 ${
          stuck ? "shadow-[0_6px_24px_rgba(10,46,26,.11)]" : ""
        }`}
      >
        <Wrap className="flex min-h-[62px] items-center justify-between gap-3.5 lg:min-h-[72px]">
          <Brand />

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`whitespace-nowrap rounded-[9px] px-2.5 py-2 text-[0.85rem] transition-colors ${
                  isActive(l.href)
                    ? "font-semibold text-green"
                    : "font-medium text-ink-soft hover:bg-green/[0.07] hover:text-green"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="foil hidden min-h-12 items-center gap-2 rounded-full px-6 text-[0.93rem] font-semibold whitespace-nowrap text-[#3a2a06] shadow-[0_6px_20px_rgba(202,154,4,.36)] transition-transform hover:-translate-y-0.5 xl:inline-flex"
            >
              Get a Price
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="drawer-nav"
              className="grid size-[46px] shrink-0 cursor-pointer place-items-center rounded-xl border border-line-yellow bg-white text-green xl:hidden"
            >
              {open ? <Close className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </Wrap>
      </header>

      {/* Scrim */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[88] bg-[rgba(5,26,14,.62)] backdrop-blur-[3px] transition-opacity duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <nav
        id="drawer-nav"
        aria-label="Mobile"
        className={`fixed top-0 right-0 z-[90] flex h-dvh w-[min(86vw,340px)] flex-col overflow-y-auto overscroll-contain border-l border-yellow/30 px-5 pt-[18px] pb-[calc(22px+env(safe-area-inset-bottom))] transition-transform duration-[360ms] ease-out xl:hidden bg-[radial-gradient(420px_360px_at_100%_0%,rgba(34,197,94,.4),transparent_68%),linear-gradient(168deg,#14532d_0%,#0a2e1a_100%)] ${
          open ? "translate-x-0" : "translate-x-[102%]"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-yellow-light">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-[42px] cursor-pointer place-items-center rounded-xl border border-yellow/35 text-yellow-light"
          >
            <Close className="size-[18px]" />
          </button>
        </div>

        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`flex min-h-[52px] items-center justify-between border-b border-yellow/20 px-1 py-2.5 text-base last:border-b-0 ${
              isActive(l.href) ? "font-semibold text-yellow-light" : "text-cream/85"
            }`}
          >
            {l.label}
            <span className="text-[1.3rem] leading-none text-yellow">›</span>
          </Link>
        ))}

        <div className="mt-6 grid gap-2.5">
          <a
            href={business.phones[0].href}
            className="foil inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full px-6 text-[0.93rem] font-semibold text-[#3a2a06]"
          >
            <Phone className="size-[17px]" />
            Call {business.phones[0].label}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-6 text-[0.93rem] font-semibold text-[#06301a]"
          >
            <WhatsApp className="size-[17px]" />
            WhatsApp Us
          </a>
        </div>
      </nav>
    </>
  );
}

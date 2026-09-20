import Image from "next/image";
import Link from "next/link";
import { branches, business, waLink } from "@/config/business";
import { logoMark } from "@/config/content";
import { Clock, Facebook, Instagram, Mail, Phone, WhatsApp, YouTube } from "./Icons";
import { Wrap } from "./ui";

const explore = [
  { href: "/about", label: "About us" },
  { href: "/what-we-buy", label: "What we buy" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="bg-[radial-gradient(700px_400px_at_84%_0%,rgba(21,128,61,.5),transparent_64%),linear-gradient(180deg,#10361f_0%,#061a0f_100%)] pt-12 text-[0.92rem] text-cream/70">
      <Wrap>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-9">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logoMark}
                alt=""
                aria-hidden
                width={192}
                height={192}
                className="size-[52px] shrink-0 object-contain"
              />
              <span className="font-serif text-[1.02rem] leading-tight text-white">
                {business.name}
                <span className="mt-0.5 block font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-yellow">
                  Old Silk Saree Buyers
                </span>
              </span>
            </Link>
            <p className="mt-3.5 max-w-[36ch] text-[0.9rem] text-cream/60">
              Buying old pattu sarees, silk vetti, shawls, zari and silver across Tamil Nadu.
              Fair weight, honest price, cash the same day.
            </p>
            <div className="mt-4 flex gap-2.5">
              {[
                { href: business.social.youtube, label: "YouTube", Icon: YouTube },
                { href: business.social.instagram, label: "Instagram", Icon: Instagram },
                { href: business.social.facebook, label: "Facebook", Icon: Facebook },
                { href: waLink(), label: "WhatsApp", Icon: WhatsApp },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-[42px] place-items-center rounded-full border border-yellow/40 text-yellow-light transition-colors hover:border-yellow hover:bg-yellow hover:text-green-deep"
                >
                  <Icon className="size-[17px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className="mb-3.5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.17em] text-yellow-light">
              Explore
            </h2>
            <ul className="grid gap-1">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center transition-colors hover:text-yellow-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h2 className="mb-3.5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.17em] text-yellow-light">
              Branches
            </h2>
            <ul className="grid gap-1">
              {branches.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/branches/${b.slug}`}
                    className="inline-flex min-h-9 items-center transition-colors hover:text-yellow-light"
                  >
                    {b.shortLabel ?? (b.isHeadOffice ? `${b.city} (HO)` : b.city)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-3.5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.17em] text-yellow-light">
              Talk to us
            </h2>
            <ul className="grid gap-1">
              <li className="py-1 text-cream/85">{business.ownersLabel}</li>
              {business.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="inline-flex min-h-9 items-center gap-2 transition-colors hover:text-yellow-light">
                    <Phone className="size-3.5 opacity-70" />
                    {p.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 transition-colors hover:text-yellow-light">
                  <WhatsApp className="size-3.5 opacity-70" />
                  WhatsApp {business.whatsapp[0].label}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="inline-flex min-h-9 items-center gap-2 break-all transition-colors hover:text-yellow-light">
                  <Mail className="size-3.5 opacity-70" />
                  {business.email}
                </a>
              </li>
            </ul>
            <p className="mt-3 flex items-start gap-2 text-[0.86rem] text-cream/55">
              <Clock className="mt-0.5 size-3.5 shrink-0 opacity-70" />
              {business.hours}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-2.5 border-t border-yellow/20 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] text-[0.82rem] text-cream/50">
          <span>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </span>
          <span className="font-tamil">{business.tagline}</span>
        </div>
      </Wrap>
    </footer>
  );
}

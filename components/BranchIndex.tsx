import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Pin, WhatsApp } from "./Icons";
import Reveal from "./Reveal";
import { Button, Section, SectionHead, Wrap } from "./ui";
import { ZariBand } from "./Zari";
import { branchCountWordCap, branches, business, waLink } from "@/config/business";
import { zariThreads } from "@/config/content";

/**
 * The branches on the home page, as an index rather than a card grid.
 *
 * Eleven identical panels is what this was, and eleven of anything identical
 * is a list the eye refuses to read: every branch was given the same size, so
 * none of them was given any. What a visitor actually needs from this section
 * is one of two things, and they are not the same shape. Either she is in
 * Madurai and wants the head office, address and phone and all, or she is
 * somewhere else and wants to find her own town in a list as fast as she can.
 *
 * So the section now does both separately. The head office is one large block
 * with its address, its phone and its hours. The other ten are a tight index
 * of names, set large enough to scan at arm's length, laid on a single woven
 * panel instead of ten floating cards.
 *
 * The panel is the point of the gold gaps: the tiles sit on a gold ground
 * with a 1px gutter, so the grid reads as threads crossing between them, and
 * the whole index is one piece of cloth rather than ten objects. That is also
 * why none of these tiles carries glass. A backdrop-filter samples whatever
 * is painted behind it, including that gold, and would pull it through and
 * turn the panel beige, which is the trap already recorded in globals.css.
 *
 * The ground is a loom warp, gold on near-black, under a green wash heavy
 * enough to keep cream type above 4.5:1. The wash is not optional.
 */
export default function BranchIndex() {
  const head = branches.find((b) => b.isHeadOffice) ?? branches[0];
  const rest = branches.filter((b) => b.slug !== head.slug);
  const headPhone = business.phones[head.phoneIndex] ?? business.phones[0];

  return (
    <Section id="branches" tone="green" className="relative">
      {/* Warp threads on a loom: the cloth before it is cloth, which is the
          right ground for a section about where the shop is rather than what
          it buys. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={zariThreads}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <span className="absolute inset-0 bg-[linear-gradient(176deg,rgba(10,46,26,.80)_0%,rgba(10,46,26,.90)_46%,rgba(10,46,26,.95)_100%)]" />
      </div>

      <Wrap className="relative z-10">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal from="left">
            <SectionHead
              tone="dark"
              align="left"
              eyebrow="Find us"
              title={`${branchCountWordCap} branches across Tamil Nadu.`}
              lead="Walk in during shop hours, or call the nearest branch and we will come to you. Free pickup even for one or two sarees."
            />
            <Button href="/branches" variant="ghost">
              All branch details
              <ArrowRight className="size-[17px]" />
            </Button>
          </Reveal>

          {/* The head office, at the size it deserves. It is the only branch
              a stranger to the business can be told to go to without asking
              where she lives, so it carries the address and the phone in
              full and the other ten carry a name and a street. */}
          <Reveal from="right" delay={120}>
            <article className="overflow-hidden rounded-[26px] border border-yellow/25 bg-green-deep/70">
              <ZariBand className="h-9" />
              <div className="p-6 sm:p-7">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-yellow-light">
                  Head office
                </p>
                <h3 className="mt-1.5 font-serif text-[clamp(1.7rem,4.6vw,2.3rem)] leading-[1.1] text-white">
                  {head.city}
                </h3>
                <address className="mt-3 text-[0.95rem] leading-relaxed text-cream/75 not-italic">
                  {head.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Button href={headPhone.href} variant="yellow">
                    <Phone className="size-[17px]" />
                    {headPhone.label}
                  </Button>
                  <Button href={`/branches/${head.slug}`} variant="ghost">
                    Branch page
                    <ArrowRight className="size-[17px]" />
                  </Button>
                </div>
                <p className="mt-5 inline-flex items-center gap-2 text-[0.84rem] text-cream/70">
                  <span aria-hidden className="size-1.5 rounded-full bg-green-soft" />
                  {business.hours}
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        {/* The other ten, as names. One gold ground showing through a 1px
            gutter, so this is a woven panel and not ten cards.

            The closing invitation is the last tile rather than a block below
            the panel, and that is arithmetic as much as composition: ten
            tiles in three columns leaves two empty cells, and an empty cell
            in this construction is not blank, it is a bare patch of the gold
            ground. Spanning the invitation across two makes every row full
            at each of the three column counts (1, 2 and 3). */}
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[26px] bg-yellow/35 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((b, i) => {
            const phone = business.phones[b.phoneIndex] ?? business.phones[0];
            return (
              <li key={b.slug} className="bg-green-deep/85">
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <div className="group relative flex h-full flex-col p-5 transition-colors duration-300 hover:bg-green-mid/60 sm:p-6">
                    {/* A thread drawn across the top as the pointer arrives.
                        scaleX from the left, so it is pulled rather than
                        faded, and it is a transform so it costs nothing. */}
                    <span
                      aria-hidden
                      className="foil absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    <h3 className="font-serif text-[1.4rem] leading-tight text-cream transition-colors duration-300 group-hover:text-yellow-light">
                      <Link href={`/branches/${b.slug}`} className="after:absolute after:inset-0">
                        {b.city}
                      </Link>
                      {b.badge && (
                        <span className="ml-2 align-middle font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-yellow-light/80">
                          {b.badge}
                        </span>
                      )}
                    </h3>
                    <p className="mt-1.5 flex-1 text-[0.86rem] leading-relaxed text-cream/60">
                      {b.pickupOnly ? "Doorstep pickup across the city" : b.lines[0]}
                    </p>
                    {/* One row, not two stacked. Ten tiles on a phone is a
                        long column already, and folding these together takes
                        about 400px off it for nothing lost. */}
                    <p className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
                      <span className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-yellow-light">
                        <Pin className="size-3.5" />
                        Branch page
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      {/* Above the link overlay, so a thumb can dial from the
                          index without opening the branch page first. */}
                      <a
                        href={phone.href}
                        aria-label={`Call our ${b.city} branch`}
                        className="relative z-10 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-yellow/30 px-3.5 text-[0.8rem] font-semibold text-cream transition-colors hover:bg-yellow/20 hover:text-yellow-light"
                      >
                        <Phone className="size-3.5" />
                        {phone.label}
                      </a>
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}

          <li className="bg-green-mid/70 sm:col-span-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col items-start gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h3 className="font-serif text-[1.35rem] text-white">Not near a branch?</h3>
                  <p className="mt-1.5 max-w-[56ch] text-[0.92rem] leading-relaxed text-cream/75">
                    We run collection routes across the state and will come for even one or
                    two sarees. Send photos on WhatsApp and we will tell you when we are next
                    in your area.
                  </p>
                </div>
                <Button
                  href={waLink(
                    "Hello, I want to sell my old silk sarees. I am not near a branch.",
                  )}
                  variant="whatsapp"
                  external
                  className="w-full shrink-0 sm:w-auto"
                >
                  <WhatsApp className="size-[17px]" />
                  Message us
                </Button>
              </div>
            </Reveal>
          </li>
        </ul>
      </Wrap>
    </Section>
  );
}

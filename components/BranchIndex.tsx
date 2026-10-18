import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Pin, WhatsApp } from "./Icons";
import Reveal from "./Reveal";
import { Button, Section, SectionHead, Wrap } from "./ui";
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
 * with its address, its phone and its hours. The other ten travel past in a
 * rail, at the client's request, and stop the moment a pointer touches them.
 *
 * The travel is what makes the count felt. Ten tiles in a static grid is a
 * block of text nobody counts; ten going by is a line of branches that keeps
 * producing another town, which is the one thing this section is for. Pausing
 * on hover is not a nicety either: a list that moves is unusable without it,
 * because reaching for a card means chasing it.
 *
 * The tiles sit on a gold ground with a 1px gutter, so the rail reads as one
 * length of cloth with threads between the panels rather than as ten floating
 * cards. That is also why none of them carries glass. A backdrop-filter
 * samples whatever is painted behind it, including that gold, and would pull
 * it through and turn the rail beige, which is the trap already recorded in
 * globals.css.
 *
 * The ground is a loom warp, gold on near-black, under a green wash heavy
 * enough to keep cream type above 4.5:1. The wash is not optional.
 */

type Branch = (typeof branches)[number];

/** One town in the rail. Lifted out of the markup because the rail renders
 *  the whole list twice: once as the real thing and once as an inert clone
 *  that exists only so the loop can close without a seam. */
function BranchTile({ b }: { b: Branch }) {
  const phone = business.phones[b.phoneIndex] ?? business.phones[0];
  return (
    <div className="group relative flex h-full flex-col p-5 transition-colors duration-300 hover:bg-green-mid/60 sm:p-6">
      {/* A thread drawn across the top as the pointer arrives. scaleX from
          the left, so it is pulled rather than faded, and it is a transform
          so it costs nothing. */}
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
      <p className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
        <span className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-yellow-light">
          <Pin className="size-3.5" />
          Branch page
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        {/* Above the link overlay, so a thumb can dial from the rail without
            opening the branch page first. */}
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
  );
}

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
            {/* A gold rule across the top, where a strip of real brocade used
                to sit. One line of the brand's own foil marks the head office
                just as well as a photograph of cloth did, and it does not ask
                anyone to download a picture to see a border. */}
            <article className="overflow-hidden rounded-[26px] border border-yellow/25 bg-green-deep/70">
              <span aria-hidden className="foil block h-[3px] w-full" />
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

        {/* The other ten, going past.

            The rail breaks out of the Wrap on purpose. A marquee that starts
            and ends inside the page gutter reads as a widget sitting in the
            column; one that runs out past both edges reads as a length of
            cloth being drawn through, which is the whole idea.

            calc(50% - 50vw) is how it gets there in one declaration at every
            width. The percentage resolves against this element's own width,
            which is Wrap's content box, so the margin is exactly minus the
            distance from here to the viewport edge whether that distance is
            Wrap's 20px padding on a phone or half the leftover on a wide
            screen. It overshoots by half a scrollbar on a desktop, which the
            body's overflow-x: hidden clips and the edge mask hides anyway.

            The edges are masked to transparent rather than cut, so a card
            arriving fades up out of the ground instead of appearing at a
            hard line. */}
        <div className="marquee group relative mt-10 mx-[calc(50%-50vw)] sm:mt-12">
          <div className="marquee-viewport overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,#000_5%,#000_95%,transparent_100%)]">
            <ul
              className="marquee-track flex w-max gap-px bg-yellow/35"
              style={{ animation: "branch-marquee 58s linear infinite" }}
            >
              {[0, 1].map((copy) =>
                rest.map((b) => (
                  <li
                    key={`${copy}-${b.slug}`}
                    className={`w-[270px] shrink-0 bg-green-deep/85 sm:w-[310px] ${
                      copy === 1 ? "marquee-clone" : ""
                    }`}
                    /* The second pass is scenery. inert keeps it out of the
                       tab order and off the accessibility tree in one
                       attribute, so ten branches are announced once and a
                       keyboard reaches each card exactly once. */
                    {...(copy === 1 ? { "aria-hidden": true, inert: true } : {})}
                  >
                    <BranchTile b={b} />
                  </li>
                )),
              )}
            </ul>
          </div>
          {/* Said plainly, because a rail that stops under the pointer is
              only obvious once you have already done it by accident. Both
              verbs, because both work: the thumb gets it through :active. */}
          <p className="mt-3 px-5 text-center text-[0.74rem] font-medium uppercase tracking-[0.12em] text-cream/50">
            Hover or hold any branch to stop the rail
          </p>
        </div>

        {/* The closing invitation, which used to be the last tile of the
            grid. It cannot ride in the rail: it is twice the width of a
            branch and carries the one WhatsApp button in this section, and a
            button that travels sideways is a button nobody can press. */}
        <Reveal>
          <div className="mt-6 flex flex-col items-start gap-5 rounded-[26px] border border-yellow/20 bg-green-mid/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
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
      </Wrap>
    </Section>
  );
}

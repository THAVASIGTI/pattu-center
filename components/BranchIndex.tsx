import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Phone, Pin, WhatsApp } from "./Icons";
import Reveal from "./Reveal";
import { Button, Section, SectionHead, Wrap } from "./ui";
import { branchCountWordCap, branches, business, waLink } from "@/config/business";
import { zariThreads } from "@/config/content";

/**
 * The branches on the home page: a heading, then all eleven of them
 * travelling past in a rail that stops under the pointer.
 *
 * The shape has changed twice and both changes came from the client.
 *
 * It was a grid of eleven identical panels, then a heading beside one large
 * head-office block with the other ten as a grid of names below. The big
 * block is gone now and Madurai rides in the rail with the rest. What it
 * loses is its full address and the opening hours, both of which are one
 * click away on its own page and in the footer; what the section gains is
 * one idea instead of two, and a heading with the whole measure to sit in.
 * The head office leads the rail, says what it is on its eyebrow and
 * carries a gold edge at the weight the other cards only reach on hover.
 *
 * The travel is what makes the count felt. Eleven tiles in a static grid is
 * a block nobody reads to the end of; eleven going by is a line that keeps
 * producing another town, which is the one thing this section is for.
 * Pausing is not a nicety on top of that, it is what makes it usable:
 * reaching for a card that is moving means chasing it.
 *
 * Each one is a card in its own right, not a cell of a panel. It was a panel
 * once: flat tiles butted together with a 1px gold gutter, on the reasoning
 * that a continuous surface reads as one length of cloth. That holds for a
 * grid sitting still and fails for a rail that moves, because a continuous
 * surface going sideways is a surface going sideways and nothing in it is an
 * object. Separate cards with air between them are things travelling, which
 * is the only version of this anyone reads as a list of branches.
 *
 * None of this uses glass. A backdrop-filter samples everything painted
 * behind it, which here is a photograph under a wash, and twenty-two of them
 * being translated across the screen would make the browser re-composite
 * that whole ground every frame. The card grounds are plain gradients for
 * that reason, and the lift is a transform, so the only thing the
 * compositor has to do per frame is move layers it already has.
 *
 * The section ground is a loom warp, gold on near-black, under a green wash
 * heavy enough to keep cream type above 4.5:1. The wash is not optional.
 */

type Branch = (typeof branches)[number];

/** One town in the rail.
 *
 *  Lifted out of the markup because the rail renders the whole list twice:
 *  once as the real thing and once as an inert clone that exists only so the
 *  loop can close without a seam. */
function BranchTile({ b }: { b: Branch }) {
  const phone = business.phones[b.phoneIndex] ?? business.phones[0];
  /* The head office rides in the rail with the rest now, so its precedence
     has to come from the card rather than from a panel of its own: it leads
     the list, it says what it is on the eyebrow, and its edge is gold at
     the weight the others only reach under the pointer. That is as far as
     it goes. Making it taller or wider would break the cell arithmetic the
     seamless loop depends on. */
  const lead = b.isHeadOffice;
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[22px] border bg-[linear-gradient(168deg,rgba(26,97,55,.95)_0%,rgba(12,54,30,.97)_100%)] shadow-[0_8px_24px_rgba(0,0,0,.28)] transition-all duration-300 hover:-translate-y-1.5 hover:border-yellow/55 hover:shadow-[0_14px_30px_rgba(0,0,0,.45)] ${
        lead ? "border-yellow/55" : "border-yellow/20"
      }`}
    >
      {/* The border off the top of the card, which is what makes it a saree
          card rather than a panel with a line on it: a foil rule with the
          temple teeth of the drawn zari just under it. */}
      <span aria-hidden className="foil block h-[3px] w-full shrink-0" />
      <span
        aria-hidden
        className="block h-[7px] w-full shrink-0 bg-[repeating-linear-gradient(90deg,rgba(253,224,71,.34)_0_1px,rgba(202,154,4,.14)_1px_3px,transparent_3px_11px)]"
      />

      {/* There is no sheen on these cards, and that is a measurement
          rather than a preference. The category board has one and it works
          there; here the same pass at the same alpha lifted the card ground
          from (23,88,50) to (70,115,84) exactly where the street line and
          the meta row sit, and took them to 2.91:1 against a 4.5 floor. The
          only versions that cleared it were a sheen too faint to see or body
          text so near white that the card had no hierarchy left. The rail is
          already travelling and the cards already gild under the pointer;
          this was motion on top of motion, paid for in legibility.

          If you put it back, confine it to the border strip above the type
          and re-measure the badge, which is 9.6px and has the least room. */}

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        {/* The badge above the name rather than beside it. Beside it, a
            two-word city plus "Branch 2" wrapped to a second line on half
            the cards and the rail went ragged; above, every card has its
            name on one line starting at the same height. */}
        <p className="flex h-4 items-center gap-2 text-[0.6rem] font-semibold tracking-[0.18em] text-yellow-light uppercase">
          <Pin aria-hidden className="size-3" />
          {lead
            ? "Head office"
            : (b.badge ?? (b.pickupOnly ? "Collection" : "Branch"))}
        </p>

        <h3 className="mt-2 font-serif text-[1.5rem] leading-tight text-cream transition-colors duration-300 group-hover:text-yellow-light">
          <Link href={`/branches/${b.slug}`} className="after:absolute after:inset-0">
            {b.city}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-cream/80">
          {b.pickupOnly ? "Doorstep pickup across the city" : b.lines[0]}
        </p>

        {/* The two things a seller asks next, both already in the data, so
            neither is a claim this card invents. */}
        <p className="mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[0.76rem] text-cream/70">
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5 text-yellow-light/85" />
            Open all seven days
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Pin aria-hidden className="size-3.5 text-yellow-light/85" />
            {b.areas.length} areas
          </span>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-yellow/15 pt-4">
          {/* Above the link overlay, so a thumb can dial from the rail
              without opening the branch page first. */}
          <a
            href={phone.href}
            aria-label={`Call our ${b.city} branch`}
            className="relative z-10 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-yellow/35 px-3.5 text-[0.78rem] font-semibold text-cream transition-colors hover:bg-yellow/20 hover:text-yellow-light"
          >
            <Phone className="size-3.5" />
            {phone.label}
          </a>
          <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-yellow-light">
            Branch page
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function BranchIndex() {
  /* Head office first, then the rest in their configured order. It rides in
     the rail with everything else now; the large panel that used to carry
     its full address is gone at the client's request. Leading the rail is
     the whole of its remaining precedence, with its own eyebrow and a
     brighter edge on the card. */
  const rail = [
    ...branches.filter((b) => b.isHeadOffice),
    ...branches.filter((b) => !b.isHeadOffice),
  ];

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
        {/* One heading block across the measure, with the button sitting on
            the baseline at the far end of it. This was two columns, the
            heading beside the head office panel; with the panel gone a
            half-width heading would have left the right of the section
            empty, so the title takes the room it used to share. */}
        <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
          <Reveal from="left">
            <SectionHead
              tone="dark"
              align="left"
              className="mb-0"
              eyebrow="Find us"
              title={`${branchCountWordCap} branches across Tamil Nadu.`}
              lead="Walk in during shop hours, or call the nearest branch and we will come to you. Free pickup even for one or two sarees."
            />
          </Reveal>
          <Reveal from="right" delay={120}>
            <Button href="/branches" variant="ghost" className="w-full sm:w-auto">
              All branch details
              <ArrowRight className="size-[17px]" />
            </Button>
          </Reveal>
        </div>

        {/* All eleven, going past.

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
            {/* The gutter is padding inside each fixed-width cell, never a
                gap on the track, and that is arithmetic rather than taste.
                With `gap` there is one fewer gutter than there are cells,
                so half the track is one copy plus half a gutter and the loop
                jumps by that much every time it comes round. Folding the
                gutter into the cell makes every cell exactly the same width,
                so half the track is exactly one copy, whatever the count. */}
            {/* The travel itself is in globals.css, on .marquee-track. It
                has to be: as an inline shorthand it carried
                animation-play-state: running with it and outranked the rule
                that pauses this on hover. */}
            <ul className="marquee-track flex w-max items-stretch py-4">
              {[0, 1].map((copy) =>
                rail.map((b) => (
                  <li
                    key={`${copy}-${b.slug}`}
                    className={`w-[286px] shrink-0 pr-4 sm:w-[326px] sm:pr-5 ${
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
          <p className="mt-3 px-5 text-center text-[0.74rem] font-medium uppercase tracking-[0.12em] text-cream/60">
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

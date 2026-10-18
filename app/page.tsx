import Link from "next/link";
import BranchIndex from "@/components/BranchIndex";
import Counter from "@/components/Counter";
import CtaBand from "@/components/CtaBand";
import BuyBoard from "@/components/BuyBoard";
import SilkStage from "@/components/SilkStage";
import CulturalBanner from "@/components/CulturalBanner";
import HeroBackdrop from "@/components/HeroBackdrop";
import PriceScale from "@/components/PriceScale";
import ReelWall from "@/components/ReelWall";
import SareeCycle from "@/components/SareeCycle";
import ZariWeave, { ZariRule } from "@/components/Zari";
import {
  ArrowRight,
  Check,
  Ledger,
  Phone,
  Scale,
  Shield,
  Vanakkam,
  ZariBorder,
  serviceIcons,
} from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { Button, Section, SectionHead, Wrap } from "@/components/ui";
import { business } from "@/config/business";
import {
  priceLedger,
  homeReels,
  reels,
  services,
  testimonials,
  whyChooseUs,
} from "@/config/content";

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      {/* The hero fills the screen and no more. 8.25rem is the measured
          chrome above it: a 91px sticky header plus the 41px the section
          starts down from it. min-height rather than height, so a short
          window grows the section instead of clipping the copy into it. */}
      <section id="hero" className="relative overflow-hidden bg-cream text-ink xl:min-h-[calc(100vh-8.25rem)]">
        {/* The ground, in layers, bottom up.

            SareeCycle is the photographs: six stacks of the shop's own silk
            changing every two seconds under a cream wash. ZariWeave is the
            drawn saree borders running sideways over them, which still do
            the work they were added for: the wash flattens the photographs
            into a field, and the borders are what keeps that field moving at
            the scale of a motif rather than only at the scale of a whole
            picture. Everything that follows sits on top of both. */}
        <SareeCycle />
        <ZariWeave />
        <HeroBackdrop />
        {/* Saree border and kolam under the copy. Sits above the rings and
            motes and below the photograph, which covers whatever of it
            reaches the right of the section. */}
        <CulturalBanner />

        {/* SilkStage lays the rotating photograph under the section and puts
            the panel that names it beside the copy. The two share one index,
            so they are one component; the copy stays here as its children. */}
        <SilkStage>
          <div className="order-1 text-center xl:text-left">
            {/* The greeting, on its own ground.

                It sits in a chip rather than as a bare line because of what
                is behind it: rings, motes, a kolam and a temple border all
                pass under this corner, and a chip gives the words a ground
                that does not move with them. It also keeps the greeting from
                reading as a second eyebrow, which a gold uppercase line
                directly above a gold uppercase line would. */}
            <p className="rise mb-5 inline-flex items-center gap-3 rounded-full border border-line-yellow glass-soft px-5 py-2.5 shadow-soft">
              <Vanakkam aria-hidden className="size-8 shrink-0 text-yellow-ink" />
              <span className="text-[0.95rem] text-ink-soft">
                Welcome to{" "}
                <b className="font-serif text-[1.15rem] font-normal text-green-deep">
                  {business.name}
                </b>
              </span>
            </p>

            {/* What we buy, said next. The reference this was rebuilt from
                opens on the goods, and that order is kept: the greeting is
                one quiet line, then the goods, then the claim. */}
            <p className="rise [animation-delay:90ms] mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 xl:justify-start">
              {["Old pattu sarees", "Silk vetti", "Zari and silver"].map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden className="h-3 w-px bg-line-yellow" />
                  )}
                  <span className="font-royal text-[0.78rem] font-medium tracking-[0.2em] text-yellow-ink uppercase">
                    {t}
                  </span>
                </span>
              ))}
            </p>

            {/* One headline, held still. The second line carries the claim and
                takes the gold, so the eye lands on the promise rather than on
                the noun. */}
            <h1 className="rise [animation-delay:180ms] mx-auto max-w-[15ch] font-serif text-[clamp(2.1rem,6.4vw,3.5rem)] leading-[1.12] text-green-deep xl:mx-0">
              Your old silk is
              <span className="rise [animation-delay:300ms] foil-text-deep foil-shimmer block">still worth money.</span>
            </h1>

            <p className="rise [animation-delay:420ms] mx-auto mt-5 max-w-[44ch] text-[clamp(1rem,2.7vw,1.1rem)] leading-[1.7] text-ink-soft xl:mx-0">
              Pattu sarees, silk vetti, zari and silver. Weighed in front of you,
              the figure explained before anything changes hands.
            </p>

            {/* One action, not two. The WhatsApp button that stood beside
                this is gone at the client's request; WhatsApp is still one
                tap away on every screen, from the fixed bar at the foot of a
                phone and from the dock on a desktop, so the channel is not
                lost, only the second button.

                It keeps flex-1 below sm, which with a single button now
                means it runs the full measure: the largest tap target on the
                page for the thing the page most wants someone to do. */}
            <div className="rise [animation-delay:540ms] mt-7 flex flex-wrap justify-center gap-3 xl:justify-start">
              <Button href={business.phones[0].href} variant="green" className="flex-1 sm:flex-none">
                <Phone className="size-[17px]" />
                Call {business.phones[0].label}
              </Button>
            </div>

            {/* Condition, said plainly. Every one of these is a state the
                price ledger already says we still pay for: condition adjusts
                the figure and never disqualifies. */}
            <p className="rise [animation-delay:650ms] mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-ink-soft uppercase xl:justify-start">
              <span aria-hidden className="hidden h-px w-5 bg-line-yellow xl:block" />
              {["Old", "Faded", "Stained", "Moth-eaten"].map((t, i) => (
                <span key={t} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden className="size-1 rounded-full bg-yellow" />}
                  {t}
                </span>
              ))}
              {/* green-ink, not green: this is 11px type and the ground
                  under it is now a photograph under a wash. Measured. */}
              <span className="text-green-ink">all accepted</span>
            </p>

            {/* The four promises: how the price is arrived at, which is the
                one thing a seller cannot check for herself. They say nothing
                about branch count, years, pickup or cash, which is now the
                only place on this page that mattered: the strip of numbers
                that used to repeat them directly below the hero is gone. */}
            <ul className="rise [animation-delay:760ms] mx-auto mt-9 grid max-w-[30rem] grid-cols-2 gap-y-7 border-t border-line pt-7 sm:max-w-none sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-line xl:mx-0">
              {[
                { Icon: Scale, a: "Weighed", b: "in front of you" },
                { Icon: ZariBorder, a: "Zari priced", b: "separately" },
                { Icon: Ledger, a: "Figure agreed", b: "before handover" },
                { Icon: Shield, a: "No obligation", b: "to sell on the day" },
              ].map(({ Icon, a, b }) => (
                <li key={a} className="flex flex-col items-center gap-2.5 px-2 text-center sm:px-3">
                  <Icon className="size-[26px] text-yellow-ink" />
                  <span className="text-[0.82rem] leading-[1.45] text-ink-soft">
                    <b className="block font-semibold text-green-deep">{a}</b>
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </SilkStage>

        {/* The temple border that closes the section, drawn and running. In
            flow rather than absolute now: the picture beside the copy is a
            grid cell rather than an absolute layer, so there is nothing left
            for this to have to paint over. */}
        <ZariRule className="h-9 sm:h-12" />
      </section>

      {/* The hero used to be followed by two bands: the branch names
          scrolling past, then a strip of four numbers. Both are gone at the
          client's request, so the goods now come straight after the hero.
          The branches still have their own section further down and their
          own page; the four numbers were the only place the "40+ years"
          claim appeared on this page. */}

      {/* ---------------- What we buy ----------------

          Laid out from the client's own poster: six named photographs on a
          dark ground inside a gold hairline, with one gold pill under them.
          Their poster is maroon; this is the deep green the rest of the site
          already uses, so the section reads as theirs without introducing a
          colour the brand does not have.

          It is the only dark section in the first half of the page, which is
          the point. This is the question every visitor arrives with, and a
          page of alternating cream reads as one long paragraph. */}
      <Section tone="green">
        <Wrap>
          <Reveal>
            <SectionHead
              tone="dark"
              eyebrow="What we buy"
              title={<>All types of <span className="foil-text-light">pattu and silk</span> sarees.</>}
              lead="If it carries silk and zari, bring it to us. Body, border and pallu, priced on weight, silk purity and the amount of zari woven in."
            />
          </Reveal>

          <BuyBoard />

          <div className="mt-9 text-center">
            <Button href="/what-we-buy" variant="yellow">
              See everything we buy
              <ArrowRight className="size-[17px]" />
            </Button>
          </div>
        </Wrap>
      </Section>

      {/* ---------------- Videos from our own pages ---------------- */}
      <Section>
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="Watch us"
              title="From our Instagram, Facebook and YouTube."
              lead="Clips from our own pages and channel, of the work as it happens. Tap any one to play it here."
            />
          </Reveal>
          {/* Three here, one from each platform, not the whole wall. Eleven
              cards ran 7,000px down a phone in the middle of the home page,
              which is a long way to scroll past something nobody asked to
              see all of. The rest are on the gallery, one click away.

              A rail rather than a grid, so on a phone the three are one
              swipe sideways instead of three screens of scrolling. */}
          <ReelWall items={homeReels} layout="rail" />

          <div className="mt-8 text-center">
            <Button href="/gallery#social" variant="outline">
              See all {reels.length} videos
              <ArrowRight className="size-[17px]" />
            </Button>
          </div>
        </Wrap>
      </Section>

      {/* ---------------- Services ---------------- */}
      <Section>
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="Our services"
              title="More than one way to turn silk into value."
              lead="Sell it outright, trade it towards something new, or have the zari recovered. Whichever you choose, the valuation happens in front of you."
            />
          </Reveal>

          <Reveal>
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => {
                const Icon = serviceIcons[s.icon];
                return (
                  <article
                    key={s.slug}
                    className="flex items-start gap-4 rounded-[22px] border border-line glass-soft p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-yellow hover:shadow-mid"
                  >
                    <span className="grad-green grid size-12 shrink-0 place-items-center rounded-[14px] border border-line-yellow shadow-[0_4px_14px_rgba(21,128,61,.3)]">
                      {Icon && <Icon className="size-[21px] text-yellow-light" />}
                    </span>
                    <div>
                      <h3 className="mb-1.5 font-serif text-[1.22rem] text-green-deep">{s.title}</h3>
                      <p className="text-[0.92rem] text-ink-soft">{s.blurb}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </Wrap>
      </Section>

      {/* ---------------- Counters ---------------- */}
      <Section tone="green">
        <Wrap>
          {/* Placeholder figures, replace with the real numbers before launch. */}
          <Reveal>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {[
                { v: 4205, l: "Sarees bought" },
                { v: 245, l: "Sarees exchanged" },
                { v: 3550, l: "Cash payouts" },
                { v: 6545, l: "Free pickups" },
              ].map((c) => (
                <div
                  key={c.l}
                  className="glass-dark rounded-[22px] border border-yellow/25 px-3 py-6 text-center"
                >
                  <b className="foil-text block font-serif text-[clamp(1.7rem,6.4vw,2.5rem)] leading-none">
                    <Counter value={c.v} />
                  </b>
                  <span className="mt-2.5 block text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-cream/85">
                    {c.l}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Section>


      {/* ---------------- Price ledger ---------------- */}
      <Section>
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="How the number is reached"
              title="Four things move the price. Nothing else."
              lead="No handling charge, no hidden deduction, no commission taken off the top."
            />
          </Reveal>

          <PriceScale rows={priceLedger} />
        </Wrap>
      </Section>

      {/* The price ledger used to be followed by "Before you sell: five
          things to do, five to avoid", two columns of preparation advice.
          Gone at the client's request. The copy itself is still in
          config/content.ts as `sellingTips`, unused by any page, because it
          is good advice and the FAQ is the obvious home for it if they ever
          want it back. */}

      {/* ---------------- Why choose us ---------------- */}
      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Why choose us" title="Six reasons families come back to us." />
          </Reveal>
          <Reveal>
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((w) => (
                <article
                  key={w.title}
                  className="flex items-start gap-4 rounded-[22px] border border-line glass-soft p-5 shadow-soft"
                >
                  <span className="grad-green grid size-12 shrink-0 place-items-center rounded-[14px] border border-line-yellow">
                    <Check className="size-[21px] text-yellow-light" />
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-serif text-[1.22rem] text-green-deep">{w.title}</h3>
                    <p className="text-[0.92rem] text-ink-soft">{w.blurb}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Section>

      {/* ---------------- Branches ----------------

          Its own component, because it is no longer a heading over a grid:
          it carries its own dark ground, its own head-office block and its
          own woven index of the other ten. See BranchIndex for why eleven
          equal cards was the wrong shape for this content. */}
      <BranchIndex />

      {/* ---------------- Testimonials ---------------- */}
      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Customers" title="What families tell us afterwards." />
          </Reveal>
          <Reveal>
            <div className="rail -mx-5 px-5 sm:[grid-auto-columns:52%] md:mx-0 md:grid-flow-row md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:[grid-auto-columns:auto]">
              {testimonials.map((t) => (
                <article
                  key={t.name}
                  className="relative h-full rounded-[22px] border border-line glass-soft p-6 shadow-soft"
                >
                  <span
                    aria-hidden
                    className="absolute top-0.5 right-5 font-serif text-[4.6rem] leading-none text-yellow/20"
                  >
                    &ldquo;
                  </span>
                  <p className="relative text-[0.95rem] italic text-ink-soft">{t.quote}</p>
                  <footer className="mt-4 flex items-center gap-3 border-t border-line pt-3.5">
                    <span className="grad-green grid size-10 shrink-0 place-items-center rounded-full font-serif text-base text-yellow-light">
                      {t.name[0]}
                    </span>
                    <span>
                      <b className="block text-[0.89rem] font-semibold text-ink">{t.name}</b>
                      <small className="text-[0.78rem] text-ink-mute">{t.city}</small>
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          </Reveal>

          <p className="mt-1 flex items-center justify-center gap-2 text-[0.76rem] font-medium uppercase tracking-[0.09em] text-ink-mute md:hidden">
            <ArrowRight className="size-[15px] animate-nudge" />
            Swipe for more
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 font-semibold text-green underline-offset-4 hover:underline"
            >
              Read common questions
              <ArrowRight className="size-[17px]" />
            </Link>
          </div>
        </Wrap>
      </Section>

      <CtaBand />
    </>
  );
}

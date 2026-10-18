import Link from "next/link";
import BranchIndex from "@/components/BranchIndex";
import Counter from "@/components/Counter";
import CtaBand from "@/components/CtaBand";
import BuyBoard from "@/components/BuyBoard";
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
      {/* ---------------- Hero ----------------

          Dark, full bleed, and the shop's own silk is the picture.

          It used to be a cream section in two columns: copy on the left, a
          piece of supplied artwork on the right, and the photographs behind
          both under a wash dense enough to turn them into a tint. The
          artwork is gone at the client's request and the photographs are the
          hero now, so the section had to flip from light to dark. That is
          not a style preference, it is the only way round that works: a
          cream wash heavy enough to carry dark type over a photograph is
          heavy enough to hide the photograph, whereas darkening coloured
          silk deepens it. Everything below is restyled for the dark ground;
          see SareeCycle for the scrim and the measurements.

          One column, centred at every width, because there is no longer a
          second thing to sit beside.

          The height: 8.25rem is the measured chrome above it, a 91px sticky
          header plus the 41px the section starts down from it. A floor on
          small screens too now, which it did not need when a 510px
          photograph was setting the height and does now that nothing is. */}
      <section
        id="hero"
        className="relative flex min-h-[36rem] flex-col justify-center overflow-hidden bg-green-deep text-cream sm:min-h-[40rem] xl:min-h-[calc(100vh-8.25rem)]"
      >
        {/* The ground, in layers, bottom up.

            SareeCycle is the photographs and the scrim over them: six stacks
            of the shop's own silk changing every five seconds. ZariWeave is
            the drawn saree borders running sideways over that, which still
            do the work they were added for: the scrim settles the
            photographs into one field, and the borders are what keeps that
            field moving at the scale of a motif rather than only at the
            scale of a whole picture. Everything that follows is on top. */}
        <SareeCycle />
        <ZariWeave />
        <HeroBackdrop />
        {/* Saree border down the gutter and kolam across the field. */}
        <CulturalBanner />

        {/* The section is a centring flex column, so this is its only child
            in flow and sits in the middle of whatever height the minimum
            produces. The bottom padding clears the temple rule, which is
            absolute and would otherwise sit over the promises. */}
        <Wrap className="relative z-10 py-16 pb-24 sm:py-20 sm:pb-28 xl:py-24 xl:pb-32">
          <div className="on-silk mx-auto w-full max-w-[46rem] text-center">
            {/* The greeting, on its own ground.

                It sits in a chip rather than as a bare line because of what
                is behind it: rings, motes, a kolam, a temple border and now
                a photograph all pass under this corner, and a chip gives the
                words a ground that does not move with them. It also keeps
                the greeting from reading as a second eyebrow, which a gold
                uppercase line directly above a gold uppercase line would.

                glass-dark rather than glass-soft, and it is the one place on
                this page where a backdrop-filter earns its keep: the ground
                behind it is a photograph, which is exactly the case the note
                in globals.css says to pay for. One element, not twenty. */}
            <p className="rise mb-5 inline-flex items-center gap-3 rounded-full border border-yellow/30 glass-dark px-5 py-2.5">
              <Vanakkam aria-hidden className="size-8 shrink-0 text-yellow-light" />
              <span className="text-[0.95rem] text-cream/85">
                Welcome to{" "}
                <b className="font-serif text-[1.15rem] font-normal text-white">
                  {business.name}
                </b>
              </span>
            </p>

            {/* What we buy, said next. The reference this was rebuilt from
                opens on the goods, and that order is kept: the greeting is
                one quiet line, then the goods, then the claim. */}
            <p className="rise [animation-delay:90ms] mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {["Old pattu sarees", "Silk vetti", "Zari and silver"].map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden className="h-3 w-px bg-yellow/45" />
                  )}
                  <span className="font-royal text-[0.78rem] font-medium tracking-[0.2em] text-yellow-light uppercase">
                    {t}
                  </span>
                </span>
              ))}
            </p>

            {/* One headline, held still. The second line carries the claim and
                takes the gold, so the eye lands on the promise rather than on
                the noun.

                Both lines are white at the client's request. The second
                one carried the brand's gold foil, and gold was the tightest
                colour anywhere on this site: over a photograph it ran 3.48:1
                against a 3.0 floor with nothing to spare, and it was the one
                thing standing between the hero and a thinner scrim. White
                measures 8.5:1 to 10.2:1 on the same ground, which is what
                paid for the silk now showing through.

                The gold has not left the hero. It is on the eyebrow, the
                goods line, the icons, the borders and the call button, which
                is where it earns more: the one brightest thing on the screen
                should be the action, not a noun. */}
            <h1 className="rise [animation-delay:180ms] mx-auto max-w-[16ch] font-serif text-[clamp(2.2rem,6.6vw,3.9rem)] leading-[1.1] text-white">
              Your old silk is
              <span className="rise [animation-delay:300ms] block">still worth money.</span>
            </h1>

            <p className="rise [animation-delay:420ms] mx-auto mt-5 max-w-[46ch] text-[clamp(1rem,2.7vw,1.12rem)] leading-[1.7] text-cream/85">
              Pattu sarees, silk vetti, zari and silver. Weighed in front of you,
              the figure explained before anything changes hands.
            </p>

            {/* One action, not two. The WhatsApp button that stood beside
                this is gone at the client's request; WhatsApp is still one
                tap away on every screen, from the fixed bar at the foot of a
                phone and from the dock on a desktop, so the channel is not
                lost, only the second button.

                Gold, not green, now that the section is dark. The green
                variant is a green gradient and would sink into the ground it
                is sitting on; the gold foil is the one thing on this screen
                brighter than the headline, which is right for the thing the
                page most wants someone to do. */}
            <div className="rise [animation-delay:540ms] mt-8 flex flex-wrap justify-center gap-3">
              <Button
                href={business.phones[0].href}
                variant="yellow"
                className="w-full text-[1rem] [text-shadow:none] sm:w-auto sm:px-8"
              >
                <Phone className="size-[17px]" />
                Call {business.phones[0].label}
              </Button>
            </div>

            {/* Condition, said plainly. Every one of these is a state the
                price ledger already says we still pay for: condition adjusts
                the figure and never disqualifies. */}
            <p className="rise [animation-delay:650ms] mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-cream/80 uppercase">
              {["Old", "Faded", "Stained", "Moth-eaten"].map((t, i) => (
                <span key={t} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden className="size-1 rounded-full bg-yellow-light/70" />}
                  {t}
                </span>
              ))}
              {/* green-light, not green-soft and certainly not green-ink.
                  The ink green is tuned for cream grounds and goes black
                  here; green-soft is a fill colour and measured 3.16:1 as
                  11px type over the brightest phase at 390. This is the
                  dark-ground green, and it clears. */}
              <span className="text-green-light">all accepted</span>
            </p>

            {/* The four promises: how the price is arrived at, which is the
                one thing a seller cannot check for herself. They say nothing
                about branch count, years, pickup or cash, which is now the
                only place on this page that mattered: the strip of numbers
                that used to repeat them directly below the hero is gone. */}
            <ul className="rise [animation-delay:760ms] mx-auto mt-10 grid max-w-[30rem] grid-cols-2 gap-y-7 border-t border-yellow/25 pt-8 sm:max-w-none sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-yellow/20">
              {[
                { Icon: Scale, a: "Weighed", b: "in front of you" },
                { Icon: ZariBorder, a: "Zari priced", b: "separately" },
                { Icon: Ledger, a: "Figure agreed", b: "before handover" },
                { Icon: Shield, a: "No obligation", b: "to sell on the day" },
              ].map(({ Icon, a, b }) => (
                <li key={a} className="flex flex-col items-center gap-2.5 px-2 text-center sm:px-3">
                  <Icon className="size-[26px] text-yellow-light" />
                  <span className="text-[0.82rem] leading-[1.45] text-cream/75">
                    <b className="block font-semibold text-white">{a}</b>
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Wrap>

        {/* The temple border that closes the section, drawn and running.
            Absolute again: the copy is vertically centred in a section with
            a minimum height, so there is no longer a last element in flow
            for this to sit after. */}
        <ZariRule className="absolute inset-x-0 bottom-0 h-9 sm:h-12" />
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

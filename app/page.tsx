import Link from "next/link";
import BranchCard from "@/components/BranchCard";
import BranchMarquee from "@/components/BranchMarquee";
import Counter from "@/components/Counter";
import CtaBand from "@/components/CtaBand";
import SilkTile from "@/components/SilkTile";
import SilkStage from "@/components/SilkStage";
import CulturalBanner from "@/components/CulturalBanner";
import HeroBackdrop from "@/components/HeroBackdrop";
import PriceScale from "@/components/PriceScale";
import ReelWall from "@/components/ReelWall";
import {
  ArrowRight,
  Check,
  Facebook,
  Ledger,
  Phone,
  Scale,
  Shield,
  WhatsApp,
  YouTube,
  ZariBorder,
  serviceIcons,
} from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { Button, Section, SectionHead, Wrap } from "@/components/ui";
import { branchCount, branchCountWordCap, branches, business, waLink } from "@/config/business";
import {
  priceLedger,
  reels,
  sareeTypes,
  sellingTips,
  services,
  testimonials,
  whyChooseUs,
} from "@/config/content";

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      {/* xl:min-h is for the picture, not the copy. The scene is an upright
          824x1024 and the panel is as tall as this section: at the 668px the
          copy alone produced, cover was discarding 36% of the artwork's
          height at 1440 and taking the top of her head with it. At 820 the
          loss is 17%. */}
      <section id="hero" className="relative overflow-hidden bg-cream text-ink xl:min-h-[820px]">
        <HeroBackdrop />
        {/* Saree border and kolam under the copy. Sits above the rings and
            motes and below the photograph, which covers whatever of it
            reaches the right of the section. */}
        <CulturalBanner />

        {/* zari rule along the foot of the section */}
        <span aria-hidden className="foil absolute inset-x-0 bottom-0 h-[3px]" />

        {/* SilkStage lays the rotating photograph under the section and puts
            the panel that names it beside the copy. The two share one index,
            so they are one component; the copy stays here as its children. */}
        <SilkStage>
          <div className="order-1 text-center xl:text-left">
            {/* What we buy, said before anything else. The reference this was
                rebuilt from opens on the goods rather than a greeting, which
                is the right call: a visitor who has found this page already
                knows whose site it is, and the header carries the name. */}
            <p className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 xl:justify-start">
              <span aria-hidden className="foil hidden h-px w-8 shrink-0 xl:block" />
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
            <h1 className="mx-auto max-w-[15ch] font-serif text-[clamp(2.1rem,6.4vw,3.5rem)] leading-[1.12] text-green-deep xl:mx-0">
              Your old silk is
              <span className="foil-text-deep foil-shimmer block">still worth money.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-[44ch] text-[clamp(1rem,2.7vw,1.1rem)] leading-[1.7] text-ink-soft xl:mx-0">
              Pattu sarees, silk vetti, zari and silver. Weighed in front of you,
              the figure explained before anything changes hands.
            </p>

            {/* Solid then outlined, rather than two filled buttons. With the
                gold now spent on the headline, a second gold button would
                have been the third gold thing in a column of five. */}
            <div className="mt-7 flex flex-wrap justify-center gap-3 xl:justify-start">
              <Button href={business.phones[0].href} variant="green" className="flex-1 sm:flex-none">
                <Phone className="size-[17px]" />
                Call {business.phones[0].label}
              </Button>
              <Button href={waLink()} variant="outline" external className="flex-1 sm:flex-none">
                <WhatsApp className="size-[17px]" />
                WhatsApp us
              </Button>
            </div>

            {/* Condition, said plainly. Every one of these is a state the
                price ledger already says we still pay for: condition adjusts
                the figure and never disqualifies. */}
            <p className="mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-ink-soft uppercase xl:justify-start">
              <span aria-hidden className="hidden h-px w-5 bg-line-yellow xl:block" />
              {["Old", "Faded", "Stained", "Moth-eaten"].map((t, i) => (
                <span key={t} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden className="size-1 rounded-full bg-yellow" />}
                  {t}
                </span>
              ))}
              <span className="text-green">all accepted</span>
            </p>

            {/* The four promises. Deliberately none of these repeat the strip
                of numbers directly below the hero, which already carries the
                branch count, the years, free pickup and same-day cash: two
                rows of four saying the same four things would have been the
                first thing a visitor scrolled past twice. */}
            <ul className="mx-auto mt-9 grid max-w-[30rem] grid-cols-2 gap-y-7 border-t border-line pt-7 sm:max-w-none sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-line xl:mx-0">
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
      </section>

      {/* ---------------- Where we buy, scrolling past ---------------- */}
      <BranchMarquee />

      {/* ---------------- Trust strip ---------------- */}
      <section className="border-y border-line-yellow bg-[linear-gradient(90deg,#e6f2e9_0%,#f4faf5_50%,#e6f2e9_100%)]">
        <div className="grid grid-cols-2 gap-px bg-yellow/30 sm:grid-cols-4">
          {[
            { n: String(branchCount), l: "Branches" },
            { n: "40+", l: "Years" },
            { n: "Cash", l: "Same day" },
            { n: "Free", l: "Pickup" },
          ].map((s) => (
            <div key={s.l} className="bg-[#eef6f0] px-3.5 py-5 text-center sm:py-6">
              <b className="green-text block font-serif text-[clamp(1.5rem,5.4vw,1.9rem)] leading-none">
                {s.n}
              </b>
              <span className="mt-2 block text-[0.7rem] font-semibold uppercase tracking-[0.11em] text-ink-soft">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- What we buy ---------------- */}
      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="What we buy"
              title="If it carries silk and zari, bring it to us."
              lead="We take the whole saree: body, border and pallu. The price follows weight, silk purity and the amount of zari woven into it."
            />
          </Reveal>

          <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-3">
            {sareeTypes.slice(0, 6).map((t, i) => (
              <Reveal key={t.slug} from="scale" delay={(i % 3) * 110} duration={850}>
                <SilkTile item={t} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button href="/what-we-buy" variant="outline">
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
              title="From our Facebook and YouTube."
              lead="Clips from our own page and channel, of the work as it happens. Tap any one to play it here."
            />
          </Reveal>
          <ReelWall />

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <Button href={business.social.facebook} variant="outline" external>
              <Facebook className="size-[17px]" />
              Follow on Facebook
            </Button>
            <Button href={business.social.youtube} variant="outline" external>
              <YouTube className="size-[17px]" />
              Subscribe on YouTube
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

      {/* ---------------- Do's and don'ts ---------------- */}
      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="Before you sell"
              title="Five things to do, five to avoid."
              lead="A few minutes of preparation usually means a better price and a much faster visit."
            />
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal>
              <div className="h-full rounded-[22px] border-t-4 border-green glass-soft p-6 shadow-soft sm:p-7">
                <h3 className="mb-4 flex items-center gap-2.5 font-serif text-[1.3rem] text-green-deep">
                  <span className="grid size-8 place-items-center rounded-full bg-green-soft/15">
                    <Check className="size-4 text-green" />
                  </span>
                  Please do
                </h3>
                <ul className="grid gap-3">
                  {sellingTips.dos.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[0.94rem] text-ink-soft">
                      <Check className="mt-0.5 size-4.5 shrink-0 text-green-soft" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-[22px] border-t-4 border-yellow glass-soft p-6 shadow-soft sm:p-7">
                <h3 className="mb-4 flex items-center gap-2.5 font-serif text-[1.3rem] text-green-deep">
                  <span className="grid size-8 place-items-center rounded-full bg-yellow/15">
                    <span aria-hidden className="font-serif text-[1.1rem] leading-none text-yellow-ink">!</span>
                  </span>
                  Please don&apos;t
                </h3>
                <ul className="grid gap-3">
                  {sellingTips.donts.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[0.94rem] text-ink-soft">
                      <span
                        aria-hidden
                        className="mt-1.5 size-2 shrink-0 rotate-45 rounded-[1px] bg-yellow"
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </Section>

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

      {/* ---------------- Branches ---------------- */}
      <Section>
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="Find us"
              title={`${branchCountWordCap} branches across Tamil Nadu.`}
              lead="Walk in during shop hours, or call the nearest branch and we will come to you."
            />
          </Reveal>
          <Reveal>
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {branches.map((b) => (
                <BranchCard key={b.slug} branch={b} />
              ))}
              <article className="grad-green flex flex-col rounded-[22px] p-6 text-cream">
                <h3 className="mb-3 font-serif text-[1.25rem] text-white">Not near a branch?</h3>
                <p className="flex-1 text-[0.92rem] text-cream/80">
                  We travel across Tamil Nadu, and we will come for even one or two sarees. Send photos on
                  WhatsApp and we will tell you when we are next in your area.
                </p>
                <div className="mt-4 border-t border-yellow/30 pt-4">
                  <a
                    href={waLink("Hello, I want to sell my old silk sarees. I am not near a branch.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-yellow/20 px-3.5 text-[0.83rem] font-semibold text-yellow-light"
                  >
                    <WhatsApp className="size-3.5" />
                    Message us
                  </a>
                </div>
              </article>
            </div>
          </Reveal>
        </Wrap>
      </Section>

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

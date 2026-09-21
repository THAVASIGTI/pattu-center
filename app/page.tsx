import Image from "next/image";
import Link from "next/link";
import BranchCard from "@/components/BranchCard";
import Counter from "@/components/Counter";
import CtaBand from "@/components/CtaBand";
import AnimatedHeading from "@/components/AnimatedHeading";
import ArchCard from "@/components/ArchCard";
import CategoryBoard from "@/components/CategoryBoard";
import HeroBackdrop from "@/components/HeroBackdrop";
import PriceScale from "@/components/PriceScale";
import Roadmap from "@/components/Roadmap";
import StepStair from "@/components/StepStair";
import { ArrowRight, Check, Phone, WhatsApp, serviceIcons } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { Button, Section, SectionHead, Wrap } from "@/components/ui";
import { branchCount, branchCountWordCap, branches, business, waLink } from "@/config/business";
import {
  img,
  priceLedger,
  processSteps,
  roadmap,
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
      <section className="relative overflow-hidden bg-cream text-ink">
        <HeroBackdrop />
        {/* zari rule along the foot of the section */}
        <span aria-hidden className="foil absolute inset-x-0 bottom-0 h-[3px]" />

        <Wrap className="relative z-10 py-12 text-center sm:py-16 lg:py-20">
          <p className="mb-4 flex items-center justify-center gap-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-yellow">
            <span aria-hidden className="foil h-px w-8" />
            Welcome to {business.name}
            <span aria-hidden className="foil h-px w-8" />
          </p>

          <p className="mx-auto mb-7 max-w-[58ch] text-[clamp(1rem,2.7vw,1.12rem)] leading-relaxed text-ink-soft">
            For forty years families across Tamil Nadu have brought us the silk they no longer
            wear. Bring yours to any counter, or send a photo, and find out what it is really
            worth.
          </p>

          <AnimatedHeading
            foilTone="deep"
            className="mx-auto max-w-[18ch] font-serif text-[clamp(2rem,6.6vw,3.6rem)] leading-[1.14] text-green-deep"
            segments={[
              { text: "Sell your old silk at a" },
              { text: " fair price.", foil: true },
            ]}
          />

          <p className="mx-auto mt-4 max-w-[52ch] text-[clamp(.97rem,2.6vw,1.07rem)] text-ink-soft">
            Pattu sarees, silk vetti, zari and silver. Weighed in front of you, paid the same day.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            <Button href={business.phones[0].href} variant="yellow" className="flex-1 sm:flex-none">
              <Phone className="size-[17px]" />
              Call {business.phones[0].label}
            </Button>
            <Button href={waLink()} variant="whatsapp" external className="flex-1 sm:flex-none">
              <WhatsApp className="size-[17px]" />
              Send Photos on WhatsApp
            </Button>
          </div>

          <p className="mt-4 text-[0.84rem] text-ink-mute">
            Free pickup · Cash same day · No obligation
          </p>

          {/* Full-bleed board of what we take in */}
          <div className="mt-10 sm:mt-12">
            <CategoryBoard />
          </div>
        </Wrap>
      </section>

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

      {/* ---------------- About teaser ---------------- */}
      <Section>
        <Wrap>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <SectionHead
                align="left"
                eyebrow="About us"
                title="Four decades of reading silk by hand."
              />
              <p className="mb-4 text-ink-soft">
                A pattu saree does not lose its value the day it stops being worn. The silk is still
                silk, and the zari woven through its border and pallu is still real metal thread.
                Most families simply have no idea who to take it to.
              </p>
              <p className="mb-5 text-ink-soft">
                We buy old silk sarees, silk vetti, shawls, ravikai and silver directly from
                households across Tamil Nadu. No middlemen, no commission, no waiting for payment.
              </p>
              <Button href="/about" variant="outline">
                Read our story
                <ArrowRight className="size-[17px]" />
              </Button>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative pb-12">
                <Image
                  src={img(30834841)}
                  alt="A buyer inspecting patterned silk closely through a magnifying loupe"
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 90vw, 540px"
                  className="aspect-4/5 w-full rounded-[22px] border border-line-yellow object-cover shadow-mid"
                />
                <Image
                  src={img(5447529)}
                  alt="Gold bangles resting on folded, brightly coloured silk"
                  width={500}
                  height={500}
                  sizes="220px"
                  className="absolute right-3.5 bottom-0 aspect-square w-[46%] max-w-[220px] rounded-[22px] border-[5px] border-cream object-cover shadow-deep"
                />
              </div>
            </Reveal>
          </div>
        </Wrap>
      </Section>

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

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
            {sareeTypes.slice(0, 6).map((t, i) => (
              <Reveal key={t.slug} from="arch" delay={(i % 3) * 110} duration={850}>
                <ArchCard item={t} />
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
                    className="flex items-start gap-4 rounded-[22px] border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-yellow hover:shadow-mid"
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

      {/* ---------------- Process + counters ---------------- */}
      <Section tone="green">
        <Wrap>
          <Reveal>
            <SectionHead
              tone="dark"
              eyebrow="How it works"
              title="Four steps, one visit."
              lead="Most customers are finished in under twenty minutes, cash in hand."
            />
          </Reveal>

          <StepStair steps={processSteps} />

          {/* Placeholder figures, replace with the real numbers before launch. */}
          <Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {[
                { v: 4205, l: "Sarees bought" },
                { v: 245, l: "Sarees exchanged" },
                { v: 3550, l: "Cash payouts" },
                { v: 6545, l: "Free pickups" },
              ].map((c) => (
                <div
                  key={c.l}
                  className="rounded-[22px] border border-yellow/25 bg-cream/[0.055] px-3 py-6 text-center"
                >
                  <b className="foil-text block font-serif text-[clamp(1.7rem,6.4vw,2.5rem)] leading-none">
                    <Counter value={c.v} />
                  </b>
                  <span className="mt-2.5 block text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-cream/65">
                    {c.l}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Section>


      {/* ---------------- Roadmap: the journey ---------------- */}
      <Section tone="green">
        <Wrap>
          <Reveal>
            <SectionHead
              tone="dark"
              eyebrow="The road to a fair price"
              title="Where your saree goes, step by step."
              lead="From the first photo you send to the cash in your hand. Six stops, no surprises in between."
            />
          </Reveal>
          <Roadmap stops={roadmap} />
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
              <div className="h-full rounded-[22px] border-t-4 border-green bg-white p-6 shadow-soft sm:p-7">
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
              <div className="h-full rounded-[22px] border-t-4 border-yellow bg-white p-6 shadow-soft sm:p-7">
                <h3 className="mb-4 flex items-center gap-2.5 font-serif text-[1.3rem] text-green-deep">
                  <span className="grid size-8 place-items-center rounded-full bg-yellow/15">
                    <span aria-hidden className="font-serif text-[1.1rem] leading-none text-yellow">!</span>
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
                  className="flex items-start gap-4 rounded-[22px] border border-line bg-white p-5 shadow-soft"
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
                  className="relative h-full rounded-[22px] border border-line bg-white p-6 shadow-soft"
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

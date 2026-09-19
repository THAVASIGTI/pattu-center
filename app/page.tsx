import Image from "next/image";
import Link from "next/link";
import BranchCard from "@/components/BranchCard";
import Counter from "@/components/Counter";
import CtaBand from "@/components/CtaBand";
import { ArrowRight, Check, Phone, WhatsApp, serviceIcons } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { Button, Card, Section, SectionHead, Wrap } from "@/components/ui";
import { branches, business, waLink } from "@/config/business";
import { processSteps, img, sareeTypes, services, testimonials, whyChooseUs } from "@/config/content";

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-royal-deep text-cream">
        <div className="absolute inset-0">
          <Image
            src={img(7676340)}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.34]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(780px_440px_at_10%_2%,rgba(192,145,47,.24),transparent_58%),radial-gradient(680px_560px_at_92%_96%,rgba(58,99,216,.46),transparent_64%),linear-gradient(172deg,rgba(10,23,56,.82),rgba(10,23,56,.95))]" />
        </div>

        <Wrap className="relative z-10 grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:py-24">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-[0.71rem] font-semibold uppercase tracking-[0.13em] text-gold-light">
              <i className="size-1.5 animate-pulse-ring rounded-full bg-gold-light" />
              {business.foundedText}
            </span>

            <h1 className="font-serif text-[clamp(2rem,7.4vw,3.95rem)] leading-[1.14] text-white">
              Sell your old <span className="foil-text">silk sarees</span> for what they are truly worth.
            </h1>

            <p className="mt-3.5 font-tamil text-[clamp(1.1rem,4.6vw,1.6rem)] text-gold">
              {business.tagline}
            </p>

            <p className="mt-4 max-w-[48ch] text-[clamp(.97rem,2.6vw,1.07rem)] text-cream/80">
              Old pattu sarees, Kanchipuram and Mysore silk, silk vetti, zari and silver — weighed
              in front of you, valued honestly, and paid for in cash the same day.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <Button href={business.phones[0].href} variant="gold" className="flex-1 sm:flex-none">
                <Phone className="size-[17px]" />
                Call {business.phones[0].label}
              </Button>
              <Button href={waLink()} variant="whatsapp" external className="flex-1 sm:flex-none">
                <WhatsApp className="size-[17px]" />
                Send Photos on WhatsApp
              </Button>
            </div>

            <p className="mt-4.5 text-[0.84rem] text-cream/55">
              Free doorstep pickup · Instant cash · No obligation to sell
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] lg:mr-0 lg:ml-auto">
            <span
              aria-hidden
              className="absolute inset-y-0 -right-3.5 left-3.5 -z-10 translate-y-3.5 rounded-[30px] border border-gold/40"
            />
            <Image
              src={img(38890438)}
              alt="Blue Banarasi silk saree with golden peacock brocade laid out on a wooden table"
              width={900}
              height={1125}
              priority
              sizes="(max-width: 1024px) 90vw, 440px"
              className="aspect-4/5 w-full rounded-[30px] border border-gold/40 object-cover shadow-deep"
            />
            <div className="mt-4 flex items-center gap-3 rounded-[14px] border border-gold/30 bg-cream/[0.07] px-4.5 py-3.5 lg:absolute lg:bottom-8 lg:-left-6 lg:mt-0 lg:max-w-[200px] lg:flex-col lg:items-start lg:gap-0.5 lg:border-transparent lg:bg-cream lg:shadow-deep">
              <b className="font-serif text-[1.85rem] leading-none text-gold-light lg:text-royal">40+</b>
              <small className="text-[0.76rem] uppercase tracking-wider text-cream/65 lg:text-ink-soft">
                Years in the silk trade
              </small>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------- Trust strip ---------------- */}
      <section className="border-y border-line-gold bg-[linear-gradient(90deg,#e6edfb_0%,#f4f7fd_50%,#e6edfb_100%)]">
        <div className="grid grid-cols-2 gap-px bg-gold/30 sm:grid-cols-4">
          {[
            { n: "7", l: "Branches" },
            { n: "40+", l: "Years" },
            { n: "Cash", l: "Same day" },
            { n: "Free", l: "Pickup" },
          ].map((s) => (
            <div key={s.l} className="bg-[#eef3fc] px-3.5 py-5 text-center sm:py-6">
              <b className="blue-text block font-serif text-[clamp(1.5rem,5.4vw,1.9rem)] leading-none">
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
                households across Tamil Nadu — no middlemen, no commission, no waiting for payment.
              </p>
              <Button href="/about" variant="outline">
                Read our story
                <ArrowRight className="size-[17px]" />
              </Button>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative pb-12">
                <Image
                  src={img(32655889)}
                  alt="Close-up of a weaving loom strung with fine silk threads"
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 90vw, 540px"
                  className="aspect-4/5 w-full rounded-[22px] border border-line-gold object-cover shadow-mid"
                />
                <Image
                  src={img(6876952)}
                  alt="Golden silk threads drying beside a traditional spinning wheel"
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
              lead="We take the whole saree — body, border and pallu — and pay by weight, silk purity and the amount of zari woven into it."
            />
          </Reveal>

          <Reveal>
            <div className="rail -mx-5 px-5 sm:[grid-auto-columns:52%] md:mx-0 md:grid-cols-2 md:grid-flow-row md:gap-[18px] md:overflow-visible md:px-0 md:[grid-auto-columns:auto] lg:grid-cols-3 lg:gap-6">
              {sareeTypes.slice(0, 6).map((t) => (
                <Card key={t.slug}>
                  <div className="aspect-4/3 overflow-hidden bg-cream-2">
                    <Image
                      src={img(t.imageId)}
                      alt={t.alt}
                      width={640}
                      height={480}
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 360px"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 p-5 pb-6">
                    <h3 className="mb-2 font-serif text-[1.22rem] text-royal-deep">{t.name}</h3>
                    <p className="text-[0.92rem] text-ink-soft">{t.blurb}</p>
                    {t.ta && <p className="mt-2.5 font-tamil text-[0.85rem] text-gold">{t.ta}</p>}
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>

          <p className="mt-1 flex items-center justify-center gap-2 text-[0.76rem] font-medium uppercase tracking-[0.09em] text-ink-mute md:hidden">
            <ArrowRight className="size-[15px] animate-nudge" />
            Swipe for more
          </p>

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
                    className="flex items-start gap-4 rounded-[22px] border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-gold hover:shadow-mid"
                  >
                    <span className="grad-royal grid size-12 shrink-0 place-items-center rounded-[14px] border border-line-gold shadow-[0_4px_14px_rgba(30,64,175,.3)]">
                      {Icon && <Icon className="size-[21px] text-gold-light" />}
                    </span>
                    <div>
                      <h3 className="mb-1.5 font-serif text-[1.22rem] text-royal-deep">{s.title}</h3>
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
      <Section tone="royal">
        <Wrap>
          <Reveal>
            <SectionHead
              tone="dark"
              eyebrow="How it works"
              title="Four steps, one visit."
              lead="Most customers are finished in under twenty minutes, cash in hand."
            />
          </Reveal>

          <Reveal>
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {processSteps.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-[22px] border border-gold/25 bg-cream/[0.055] p-6"
                >
                  <span className="foil-text mb-3 block font-serif text-[2.2rem] leading-none">
                    0{i + 1}
                  </span>
                  <h3 className="mb-2 font-serif text-[1.08rem] text-white">{s.title}</h3>
                  <p className="text-[0.9rem] text-cream/70">{s.blurb}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Placeholder figures — replace with the real numbers before launch. */}
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
                  className="rounded-[22px] border border-gold/25 bg-cream/[0.055] px-3 py-6 text-center"
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
                  <span className="grad-royal grid size-12 shrink-0 place-items-center rounded-[14px] border border-line-gold">
                    <Check className="size-[21px] text-gold-light" />
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-serif text-[1.22rem] text-royal-deep">{w.title}</h3>
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
              title="Seven branches across Tamil Nadu."
              lead="Walk in during shop hours, or call the nearest branch and we will come to you."
            />
          </Reveal>
          <Reveal>
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {branches.map((b) => (
                <BranchCard key={b.slug} branch={b} />
              ))}
              <article className="grad-royal flex flex-col rounded-[22px] p-6 text-cream">
                <h3 className="mb-3 font-serif text-[1.25rem] text-white">Not near a branch?</h3>
                <p className="flex-1 text-[0.92rem] text-cream/80">
                  We travel across Tamil Nadu for collections of ten sarees or more. Send photos on
                  WhatsApp and we will tell you when we are next in your area.
                </p>
                <div className="mt-4 border-t border-gold/30 pt-4">
                  <a
                    href={waLink("Hello, I want to sell my old silk sarees. I am not near a branch.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-gold/20 px-3.5 text-[0.83rem] font-semibold text-gold-light"
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
                    className="absolute top-0.5 right-5 font-serif text-[4.6rem] leading-none text-gold/20"
                  >
                    &ldquo;
                  </span>
                  <p className="relative text-[0.95rem] italic text-ink-soft">{t.quote}</p>
                  <footer className="mt-4 flex items-center gap-3 border-t border-line pt-3.5">
                    <span className="grad-royal grid size-10 shrink-0 place-items-center rounded-full font-serif text-base text-gold-light">
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
              className="inline-flex items-center gap-2 font-semibold text-royal underline-offset-4 hover:underline"
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

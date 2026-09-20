import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import { Check } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section, SectionHead, Wrap } from "@/components/ui";
import { business } from "@/config/business";
import { img, whyChooseUs } from "@/config/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Four decades buying old silk and pattu sarees across Tamil Nadu. How we value silk, test zari and pay honestly, the same day.",
  alternates: { canonical: "/about" },
};

const points = [
  "Weighed on a calibrated scale in front of you, never behind a counter.",
  "Zari tested by sampling, without damaging the border or pallu.",
  "Torn, stained and faded sarees are still bought. Condition affects the price, not our acceptance.",
  "Cash in hand the same day, or a bank transfer if you prefer it.",
  "Silver articles and brass valued at the day's metal rate on the same visit.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        eyebrow="About us"
        title={<>Four decades of reading <span className="foil-text">silk by hand</span>.</>}
        lead="We buy old silk directly from households across Tamil Nadu. No middlemen, no commission, no waiting for payment."
        image={img(17777833)}
      />

      <Section>
        <Wrap>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <SectionHead align="left" eyebrow="Our story" title="A trade built on the scale, not the sales pitch." />
              <p className="mb-4 text-ink-soft">
                A pattu saree does not lose its value the day it stops being worn. The silk is still
                silk, and the zari woven through its border and pallu is still real metal thread.
                Most families simply have no idea who to take it to, so the saree sits in a trunk
                for thirty years, or worse, gets thrown away.
              </p>
              <p className="mb-4 text-ink-soft">
                {business.name} has been in that trade for over forty years. It is run today by
                two brothers in partnership, {business.owners[0]} and {business.owners[1]}, who
                between them handle every branch, every valuation and every payment. Working side by
                side means the same pair of standards travels to every counter: whichever of
                them you meet, the saree is unfolded on the counter, weighed openly, and the price
                explained before you are asked to decide anything.
              </p>
              <p className="text-ink-soft">
                Most of our customers are women selling silk that belonged to their mother or
                grandmother. That is not an ordinary transaction, and we do not treat it like one.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative pb-12">
                <Image
                  src={img(17777833)}
                  alt="A weaver working silk on a traditional loom in Varanasi"
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 90vw, 540px"
                  className="aspect-4/5 w-full rounded-[22px] border border-line-yellow object-cover shadow-mid"
                />
                <Image
                  src={img(14695808)}
                  alt="An artisan weaving vibrant silk threads on a handloom"
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

      <Section tone="green">
        <Wrap>
          <Reveal>
            <SectionHead tone="dark" eyebrow="How we work" title="What you can expect on the day." />
          </Reveal>
          <Reveal>
            <ul className="mx-auto grid max-w-[820px] gap-3.5">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3.5 rounded-[14px] border border-yellow/25 bg-cream/[0.055] p-4"
                >
                  <Check className="mt-0.5 size-5 shrink-0 text-yellow" />
                  <span className="text-cream/80">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Wrap>
      </Section>

      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Why choose us" title="Six reasons families come back." />
          </Reveal>
          <Reveal>
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((w) => (
                <article key={w.title} className="rounded-[22px] border border-line bg-white p-6 shadow-soft">
                  <h3 className="mb-2 font-serif text-[1.22rem] text-green-deep">{w.title}</h3>
                  <p className="text-[0.92rem] text-ink-soft">{w.blurb}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Section>

      <CtaBand />
    </>
  );
}

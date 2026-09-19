import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import { Check } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Button, Section, SectionHead, Wrap } from "@/components/ui";
import { img, processSteps } from "@/config/content";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Four steps from first WhatsApp message to cash in hand: contact, inspection, instant quotation and on-the-spot payment.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "How It Works" }]}
        eyebrow="How it works"
        title={<>Four steps, <span className="foil-text">one visit</span>.</>}
        lead="Most customers are finished in under twenty minutes, cash in hand."
        image={img(14695808)}
      />

      <Section>
        <Wrap>
          <div className="mx-auto grid max-w-[900px] gap-5">
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <article className="flex items-start gap-5 rounded-[22px] border border-line bg-white p-6 shadow-soft sm:gap-7 sm:p-8">
                  <span className="blue-text shrink-0 font-serif text-[2.6rem] leading-none sm:text-[3.2rem]">
                    0{i + 1}
                  </span>
                  <div>
                    <h2 className="mb-2 font-serif text-[1.35rem] text-royal-deep">{s.title}</h2>
                    <p className="text-ink-soft">{s.blurb}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Section>

      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="Before you call"
              title="How to get the most accurate quote."
              lead="A few minutes of preparation usually means a better price and a much faster visit."
            />
          </Reveal>
          <Reveal>
            <ul className="mx-auto grid max-w-[820px] gap-3.5">
              {[
                "Photograph each saree spread out flat in daylight, plus a close-up of the border and pallu.",
                "Keep sarees of the same type together — it speeds up weighing considerably.",
                "Set aside any loose zari, cut borders or blouse pieces; they are weighed separately.",
                "Bring silver articles or brass along on the same visit if you want them valued too.",
                "Have ten or more pieces? Ask for a free home visit instead of travelling to us.",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-3.5 rounded-[14px] border border-line bg-white p-4 shadow-soft">
                  <Check className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span className="text-ink-soft">{tip}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-8 text-center">
            <Button href="/faq" variant="outline">Read the full FAQ</Button>
          </div>
        </Wrap>
      </Section>

      <CtaBand />
    </>
  );
}

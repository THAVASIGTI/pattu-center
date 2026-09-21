import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Button, Card, Section, SectionHead, Wrap } from "@/components/ui";
import { img, sareeTypes } from "@/config/content";

export const metadata: Metadata = {
  title: "What We Buy",
  description:
    "Kanchipuram, Mysore, Banarasi and tissue silk, nine-yard sarees, silk vetti, ravikai, loose zari, damaged silk and silver. Everything we buy and how it is valued.",
  alternates: { canonical: "/what-we-buy" },
};

export default function WhatWeBuyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "What We Buy" }]}
        eyebrow="What we buy"
        title={<>If it carries <span className="foil-text">silk and zari</span>, bring it to us.</>}
        lead="We take the whole saree: body, border and pallu. The price follows weight, silk purity and the amount of zari woven into it."
        image={img(5439054)}
      />

      <Section>
        <Wrap>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {sareeTypes.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 3) * 90}>
                <Card className="h-full">
                  <div className="aspect-4/3 overflow-hidden bg-cream-2">
                    <Image
                      src={img(t.imageId)}
                      alt={t.alt}
                      width={640}
                      height={480}
                      sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 360px"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 p-5 pb-6">
                    <h2 className="mb-2 font-serif text-[1.22rem] text-green-deep">{t.name}</h2>
                    <p className="text-[0.92rem] text-ink-soft">{t.blurb}</p>
                    {t.ta && <p className="mt-2.5 font-tamil text-[0.85rem] text-yellow-ink">{t.ta}</p>}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Section>

      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="How value is decided"
              title="Four things set the price."
              lead="Nothing else. There are no hidden deductions and no handling charge."
            />
          </Reveal>
          <Reveal>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { h: "Silk weight", p: "Every piece is weighed on a calibrated scale in front of you." },
                { h: "Silk purity", p: "Pure mulberry silk is worth more than blended or art silk." },
                { h: "Zari content", p: "Real silver-gilt zari is sampled and priced separately from the silk." },
                { h: "Condition", p: "Tears and stains reduce the figure but never disqualify a saree." },
              ].map((x) => (
                <article key={x.h} className="rounded-[22px] border border-line bg-white p-6 shadow-soft">
                  <h3 className="mb-2 font-serif text-[1.15rem] text-green-deep">{x.h}</h3>
                  <p className="text-[0.92rem] text-ink-soft">{x.p}</p>
                </article>
              ))}
            </div>
          </Reveal>
          <div className="mt-8 text-center">
            <Button href="/how-it-works" variant="outline">See how the visit works</Button>
          </div>
        </Wrap>
      </Section>

      <CtaBand title="Not sure if we buy what you have? Just ask." />
    </>
  );
}

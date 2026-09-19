import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import { serviceIcons } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Button, Section, SectionHead, Wrap } from "@/components/ui";
import { img, services } from "@/config/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Outright purchase, free doorstep pickup, instant cash, saree exchange, zari melting and silver recovery, plus free WhatsApp valuation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Our services"
        title={<>More than one way to turn <span className="foil-text">silk into value</span>.</>}
        lead="Sell outright, trade towards new silk, or have the zari melted and the silver recovered."
        image={img(6167463)}
      />

      <Section>
        <Wrap>
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Reveal key={s.slug} delay={(i % 2) * 90}>
                  <article className="flex h-full items-start gap-5 rounded-[22px] border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-yellow hover:shadow-mid">
                    <span className="grad-green grid size-14 shrink-0 place-items-center rounded-[16px] border border-line-yellow shadow-[0_4px_14px_rgba(21,128,61,.3)]">
                      {Icon && <Icon className="size-6 text-yellow-light" />}
                    </span>
                    <div>
                      <h2 className="mb-2 font-serif text-[1.3rem] text-green-deep">{s.title}</h2>
                      <p className="text-ink-soft">{s.blurb}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Wrap>
      </Section>

      <Section tone="green">
        <Wrap>
          <Reveal>
            <SectionHead
              tone="dark"
              eyebrow="Our promise"
              title="What every branch commits to."
            />
          </Reveal>
          <Reveal>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Fair market value for every saree",
                "Instant payment, never in instalments",
                "Quick evaluation — usually under twenty minutes",
                "Professional, women-friendly staff",
                "Free doorstep collection on ten sarees or more",
                "No obligation to sell once we have quoted",
              ].map((p) => (
                <div key={p} className="rounded-[14px] border border-yellow/25 bg-cream/[0.055] p-5 text-cream/80">
                  {p}
                </div>
              ))}
            </div>
          </Reveal>
          <div className="mt-8 text-center">
            <Button href="/branches" variant="ghost">Find your nearest branch</Button>
          </div>
        </Wrap>
      </Section>

      <CtaBand />
    </>
  );
}

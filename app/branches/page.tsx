import type { Metadata } from "next";
import BranchCard from "@/components/BranchCard";
import CtaBand from "@/components/CtaBand";
import { WhatsApp } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import { img } from "@/config/content";
import Reveal from "@/components/Reveal";
import { Section, SectionHead, Wrap } from "@/components/ui";
import { branches, waLink } from "@/config/business";

export const metadata: Metadata = {
  title: "Branches",
  description:
    "Seven branches across Tamil Nadu: Madurai head office, Thoothukudi (two counters), Thanjavur, Villupuram, Tiruppur and Coimbatore.",
  alternates: { canonical: "/branches" },
};

const coverage = [
  "Madurai", "Thoothukudi", "Thanjavur", "Villupuram", "Tiruppur", "Coimbatore",
  "Tirunelveli", "Trichy", "Salem", "Erode", "Karaikudi", "Kumbakonam",
  "Dindigul", "Pudukkottai", "Nagercoil", "Chennai",
];

export default function BranchesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Branches" }]}
        eyebrow="Find us"
        title={<>Seven branches across <span className="foil-text">Tamil Nadu</span>.</>}
        lead="Walk in during shop hours, or call the nearest branch and we will come to your door."
        image={img(18728089)}
      />

      <Section>
        <Wrap>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {branches.map((b, i) => (
              <Reveal key={b.slug} delay={(i % 3) * 90}>
                <BranchCard branch={b} />
              </Reveal>
            ))}
            <Reveal delay={90}>
              <article className="grad-green flex h-full flex-col rounded-[22px] p-6 text-cream">
                <h2 className="mb-3 font-serif text-[1.25rem] text-white">Not near a branch?</h2>
                <p className="flex-1 text-[0.92rem] text-cream/80">
                  We run collection routes across the state for ten sarees or more. Send photos on
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
            </Reveal>
          </div>
        </Wrap>
      </Section>

      <Section tone="green">
        <Wrap>
          <Reveal>
            <SectionHead
              tone="dark"
              eyebrow="Where we collect"
              title="We travel further than our shop fronts."
              lead="Regular collection runs across Tamil Nadu. If your town is on this list, ask when we are next passing through."
            />
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2.5">
              {coverage.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-yellow/30 bg-cream/[0.07] px-4 py-2 text-[0.85rem] text-cream/85"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Section>

      <CtaBand />
    </>
  );
}

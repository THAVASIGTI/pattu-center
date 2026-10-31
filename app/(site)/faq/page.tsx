import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section, Wrap } from "@/components/ui";
import { img, faqs } from "@/config/content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "How we value sarees, what we accept, whether pickup is free, how fast you are paid, saree exchange and zari melting explained.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        eyebrow="Questions"
        title={<>Everything people ask <span className="foil-text">before they sell</span>.</>}
        lead="If your question isn't here, call or send a WhatsApp message. We answer the same day."
        image={img(37892693)}
      />

      <Section>
        <Wrap>
          <Reveal>
            <Faq items={faqs} />
          </Reveal>
        </Wrap>
      </Section>

      <CtaBand title="Still unsure? Ask us directly." />
    </>
  );
}

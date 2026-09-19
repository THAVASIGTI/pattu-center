import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import { Clock, Mail, Phone, Pin, WhatsApp } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Button, Section, SectionHead, Wrap } from "@/components/ui";
import { branches, business, waLink } from "@/config/business";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${business.owner} on ${business.phones[0].label} or ${business.phones[1].label}, WhatsApp us, or email ${business.email}. Head office in ${branches[0].city}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const ho = branches[0];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact us"
        title={<>Talk to us <span className="foil-text">today</span>.</>}
        lead="Call, WhatsApp photos of your sarees, or email us. We reply the same day, six days a week."
        image="https://images.unsplash.com/photo-1606941060060-3d317be9947c"
      >
        <Button href={business.phones[0].href} variant="gold">
          <Phone className="size-[17px]" />
          Call {business.phones[0].label}
        </Button>
        <Button href={waLink()} variant="whatsapp" external>
          <WhatsApp className="size-[17px]" />
          WhatsApp Us
        </Button>
      </PageHero>

      <Section>
        <Wrap>
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <SectionHead align="left" eyebrow="Get in touch" title="Every way to reach us." />

              <dl className="grid gap-4">
                <div className="flex items-start gap-4 rounded-[22px] border border-line bg-white p-5 shadow-soft">
                  <span className="grad-royal grid size-12 shrink-0 place-items-center rounded-[14px] border border-line-gold">
                    <Phone className="size-5 text-gold-light" />
                  </span>
                  <div>
                    <dt className="mb-1 font-serif text-[1.1rem] text-royal-deep">Phone</dt>
                    <dd className="grid gap-0.5">
                      {business.phones.map((p) => (
                        <a key={p.href} href={p.href} className="block font-semibold text-royal hover:text-gold">
                          {p.label}
                        </a>
                      ))}
                      <span className="mt-1 text-[0.88rem] text-ink-mute">Ask for {business.owner}</span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[22px] border border-line bg-white p-5 shadow-soft">
                  <span className="grid size-12 shrink-0 place-items-center rounded-[14px] border border-line-gold bg-[#25d366]">
                    <WhatsApp className="size-5 text-[#06301a]" />
                  </span>
                  <div>
                    <dt className="mb-1 font-serif text-[1.1rem] text-royal-deep">WhatsApp</dt>
                    <dd className="grid gap-0.5">
                      {business.whatsapp.map((w) => (
                        <a
                          key={w.raw}
                          href={`https://wa.me/${w.raw}?text=${encodeURIComponent("Hello, I want to sell my old silk sarees.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-semibold text-royal hover:text-gold"
                        >
                          {w.label}
                        </a>
                      ))}
                      <span className="mt-1 text-[0.88rem] text-ink-mute">
                        Send photos for a free indicative price
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[22px] border border-line bg-white p-5 shadow-soft">
                  <span className="grad-royal grid size-12 shrink-0 place-items-center rounded-[14px] border border-line-gold">
                    <Mail className="size-5 text-gold-light" />
                  </span>
                  <div>
                    <dt className="mb-1 font-serif text-[1.1rem] text-royal-deep">Email</dt>
                    <dd>
                      <a href={`mailto:${business.email}`} className="break-all font-semibold text-royal hover:text-gold">
                        {business.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[22px] border border-line bg-white p-5 shadow-soft">
                  <span className="grad-royal grid size-12 shrink-0 place-items-center rounded-[14px] border border-line-gold">
                    <Clock className="size-5 text-gold-light" />
                  </span>
                  <div>
                    <dt className="mb-1 font-serif text-[1.1rem] text-royal-deep">Opening hours</dt>
                    <dd className="text-ink-soft">{business.hours}</dd>
                  </div>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <article className="rounded-[22px] border border-line bg-white p-6 shadow-soft sm:p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-gold-pale">
                    <Pin className="size-[15px] text-royal" />
                  </span>
                  <h2 className="font-serif text-[1.3rem] text-royal-deep">Head Office</h2>
                </div>
                <address className="text-[0.96rem] leading-relaxed text-ink-soft not-italic">
                  {ho.lines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>
                <div className="mt-5 overflow-hidden rounded-[14px] border border-line-gold">
                  <iframe
                    src={`https://maps.google.com/maps?q=${ho.mapQuery}&output=embed`}
                    title={`Map showing our ${ho.city} head office`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="block h-[280px] w-full border-0"
                  />
                </div>
                <div className="mt-5">
                  <Button href={`/branches/${ho.slug}`} variant="outline" className="w-full">
                    View {ho.city} branch page
                  </Button>
                </div>
              </article>
            </Reveal>
          </div>
        </Wrap>
      </Section>

      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="All branches" title="Seven places to find us." />
          </Reveal>
          <Reveal>
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {branches.map((b) => (
                <Button key={b.slug} href={`/branches/${b.slug}`} variant="outline" className="w-full">
                  {b.isHeadOffice ? `${b.city} (Head Office)` : b.city}
                </Button>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Section>

      <CtaBand />
    </>
  );
}

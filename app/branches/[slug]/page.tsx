import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import { Check, Clock, Mail, Phone, Pin, WhatsApp } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Button, Section, SectionHead, Wrap } from "@/components/ui";
import { branchBySlug, branches, business, waLink } from "@/config/business";
import { sareeTypes } from "@/config/content";

type Params = { params: Promise<{ slug: string }> };

/** Silver and brass are not offered at the counters, so the branch pages list
 *  only the silk. The category still appears on /what-we-buy. */
const BRANCH_EXCLUDES = new Set(["silver"]);

/** One static route per branch, /branches/madurai, /branches/thanjavur, … */
export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const branch = branchBySlug(slug);
  if (!branch) return {};
  return {
    title: `Old Silk Saree Buyers in ${branch.city}`,
    description: `Sell old pattu and silk sarees in ${branch.city}. ${branch.lines.join(", ")}. Instant cash, free doorstep pickup and honest weighing.`,
    alternates: { canonical: `/branches/${branch.slug}` },
  };
}

export default async function BranchPage({ params }: Params) {
  const { slug } = await params;
  const branch = branchBySlug(slug);
  if (!branch) notFound();

  const phone = business.phones[branch.phoneIndex] ?? business.phones[0];
  const mapSrc = `https://maps.google.com/maps?q=${branch.mapQuery}&output=embed`;
  const others = branches.filter((b) => b.slug !== branch.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Branches", href: "/branches" },
          { label: branch.city },
        ]}
        eyebrow={branch.isHeadOffice ? "Head office" : "Branch"}
        title={<>Old Silk Saree Buyers in <span className="foil-text">{branch.city}</span></>}
        lead={branch.intro}
      >
        <Button href={phone.href} variant="yellow">
          <Phone className="size-[17px]" />
          Call {phone.label}
        </Button>
        <Button
          href={waLink(`Hello, I want to sell my old silk sarees in ${branch.city}.`)}
          variant="whatsapp"
          external
        >
          <WhatsApp className="size-[17px]" />
          WhatsApp Photos
        </Button>
      </PageHero>

      {/* Address + what to expect */}
      <Section>
        <Wrap>
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <SectionHead align="left" eyebrow={`${branch.city} branch`} title={branch.title} />
              <ul className="grid gap-3">
                {[
                  "Weighed openly on a calibrated scale, so you watch every reading.",
                  `Free doorstep pickup across ${branch.city}, even for one or two sarees.`,
                  "Cash, UPI or bank transfer the moment you accept the price.",
                  "Torn, faded and stained silk still bought for its zari.",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.96rem] text-ink-soft">
                    <Check className="mt-0.5 size-5 shrink-0 text-yellow" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <article className="rounded-[22px] border border-line bg-white p-6 shadow-soft sm:p-7">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-yellow-pale">
                    <Pin className="size-[15px] text-green" />
                  </span>
                  <h3 className="font-serif text-[1.3rem] text-green-deep">{branch.city}</h3>
                </div>

                <address className="text-[0.96rem] leading-relaxed text-ink-soft not-italic">
                  {branch.lines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>

                <div className="mt-5 grid gap-2.5 border-t border-line pt-5">
                  <a href={phone.href} className="inline-flex items-center gap-2.5 font-semibold text-green hover:text-yellow">
                    <Phone className="size-4" /> {phone.label}
                  </a>
                  <a
                    href={waLink(`Hello, I want to sell my old silk sarees in ${branch.city}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 font-semibold text-green hover:text-yellow"
                  >
                    <WhatsApp className="size-4" /> WhatsApp {business.whatsapp[0].label}
                  </a>
                  <a href={`mailto:${business.email}`} className="inline-flex items-center gap-2.5 break-all font-semibold text-green hover:text-yellow">
                    <Mail className="size-4" /> {business.email}
                  </a>
                </div>

                {/* Opening hours, the same every day, but shown in full so
                    nobody has to guess whether Sunday is included. */}
                <div className="mt-5 border-t border-line pt-5">
                  <h4 className="mb-3 flex items-center gap-2.5 font-serif text-[1.05rem] text-green-deep">
                    <Clock className="size-4 text-yellow" />
                    Opening hours
                  </h4>
                  <table className="w-full text-[0.92rem]">
                    <tbody>
                      {business.hoursTable.map((row) => (
                        <tr key={row.day} className="border-b border-line last:border-b-0">
                          <th scope="row" className="py-2 text-left font-medium text-ink-soft">
                            {row.day}
                          </th>
                          <td className="py-2 text-right text-ink">{row.open}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-soft/10 px-3 py-1.5 text-[0.82rem] font-semibold text-green">
                    <span aria-hidden className="size-1.5 rounded-full bg-green-soft" />
                    Open all seven days
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </Wrap>
      </Section>

      {/* Areas covered */}
      <Section tone="green">
        <Wrap>
          <Reveal>
            <SectionHead
              tone="dark"
              eyebrow="Areas covered"
              title={`We collect right across ${branch.city}.`}
              lead="Free pickup even for one or two sarees. Call ahead and we will fix a time that suits your household."
            />
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2.5">
              {branch.areas.map((a) => (
                <span key={a} className="rounded-full border border-yellow/30 bg-cream/[0.07] px-4 py-2 text-[0.85rem] text-cream/85">
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Section>

      {/* What we buy here */}
      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="What we buy" title="Bring anything woven in silk or zari." />
          </Reveal>
          <Reveal>
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {sareeTypes
                .filter((t) => !BRANCH_EXCLUDES.has(t.slug))
                .map((t) => (
                  <article
                    key={t.slug}
                    className="flex items-start gap-3.5 rounded-[22px] border border-line bg-white p-5 shadow-soft"
                  >
                    <Check className="mt-0.5 size-5 shrink-0 text-yellow" />
                    <div>
                      <h3 className="mb-1 font-serif text-[1.08rem] text-green-deep">{t.name}</h3>
                      <p className="text-[0.9rem] text-ink-soft">{t.blurb}</p>
                    </div>
                  </article>
                ))}
            </div>
          </Reveal>
        </Wrap>
      </Section>

      {/* Map */}
      <Section>
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Getting here" title="Find us on the map." />
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-[22px] border border-line-yellow bg-cream-2 shadow-mid">
              <iframe
                src={mapSrc}
                title={`Map showing our ${branch.city} location`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[300px] w-full border-0 lg:h-[420px]"
              />
            </div>
          </Reveal>
        </Wrap>
      </Section>

      {/* Other branches */}
      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Other branches" title="Somewhere else more convenient?" />
          </Reveal>
          <Reveal>
            <div className="grid gap-3.5 md:grid-cols-3">
              {others.map((b) => (
                <Button key={b.slug} href={`/branches/${b.slug}`} variant="outline" className="w-full">
                  {b.city}
                </Button>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Section>

      <CtaBand title={`Selling silk in ${branch.city}? Call before you decide.`} />
    </>
  );
}

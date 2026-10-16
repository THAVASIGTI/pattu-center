import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import { ArrowRight, Check, Clock, Mail, Phone, Pin, WhatsApp } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Button, Section, SectionHead, Wrap } from "@/components/ui";
import { branchBySlug, branches, business, mapEmbedUrl, mapLinkUrl, waLink } from "@/config/business";
import { SHOP_PHOTO_COUNT, qrImg, sareeTypes, shopThumb } from "@/config/content";

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
  const mapSrc = mapEmbedUrl(branch);
  const mapHref = mapLinkUrl(branch);
  const others = branches.filter((b) => b.slug !== branch.slug).slice(0, 6);

  /* Three of our own saree photographs for this page. Picked from the slug
     rather than at random, so every branch page shows a different three and
     the same three on every build: a static export that shuffled would churn
     the HTML on each deploy for no one's benefit. Step 7 against 26 photos
     is coprime, so the three are always distinct. */
  const seed = [...branch.slug].reduce((n, c) => n + c.charCodeAt(0), 0);
  const stockPhotos = [0, 1, 2].map((i) => ((seed + i * 7) % SHOP_PHOTO_COUNT) + 1);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Branches", href: "/branches" },
          { label: branch.city },
        ]}
        eyebrow={branch.isHeadOffice ? "Head office" : branch.pickupOnly ? "Doorstep pickup" : "Branch"}
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
                  branch.pickupOnly
                    ? `We come to your door anywhere in ${branch.city}, at a time you pick.`
                    : "Weighed openly on a calibrated scale, so you watch every reading.",
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

              {/* Scan straight through to the pin, rather than retyping an
                  address into Maps. Padding and border sit on the wrapper: with
                  border-box they would eat into the QR itself and the densest
                  code stops scanning. A pickup area has no pin, so it gets a
                  booking prompt in place of the code. */}
              {mapHref ? (
              <div className="mt-8 flex flex-col items-center rounded-[20px] border border-line glass-soft p-6 text-center shadow-soft">
                <span className="rounded-[12px] border border-line-yellow bg-white p-2">
                  <Image
                    src={qrImg(branch.slug)}
                    alt={`QR code opening our ${branch.city} branch in Google Maps`}
                    width={180}
                    height={180}
                    className="block size-[180px]"
                  />
                </span>
                <p className="mt-4 font-serif text-[1.15rem] text-green-deep">Scan for directions</p>
                <p className="mt-1.5 max-w-[34ch] text-[0.9rem] text-ink-soft">
                  Point your phone camera at this code to open the {branch.city} counter in
                  Google Maps.
                </p>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-green underline-offset-4 hover:underline"
                >
                  <Pin className="size-3.5" />
                  Or open it here
                </a>
              </div>
              ) : (
                <div className="mt-8 rounded-[20px] border border-line glass-soft p-6 shadow-soft">
                  <h3 className="font-serif text-[1.15rem] text-green-deep">
                    No counter here, we come to you
                  </h3>
                  <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink-soft">
                    Send photos on WhatsApp and we will reply with an indicative range, then
                    collect from your door at a time that suits your household. There is no
                    travel charge and no minimum number of sarees.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <Button href={phone.href} variant="yellow">
                      <Phone className="size-[17px]" />
                      Book a pickup
                    </Button>
                    <Button
                      href={waLink(`Hello, I want a doorstep pickup in ${branch.city}.`)}
                      variant="whatsapp"
                      external
                    >
                      <WhatsApp className="size-[17px]" />
                      Send photos
                    </Button>
                  </div>
                </div>
              )}
            </Reveal>

            <Reveal delay={120}>
              <article className="rounded-[22px] border border-line glass-soft p-6 shadow-soft sm:p-7">
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
          {/* Each chip arrives on its own beat rather than the whole block
              fading as one, which is what makes a dozen place names read as
              a route being listed. Six beats then back to the start, so the
              last chip is never a second and a half behind the first. */}
          <ul className="flex flex-wrap justify-center gap-2.5">
            {branch.areas.map((a, i) => (
              <li key={a}>
                <Reveal from="scale" delay={(i % 6) * 70} duration={520}>
                  <span className="block rounded-full border border-yellow/30 bg-cream/[0.07] px-4 py-2 text-[0.85rem] text-cream/85 transition-colors duration-300 hover:border-yellow/70 hover:bg-cream/[0.14]">
                    {a}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      {/* What we buy here.

          This used to be five identical cards, each a tick beside a name,
          and the page had no photograph on it anywhere except a QR code. Now
          our own pictures carry the section and the names sit under them as
          text, which is both a better page and an honest one: these are
          sarees that actually came over our counters, not stock photographs
          of somebody else's silk. */}
      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="What we buy"
              title="Bring anything woven in silk or zari."
              lead="Three that came in over our counters. Yours does not have to look like them: torn, faded and stained silk is still bought for the zari in it."
            />
          </Reveal>

          {/* A rail on a phone, three across from sm. Stacked, these ran
              900px down the page for three pictures of the same thing; sideways
              they are one swipe, and a sideways scroller inside a page that
              scrolls vertically never competes for the gesture. Same
              construction as the videos on the home page. */}
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
            {stockPhotos.map((n, i) => (
              <Reveal
                key={n}
                from="arch"
                delay={i * 110}
                className="w-[76vw] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none"
              >
                <figure className="group overflow-hidden rounded-[22px] border border-line-yellow shadow-soft">
                  <Image
                    src={shopThumb(n)}
                    alt="A silk saree bought over our counter, its woven gold zari border laid open"
                    width={480}
                    height={853}
                    className="block h-[360px] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 sm:h-[380px]"
                  />
                </figure>
              </Reveal>
            ))}
          </div>

          <ul className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {sareeTypes
              .filter((t) => !BRANCH_EXCLUDES.has(t.slug))
              .map((t, i) => (
                <li key={t.slug}>
                  <Reveal delay={(i % 2) * 80}>
                    <div className="flex gap-3">
                      <Check className="mt-1 size-[18px] shrink-0 text-yellow-ink" />
                      <span>
                        <b className="font-serif text-[1.08rem] font-normal text-green-deep">
                          {t.name}
                        </b>
                        <span className="mt-0.5 block text-[0.9rem] leading-relaxed text-ink-soft">
                          {t.blurb}
                        </span>
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
          </ul>
        </Wrap>
      </Section>

      {/* Map, skipped for a pickup area with no address to show */}
      {mapSrc && mapHref && (
      <Section>
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Getting here" title="Find us on the map." />
          </Reveal>
          {/* The map is the biggest single thing on this page, which is right:
              it is the one piece a visitor came here to use. It carried a
              brocade strip above and below it; the gold hairline does the
              framing on its own and leaves the map the whole of the panel. */}
          <Reveal from="arch">
            <div className="overflow-hidden rounded-[26px] border-2 border-line-yellow bg-cream-2 shadow-mid">
              <iframe
                src={mapSrc}
                title={`Map showing our ${branch.city} location`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[340px] w-full border-0 sm:h-[420px] lg:h-[520px]"
              />
            </div>
            <div className="mt-5 text-center">
              <Button href={mapHref} variant="outline" external>
                <Pin className="size-[17px]" />
                Open in Google Maps
              </Button>
            </div>
          </Reveal>
        </Wrap>
      </Section>
      )}

      {/* Other branches */}
      <Section tone="cream">
        <Wrap>
          <Reveal>
            <SectionHead eyebrow="Other branches" title="Somewhere else more convenient?" />
          </Reveal>
          {/* Six, not three, and each one says where it is. A row of bare
              city buttons asks someone who does not know Tamil Nadu well to
              guess which is nearest; a street under the name answers it. */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((b, i) => (
              <Reveal key={b.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/branches/${b.slug}`}
                  className="group flex h-full flex-col rounded-[22px] border border-line glass-soft p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-yellow hover:shadow-mid sm:p-5"
                >
                  {/* The badge is not decoration here. Two of these six can
                      be the same city, and without it a visitor is asked to
                      choose between two cards that read "Madurai". */}
                  <span className="font-serif text-[1.25rem] text-green-deep transition-colors duration-300 group-hover:text-yellow-ink">
                    {b.city}
                    {/* green-deep, not green. On the cream section tone this
                        chip sits on, --color-green measured 4.23:1 against a
                        4.5 floor at this size. */}
                    {b.isHeadOffice && (
                      <span className="ml-2 rounded-full bg-green/10 px-2 py-0.5 align-middle font-sans text-[0.58rem] font-semibold tracking-[0.12em] text-green-deep uppercase">
                        Head Office
                      </span>
                    )}
                    {b.badge && (
                      <span className="ml-2 rounded-full bg-yellow/15 px-2 py-0.5 align-middle font-sans text-[0.58rem] font-semibold tracking-[0.12em] text-yellow-ink uppercase">
                        {b.badge}
                      </span>
                    )}
                  </span>
                  <span className="mt-1.5 flex-1 text-[0.87rem] leading-relaxed text-ink-soft">
                    {b.pickupOnly ? "Doorstep pickup across the city" : b.lines[0]}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.83rem] font-semibold text-green">
                    Branch page
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Outline, like every other secondary action on the site. It
              measures 4.39:1 here against a 4.5 floor, which is --color-green
              used as text rather than anything about this button: the same
              shortfall turns up wherever green type sits on the cream section
              tone. Filling it is not the answer, the green variant's gradient
              starts at #22c55e and its own label measures 2.77:1 there. The
              real fix is a --color-green-ink the way the palette already has
              a --color-yellow-ink, and that is a brand-wide change. */}
          <div className="mt-8 text-center">
            <Button href="/branches" variant="outline">
              See every branch
              <ArrowRight className="size-[17px]" />
            </Button>
          </div>
        </Wrap>
      </Section>

      <CtaBand title={`Selling silk in ${branch.city}? Call before you decide.`} />
    </>
  );
}

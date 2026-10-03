import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReelWall from "@/components/ReelWall";
import { Facebook, Instagram, YouTube } from "@/components/Icons";
import { Button, Section, SectionHead, Wrap } from "@/components/ui";
import { business } from "@/config/business";
import { galleryImages, img, reels, shopGallery, shopImg } from "@/config/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Every video from our Facebook, Instagram and YouTube, plus the silk, zari and handloom from the trade we work in every day across Tamil Nadu.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        eyebrow="Our trade"
        title={<>Silk, sorted by hand <span className="foil-text">every single day</span>.</>}
        lead="A look at the weaves, zari and handloom work that pass across our counters."
        image={img(33433875)}
      />

      {/* Social first, because this is where the home page sends anyone who
          pressed "See all videos" and it should be the thing under the
          anchor, not something they have to scroll past a hundred stills to
          reach. The whole set lives here, the two that will not embed
          included, since a card that says it opens on Instagram is honest in
          a place that promises everything. */}
      {/* scroll-mt because the header is sticky. Jumping to #social puts
          the section top at 0, and the header is 79px on a phone, which
          swallows the ornament above the eyebrow. */}
      <Section id="social" tone="cream" className="scroll-mt-20 sm:scroll-mt-24">
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="Watch us"
              title={<>All {reels.length} videos from our <span className="foil-text-deep">own pages</span>.</>}
              lead="Everything we have posted to Facebook, Instagram and YouTube, of the work as it happens. Tap any one to play it here."
            />
          </Reveal>

          <ReelWall />

          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            <Button href={business.social.facebook} variant="outline" external>
              <Facebook className="size-[17px]" />
              Follow on Facebook
            </Button>
            <Button href={business.social.instagram} variant="outline" external>
              <Instagram className="size-[17px]" />
              Follow on Instagram
            </Button>
            <Button href={business.social.youtube} variant="outline" external>
              <YouTube className="size-[17px]" />
              Subscribe on YouTube
            </Button>
          </div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Reveal>
            <SectionHead
              eyebrow="Our counters"
              title="Sarees that passed through our hands."
              lead="Photographs of the silk we have bought, taken at our own counters."
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
            {shopGallery.map((g, i) => (
              <Reveal key={g.n} delay={(i % 3) * 70}>
                <figure className="overflow-hidden rounded-[14px] border border-line-yellow bg-cream-2 shadow-soft">
                  <Image
                    src={shopImg(g.n)}
                    alt={g.alt}
                    width={1200}
                    height={1600}
                    sizes="(max-width: 768px) 46vw, 30vw"
                    className="aspect-3/4 size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <Reveal>
              <SectionHead
                eyebrow="The trade"
                title="Silk, sorted by hand every day."
                lead="Handlooms, zari and market scenes from the weaving towns our stock comes from."
              />
            </Reveal>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
              {galleryImages.map((g, i) => (
                <Reveal key={g.id} delay={(i % 3) * 70}>
                  <figure className="overflow-hidden rounded-[14px] border border-line-yellow bg-cream-2 shadow-soft">
                    <Image
                      src={img(g.id)}
                      alt={g.alt}
                      width={700}
                      height={700}
                      sizes="(max-width: 768px) 46vw, 30vw"
                      className="aspect-square size-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-[0.9rem] text-ink-mute">
            Every saree above passed across our own counters. Call or send photos on WhatsApp to
            find out what yours is worth.
          </p>
        </Wrap>
      </Section>

      <CtaBand />
    </>
  );
}

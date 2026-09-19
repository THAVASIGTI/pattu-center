import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Section, Wrap } from "@/components/ui";
import { galleryImages, img } from "@/config/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Silk, zari and handloom from the trade we work in every day across Tamil Nadu.",
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

      <Section>
        <Wrap>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
            {galleryImages.map((g, i) => (
              <Reveal key={g.id} delay={(i % 3) * 80}>
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
          <p className="mt-8 text-center text-[0.9rem] text-ink-mute">
            Photographs are illustrative of the weaves we handle. Replace with your own shop
            photography for the live site.
          </p>
        </Wrap>
      </Section>

      <CtaBand />
    </>
  );
}

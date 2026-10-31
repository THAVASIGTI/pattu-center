import SiteShell from "@/components/SiteShell";
import { branches, business } from "@/config/business";
import { img } from "@/config/content";

/**
 * Everything the public site shares, and nothing the console does.
 *
 * A route group, so none of this appears in a URL: app/(site)/about still
 * serves /about. What it buys is a second place to put chrome, which is why
 * the pages were moved into it at all. The console needs a completely
 * different frame, and in the App Router the only honest way to give it one
 * is to stop putting the marketing frame in the root layout.
 *
 * The LocalBusiness structured data lives here rather than in the root for
 * the same reason: it describes the shop to a search engine, and the
 * console is not part of the shop's public face. It is also noindex, so
 * emitting shop schema inside it would be contradictory.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  description:
    "Buyers of old silk sarees, pattu sarees, silk vetti, zari and silver across Tamil Nadu.",
  telephone: business.phones.map((p) => `+91${p.raw}`),
  email: business.email,
  url: business.siteUrl,
  priceRange: "₹₹",
  openingHours: "Mo-Su 10:00-20:00",
  founder: business.owners.map((name) => ({ "@type": "Person", name })),
  address: {
    "@type": "PostalAddress",
    streetAddress: branches[0].lines.join(", "),
    addressLocality: branches[0].city,
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: branches.map((b) => b.city),
  sameAs: Object.values(business.social),
  image: `${new URL(business.siteUrl).origin}${img(38890438)}`,
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteShell>{children}</SiteShell>
    </>
  );
}

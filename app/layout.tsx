import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter, Marcellus, Noto_Sans_Tamil } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import SocialDock from "@/components/SocialDock";
import { branches, business } from "@/config/business";
import { img } from "@/config/content";
import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
});

// Text serif for the welcome note, which wants to read as an introduction
// rather than body copy. Marcellus is a display face and gets thin at
// paragraph size, so this carries the running text instead.
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

// Carved Roman capitals for the welcome title. Only used at display size,
// where the engraved look reads; it would be unreadable as body copy.
const cinzel = Cinzel({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | Old Silk & Pattu Saree Buyers in Tamil Nadu`,
    template: `%s | ${business.name}`,
  },
  description:
    "We buy old pattu sarees, Kanchipuram and Mysore silk, silk vetti, zari and silver at the best price. Instant cash, free doorstep pickup and saree exchange across Tamil Nadu.",
  keywords: [
    "old silk saree buyers",
    "old pattu saree buyers Madurai",
    "Kanchipuram silk saree buyers",
    "Mysore silk saree buyers",
    "zari buyers Tamil Nadu",
    "old saree exchange Coimbatore",
  ],
  openGraph: {
    type: "website",
    siteName: business.name,
    title: `${business.name} | Old Silk Saree Buyers`,
    description: `${business.tagline}. Sell your old pattu sarees, silk vetti and zari at a fair price. Instant cash across Tamil Nadu.`,
    // img() already includes basePath, so join it to the bare origin rather
    // than to siteUrl (which also ends in the repo path) to avoid doubling it.
    images: [`${new URL(business.siteUrl).origin}${img(38890438)}`],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#0a2e1a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${cormorant.variable} ${cinzel.variable} ${inter.variable} ${tamil.variable}`}>
      {/* suppressHydrationWarning covers attributes that browser extensions
          inject into <body> before React hydrates (ColorZilla's
          cz-shortcut-listen, Grammarly's data-gr-*, and similar). It applies
          only to this element's own attributes and text. Mismatches anywhere
          in the tree below are still reported. */}
      <body suppressHydrationWarning className="font-sans antialiased pb-[58px] xl:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <SocialDock />
        <MobileActionBar />
      </body>
    </html>
  );
}

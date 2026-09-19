import type { Metadata } from "next";
import { Inter, Marcellus, Noto_Sans_Tamil } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import { branches, business } from "@/config/business";
import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
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
    default: `${business.name} — Old Silk & Pattu Saree Buyers in Tamil Nadu`,
    template: `%s — ${business.name}`,
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
    title: `${business.name} — Old Silk Saree Buyers`,
    description: `${business.tagline} — sell your old pattu sarees, silk vetti and zari at a fair price. Instant cash across Tamil Nadu.`,
    images: ["https://images.unsplash.com/photo-1606941060060-3d317be9947c?w=1200&q=80"],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#0a1738",
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
  openingHours: "Mo-Sa 09:30-20:30",
  founder: { "@type": "Person", name: business.owner },
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
    <html lang="en" className={`${marcellus.variable} ${inter.variable} ${tamil.variable}`}>
      <body className="font-sans antialiased pb-[58px] xl:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { business } from "@/config/business";
import { img } from "@/config/content";
import { Cinzel, Cormorant_Garamond, Inter, Marcellus, Noto_Sans_Tamil } from "next/font/google";
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
  weight: ["400", "500", "600", "700"],
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

/**
 * The document, and only the document.
 *
 * <html>, <body>, the five fonts and the site-wide metadata. Everything that
 * used to sit here, the header, the footer, the social dock, the fixed phone
 * bar and the LocalBusiness schema, has moved into app/(site)/layout.tsx.
 *
 * The reason is the console at /console/control. It is a dashboard, and it
 * cannot share a frame with a marketing site; in the App Router the way to
 * give two parts of one domain two different frames is to stop putting
 * either of them in the root. Route groups make that free, because a group
 * contributes nothing to a URL: app/(site)/about still serves /about.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${cormorant.variable} ${cinzel.variable} ${inter.variable} ${tamil.variable}`}>
      {/* suppressHydrationWarning covers attributes that browser extensions
          inject into <body> before React hydrates (ColorZilla's
          cz-shortcut-listen, Grammarly's data-gr-*, and similar). It applies
          only to this element's own attributes and text. Mismatches anywhere
          in the tree below are still reported. */}
      <body suppressHydrationWarning className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

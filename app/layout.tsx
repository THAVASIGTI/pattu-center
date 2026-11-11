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
/**
 * Google Tag Manager.
 *
 * This is GTM's own snippet, not the one that was handed over, and the
 * difference matters. That one was two different Google installs spliced
 * together: it loaded gtm.js, which is Tag Manager, but the inline half of
 * it was the gtag.js bootstrap, which belongs with a G- or AW- tag and a
 * different script URL. Loading a GTM container that way misses the push
 * the container is waiting for, so tags on the Page View and Initialisation
 * triggers never fire, and `gtag('js', new Date())` just drops an unread
 * arguments object into the dataLayer.
 *
 * What the real snippet does, in the order it does it: create dataLayer if
 * nothing else has, push `gtm.start` with a timestamp so the container can
 * measure its own load, push `event: 'gtm.js'` which is what the triggers
 * key off, and only then inject the container script.
 *
 * Verbatim from Tag Manager apart from the id being lifted into a constant.
 * It is worth leaving it alone: every byte of it is depended on by tags
 * configured on the Tag Manager side, where nobody editing this file can
 * see them.
 */
const GTM_ID = "GTM-K3FMZ487";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${cormorant.variable} ${cinzel.variable} ${inter.variable} ${tamil.variable}`}>
      {/* A plain <head> with a plain <script>, rather than next/script.
          This was written with <Script strategy="beforeInteractive"> first,
          on the documented promise that the root layout is where that
          strategy writes into the head. It does not: the exported HTML put
          the snippet in `self.__next_s` and injected it from the BODY,
          after Next's own runtime had started. Checked in the build output,
          not assumed.

          Tag Manager asks to be as high in the head as possible, and the
          point of that is to be running before the page does. Writing the
          head out by hand is what actually delivers it; Next merges its own
          generated metadata into this element rather than replacing it. */}
      <head>
        {/* eslint-disable-next-line @next/next/next-script-for-ga --
            The rule points at <GoogleTagManager> from @next/third-parties.
            That component wraps next/script on the afterInteractive
            strategy, which injects from the body after hydration: the exact
            placement this file already tried and rejected. Taking the rule's
            advice would undo the fix, so it is overridden here rather than
            switched off for the project. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>

      {/* suppressHydrationWarning covers attributes that browser extensions
          inject into <body> before React hydrates (ColorZilla's
          cz-shortcut-listen, Grammarly's data-gr-*, and similar). It applies
          only to this element's own attributes and text. Mismatches anywhere
          in the tree below are still reported. */}
      <body suppressHydrationWarning className="font-sans antialiased">
        {/* The other half of the install, and the half most people leave
            out. It is the only thing that records a visit with JavaScript
            off, and it has to be the first thing in the body. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

import { branches } from "@/config/business";
import {
  SHOP_PHOTO_COUNT,
  buyCategories,
  faqs,
  galleryImages,
  priceLedger,
  processSteps,
  reels,
  sareeTypes,
  services,
  testimonials,
  whyChooseUs,
} from "@/config/content";

/**
 * What the console manages: the website's own content.
 *
 * NOTHING HERE IS INVENTED. This file used to hold a generated CRM, six
 * months of enquiries and purchases that never happened, and that has been
 * deleted. Every number below is counted from config/business.ts and
 * config/content.ts, which are the files the live site renders from. If the
 * console says there are eleven branches it is because there are eleven
 * branches; if it says Trichy has no map pin it is because `coords` is
 * missing from Trichy and its map falls back to searching for a landmark.
 *
 * That is the point of the change. A dashboard of invented figures can only
 * ever be a screenshot. A dashboard counted from the real content tells you
 * something true, and the things it finds wrong are things that are
 * actually wrong.
 *
 * WHAT IT CANNOT DO IS SAVE. The site is a static export: the content lives
 * in TypeScript and becomes HTML at build time, so changing a branch means
 * editing a file, rebuilding and redeploying. Every create, edit and remove
 * in this console therefore ends at a toast that says so. It is a faithful
 * view of the content and an honest mock of editing it.
 */

/* ------------------------------------------------------------------ */
/* The hero's rotating images                                          */
/* ------------------------------------------------------------------ */

/** Seconds each hero image holds, and how many the hero cycles through.
 *  Both mirror SareeCycle and globals.css; if either changes there, change
 *  it here or the console starts describing a hero that does not exist. */
export const HERO_SLOT_SECONDS = 5;
export const HERO_SLOTS = 6;

/**
 * The six stacks the hero shows, in the order it shows them.
 *
 * Taken with the same slice SareeCycle uses, so the list cannot drift out
 * of step with what the hero actually renders. A seventh category, if
 * anyone adds one, appears on the board further down the home page and NOT
 * in the hero; the console says so rather than implying the hero grew.
 */
export const heroImages = buyCategories.slice(0, HERO_SLOTS).map((c, i) => ({
  slot: i + 1,
  slug: c.slug,
  name: c.name,
  ta: c.ta,
  alt: c.alt,
  imageId: c.imageId,
  /** Every file in public/img/cat was generated at one width on purpose,
   *  so this is stated rather than guessed. */
  dimensions: "620 × 465",
}));

export const heroSpareCategories = buyCategories.slice(HERO_SLOTS);

/* ------------------------------------------------------------------ */
/* Branches                                                            */
/* ------------------------------------------------------------------ */

/**
 * Every branch, with the one thing the console can check about it.
 *
 * A branch with `coords` gets a map pinned to its door. A branch without
 * one falls back to `mapQuery`, which searches for a nearby landmark, so
 * the map and the printed QR code point at the right street and the wrong
 * building. That is a real defect on the live site and this is the right
 * place to surface it.
 *
 * Chennai is exempt: it is a collection route rather than a counter, it has
 * no address to pin, and the absence there is correct.
 */
export const branchRows = branches.map((b) => ({
  slug: b.slug,
  city: b.city,
  badge: b.badge,
  title: b.title,
  isHeadOffice: Boolean(b.isHeadOffice),
  pickupOnly: Boolean(b.pickupOnly),
  street: b.lines[0],
  lines: b.lines,
  areas: b.areas,
  phoneIndex: b.phoneIndex,
  intro: b.intro,
  hasPin: Boolean(b.coords),
  needsPin: Boolean(!b.coords && !b.pickupOnly),
}));

export const branchesMissingPins = branchRows.filter((b) => b.needsPin);

/* ------------------------------------------------------------------ */
/* The inventory                                                       */
/* ------------------------------------------------------------------ */

export type Section = "Branches" | "What we buy" | "Pictures & video" | "Words";

export type InventoryRow = {
  label: string;
  count: number;
  /** The file that holds it, so an editor knows where to go. */
  where: string;
  /** Where on the public site a visitor meets it. */
  href: string;
  section: Section;
  /** True when the row counts a PROPERTY of another row rather than a
   *  thing of its own. Collection areas belong to branches: there is no
   *  such file as an area, you cannot add one without a branch to add it
   *  to, and counting both into one total gives 11 + 127 = 138 "branches",
   *  which is three different units added together. Derived rows stay in
   *  the table, where the label explains them, and stay out of any sum. */
  derived?: boolean;
};

export const inventory: InventoryRow[] = [
  { label: "Branches", count: branches.length, where: "config/business.ts", href: "/branches", section: "Branches" },
  { label: "Collection areas", count: branches.reduce((s, b) => s + b.areas.length, 0), where: "config/business.ts", href: "/branches", section: "Branches", derived: true },
  { label: "Hero images", count: HERO_SLOTS, where: "public/img/cat", href: "/", section: "Pictures & video" },
  { label: "Shop photographs", count: SHOP_PHOTO_COUNT, where: "public/img/shop", href: "/gallery", section: "Pictures & video" },
  { label: "Stock photographs", count: galleryImages.length, where: "public/img", href: "/gallery", section: "Pictures & video" },
  { label: "Videos", count: reels.length, where: "config/content.ts", href: "/gallery", section: "Pictures & video" },
  { label: "Buying categories", count: buyCategories.length, where: "config/content.ts", href: "/", section: "What we buy" },
  { label: "Saree types", count: sareeTypes.length, where: "config/content.ts", href: "/what-we-buy", section: "What we buy" },
  { label: "Price factors", count: priceLedger.length, where: "config/content.ts", href: "/", section: "What we buy" },
  { label: "Services", count: services.length, where: "config/content.ts", href: "/services", section: "Words" },
  { label: "Reasons to choose us", count: whyChooseUs.length, where: "config/content.ts", href: "/about", section: "Words" },
  { label: "Process steps", count: processSteps.length, where: "config/content.ts", href: "/how-it-works", section: "Words" },
  { label: "Questions answered", count: faqs.length, where: "config/content.ts", href: "/faq", section: "Words" },
  { label: "Customer reviews", count: testimonials.length, where: "config/content.ts", href: "/", section: "Words" },
];

/** Countable things only: every derived row is left out, so these can be
 *  added up without adding units together. */
export const inventoryItems = inventory.filter((i) => !i.derived);

export const totals = {
  branches: branches.length,
  areas: branches.reduce((s, b) => s + b.areas.length, 0),
  images: HERO_SLOTS + SHOP_PHOTO_COUNT + galleryImages.length,
  videos: reels.length,
  media: HERO_SLOTS + SHOP_PHOTO_COUNT + galleryImages.length + reels.length,
  /** Public pages, counted from the app directory: home, about, what we
   *  buy, services, how it works, branches, the branch template, gallery,
   *  faq, contact and the 404. */
  pages: 11,
};

/* ------------------------------------------------------------------ */
/* What needs attention                                                */
/* ------------------------------------------------------------------ */

export const SEVERITIES = ["Needs a decision", "Worth fixing", "For information"] as const;
export type Severity = (typeof SEVERITIES)[number];

export type Issue = {
  id: string;
  title: string;
  detail: string;
  severity: Severity;
  where: string;
  section: Section;
};

/**
 * Real defects in the real content, not a demonstration of a defect list.
 *
 * Each one was found while building this site and each one is still true as
 * of writing. Fix one and delete its entry: a health panel that keeps
 * reporting a solved problem teaches people to ignore the panel.
 */
export const issues: Issue[] = [
  ...branchesMissingPins.map(
    (b): Issue => ({
      id: `pin-${b.slug}`,
      title: `${b.city}${b.badge ? ` ${b.badge.toLowerCase()}` : ""} has no map pin`,
      detail:
        "Its map and QR code search for a nearby landmark instead of pointing at the door. Add the shop's own coordinates, then run the QR script again.",
      severity: "Worth fixing",
      where: "config/business.ts",
      section: "Branches",
    }),
  ),
  {
    id: "trichy-areas",
    title: "Trichy's collection areas were not supplied by the shop",
    detail:
      "The twelve areas listed for Trichy were chosen during the build rather than given by the branch. They should be confirmed before anyone relies on them.",
    severity: "Needs a decision",
    where: "config/business.ts",
    section: "Branches",
  },
  {
    id: "testimonials",
    title: `All ${testimonials.length} customer reviews are placeholders`,
    detail:
      "The quotes on the home page were written to show the layout. Replace them with real feedback before the site is promoted anywhere.",
    severity: "Needs a decision",
    where: "config/content.ts",
    section: "Words",
  },
  {
    id: "hero-source",
    title: "The hero images are stock, not the shop's own",
    detail:
      "The six stacks the hero cycles through are licensed stock photographs. A photograph of the shop's own counter would be better and costs nothing to swap in.",
    severity: "Worth fixing",
    where: "public/img/cat",
    section: "Pictures & video",
  },
  {
    id: "reels-linkonly",
    title: `${reels.filter((r) => r.linkOnly).length} videos cannot play on the page`,
    detail:
      "Instagram refuses to embed a reel whose audio is a licensed commercial track, so those cards open the post instead. Correct behaviour, but a clip the shop wants watched in place needs different audio.",
    severity: "For information",
    where: "config/content.ts",
    section: "Pictures & video",
  },
];

export const issuesBySeverity = SEVERITIES.map((severity) => ({
  severity,
  items: issues.filter((i) => i.severity === severity),
}));

/* ------------------------------------------------------------------ */
/* Pass-throughs, so the views import from one place                   */
/* ------------------------------------------------------------------ */

export { buyCategories, faqs, priceLedger, reels, sareeTypes, services, testimonials };
export const shopPhotoCount = SHOP_PHOTO_COUNT;

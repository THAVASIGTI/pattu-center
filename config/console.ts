import { branches } from "@/config/business";
import { priceLedger, sareeTypes } from "@/config/content";

/**
 * The console's data. All of it invented.
 *
 * Nothing in this file came from the shop. It is a deterministic sketch of
 * what their book would look like if it were kept here, built so the
 * dashboard has something to be a dashboard ABOUT. The shape is real, drawn
 * from the trade the rest of the site describes: enquiries arrive by phone,
 * WhatsApp, walk-in or social; a branch values the silk by weight and zari;
 * a figure is agreed and paid. The numbers under that shape are made up.
 *
 * Two rules it follows, and both matter.
 *
 * IT IS DETERMINISTIC. A seeded generator, never Math.random and never
 * Date.now. A static export renders this once at build time and again in the
 * browser at hydration, and anything that differs between the two is a
 * hydration mismatch: React would quietly swap the markup and the console
 * would log an error on a page whose whole job is to look professional.
 * The same seed gives the same ledger in both places, every time.
 *
 * IT ENDS ON A FIXED DAY. PERIOD_END below, not "today". A dashboard that
 * says "today" has to know what day it is, and the day it is at build time
 * is not the day it is when somebody looks. Pinning the period means the
 * figures stay internally consistent, the charts stop moving under the
 * reader, and every "last 30 days" means the same 30 days it did when the
 * numbers were generated. The shell prints the date so nobody mistakes it
 * for live.
 */

/** The ledger ends here. Every relative window in the console is measured
 *  back from this date, and it is printed in the UI. */
export const PERIOD_END = new Date("2026-10-31T00:00:00Z");
export const PERIOD_DAYS = 182;

/* ------------------------------------------------------------------ */
/* The generator                                                       */
/* ------------------------------------------------------------------ */

/** mulberry32: small, fast, and the same sequence everywhere. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T,>(r: () => number, xs: readonly T[]) => xs[Math.floor(r() * xs.length)];
const between = (r: () => number, lo: number, hi: number) => lo + r() * (hi - lo);
const intBetween = (r: () => number, lo: number, hi: number) =>
  Math.floor(between(r, lo, hi + 1));

/* Names drawn from the region the shop actually works in, so the ledger
   reads as Tamil Nadu rather than as a Lorem Ipsum of first names. */
const GIVEN = [
  "Lakshmi", "Meenakshi", "Saravanan", "Kavitha", "Murugan", "Revathi",
  "Ramanathan", "Anitha", "Senthil", "Bhuvana", "Karthik", "Shanthi",
  "Ponnusamy", "Vasanthi", "Dhanalakshmi", "Arumugam", "Rajeswari",
  "Subramanian", "Thenmozhi", "Chandran", "Gayathri", "Palanivel",
  "Kalaiselvi", "Mahalingam", "Padmavathi", "Velmurugan", "Jeyanthi",
  "Natarajan", "Amudha", "Sundaram",
] as const;
const INITIAL = ["R.", "K.", "S.", "M.", "P.", "V.", "N.", "T.", "A.", "G."] as const;

export const CHANNELS = ["Phone call", "WhatsApp", "Walk-in", "Instagram"] as const;
export type Channel = (typeof CHANNELS)[number];

/** The pipeline, in order. Order is the point: it is a funnel, and the
 *  console charts it as one. */
export const STAGES = [
  "New enquiry",
  "Contacted",
  "Pickup scheduled",
  "Valued",
  "Purchased",
  "Did not proceed",
] as const;
export type Stage = (typeof STAGES)[number];

export const PAYMENT_MODES = ["Cash", "UPI", "Bank transfer"] as const;

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  city: string;
  branchSlug: string;
  channel: Channel;
  stage: Stage;
  pieces: number;
  /** Days before PERIOD_END. Kept as an offset so the date is derived, never
   *  read from a clock. */
  daysAgo: number;
  note: string;
};

export type Purchase = {
  id: string;
  enquiryId: string;
  name: string;
  branchSlug: string;
  daysAgo: number;
  pieces: number;
  silkGrams: number;
  zariGrams: number;
  payout: number;
  mode: (typeof PAYMENT_MODES)[number];
};

const NOTES = [
  "Mother's wedding sarees, stored thirty years",
  "Wants a valuation before travelling",
  "Nine-yard koorai, heavy zari",
  "Asked about exchange rather than cash",
  "Torn pallu, zari intact",
  "Sent photos, awaiting the close-up of the border",
  "Bundle of blouse bits and cut borders",
  "Silver lamp to be weighed on the same visit",
  "Pickup requested for a Sunday",
  "Repeat seller, third visit",
] as const;

/* Weighting makes the ledger look like a business rather than a dice roll:
   the head office does more than a pickup-only route, and the phone still
   beats Instagram in this trade. */
const BRANCH_WEIGHT: Record<string, number> = {
  madurai: 2.4,
  "madurai-jaihindpuram": 1.3,
  thoothukudi: 1.2,
  "thoothukudi-jn-pattu-mahal": 0.9,
  thanjavur: 1.1,
  "thanjavur-mela-veedhi": 0.8,
  trichy: 1.0,
  villupuram: 0.7,
  tiruppur: 0.9,
  coimbatore: 1.4,
  chennai: 0.6,
};
const CHANNEL_WEIGHT: Record<Channel, number> = {
  "Phone call": 3.2,
  WhatsApp: 3.0,
  "Walk-in": 2.1,
  Instagram: 1.0,
};

function weighted<T extends string>(r: () => number, weights: Record<T, number>): T {
  const entries = Object.entries(weights) as [T, number][];
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let x = r() * total;
  for (const [k, w] of entries) {
    x -= w;
    if (x <= 0) return k;
  }
  return entries[entries.length - 1][0];
}

function build() {
  const r = rng(20261031);
  const enquiries: Enquiry[] = [];
  const purchases: Purchase[] = [];

  for (let i = 0; i < 340; i += 1) {
    const branchSlug = weighted(r, BRANCH_WEIGHT);
    const branch = branches.find((b) => b.slug === branchSlug) ?? branches[0];
    /* The exponent decides which end of the period is busy. Above 1 it
       pushes mass towards zero, which is towards today, so the trade is
       growing; at 0.85 it did the opposite and every tile on the overview
       read as a double-digit decline. A demo of a shop in trouble is not
       what anyone wants to be shown. */
    const daysAgo = Math.floor(Math.pow(r(), 1.2) * PERIOD_DAYS);
    const pieces = intBetween(r, 1, 14);

    /* Older enquiries have had time to resolve; recent ones are still in
       the early stages. Without this the funnel has as many brand-new
       enquiries from April as from last week, which no pipeline does. */
    const settled = daysAgo > 14 ? r() < 0.93 : r() < 0.3;
    let stage: Stage;
    if (settled) stage = r() < 0.64 ? "Purchased" : "Did not proceed";
    else stage = pick(r, ["New enquiry", "Contacted", "Pickup scheduled", "Valued"] as const);

    const enquiry: Enquiry = {
      id: `ENQ-${String(4100 + i)}`,
      name: `${pick(r, GIVEN)} ${pick(r, INITIAL)}`,
      phone: `+91 ${intBetween(r, 70, 99)}${intBetween(r, 100, 999)} ${intBetween(r, 10000, 99999)}`,
      city: branch.city,
      branchSlug,
      channel: weighted(r, CHANNEL_WEIGHT),
      stage,
      pieces,
      daysAgo,
      note: pick(r, NOTES),
    };
    enquiries.push(enquiry);

    if (stage === "Purchased") {
      /* Silk runs roughly 480-900g a saree; zari is a fraction of that and
         is what moves the price, exactly as the price ledger on the public
         site says. */
      const silkGrams = Math.round(pieces * between(r, 480, 900));
      const zariGrams = Math.round(silkGrams * between(r, 0.06, 0.19));
      const perGram = between(r, 2.1, 3.4);
      const zariPerGram = between(r, 34, 58);
      const payout = Math.round((silkGrams * perGram + zariGrams * zariPerGram) / 10) * 10;
      /* A purchase happens AFTER the enquiry that produced it, which is
         to say FEWER days ago, and the gap is the time it takes to arrange
         a visit. Giving both the same date was the bug behind a dashboard
         that showed enquiries up and payouts down in the same month: the
         newest enquiries had not converted yet, so every purchase was
         dated into the past alongside the enquiry that started it. */
      const closedDaysAgo = Math.max(0, daysAgo - intBetween(r, 1, 9));
      purchases.push({
        id: `PUR-${String(2600 + purchases.length)}`,
        enquiryId: enquiry.id,
        name: enquiry.name,
        branchSlug,
        daysAgo: closedDaysAgo,
        pieces,
        silkGrams,
        zariGrams,
        payout,
        mode: weighted(r, { Cash: 2.4, UPI: 3.1, "Bank transfer": 1.2 }),
      });
    }
  }

  enquiries.sort((a, b) => a.daysAgo - b.daysAgo);
  purchases.sort((a, b) => a.daysAgo - b.daysAgo);
  return { enquiries, purchases };
}

const built = build();
export const enquiries = built.enquiries;
export const purchases = built.purchases;

/* ------------------------------------------------------------------ */
/* Dates, derived from the offsets                                     */
/* ------------------------------------------------------------------ */

export function dateOf(daysAgo: number) {
  const d = new Date(PERIOD_END);
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d;
}

const DMY = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
export const formatDate = (daysAgo: number) => DMY.format(dateOf(daysAgo));

export const periodEndLabel = DMY.format(PERIOD_END);

/** Rupees, Indian grouping, no decimals. ₹12,45,600 rather than ₹1,245,600. */
const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
export const rupees = (n: number) => INR.format(n);

/** Short form for axis ticks and tiles, where ₹12,45,600 is too long. */
export function rupeesShort(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${Math.round(n / 1000)}k`;
  return `₹${n}`;
}

export const kilos = (g: number) => `${(g / 1000).toFixed(1)} kg`;

/* ------------------------------------------------------------------ */
/* Aggregates the dashboard reads                                      */
/* ------------------------------------------------------------------ */

const within = (daysAgo: number, days: number) => daysAgo < days;

export const totals = {
  enquiries: enquiries.length,
  purchases: purchases.length,
  payout: purchases.reduce((s, p) => s + p.payout, 0),
  pieces: purchases.reduce((s, p) => s + p.pieces, 0),
  silkGrams: purchases.reduce((s, p) => s + p.silkGrams, 0),
  zariGrams: purchases.reduce((s, p) => s + p.zariGrams, 0),
  openPipeline: enquiries.filter(
    (e) => e.stage !== "Purchased" && e.stage !== "Did not proceed",
  ).length,
};

export const conversionRate = Math.round((totals.purchases / totals.enquiries) * 100);
export const averagePayout = Math.round(totals.payout / totals.purchases);

/** This 30 days against the 30 before it, which is what a trend arrow on a
 *  tile is actually claiming. */
function deltaPct(pickValue: (daysAgo: number) => number) {
  let now = 0;
  let prev = 0;
  for (let d = 0; d < 30; d += 1) now += pickValue(d);
  for (let d = 30; d < 60; d += 1) prev += pickValue(d);
  if (prev === 0) return 0;
  return Math.round(((now - prev) / prev) * 100);
}

const payoutOnDay = (d: number) =>
  purchases.filter((p) => p.daysAgo === d).reduce((s, p) => s + p.payout, 0);
const enquiriesOnDay = (d: number) => enquiries.filter((e) => e.daysAgo === d).length;
const purchasesOnDay = (d: number) => purchases.filter((p) => p.daysAgo === d).length;

export const trend = {
  payout: deltaPct(payoutOnDay),
  enquiries: deltaPct(enquiriesOnDay),
  purchases: deltaPct(purchasesOnDay),
};

export const last30 = {
  payout: purchases.filter((p) => within(p.daysAgo, 30)).reduce((s, p) => s + p.payout, 0),
  enquiries: enquiries.filter((e) => within(e.daysAgo, 30)).length,
  purchases: purchases.filter((p) => within(p.daysAgo, 30)).length,
};

/** Six calendar months back from PERIOD_END, oldest first. */
export const monthly = (() => {
  const buckets: {
    key: string;
    label: string;
    payout: number;
    enquiries: number;
    purchases: number;
    pieces: number;
  }[] = [];
  for (let back = 5; back >= 0; back -= 1) {
    const d = new Date(PERIOD_END);
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() - back);
    buckets.push({
      key: `${d.getUTCFullYear()}-${d.getUTCMonth()}`,
      label: d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }),
      payout: 0,
      enquiries: 0,
      purchases: 0,
      pieces: 0,
    });
  }
  const keyOf = (daysAgo: number) => {
    const d = dateOf(daysAgo);
    return `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
  };
  for (const e of enquiries) {
    const b = buckets.find((x) => x.key === keyOf(e.daysAgo));
    if (b) b.enquiries += 1;
  }
  for (const p of purchases) {
    const b = buckets.find((x) => x.key === keyOf(p.daysAgo));
    if (b) {
      b.payout += p.payout;
      b.purchases += 1;
      b.pieces += p.pieces;
    }
  }
  return buckets;
})();

export const byChannel = CHANNELS.map((channel) => ({
  channel,
  count: enquiries.filter((e) => e.channel === channel).length,
  converted: enquiries.filter((e) => e.channel === channel && e.stage === "Purchased").length,
}));

export const byStage = STAGES.map((stage) => ({
  stage,
  count: enquiries.filter((e) => e.stage === stage).length,
}));

export const byBranch = branches
  .map((b) => {
    const mine = purchases.filter((p) => p.branchSlug === b.slug);
    const leads = enquiries.filter((e) => e.branchSlug === b.slug);
    return {
      slug: b.slug,
      city: b.city,
      badge: b.badge,
      isHeadOffice: Boolean(b.isHeadOffice),
      pickupOnly: Boolean(b.pickupOnly),
      areas: b.areas.length,
      street: b.lines[0],
      enquiries: leads.length,
      purchases: mine.length,
      payout: mine.reduce((s, p) => s + p.payout, 0),
      pieces: mine.reduce((s, p) => s + p.pieces, 0),
      /* Open enquiries are the only number on a branch card that asks
         anyone to do something, so it is the one the card leads with. */
      open: leads.filter((e) => e.stage !== "Purchased" && e.stage !== "Did not proceed")
        .length,
    };
  })
  .sort((a, b) => b.payout - a.payout);

/* ------------------------------------------------------------------ */
/* The rate card                                                       */
/* ------------------------------------------------------------------ */

/** Indicative buying rates. Invented, like everything else here, but keyed
 *  to the saree types the public site actually lists so the two halves of
 *  the project describe the same trade. */
export const rateCard = sareeTypes.slice(0, 7).map((t, i) => {
  const r = rng(900 + i);
  const lo = Math.round(between(r, 1.8, 2.6) * 100) / 100;
  return {
    slug: t.slug,
    name: t.name,
    ta: t.ta,
    silkLow: lo,
    silkHigh: Math.round((lo + between(r, 0.6, 1.4)) * 100) / 100,
    zariRate: Math.round(between(r, 32, 62)),
    demand: (["Steady", "High", "Very high", "Seasonal"] as const)[
      Math.floor(r() * 4)
    ],
    movedPct: Math.round(between(r, -6, 14)),
  };
});

export const priceFactors = priceLedger;

/**
 * Page content compiled from the trade: what we buy, services, process and FAQ.
 * Kept out of the components so copy can be edited without touching markup.
 */

/**
 * Resolves a photo id to its self-hosted file in `public/img`.
 *
 * Photography is Pexels-licensed: free for commercial use, modification
 * allowed, no attribution required. https://www.pexels.com/license/
 *
 * The files are served from this repo rather than hot-linked, so the site has
 * no runtime dependency on an external CDN and next/image can optimise them
 * locally. Swap them for real shop photographs when you have them.
 */
/**
 * next/image with `unoptimized` emits `src` verbatim, basePath is only applied
 * to the /_next/image optimiser URL, which a static export does not have. So
 * the prefix has to be baked in here or every image 404s on GitHub Pages.
 * Empty locally, "/pattu-center" in the Pages build. Must match basePath in
 * next.config.ts, both read this one variable so they cannot drift.
 */
const RAW_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const BASE_PATH = RAW_BASE === "/" ? "" : RAW_BASE.replace(/\/+$/, "");

export const img = (id: number) => `${BASE_PATH}/img/silk-${id}.jpg`;

/** Brand marks. `logoMark` is the emblem alone, the wordmark in the full
 *  lockup is illegible below about 120px, so small placements use the mark. */
export const logoMark = `${BASE_PATH}/img/logo-mark.png`;
export const logoFull = `${BASE_PATH}/img/logo.png`;

export type SareeType = {
  slug: string;
  name: string;
  ta?: string;
  blurb: string;
  imageId: number;
  alt: string;
};

export const sareeTypes: SareeType[] = [
  {
    slug: "kanchipuram",
    name: "Kanchipuram Silk Sarees",
    ta: "காஞ்சிபுரம் பட்டு புடவை",
    blurb:
      "Pure mulberry silk with heavy contrast borders. Wedding sarees, temple sarees and everyday pattu of any age or condition.",
    imageId: 10317113,
    alt: "Close-up of a Kanchipuram silk saree showing its woven gold zari border and paisley motifs",
  },
  {
    slug: "mysore-silk",
    name: "Mysore Silk Sarees",
    ta: "மைசூர் பட்டு புடவை",
    blurb:
      "Crepe and pure Mysore silk with genuine gold zari borders, valued on both silk weight and metal content.",
    imageId: 6167463,
    alt: "Teal silk saree with intricate golden paisley brocade, folded on a woven tray",
  },
  {
    slug: "banarasi",
    name: "Banarasi & Tissue Silk",
    ta: "பனாரஸ் மற்றும் டிஷ்யூ பட்டு",
    blurb:
      "Banarasi brocade, tissue sarees and dense zari work. The heavier the weave, the better the price we can offer.",
    imageId: 20181020,
    alt: "Close-up of gold and silver brocade fabric showing dense woven patterning",
  },
  {
    slug: "pattu-vetti",
    name: "Silk Vetti & Angavastram",
    ta: "பட்டு வேட்டி & அங்கவஸ்திரம்",
    blurb:
      "Men's silk dhotis, panchakacham, shoulder cloths and zari-bordered angavastram, bought by the pair or singly.",
    imageId: 5439054,
    alt: "Red and black silk with gold patterning and a contrasting woven border",
  },
  {
    slug: "ravikai",
    name: "Ravikai, Blouse & Pavadai",
    ta: "ரவிக்கை & பட்டு பாவாடை",
    blurb:
      "Silk blouse bits, pattu pavadai, cut pieces and leftover border strips. Even small quantities are weighed and paid for.",
    imageId: 8886933,
    alt: "Hands holding a finely embroidered red silk piece",
  },
  {
    slug: "zari",
    name: "Zari, Borders & Damaged Silk",
    ta: "ஜரிகை & பழுதான பட்டு",
    blurb:
      "Loose zari, cut borders, pallu panels and sarees that are torn or moth eaten. Silver-gilt thread holds value even when the saree does not.",
    imageId: 37892693,
    alt: "Detail of fine golden threads stretched across a weaving loom",
  },
  {
    slug: "nine-yard",
    name: "Nine Yard & Koorai Sarees",
    ta: "ஒன்பது கஜ புடவை",
    blurb:
      "Traditional madisar, koorai and nine-yard wedding sarees, often the heaviest silk and zari a household owns.",
    imageId: 33433875,
    alt: "Long silk sarees laid out to dry on the ghats at Varanasi",
  },
  {
    slug: "regional-silks",
    name: "Arani, Thirubuvanam & Venkatagiri",
    ta: "ஆரணி & திருபுவனம் பட்டு",
    blurb:
      "Arani, Thirubuvanam, Dharmapuram, Gadwal and Venkatagiri weaves. Every regional silk tradition is accepted.",
    imageId: 18728089,
    alt: "Traditional Indian textiles stacked and displayed at a fabric shop",
  },
  {
    slug: "silver",
    name: "Silver Items & Brass",
    ta: "வெள்ளி பொருட்கள்",
    blurb:
      "Old silver articles, lamps and brass bought alongside your sarees at the day's metal rate.",
    imageId: 33322987,
    alt: "Traditional brass vessels and a tall oil lamp arranged with banana leaves",
  },
];

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: "outright-purchase",
    title: "Outright Purchase",
    blurb:
      "We buy your sarees outright at a price agreed before anything changes hands. No consignment, no waiting for a resale.",
    icon: "wallet",
  },
  {
    slug: "doorstep-pickup",
    title: "Free Doorstep Pickup",
    blurb:
      "Ten sarees or more and we come to you. No travel charge, no pickup fee, and no obligation to sell once we arrive.",
    icon: "truck",
  },
  {
    slug: "instant-cash",
    title: "Instant Cash Payment",
    blurb:
      "Agree the price and you are paid on the spot: cash in hand, UPI or a bank transfer, whichever suits you.",
    icon: "rupee",
  },
  {
    slug: "saree-exchange",
    title: "Saree Exchange",
    blurb:
      "Prefer new silk to cash? Put the full valuation of your old sarees towards a fresh pattu saree instead.",
    icon: "exchange",
  },
  {
    slug: "zari-melting",
    title: "Zari Melting & Silver Recovery",
    blurb:
      "Heavy zari borders can be melted and the silver recovered. We handle the process and pay you the metal value.",
    icon: "flame",
  },
  {
    slug: "whatsapp-valuation",
    title: "Free WhatsApp Valuation",
    blurb:
      "Send photos of the saree spread out plus a close-up of the border. We reply with an indicative range before you travel.",
    icon: "whatsapp",
  },
];

export const whyChooseUs = [
  {
    title: "Fair & transparent pricing",
    blurb:
      "You see the scale, the zari test and the arithmetic. The number is explained, never simply announced.",
  },
  {
    title: "Instant cash payment",
    blurb:
      "No advances, no part payments, no coming back next week. You are paid in full the moment you agree.",
  },
  {
    title: "Any condition accepted",
    blurb:
      "Torn, faded, stained or moth eaten. Condition affects the price, never whether we will buy it.",
  },
  {
    title: "Respectful handling",
    blurb:
      "Wedding and temple sarees carry memories. They are unfolded, examined and refolded with care.",
  },
  {
    title: "Women-friendly team",
    blurb:
      "Most of our customers are women selling family silk. Our staff are trained to make that comfortable.",
  },
  {
    title: "Branches across Tamil Nadu",
    blurb:
      "Madurai, Thoothukudi, Thanjavur, Villupuram, Tiruppur and Coimbatore, with collection runs in between.",
  },
];

export const processSteps = [
  {
    title: "Contact us",
    blurb:
      "Call or WhatsApp photos of your sarees. We reply with an indicative range and fix a time that suits you.",
  },
  {
    title: "Inspection",
    blurb:
      "Visit any branch, or we arrive at your door. Each piece is weighed openly and the zari sampled without damage.",
  },
  {
    title: "Instant quotation",
    blurb:
      "You get one clear figure, with an explanation of how silk weight, zari content and condition produced it.",
  },
  {
    title: "On-the-spot cash",
    blurb:
      "Agree and you are paid immediately: cash, UPI or transfer. Walk away at any point if it doesn't suit you.",
  },
];

export const faqs = [
  {
    q: "How do you decide what my saree is worth?",
    a: "Four things: the weight of the silk, its purity, how much zari is woven into the border and pallu, and the overall condition. We weigh each piece on a calibrated scale in front of you and sample the zari without damaging the saree, then explain how those figures produced the price.",
  },
  {
    q: "Which types of sarees do you buy?",
    a: "Kanchipuram, Mysore, Banarasi, tissue, Arani, Thirubuvanam, Dharmapuram and Venkatagiri silks, plus nine-yard and koorai sarees, silk vetti and angavastram, ravikai and blouse pieces, pattu pavadai, and loose zari or cut borders. If it contains real silk or real zari, we will look at it.",
  },
  {
    q: "Will you buy torn, stained or damaged sarees?",
    a: "Yes. Water stains, moth holes and tears reduce the price but never disqualify a saree. The silk and the zari retain value even when the saree can no longer be worn, so please don't throw anything away before showing it to us.",
  },
  {
    q: "Is doorstep pickup really free?",
    a: "Yes, and there is no minimum. We will come for even one or two sarees, anywhere we operate. There is no travel charge and no obligation to sell; if our price doesn't suit you we leave, and nothing is owed.",
  },
  {
    q: "Can I exchange my old sarees instead of selling them?",
    a: "Yes. The full valuation of your old silk can be put towards a new pattu saree rather than taken as cash. Tell us at the time of valuation and we will show you what is available against that amount.",
  },
  {
    q: "How quickly do I get paid?",
    a: "Immediately. As soon as you accept the price you are paid in full: cash in hand, UPI or a bank transfer. We do not take goods on consignment or pay in instalments.",
  },
  {
    q: "Can I get a price without visiting a branch?",
    a: "Send photos on WhatsApp: the saree spread out fully, plus a close-up of the border and pallu. We reply with an indicative range. The final figure is confirmed once the saree has been weighed in person.",
  },
  {
    q: "What is zari melting?",
    a: "Older sarees often use real silver-gilt zari. Where a border carries enough of it, the thread can be melted and the silver recovered. We handle that process and pay you the metal value, which is frequently more than the saree would fetch whole.",
  },
  {
    q: "Do you buy silver items as well?",
    a: "Yes. Old silver articles, lamps and brass are bought alongside your sarees at the day's metal rate. Bring them along on the same visit.",
  },
];

export const galleryImages: { id: number; alt: string }[] = [
  { id: 33433875, alt: "Long silk sarees laid out to dry on the ghats at Varanasi" },
  { id: 17777833, alt: "A weaver working silk on a traditional loom in Varanasi" },
  { id: 14695808, alt: "An artisan weaving vibrant silk threads on a handloom" },
  { id: 6876952,  alt: "Golden silk threads drying beside a traditional spinning wheel" },
  { id: 32655889, alt: "Close-up of a weaving loom strung with fine threads" },
  { id: 18728089, alt: "Traditional Indian textiles stacked and displayed at a fabric shop" },
  { id: 29389864, alt: "Colourful textile stalls in a busy Indian market" },
  { id: 37892693, alt: "Detail of fine golden threads stretched across a weaving loom" },
  { id: 10317113, alt: "Close-up of a Kanchipuram silk saree showing its gold zari border" },
];

/** Placeholder reviews, replace with real customer feedback before launch. */
export const testimonials = [
  {
    quote:
      "They weighed every saree in front of me and explained why the older ones fetched more. I had been quoted half that elsewhere.",
    name: "Lakshmi R.",
    city: "Madurai",
  },
  {
    quote:
      "My mother's wedding sarees had been in a trunk for thirty years. I sent photos at night and they called back the next morning.",
    name: "Saravanan K.",
    city: "Thanjavur",
  },
  {
    quote:
      "Two of the sarees were badly torn and I assumed they were worthless. They still paid a fair amount for the zari alone.",
    name: "Meena V.",
    city: "Coimbatore",
  },
];

/* ------------------------------------------------------------------ */
/* Roadmap, the customer's journey, start to payment                  */
/* ------------------------------------------------------------------ */

export const roadmap = [
  {
    stop: "Send photos",
    when: "Day one, any hour",
    blurb:
      "WhatsApp pictures of each saree spread out, plus a close-up of the border. We reply with an indicative range. No visit needed yet.",
  },
  {
    stop: "Pick how we meet",
    when: "You choose",
    blurb:
      "Walk into any of our branches, or ask for a free home visit. We come for even one or two sarees. We work around your timing.",
  },
  {
    stop: "Open weighing",
    when: "About 10 minutes",
    blurb:
      "Each piece goes on a calibrated scale in front of you. Nothing is taken to a back room, and nothing is weighed out of your sight.",
  },
  {
    stop: "Zari tested",
    when: "Same visit",
    blurb:
      "We sample the border thread to check whether the zari is real silver-gilt. The test takes a moment and does not damage the saree.",
  },
  {
    stop: "One clear price",
    when: "Before you decide",
    blurb:
      "You get a single figure with the arithmetic behind it: silk weight, purity, zari and condition. Questions answered before anything is agreed.",
  },
  {
    stop: "Paid on the spot",
    when: "Immediately",
    blurb:
      "Accept and you are paid in full: cash, UPI or bank transfer. Decline and you take your sarees home. Nothing is owed either way.",
  },
];

/* ------------------------------------------------------------------ */
/* How the number is reached, ledger of what moves the price          */
/* ------------------------------------------------------------------ */

export const priceLedger = [
  {
    factor: "Silk weight",
    detail: "The base of every valuation.",
    raises: "Heavy, densely woven sarees; nine-yard and koorai pieces",
    lowers: "Light crepe, blended or art silk",
  },
  {
    factor: "Zari content",
    detail: "Priced separately from the cloth.",
    raises: "Wide borders, heavy pallu work, real silver-gilt thread",
    lowers: "Thin borders, modern plastic or tested-metal zari",
  },
  {
    factor: "Silk purity",
    detail: "Checked by feel, burn test and weave.",
    raises: "Pure mulberry silk, traditional handloom weaves",
    lowers: "Power-loom blends, mixed cotton-silk",
  },
  {
    factor: "Condition",
    detail: "Adjusts the figure, never disqualifies.",
    raises: "Clean, unfaded sarees stored folded in cotton",
    lowers: "Water stains, moth holes, cuts through the border",
  },
];

/* ------------------------------------------------------------------ */
/* Before you sell, practical do's and don'ts                         */
/* ------------------------------------------------------------------ */

export const sellingTips = {
  dos: [
    "Photograph each saree spread out flat in daylight.",
    "Include one close-up of the border and pallu. That is where the zari is.",
    "Keep sarees of the same type stacked together to speed up weighing.",
    "Set loose zari, cut borders and blouse bits aside; they are weighed separately.",
    "Bring silver articles and brass along for valuation on the same visit.",
  ],
  donts: [
    "Don't throw away torn or moth-eaten sarees. The zari still holds value.",
    "Don't cut the border off before bringing it in; it is worth more attached.",
    "Don't wash or dry-clean old silk first. It can weaken the thread.",
    "Don't accept a price that hasn't been explained to you, from anyone.",
    "Don't hand over sarees before a figure has been agreed in writing or in person.",
  ],
};

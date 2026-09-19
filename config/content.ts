/**
 * Page content compiled from the trade: what we buy, services, process and FAQ.
 * Kept out of the components so copy can be edited without touching markup.
 */

export type SareeType = {
  slug: string;
  name: string;
  ta?: string;
  blurb: string;
  image: string;
  alt: string;
};

export const sareeTypes: SareeType[] = [
  {
    slug: "kanchipuram",
    name: "Kanchipuram Silk Sarees",
    ta: "காஞ்சிபுரம் பட்டு புடவை",
    blurb:
      "Pure mulberry silk with heavy contrast borders. Wedding sarees, temple sarees and everyday pattu of any age or condition.",
    image: "https://images.unsplash.com/photo-1612744192242-35cd7a7d35e6",
    alt: "Rich red silk fabric folded over white cloth",
  },
  {
    slug: "mysore-silk",
    name: "Mysore Silk Sarees",
    ta: "மைசூர் பட்டு புடவை",
    blurb:
      "Crepe and pure Mysore silk with genuine gold zari borders, valued on both silk weight and metal content.",
    image: "https://images.unsplash.com/photo-1676696706907-0e04665b80bd",
    alt: "Close-up of teal coloured silk fabric",
  },
  {
    slug: "banarasi",
    name: "Banarasi & Tissue Silk",
    ta: "பனாரஸ் மற்றும் டிஷ்யூ பட்டு",
    blurb:
      "Banarasi brocade, tissue sarees and dense zari work. The heavier the weave, the better the price we can offer.",
    image: "https://images.unsplash.com/photo-1588140686379-1b76a52103dc",
    alt: "Red, white and blue woven textile with fine detail",
  },
  {
    slug: "pattu-vetti",
    name: "Silk Vetti & Angavastram",
    ta: "பட்டு வேட்டி & அங்கவஸ்திரம்",
    blurb:
      "Men's silk dhotis, panchakacham, shoulder cloths and zari-bordered angavastram, bought by the pair or singly.",
    image: "https://images.unsplash.com/photo-1606259457945-67dc66271ee6",
    alt: "Soft folds of cream coloured satin silk",
  },
  {
    slug: "ravikai",
    name: "Ravikai, Blouse & Pavadai",
    ta: "ரவிக்கை & பட்டு பாவாடை",
    blurb:
      "Silk blouse bits, pattu pavadai, cut pieces and leftover border strips. Even small quantities are weighed and paid for.",
    image: "https://images.unsplash.com/photo-1617055407123-3d7130c1f940",
    alt: "Pink silk textile photographed close up",
  },
  {
    slug: "zari",
    name: "Zari, Borders & Damaged Silk",
    ta: "ஜரிகை & பழுதான பட்டு",
    blurb:
      "Loose zari, cut borders, pallu panels and sarees that are torn or moth eaten. Silver-gilt thread holds value even when the saree does not.",
    image: "https://images.unsplash.com/photo-1618434958571-459c9c972ae8",
    alt: "Rich brown and gold textile in close up",
  },
  {
    slug: "nine-yard",
    name: "Nine Yard & Koorai Sarees",
    ta: "ஒன்பது கஜ புடவை",
    blurb:
      "Traditional madisar, koorai and nine-yard wedding sarees — often the heaviest silk and zari a household owns.",
    image: "https://images.unsplash.com/photo-1779470703519-05af825e87cd",
    alt: "Colourful patterned textiles and shawls stacked together",
  },
  {
    slug: "regional-silks",
    name: "Arani, Thirubuvanam & Venkatagiri",
    ta: "ஆரணி & திருபுவனம் பட்டு",
    blurb:
      "Arani, Thirubuvanam, Dharmapuram, Gadwal and Venkatagiri weaves — every regional silk tradition is accepted.",
    image: "https://images.unsplash.com/photo-1619043599439-9b750b7b2623",
    alt: "Pink silk resting on white silk",
  },
  {
    slug: "silver",
    name: "Silver Items & Brass",
    ta: "வெள்ளி பொருட்கள்",
    blurb:
      "Old silver articles, lamps and brass bought alongside your sarees at the day's metal rate.",
    image: "https://images.unsplash.com/photo-1773847099342-33b0381cbe0d",
    alt: "Close-up of golden metallic threads on a loom",
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
      "Agree the price and you are paid on the spot — cash in hand, UPI or a bank transfer, whichever suits you.",
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
      "Torn, faded, stained or moth eaten — condition affects the price, never whether we will buy it.",
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
    title: "Seven branches",
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
      "Agree and you are paid immediately — cash, UPI or transfer. Walk away at any point if it doesn't suit you.",
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
    a: "It is free for collections of ten sarees or more, anywhere we operate. There is no travel charge and no obligation to sell — if our price doesn't suit you we leave, and nothing is owed.",
  },
  {
    q: "Can I exchange my old sarees instead of selling them?",
    a: "Yes. The full valuation of your old silk can be put towards a new pattu saree rather than taken as cash. Tell us at the time of valuation and we will show you what is available against that amount.",
  },
  {
    q: "How quickly do I get paid?",
    a: "Immediately. As soon as you accept the price you are paid in full — cash in hand, UPI or a bank transfer. We do not take goods on consignment or pay in instalments.",
  },
  {
    q: "Can I get a price without visiting a branch?",
    a: "Send photos on WhatsApp — the saree spread out fully, plus a close-up of the border and pallu. We reply with an indicative range. The final figure is confirmed once the saree has been weighed in person.",
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

export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc", alt: "A pile of folded cloths on a table" },
  { src: "https://images.unsplash.com/photo-1779470703519-05af825e87cd", alt: "Colourful patterned textiles stacked for sale" },
  { src: "https://images.unsplash.com/photo-1619043518800-7f14be467dca", alt: "Soft folds of lustrous white silk fabric" },
  { src: "https://images.unsplash.com/photo-1606941060060-3d317be9947c", alt: "Vivid royal blue silk with a lustrous sheen" },
  { src: "https://images.unsplash.com/photo-1759738099669-d64b0656f6cf", alt: "Weavers working fabric on a traditional loom" },
  { src: "https://images.unsplash.com/photo-1775669954897-8ed90ca9f0fa", alt: "Bundled scraps of fabric tied together" },
  { src: "https://images.unsplash.com/photo-1786871204247-60f342ae81a8", alt: "A wooden handloom strung with coloured silk" },
  { src: "https://images.unsplash.com/photo-1773847099342-33b0381cbe0d", alt: "Close-up of golden zari threads on a loom" },
  { src: "https://images.unsplash.com/photo-1612744234160-9ff642a02d19", alt: "Black silk resting on deep blue silk" },
];

/** Placeholder reviews — replace with real customer feedback before launch. */
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

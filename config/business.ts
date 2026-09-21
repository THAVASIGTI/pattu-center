/**
 * Single source of truth for every piece of business data on the site.
 * Change the name, a phone number or a branch here and it updates everywhere,
 * including page metadata and structured data.
 */

export const business = {
  name: "Silver Zari",
  shortName: "Silver Zari",
  legalName: "Silver Zari",
  tagline: "உங்கள் பழைய பட்டுக்கு அதிக விலை பெறுங்கள்",
  taglineEn: "Get a higher price for your old silk",
  // Run as a partnership by two brothers.
  owners: ["M. Rasukutti", "M. Sarathkumar"],
  ownersLabel: "M. Rasukutti & M. Sarathkumar",
  foundedText: "40 years in silk",
  foundedTextTa: "40 ஆண்டு அனுபவம்",
  // Drives canonical URLs and Open Graph. Currently the GitHub Pages address
  // this deploys to, change it (and basePath in next.config.ts) when a real
  // domain is pointed at the site.
  siteUrl: "https://thavasigti.github.io/pattu-center",

  phones: [
    { label: "+91 85955 20856", href: "tel:+918595520856", raw: "8595520856" },
    { label: "+91 76390 58648", href: "tel:+917639058648", raw: "7639058648" },
  ],

  whatsapp: [
    { label: "+91 85955 20856", raw: "918595520856" },
    { label: "+91 76390 58648", raw: "917639058648" },
  ],

  email: "srichenu84@gmail.com",
  hours: "Open all days, 10:00 am to 8:00 pm",
  /** Rendered as a table on each branch page. */
  hoursTable: [
    { day: "Monday", open: "10:00 am to 8:00 pm" },
    { day: "Tuesday", open: "10:00 am to 8:00 pm" },
    { day: "Wednesday", open: "10:00 am to 8:00 pm" },
    { day: "Thursday", open: "10:00 am to 8:00 pm" },
    { day: "Friday", open: "10:00 am to 8:00 pm" },
    { day: "Saturday", open: "10:00 am to 8:00 pm" },
    { day: "Sunday", open: "10:00 am to 8:00 pm" },
  ],

  // Share-link tracking parameters (?si=, ?stkn=) were stripped: both forms
  // resolve identically, and stkn is a session-scoped share token that does
  // not belong in a public page.
  social: {
    youtube: "https://youtube.com/@sarathm4337",
    instagram: "https://www.instagram.com/sri_kamatchi_pattucenter_",
    facebook: "https://www.facebook.com/share/1DzkEuUH2B/",
  },
} as const;

/** Default prefilled WhatsApp message. */
export function waLink(message = "Hello, I want to sell my old silk sarees.") {
  return `https://wa.me/${business.whatsapp[0].raw}?text=${encodeURIComponent(message)}`;
}

/* ------------------------------------------------------------------ */
/* Branches                                                            */
/* ------------------------------------------------------------------ */

export type Branch = {
  slug: string;
  city: string;
  title: string;
  isHeadOffice?: boolean;
  /** Used where branches are listed by name and two share a city. */
  shortLabel?: string;
  /** Short chip shown on branch cards to tell same-city counters apart. */
  badge?: string;
  lines: string[];
  /** "lat,lng" from the shop's own Google Maps pin. Preferred over mapQuery,
   *  which only searches for a nearby landmark. */
  coords?: string;
  mapQuery: string;
  phoneIndex: number;
  intro: string;
  areas: string[];
};

export const branches: Branch[] = [
  {
    slug: "madurai",
    city: "Madurai",
    title: "Madurai Head Office",
    isHeadOffice: true,
    lines: [
      "Near The Chennai Silks",
      "No. 37, Merku Perumal Mesthri Street",
      "Madurai",
    ],
    coords: "9.9206465,78.1125167",
    mapQuery: "Merku+Perumal+Mesthri+Street+Near+The+Chennai+Silks+Madurai",
    phoneIndex: 0,
    intro:
      "Our head office sits on Merku Perumal Mesthri Street, a short walk from The Chennai Silks. Every valuation, weighing scale and zari test the other branches use is set from here.",
    areas: [
      "Madurai Main", "Mela Masi Street", "Simmakkal", "Goripalayam", "Anna Nagar",
      "K.K. Nagar", "Villapuram", "Thirunagar", "Tallakulam", "Sellur",
      "Avaniyapuram", "Othakadai", "Vilangudi", "Samayanallur", "Usilampatti",
    ],
  },
  {
    slug: "thoothukudi",
    city: "Thoothukudi",
    title: "Thoothukudi Branch 1, Shivan Kovil Street",
    shortLabel: "Thoothukudi Branch 1",
    badge: "Branch 1",
    lines: ["Shivan Kovil Street", "EP Kavitha Marriage Hall", "Thoothukudi"],
    coords: "8.80611409,78.14765511",
    mapQuery: "Shivan+Kovil+Street+EP+Kavitha+Marriage+Hall+Thoothukudi",
    phoneIndex: 0,
    intro:
      "Our first Thoothukudi counter, on Shivan Kovil Street beside EP Kavitha Marriage Hall. Walk in with your sarees or call ahead and we will collect them from your home.",
    areas: [
      "Old Bus Stand", "Millerpuram", "Bryant Nagar", "Palayamkottai Road",
      "Thalamuthu Nagar", "Muthiahpuram", "Sri Vaikundam", "Kovilpatti",
      "Tiruchendur", "Ettayapuram",
    ],
  },
  {
    slug: "thoothukudi-jn-pattu-mahal",
    city: "Thoothukudi",
    title: "Thoothukudi Branch 2, near JN Pattu Mahal",
    shortLabel: "Thoothukudi Branch 2",
    badge: "Branch 2",
    lines: ["Chinnathurai & Co", "Near JN Pattu Mahal", "Thoothukudi"],
    coords: "8.801034,78.1359863",
    mapQuery: "JN+Pattu+Mahal+Thoothukudi",
    phoneIndex: 1,
    intro:
      "Our second Thoothukudi counter at Chinnathurai & Co, next to JN Pattu Mahal. Convenient if you are already in the market area.",
    areas: [
      "JN Pattu Mahal", "Old Bus Stand", "New Bus Stand", "Harbour Road",
      "Thermal Nagar", "Pudukottai Road", "Korampallam", "Mappillaiyurani",
    ],
  },
  {
    slug: "thanjavur",
    city: "Thanjavur",
    title: "Thanjavur Branch 1, South Street",
    shortLabel: "Thanjavur Branch 1",
    badge: "Branch 1",
    lines: [
      "Opposite Reliance Digital",
      "Ramasamy Bhakther Marriage Hall",
      "South Street",
      "Thanjavur",
    ],
    coords: "10.788726,79.135291",
    mapQuery: "South+Street+Ramasamy+Bhakther+Marriage+Hall+Opposite+Reliance+Digital+Thanjavur",
    phoneIndex: 0,
    intro:
      "Thanjavur households hold some of the oldest silk in the state: temple sarees and nine-yard pattu passed down for generations. We are opposite Reliance Digital at Ramasamy Bhakther Marriage Hall.",
    areas: [
      "Thanjavur Town", "Big Temple area", "Medical College Road", "Karanthai",
      "Vilar Road", "Nanjikottai Road", "Kumbakonam", "Thiruvaiyaru",
      "Papanasam", "Orathanadu",
    ],
  },
  {
    slug: "thanjavur-mela-veedhi",
    city: "Thanjavur",
    title: "Thanjavur Branch 2, Mela Veedhi",
    shortLabel: "Thanjavur Branch 2",
    badge: "Branch 2",
    lines: [
      "Opposite Thaeradi",
      "Near Micle Tea Shop",
      "Mela Veedhi",
      "Thanjavur",
    ],
    coords: "10.7877122,79.1312847",
    mapQuery: "Mela+Veedhi+Thaeradi+Thanjavur",
    phoneIndex: 1,
    intro:
      "Our second Thanjavur counter on Mela Veedhi, opposite Thaeradi and beside Micle Tea Shop. Handy if you are already near the temple end of town.",
    areas: [
      "Mela Veedhi", "Thaeradi", "Big Temple area", "South Street",
      "Karanthai", "Vilar Road", "Nanjikottai Road", "Kumbakonam",
      "Thiruvaiyaru", "Papanasam",
    ],
  },
  {
    slug: "villupuram",
    city: "Villupuram",
    title: "Villupuram",
    lines: ["Near Veeravaliyamman Kovil", "Opposite SBI Bank", "Villupuram"],
    coords: "11.9408393,79.4927494",
    mapQuery: "Veeravaliyamman+Kovil+Opposite+SBI+Bank+Villupuram",
    phoneIndex: 1,
    intro:
      "Find us near Veeravaliyamman Kovil, directly opposite the SBI branch. Free home collection across Villupuram district, even for one or two sarees.",
    areas: [
      "Villupuram Town", "Kakkan Nagar", "Vikravandi", "Tindivanam",
      "Gingee", "Ulundurpet", "Kandachipuram", "Mailam",
    ],
  },
  {
    slug: "tiruppur",
    city: "Tiruppur",
    title: "Tiruppur",
    lines: ["Opposite Tiruppur Thirupathi Kovil", "Tiruppur"],
    // Recovered from the plus code 486X+597 in the supplied maps link, which
    // carried no @lat,lng. Re-encoding these coordinates reproduces that code.
    // Worth confirming against the shop's own pin.
    coords: "11.110377,77.348377",
    mapQuery: "Tiruppur+Tirupathi+Sri+Venkatesa+Perumal+Temple+Uthukuli+Road+Valipalayam+Tiruppur",
    phoneIndex: 0,
    intro:
      "Our Tiruppur counter sits opposite Thirupathi Kovil. Bring your sarees in, or send photos on WhatsApp first and we will give you an indicative price before you travel.",
    areas: [
      "Tiruppur Town", "Kumaran Road", "Palladam Road", "Avinashi Road",
      "Kangeyam", "Palladam", "Avinashi", "Dharapuram", "Udumalaipettai",
    ],
  },
  {
    slug: "coimbatore",
    city: "Coimbatore",
    title: "Coimbatore (Covai)",
    lines: [
      "Near Iyyapan Kovil",
      "GP Signal, Sidhapudhur",
      "Gandhipuram, Coimbatore",
    ],
    coords: "11.02091316,76.97286452",
    mapQuery: "Iyyapan+Kovil+GP+Signal+Sidhapudhur+Gandhipuram+Coimbatore",
    phoneIndex: 1,
    intro:
      "In Gandhipuram near Iyyapan Kovil at GP Signal, Sidhapudhur. Coimbatore is our busiest collection route. We run doorstep pickups across the city most days of the week.",
    areas: [
      "Gandhipuram", "Sidhapudhur", "R.S. Puram", "Peelamedu", "Saibaba Colony",
      "Ganapathy", "Singanallur", "Ukkadam", "Vadavalli", "Kuniamuthur",
      "Pollachi", "Mettupalayam",
    ],
  },
];

/** Exact pin where we have one, otherwise a landmark search. */
export const mapTarget = (b: Branch) => b.coords ?? b.mapQuery;

/** Embedded map for a branch page. */
export const mapEmbedUrl = (b: Branch) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(mapTarget(b))}&z=17&hl=en&output=embed`;

/** "Directions" link that opens Google Maps proper. */
export const mapLinkUrl = (b: Branch) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapTarget(b))}`;

export const branchBySlug = (slug: string) => branches.find((b) => b.slug === slug);

/** Derived from the list above so prose cannot drift when a branch is added. */
const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten", "eleven", "twelve",
];
/** One branch per city, keeping the first listed, which is the head office or
 *  branch 1. Used where a plain list of places reads better than every
 *  counter, such as the footer. */
export const branchCities = branches.filter(
  (b, i) => branches.findIndex((o) => o.city === b.city) === i,
);

export const branchCount = branches.length;
export const branchCountWord = NUMBER_WORDS[branchCount] ?? String(branchCount);
export const branchCountWordCap =
  branchCountWord.charAt(0).toUpperCase() + branchCountWord.slice(1);

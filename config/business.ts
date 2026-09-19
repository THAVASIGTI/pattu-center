/**
 * Single source of truth for every piece of business data on the site.
 * Change the name, a phone number or a branch here and it updates everywhere,
 * including page metadata and structured data.
 */

export const business = {
  name: "Sri Kamatchi Pattu Center",
  shortName: "Sri Kamatchi",
  initials: "SK",
  legalName: "Sri Kamatchi Pattu Center",
  tagline: "பழைய பட்டு வீணாகாது",
  taglineEn: "Old silk should never go to waste",
  owner: "M. Sarathkumar",
  foundedText: "Four decades in the silk trade",
  siteUrl: "https://www.srikamatchipattucenter.in",

  phones: [
    { label: "+91 85955 20856", href: "tel:+918595520856", raw: "8595520856" },
    { label: "+91 76390 58648", href: "tel:+917639058648", raw: "7639058648" },
  ],

  whatsapp: [
    { label: "+91 85955 20856", raw: "918595520856" },
    { label: "+91 76390 58648", raw: "917639058648" },
  ],

  email: "srichenu84@gmail.com",
  hours: "Monday to Saturday, 9:30 am – 8:30 pm",

  social: {
    youtube: "https://www.youtube.com/@Srikamatchipattucenter",
    instagram: "https://www.instagram.com/sri_kamatchi_pattu_center",
    facebook: "https://www.facebook.com/oldpattusareesbuyer9787070503",
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
  lines: string[];
  mapQuery: string;
  phoneIndex: number;
  intro: string;
  areas: string[];
};

export const branches: Branch[] = [
  {
    slug: "madurai",
    city: "Madurai",
    title: "Madurai — Head Office",
    isHeadOffice: true,
    lines: [
      "Near The Chennai Silks",
      "No. 37, Merku Perumal Mesthri Street",
      "Madurai",
    ],
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
    title: "Thoothukudi — Shivan Kovil Street",
    lines: ["Shivan Kovil Street", "EP Kavitha Marriage Hall", "Thoothukudi"],
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
    title: "Thoothukudi — Branch 2, near JN Pattu Mahal",
    lines: ["Chinnathurai & Co", "Near JN Pattu Mahal", "Thoothukudi"],
    mapQuery: "JN+Pattu+Mahal+Thoothukudi",
    phoneIndex: 1,
    intro:
      "Our second Thoothukudi counter at Chinnathurai & Co, next to JN Pattu Mahal — convenient if you are already in the market area.",
    areas: [
      "JN Pattu Mahal", "Old Bus Stand", "New Bus Stand", "Harbour Road",
      "Thermal Nagar", "Pudukottai Road", "Korampallam", "Mappillaiyurani",
    ],
  },
  {
    slug: "thanjavur",
    city: "Thanjavur",
    title: "Thanjavur",
    lines: [
      "Opposite Reliance Digital",
      "Ramasamy Bhakther Marriage Hall",
      "Thanjavur",
    ],
    mapQuery: "Ramasamy+Bhakther+Marriage+Hall+Opposite+Reliance+Digital+Thanjavur",
    phoneIndex: 0,
    intro:
      "Thanjavur households hold some of the oldest silk in the state — temple sarees and nine-yard pattu passed down for generations. We are opposite Reliance Digital at Ramasamy Bhakther Marriage Hall.",
    areas: [
      "Thanjavur Town", "Big Temple area", "Medical College Road", "Karanthai",
      "Vilar Road", "Nanjikottai Road", "Kumbakonam", "Thiruvaiyaru",
      "Papanasam", "Orathanadu",
    ],
  },
  {
    slug: "villupuram",
    city: "Villupuram",
    title: "Villupuram",
    lines: ["Near Veeravaliyamman Kovil", "Opposite SBI Bank", "Villupuram"],
    mapQuery: "Veeravaliyamman+Kovil+Opposite+SBI+Bank+Villupuram",
    phoneIndex: 1,
    intro:
      "Find us near Veeravaliyamman Kovil, directly opposite the SBI branch. Free home collection across Villupuram district for ten sarees or more.",
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
    mapQuery: "Thirupathi+Kovil+Tiruppur",
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
    mapQuery: "Iyyapan+Kovil+GP+Signal+Sidhapudhur+Gandhipuram+Coimbatore",
    phoneIndex: 1,
    intro:
      "In Gandhipuram near Iyyapan Kovil at GP Signal, Sidhapudhur. Coimbatore is our busiest collection route — we run doorstep pickups across the city most days of the week.",
    areas: [
      "Gandhipuram", "Sidhapudhur", "R.S. Puram", "Peelamedu", "Saibaba Colony",
      "Ganapathy", "Singanallur", "Ukkadam", "Vadavalli", "Kuniamuthur",
      "Pollachi", "Mettupalayam",
    ],
  },
];

export const branchBySlug = (slug: string) => branches.find((b) => b.slug === slug);

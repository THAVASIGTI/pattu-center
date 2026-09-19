# Old Silver Zari

Multi-page marketing site for an old silk / pattu saree buying business, built
with **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**.

Every menu item is a real route with its own URL, its own `<h1>` and its own
`<title>` — navigation loads a page, it never scroll-jumps to an anchor.

> **A note on the stack:** Next.js and Vite are alternatives, not a combination.
> Next.js ships its own bundler (Turbopack), so it cannot run on Vite. Next.js
> was chosen here because real per-URL pages and server-rendered metadata are
> exactly what this site needs for local SEO. If you'd rather have Vite, the
> equivalent stack is React + Vite + React Router, and the `config/`,
> `components/` and page content all port across nearly unchanged.

## Routes

| URL | Page |
|---|---|
| `/` | Home — hero slideshow, about, what we buy, services, process, roadmap, price ledger, do's & don'ts, why us, branches, reviews |
| `/about` | About us |
| `/what-we-buy` | Saree types and how value is decided |
| `/services` | Services and promises |
| `/how-it-works` | Four-step process, preparation tips |
| `/branches` | All branches + coverage |
| `/branches/[slug]` | One page per branch (7 of them) |
| `/gallery` | Gallery |
| `/faq` | FAQ (with `FAQPage` structured data) |
| `/contact` | Contact details + head-office map |

Branch slugs: `madurai`, `thoothukudi`, `thoothukudi-jn-pattu-mahal`,
`thanjavur`, `villupuram`, `tiruppur`, `coimbatore`.

All 19 pages are statically prerendered at build time.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Homepage sections

Each block is deliberately a different shape so the page doesn't read as one
long stack of cards:

| Section | Style |
|---|---|
| Hero | Bilingual copy, word-by-word heading animation, rotating Tamil/English promise line, auto-advancing slideshow |
| Trust strip | Four-up gradient band |
| About | Asymmetric image pair, large primary with an overlapping inset |
| What we buy | **Temple-arch cards** — semicircular arch tops, gold ring and shimmer sweep on hover, staggered scale-in |
| Services | Icon-and-text rows |
| How it works | **Staircase** — each step sits one tread lower than the last, sliding in from alternating sides |
| **Roadmap** | Vertical spine with numbered nodes; alternates left/right from `lg` up |
| **Price ledger** | **Balance scale** — factor on a central pivot, what raises it weighing out one side and what lowers it the other |
| **Do's & don'ts** | Two contrasting columns, green top rule vs yellow top rule |
| Why choose us | Icon cards |
| Branches | Address cards with an accent CTA tile |
| Reviews | Swipeable quote rail |

### Animation

`components/Reveal.tsx` wraps anything that should animate into view and takes
a `from` direction (`up`, `left`, `right`, `scale`, `arch`), a `delay` for
stagger and a `duration`. It uses one IntersectionObserver per element and
disconnects after firing.

`Section` sets `overflow-x-clip` so slide-in transforms and offset decorations
cannot widen the page — without it, a `from="right"` reveal adds its offset to
the document scroll width on narrow screens.

Reduced-motion users skip every entrance animation and the hero rotation,
handled in `app/globals.css` via `[data-reveal]`.

### The hero

Three moving parts, all in `app/page.tsx`:

- **`AnimatedHeading`** splits the headline into words and lifts them in one
  after another on mount. Pass `segments`; mark one `foil: true` to give it the
  shimmering gold gradient. The gradient is applied per word — `background-clip:
  text` does not reach through the `inline-block` wrappers from a parent.
- **`RotatingLines`** cycles a Tamil promise with its English translation every
  3.2s. Height is reserved for the tallest line so swapping never shifts the
  page. The lines are stacked, so the outgoing one fades out fully (220ms)
  before the incoming one starts — a plain crossfade showed both at once and
  the text collided.
- **`HeroSlider`** swaps four images, one per second.

**Slide speed:** `INTERVAL` at the top of `components/HeroSlider.tsx` is
`1000` (one second per image), with `FADE` at `620`. Images dissolve into one
another — there is no transform, so nothing drifts sideways, but the crossfade
is long enough to read as a smooth change rather than a cut. A foil progress
bar drains over each hold so the rhythm is visible. At this speed the captions
flash by; raise `INTERVAL` to around `3500` if you want them readable.

The slider pauses on hover and keyboard focus, and has dot controls. Reduced
motion disables the rotation, the heading animation and the line rotation.

### Bilingual copy

The hero carries Tamil and English together: a bilingual badge, the headline
with a Tamil restatement under it, the rotating promise line in both scripts,
bilingual slide captions and a bilingual footnote. Tamil strings live inline in
`app/page.tsx` and in the `slides` array.

> The Tamil copy was written during development and has **not** been reviewed
> by a native speaker. Have someone check it before the site goes live.

The image column sits on the **left** of the hero from `lg` up, with the copy
on the right. On phones the copy still comes first so the headline and the call
buttons are what you land on — the order is handled by `order-1 lg:order-2` on
the copy and `order-2 lg:order-1` on the slider, so swapping sides again is a
matter of flipping those two classes.

## Editing content

Everything the business says about itself lives in two files — no markup to touch:

- **`config/business.ts`** — name, owner, phone numbers, WhatsApp, email, hours,
  social links, and the full branch list (address lines, map query, areas covered,
  per-branch intro copy). Adding a branch here automatically creates its page,
  its footer link and its card on `/branches`.
- **`config/content.ts`** — saree types, services, why-choose-us, process steps,
  the roadmap stops, the price ledger, the do's & don'ts, FAQ entries, gallery
  images and testimonials.

The business name appears in one place (`business.name`) and flows through every
page title, the header, the footer and the structured data.

## Theme

Emerald green with zari yellow, defined as Tailwind v4 tokens in
`app/globals.css` under `@theme`. Change `--color-green` / `--color-yellow`
there and the whole site re-themes. Gradients are custom utilities in the same
file: `grad-green`, `grad-green-deep`, `grad-leaf`, `foil`, `foil-text`,
`green-text`.

## Mobile

Mobile was the priority:

- **Sticky bottom action bar** — Call / WhatsApp / Branches, always one tap away.
- **Slide-in drawer nav**, closed by tap-outside, the X, Escape, or picking a link.
- **Swipeable scroll-snap rails** for card rows, so cards stay readable.
- **48px minimum tap targets** throughout.
- **Safe-area insets** honoured so the bar clears the iPhone home indicator.
- Verified: **no horizontal scroll on any route from 360px to 1440px**.

## Before this goes live

| What | Where | Note |
|---|---|---|
| Statistics counters | `app/page.tsx`, the `Counter` block | `4,205+ / 245+ / 3,550+ / 6,545+` are illustrative, **not** this shop's real numbers. |
| Customer reviews | `config/content.ts` → `testimonials` | Three placeholder quotes. Replace with real reviews. |
| "Four decades" / "40+ years" | `config/business.ts` → `foundedText`, and the hero chip in `app/page.tsx` | Confirm the real founding year. |
| Social links | `config/business.ts` → `social` | The YouTube, Instagram and Facebook handles still belong to the previous brand. Replace or remove them. |
| `siteUrl` | `config/business.ts` | Currently `oldsilverzari.com`, a placeholder matching the new name. Point it at the real domain — it drives canonical URLs and Open Graph. |
| Photography | `public/img/` + `config/content.ts` | Pexels stock of real Indian silk. Swap in your own shop photos — see below. |

### Replacing the images

All photography comes from **Pexels** under the
[Pexels License](https://www.pexels.com/license/) — free for commercial use,
modification allowed, **no attribution required**. The images show real Indian
silk: Kanchipuram zari borders, Banarasi brocade, handlooms, Varanasi ghats and
brass ware, rather than generic fabric close-ups.

The 17 files are **self-hosted** in `public/img/` (5.6 MB total, capped at
1600px, re-encoded at quality 82) rather than hot-linked. Hot-linking them was
measurably worse: a cold `next/image` fetch from the Pexels CDN took ~2.4s and
several timed out under load, versus ~0.08s served locally.

One helper in `config/content.ts` resolves a photo id to its file:

```ts
export const img = (id: number) => `/img/silk-${id}.jpg`;
```

To change a picture, drop a new file into `public/img/` and change the numeric
`imageId` (saree cards) or `id` (gallery) in `config/content.ts`. Nothing else
needs editing.

**Do not source images from Pinterest.** It is an aggregator of other people's
copyrighted photos, not a stock library, so republishing them on a commercial
site is infringement. It is also technically impossible here: Pinterest's
`robots.txt` is `Disallow: /` for all crawlers, and `i.pinimg.com` returns HTTP
403 to any external referer, so hotlinked images render as broken.

To use your own shop photographs instead — strongly recommended once you have
them:

1. Put the files in `public/img/`.
2. Point `img()` at them, or replace the `img(...)` calls with your own paths.

`next/image` handles sizing, lazy loading and modern formats automatically.

## Browser extensions and hydration

Some extensions edit the page before React hydrates — ColorZilla adds
`cz-shortcut-listen` to `<body>`, Grammarly adds `data-gr-*` — which React
reports as a hydration mismatch even though the site is fine. `<body>` carries
`suppressHydrationWarning` to absorb that.

It applies **only to that element's own attributes and text**; a genuine
mismatch anywhere inside the tree is still reported. Both halves of that were
checked: with the attribute injected before hydration the warning is gone, and
with a heading tampered with before hydration React still raises
"Hydration failed because the server rendered HTML didn't match the client."

If you see a hydration error, reproduce it in an incognito window with
extensions disabled before treating it as a bug in the code.

## Accessibility & SEO

- Per-page `<title>`, description and canonical URL via the Metadata API.
- `LocalBusiness` JSON-LD in the root layout; `FAQPage` JSON-LD on `/faq`.
- `prefers-reduced-motion` disables reveals, count-ups and smooth scrolling.
- FAQ accordion uses real buttons with `aria-expanded` / `aria-controls`.
- Drawer is keyboard-dismissible, decorative images are `aria-hidden`.

# Sri Kamatchi Pattu Center

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
| `/` | Home |
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

## Editing content

Everything the business says about itself lives in two files — no markup to touch:

- **`config/business.ts`** — name, owner, phone numbers, WhatsApp, email, hours,
  social links, and the full branch list (address lines, map query, areas covered,
  per-branch intro copy). Adding a branch here automatically creates its page,
  its footer link and its card on `/branches`.
- **`config/content.ts`** — saree types, services, why-choose-us, process steps,
  FAQ entries, gallery images and testimonials.

The business name appears in one place (`business.name`) and flows through every
page title, the header, the footer and the structured data.

## Theme

Royal blue with zari gold, defined as Tailwind v4 tokens in `app/globals.css`
under `@theme`. Change `--color-royal` / `--color-gold` there and the whole site
re-themes. Gradients are custom utilities in the same file: `grad-royal`,
`grad-royal-deep`, `grad-sky`, `foil`, `foil-text`, `blue-text`.

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
| Business name | `config/business.ts` → `name` | Carried over from the previous site. Change this one line if the trading name differs. |
| `siteUrl` | `config/business.ts` | Set to the real domain so canonical URLs and Open Graph tags resolve correctly. |
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

## Accessibility & SEO

- Per-page `<title>`, description and canonical URL via the Metadata API.
- `LocalBusiness` JSON-LD in the root layout; `FAQPage` JSON-LD on `/faq`.
- `prefers-reduced-motion` disables reveals, count-ups and smooth scrolling.
- FAQ accordion uses real buttons with `aria-expanded` / `aria-controls`.
- Drawer is keyboard-dismissible, decorative images are `aria-hidden`.

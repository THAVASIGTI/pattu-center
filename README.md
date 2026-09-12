# Sri Kamatchi Pattu Center — static website

A static, mobile-first website for an old silk / pattu saree buying business.
No build step, no dependencies: three HTML files, one stylesheet, one small JS file.

```
index.html            Home — hero, about, what we buy, services, process,
                      why us, gallery, branches, coverage, reviews, FAQ, CTA
madurai.html          Madurai branch landing page
chennai.html          Chennai collections landing page
assets/css/style.css  All styling (design tokens at the top of the file)
assets/js/main.js     Drawer nav, scroll reveal, count-up stats, FAQ accordion
_partials/            Source fragments used to generate the pages (see below)
```

## Running it

Any static server, or just open `index.html` in a browser:

```bash
python3 -m http.server 8000
# then visit http://127.0.0.1:8000/
```

Deploy by uploading the repo as-is to any static host (Netlify, Vercel,
GitHub Pages, Hostinger, cPanel). There is nothing to compile.

## Before this goes live — replace the placeholder data

These items are **filler** and must be swapped for the real business's data:

| What | Where | Note |
|---|---|---|
| Statistics counters | `index.html`, `.counters` block | `4,205+ / 245+ / 3,550+ / 6,545+` are illustrative figures, not this shop's real numbers. Edit the `data-count` attributes. |
| Customer reviews | `index.html`, `#reviews` | Three sample quotes. Replace with real reviews (ideally pulled from the Google Business profile). |
| "Since 1985" / "40+ years" | `index.html` hero badge and `.hero__chip` | Taken from third-party directory listings. Confirm the real founding year. |
| Chennai address | `chennai.html`, `index.html` `#branches` | No street address was published for Chennai, so the page is written honestly as "collections by appointment". Add the real shop address if one exists. |
| Email address | not present | The source site lists no email. Add one to the footer if the business has one. |
| **Phone numbers** | every page + `_partials/` | All numbers are **dummy placeholders** (`+91 90000 00001/2/3`, WhatsApp `90000 00002`). Swap in the real numbers before launch — see the grep command below. |
| Photography | all pages | See below. |

## Images

Every photo is currently hot-linked from Unsplash (free to use, no
attribution required) and shows silk, zari and textile close-ups rather
than people — as requested.

**Replace them with real photographs of the shop, the counter and actual
stock as soon as you have them.** Real photos convert far better than stock,
and self-hosting removes the dependency on an external CDN.

To swap one:

1. Drop the file into `assets/img/`.
2. Find the `https://images.unsplash.com/...` URL in the HTML.
3. Replace it with `assets/img/your-photo.jpg`.

Keep the `width`/`height` attributes roughly proportional to the new image so
the page doesn't shift while loading, and keep `loading="lazy"` on everything
below the fold.

## Editing content

Colours, fonts, spacing and radii are all CSS custom properties at the top of
`assets/css/style.css` (`:root`). Changing `--royal`, `--gold` and `--cream`
re-themes the whole site.

The theme is royal blue with gold zari accents. Gradients are defined once as
tokens and reused everywhere:

- `--grad-royal` — the main blue gradient (buttons, icon chips, avatars, accent cards)
- `--grad-royal-deep` — dark sections, drawer, footer
- `--grad-sky` — the page's soft background wash
- `--foil` — the gold gradient used for display text, ornaments and primary buttons

Phone numbers appear in several places — the top bar, hero, branch cards,
mobile action bar, footer and every `tel:`/`wa.me` link. Search and replace
across all three HTML files when they change:

```bash
grep -rn "9000000001\|9000000002\|9000000003" *.html _partials/
```

### The `_partials/` directory

`_partials/header.html` and `_partials/footer.html` are the shared header and
footer. They were used to generate the three pages so the nav and footer stay
identical. They are **not** loaded at runtime — the pages are fully
self-contained. If you change the nav or footer, either edit the same block in
all three HTML files, or edit the partial and re-assemble.

## Mobile behaviour

Mobile was the priority. Specifically:

- **Sticky bottom action bar** — Call / WhatsApp / Branches, always one thumb-tap away.
- **Slide-in drawer nav** with a scrim, closed by tap-outside, the X button, Escape, or selecting a link.
- **Swipeable card rails** with scroll-snap for "What we buy" and reviews, so cards stay readable instead of shrinking.
- **48px minimum tap targets** on every button and link.
- **Safe-area insets** honoured so the action bar clears the iPhone home indicator.
- **No horizontal scroll** at any width (verified from 360px to 1440px).
- Full nav bar appears at 1120px and up; below that it is the drawer.

## Accessibility and performance notes

- Fonts load from Google Fonts with `display=swap`; `preconnect` hints are set.
- Below-the-fold images are lazy-loaded; hero images use `fetchpriority="high"`.
- `prefers-reduced-motion` disables reveals, count-ups and smooth scrolling.
- Every page carries `LocalBusiness` JSON-LD, Open Graph tags and a canonical URL.
- Decorative images have empty `alt` and `aria-hidden`; content images are described.

Update the `<link rel="canonical">` and `og:url` values if the site is
deployed to a different domain than `srikamatchipattucenter.in`.

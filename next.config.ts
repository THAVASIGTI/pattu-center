import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo as a project site at
 * https://<user>.github.io/pattu-center/, so every asset needs that prefix.
 *
 * The prefix comes from a single variable, NEXT_PUBLIC_BASE_PATH, which the
 * deploy workflow fills from actions/configure-pages. It is empty locally and
 * empty for a user/organisation site served from the domain root, so
 * `next dev` and a root deployment both work untouched.
 *
 * NEXT_PUBLIC_ is required: config/content.ts reads the same variable in the
 * browser bundle to prefix image paths, which next/image cannot do itself once
 * the optimiser is gone in a static export.
 */
const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// configure-pages reports "/" for a root deployment; Next rejects a basePath
// of "/" and also rejects a trailing slash, so normalise both away.
const basePath = raw === "/" ? "" : raw.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  // Emit a plain static site into out/ — no Node server needed to host it.
  output: "export",

  // Static export has no request-time image optimiser. Our files are already
  // capped at 1600px and re-encoded, so they ship as-is.
  images: { unoptimized: true },

  // Write about/index.html rather than about.html, which is what Pages
  // expects when resolving /about/.
  trailingSlash: true,

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;

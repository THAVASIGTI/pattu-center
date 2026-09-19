import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo as a project site at
 * https://<user>.github.io/pattu-center/, so every asset needs the
 * "/pattu-center" prefix. That would break `next dev` at localhost root, so the
 * prefix is applied only when the Pages workflow sets GITHUB_PAGES=true.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "/pattu-center";

const nextConfig: NextConfig = {
  // Emit a plain static site into out/ — no Node server needed to host it.
  output: "export",

  // Static export has no image optimiser at request time. Our files are
  // already capped at 1600px and re-encoded, so they ship as-is.
  images: { unoptimized: true },

  // Write about/index.html rather than about.html, which is what Pages
  // expects when resolving /about/.
  trailingSlash: true,

  basePath: isPages ? repo : undefined,
  assetPrefix: isPages ? repo : undefined,
};

export default nextConfig;

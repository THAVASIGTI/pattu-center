#!/usr/bin/env node
/**
 * Fills the hero's saree stack.
 *
 * The stack wants photographs of PILES of folded silk, all cut to one shape,
 * because a pile only reads as a pile if every card in it is the same size.
 * Doing that by hand is four ImageMagick invocations and a renumbering every
 * time the pictures change, so it lives here instead.
 *
 * Two ways in, and they share everything after the download:
 *
 *   PEXELS_API_KEY=xxxx node scripts/fetch-stack.mjs
 *       Searches Pexels, takes the best portrait results, saves the
 *       originals, then crops them.
 *
 *   node scripts/fetch-stack.mjs --from-raw
 *       Skips the search. Crops whatever is already sitting in
 *       public/img/stack/raw/, so you can pick the pictures yourself from
 *       anywhere and drop them in.
 *
 * Why Pexels and not the others: its licence allows commercial use with no
 * credit line and no share-alike, which is what a shop's own marketing site
 * needs. Unsplash and Pixabay also want a key; Wikimedia and Openverse are
 * free to query but almost everything there is CC-BY-SA, which means a
 * visible credit and share-alike terms on anything you crop out of it.
 * Pinterest is not a source: the images on it belong to whoever made them
 * and carry no licence to reuse at all.
 *
 * Credit is not required by the Pexels licence but is printed anyway, into
 * raw/credits.json, so there is a record of where each picture came from.
 *
 * Needs ImageMagick's `convert` on PATH. It is a build-time tool and never
 * ships; nothing in the site imports this file.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const RAW = path.resolve(flag("raw", path.join(ROOT, "public/img/stack/raw")));
const OUT = path.resolve(flag("out", path.join(ROOT, "public/img/stack")));
const COUNT = Number(flag("count", 5));
const QUERY = flag("query", "folded silk sarees stack");
const FROM_RAW = args.includes("--from-raw");

/* 3:4, and 420 wide because the card is 300px at its largest and this still
   covers a 2x screen. A static export has no image optimiser, so whatever
   this writes is exactly what a phone downloads. */
const W = 420;
const H = 560;

function need(cmd) {
  try {
    execFileSync("which", [cmd], { stdio: "ignore" });
  } catch {
    console.error(`! ${cmd} is not on PATH. Install ImageMagick and re-run.`);
    process.exit(1);
  }
}

async function search() {
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    console.error(
      "! No PEXELS_API_KEY set.\n" +
        "  Get a free one at https://www.pexels.com/api/ and re-run as\n" +
        "    PEXELS_API_KEY=xxxx node scripts/fetch-stack.mjs\n" +
        "  Or drop your own pictures in public/img/stack/raw/ and run with --from-raw.",
    );
    process.exit(1);
  }

  /* Over-fetch and then filter. A search for a pile of cloth returns plenty
     of portraits of people wearing one, and those are the wrong picture for
     a stack however good they are, so there has to be slack to discard. */
  const url =
    "https://api.pexels.com/v1/search?" +
    new URLSearchParams({ query: QUERY, per_page: "40", orientation: "portrait" });
  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) {
    console.error(`! Pexels returned ${res.status}. If that is 401 the key is wrong.`);
    process.exit(1);
  }
  const { photos = [] } = await res.json();
  const usable = photos.filter((p) => p.width >= W && p.height >= H);
  if (usable.length < COUNT) {
    console.error(
      `! Only ${usable.length} usable results for "${QUERY}". Try another --query.`,
    );
    process.exit(1);
  }
  return usable.slice(0, COUNT);
}

async function download(photos) {
  rmSync(RAW, { recursive: true, force: true });
  mkdirSync(RAW, { recursive: true });
  const credits = [];
  for (const [i, p] of photos.entries()) {
    const file = path.join(RAW, `${String(i + 1).padStart(2, "0")}.jpg`);
    const res = await fetch(p.src.large2x ?? p.src.large ?? p.src.original);
    if (!res.ok) throw new Error(`download failed for ${p.id}: ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    credits.push({
      file: path.basename(file),
      id: p.id,
      photographer: p.photographer,
      photographer_url: p.photographer_url,
      page: p.url,
      alt: p.alt,
      licence: "Pexels licence, free for commercial use",
    });
    console.log(`  saved ${path.basename(file)}  ${p.photographer}`);
  }
  writeFileSync(path.join(RAW, "credits.json"), `${JSON.stringify(credits, null, 2)}\n`);
  return credits;
}

function crop() {
  mkdirSync(OUT, { recursive: true });
  const files = readdirSync(RAW)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  if (!files.length) {
    console.error(`! Nothing to crop in ${RAW}`);
    process.exit(1);
  }
  const written = [];
  files.forEach((f, i) => {
    const name = `saree-${String(i + 1).padStart(2, "0")}.jpg`;
    execFileSync("convert", [
      path.join(RAW, f),
      "-resize", `${W}x${H}^`,
      "-gravity", "center",
      "-extent", `${W}x${H}`,
      "-quality", "60",
      "-sampling-factor", "4:2:0",
      "-strip",
      path.join(OUT, name),
    ]);
    written.push(name);
    console.log(`  wrote ${name}  <- ${f}`);
  });
  return written;
}

need("convert");
if (!FROM_RAW) {
  if (!existsSync(RAW)) mkdirSync(RAW, { recursive: true });
  await download(await search());
}
const written = crop();

/* The component holds its own list with its own alt text, because alt text
   has to describe the picture and no API field reliably does. Print the
   shape of it so updating SareeStack.tsx is a paste and a rewrite of the
   descriptions rather than a guess at the numbering. */
console.log("\nPaste into components/SareeStack.tsx, then write real alt text:\n");
console.log("const SAREES = [");
for (const [i] of written.entries()) {
  console.log(`  { n: ${i + 1}, alt: "TODO: describe this saree" },`);
}
console.log("];");

/**
 * Writes one QR code per branch into public/img/qr, each encoding that
 * branch's Google Maps link.
 *
 * They are generated here rather than in the page because the site is a static
 * export: there is no server at request time, and doing it in the browser would
 * ship a QR library to every visitor for something that never changes.
 *
 * Run after editing a branch's coords or mapQuery:  npm run qr
 */
import { mkdir, writeFile, readdir, unlink } from "node:fs/promises";
import { join } from "node:path";
import QRCode from "qrcode";

// config/business.ts is TypeScript, so read the two fields we need from source
// rather than pulling a transpiler into the build.
const src = await (await import("node:fs/promises")).readFile(
  "config/business.ts", "utf8",
);

const branches = [...src.matchAll(/\{\s*slug: "([^"]+)",([\s\S]*?)\n  \},/g)].map(
  ([, slug, body]) => ({
    slug,
    coords: body.match(/coords: "([^"]+)"/)?.[1],
    mapQuery: body.match(/mapQuery: "([^"]+)"/)?.[1],
  }),
);

if (branches.length === 0) throw new Error("no branches parsed from config/business.ts");

const OUT = join("public", "img", "qr");
await mkdir(OUT, { recursive: true });
for (const f of await readdir(OUT).catch(() => [])) await unlink(join(OUT, f));

for (const b of branches) {
  const target = b.coords ?? b.mapQuery;
  if (!target) throw new Error(`branch ${b.slug} has neither coords nor mapQuery`);

  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(target)}`;
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#0a2e1a", light: "#ffffff" },
  });

  await writeFile(join(OUT, `${b.slug}.svg`), svg);
  console.log(`  ${b.slug.padEnd(28)} ${target}`);
}
console.log(`\n${branches.length} QR codes written to ${OUT}`);

"use client";

import Image from "next/image";
import { useState } from "react";
import { reels, shopPhotoCount } from "@/config/console";
import { shopGallery, shopThumb } from "@/config/content";
import ConsoleShell from "./ConsoleShell";
import { IconPlus } from "./icons";
import { useToast } from "./Toast";
import {
  EditButton,
  Field,
  GhostButton,
  Modal,
  Panel,
  PrimaryButton,
  StatTile,
  inputClass,
} from "./ui";

/**
 * The shop's own pictures and its videos.
 *
 * The photographs are the twenty-six in public/img/shop, which really are
 * the shop's own stock rather than licensed stock, and that is the one
 * thing worth saying loudly on this screen: they are the most valuable
 * images on the site and the only ones nobody else has.
 *
 * The videos come from the shop's own Instagram, Facebook and YouTube. Two
 * of them cannot be embedded, and rather than hiding that the screen says
 * which and why: Instagram refuses to embed a reel whose audio is a
 * licensed commercial track, so those cards open the post instead. A video
 * the shop wants watched in place needs different audio, and only the shop
 * can decide that.
 */
export default function GalleryView() {
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const linkOnly = reels.filter((r) => r.linkOnly);
  const byPlatform = (["instagram", "facebook", "youtube"] as const).map((p) => ({
    platform: p,
    items: reels.filter((r) => r.platform === p),
  }));

  return (
    <ConsoleShell
      title="Gallery"
      lede="The shop's own photographs and the clips from its social pages. These are the pictures nobody else has."
      actions={
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-deep px-3 py-2 text-[0.78rem] font-semibold text-cream hover:bg-green-mid"
        >
          <IconPlus className="size-4" />
          <span className="hidden sm:inline">Add a photograph</span>
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Shop photographs" value={String(shopPhotoCount)} sub="The shop's own stock" />
        <StatTile label="Videos" value={String(reels.length)} sub="Instagram, Facebook and YouTube" />
        <StatTile
          label="Play on the page"
          value={String(reels.length - linkOnly.length)}
          sub={`${linkOnly.length} open the post instead`}
        />
        <StatTile label="Shown on the home page" value="3" sub="One from each platform" />
      </div>

      <Panel
        className="mt-3"
        title={`Shop photographs · ${shopPhotoCount}`}
        note="Each one carries its own description, which is what a screen reader and a search engine read."
      >
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {shopGallery.map((g) => (
            <li key={g.n} className="overflow-hidden rounded-lg border border-slate-200">
              <div className="relative aspect-square bg-slate-100">
                <Image
                  src={shopThumb(g.n)}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 16vw"
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[0.68rem] font-semibold text-slate-500">
                    shop-{String(g.n).padStart(2, "0")}
                  </span>
                  <EditButton what={`photograph ${g.n}`} compact />
                </div>
                <p className="mt-1 line-clamp-2 text-[0.68rem] leading-snug text-slate-500">
                  {g.alt}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel
        className="mt-3"
        title={`Videos · ${reels.length}`}
        note="From the shop's own pages. Three of these appear on the home page, one from each platform."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {byPlatform.map(({ platform, items }) => (
            <div key={platform} className="rounded-xl border border-slate-200 p-3.5">
              <p className="text-[0.8rem] font-semibold text-slate-900 capitalize">{platform}</p>
              <p className="mt-0.5 text-[0.72rem] text-slate-500">
                {items.length} {items.length === 1 ? "clip" : "clips"}
                {items.some((r) => r.linkOnly) &&
                  ` · ${items.filter((r) => r.linkOnly).length} link only`}
              </p>
              <ul className="mt-2.5 space-y-1.5 border-t border-slate-100 pt-2.5">
                {items.map((r) => (
                  <li key={r.slug} className="flex items-center justify-between gap-2">
                    <span className="truncate text-[0.74rem] text-slate-600">{r.slug}</span>
                    {r.linkOnly ? (
                      <span className="shrink-0 rounded bg-amber-50 px-1.5 py-0.5 text-[0.62rem] font-semibold text-amber-800">
                        Opens the post
                      </span>
                    ) : (
                      <span className="shrink-0 rounded bg-emerald-50 px-1.5 py-0.5 text-[0.62rem] font-semibold text-emerald-700">
                        Plays here
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {linkOnly.length > 0 && (
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2.5 text-[0.78rem] leading-relaxed text-amber-900">
            <b className="font-semibold">Why {linkOnly.length} will not play here. </b>
            Instagram refuses to embed a reel whose audio is a licensed commercial
            track, so those cards open the post instead of showing a dead player.
            A clip the shop wants watched on its own site needs different audio.
          </p>
        )}
      </Panel>

      <Modal
        open={open}
        title="Add a photograph"
        note="Goes to the head office. This console cannot publish on its own."
        onClose={() => setOpen(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            toast.sentToAdmin("The photograph");
          }}
          className="space-y-3.5"
        >
          <Field label="Photograph" hint="Shot at the counter, in daylight, with the saree spread or folded flat.">
            <input type="file" accept="image/*" className={inputClass} required />
          </Field>
          <Field
            label="What it shows"
            hint="This becomes the alt text. Name the colour, the weave and the border."
          >
            <textarea
              className={inputClass}
              rows={2}
              required
              placeholder="Magenta silk saree with a wide gold zari border"
            />
          </Field>
          <Field label="Where it should appear">
            <select className={inputClass} defaultValue="gallery">
              <option value="gallery">Gallery only</option>
              <option value="branch">Gallery and the branch pages</option>
            </select>
          </Field>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <GhostButton onClick={() => setOpen(false)}>Cancel</GhostButton>
            <PrimaryButton type="submit">Send to head office</PrimaryButton>
          </div>
        </form>
      </Modal>
    </ConsoleShell>
  );
}

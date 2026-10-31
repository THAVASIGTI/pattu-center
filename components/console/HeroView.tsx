"use client";

import Image from "next/image";
import { useState } from "react";
import { HERO_SLOTS, HERO_SLOT_SECONDS, heroImages, heroSpareCategories } from "@/config/console";
import { catImg } from "@/config/content";
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
  inputClass,
} from "./ui";

/**
 * The hero's rotating images.
 *
 * These are the six the home page actually cycles through, read from the
 * same slice the hero takes, shown in the order it shows them and with the
 * hold time it uses. Looking at this screen and looking at the top of the
 * website should produce the same list in the same order; if they ever
 * disagree, this screen is wrong and the constants at the top of
 * config/console.ts are what to check.
 *
 * Replacing an image is a file swap plus a rebuild, which is said on the
 * screen rather than hidden behind a button that pretends to upload. The
 * alt text matters as much as the picture and is shown with equal weight:
 * it is what a screen reader and a search engine actually read.
 */
export default function HeroView() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [replacing, setReplacing] = useState<string | null>(null);

  return (
    <ConsoleShell
      title="Hero images"
      lede={`The six photographs the home page cycles through, ${HERO_SLOT_SECONDS} seconds each. This is the live list, in the live order.`}
      actions={
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-deep px-3 py-2 text-[0.78rem] font-semibold text-cream hover:bg-green-mid"
        >
          <IconPlus className="size-4" />
          <span className="hidden sm:inline">Add an image</span>
        </button>
      }
    >
      <Panel
        title={`${HERO_SLOTS} images in rotation`}
        note={`One full turn takes ${HERO_SLOTS * HERO_SLOT_SECONDS} seconds. They dissolve into one another rather than cutting.`}
      >
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {heroImages.map((h) => (
            <li
              key={h.slug}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={catImg(h.imageId)}
                  alt={h.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 rounded-full bg-slate-900/75 px-2 py-0.5 text-[0.68rem] font-semibold text-white">
                  Slot {h.slot}
                </span>
              </div>
              <div className="p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[0.88rem] font-semibold text-slate-900">
                      {h.name}
                    </p>
                    <p className="truncate font-tamil text-[0.74rem] text-slate-500">{h.ta}</p>
                  </div>
                  <EditButton what={`the slot ${h.slot} image`} compact />
                </div>

                {/* Alt text is content, not metadata, and it is the only
                    part of a photograph a blind reader ever gets. */}
                <p className="mt-2.5 rounded-lg bg-slate-50 px-2.5 py-2 text-[0.72rem] leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-500">Alt text · </span>
                  {h.alt}
                </p>

                <dl className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-slate-400">
                  <div className="flex gap-1.5">
                    <dt>File</dt>
                    <dd className="font-medium text-slate-600">silk-{h.imageId}.jpg</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt>Size</dt>
                    <dd className="font-medium text-slate-600">{h.dimensions}</dd>
                  </div>
                </dl>

                <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => setReplacing(h.slug)}
                    className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[0.76rem] font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.adminOnly(`slot ${h.slot}`)}
                    className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[0.76rem] font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      {heroSpareCategories.length > 0 && (
        <Panel
          className="mt-3"
          title="Categories not in the hero"
          note="These appear on the home page board further down, but the hero only takes the first six."
        >
          <ul className="flex flex-wrap gap-2">
            {heroSpareCategories.map((c) => (
              <li
                key={c.slug}
                className="rounded-full border border-slate-200 px-3 py-1 text-[0.78rem] text-slate-600"
              >
                {c.name}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel className="mt-3" title="How a hero image actually changes">
        <ol className="space-y-2.5 text-[0.84rem] text-slate-700">
          {[
            "Put the new photograph in public/img/cat at 620 × 465, the width the rest of the set uses.",
            "Point the category at it in config/content.ts and write its alt text.",
            "Rebuild and redeploy. The site is a static export, so nothing changes until it is rebuilt.",
          ].map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-slate-100 text-[0.7rem] font-semibold text-slate-600">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Panel>

      <Modal
        open={open || replacing !== null}
        title={replacing ? "Replace this image" : "Add a hero image"}
        note="Goes to the head office. This console cannot publish on its own."
        onClose={() => {
          setOpen(false);
          setReplacing(null);
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const what = replacing ? "The replacement image" : "The new hero image";
            setOpen(false);
            setReplacing(null);
            toast.sentToAdmin(what);
          }}
          className="space-y-3.5"
        >
          <Field
            label="Photograph"
            hint="620 × 465 or larger, landscape. A stack of folded silk reads best."
          >
            <input type="file" accept="image/*" className={inputClass} />
          </Field>
          <Field label="What it shows" hint="This becomes the alt text. Describe the cloth, not the mood.">
            <textarea
              className={inputClass}
              rows={3}
              placeholder="Folded Kanchipuram silk sarees in gold and purple, their zari borders laid one on another"
              required
            />
          </Field>
          {!replacing && (
            <Field label="Position" hint="Where it should fall in the rotation.">
              <select className={inputClass} defaultValue={String(HERO_SLOTS + 1)}>
                {Array.from({ length: HERO_SLOTS + 1 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    Slot {i + 1}
                    {i === HERO_SLOTS ? " (last)" : ""}
                  </option>
                ))}
              </select>
            </Field>
          )}

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <GhostButton
              onClick={() => {
                setOpen(false);
                setReplacing(null);
              }}
            >
              Cancel
            </GhostButton>
            <PrimaryButton type="submit">Send to head office</PrimaryButton>
          </div>
        </form>
      </Modal>
    </ConsoleShell>
  );
}

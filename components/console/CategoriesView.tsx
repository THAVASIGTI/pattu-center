"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HERO_SLOTS, buyCategories, priceLedger, sareeTypes } from "@/config/console";
import { catImg, img } from "@/config/content";
import ConsoleShell from "./ConsoleShell";
import { IconArrowDown, IconArrowUp, IconPlus } from "./icons";
import { useToast } from "./Toast";
import {
  EditButton,
  Field,
  GhostButton,
  Modal,
  Panel,
  PrimaryButton,
  TableWrap,
  Td,
  Th,
  inputClass,
} from "./ui";

/**
 * What the shop says it buys, in the two places it says it.
 *
 * The distinction at the top of this screen is the one that matters and the
 * one most likely to be got wrong by somebody editing later. There are two
 * separate lists:
 *
 *   The BOARD, six categories on the home page, named the way a customer
 *   names what is folded in her almirah, on a photograph of that thing. Its
 *   first six also happen to be the hero's rotation.
 *
 *   The TYPES, nine entries on /what-we-buy, the trade's own breakdown with
 *   a paragraph each, for somebody who has come to read.
 *
 * They are not the same list and must not be merged. Adding a category to
 * the board changes the home page; adding a type changes a reference page.
 */
export default function CategoriesView() {
  const toast = useToast();
  const [open, setOpen] = useState<"board" | "type" | null>(null);

  return (
    <ConsoleShell
      title="Categories"
      lede="The two lists that describe what the shop buys: the six on the home page board, and the nine the reference page explains at length."
      actions={
        <button
          type="button"
          onClick={() => setOpen("board")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-deep px-3 py-2 text-[0.78rem] font-semibold text-cream hover:bg-green-mid"
        >
          <IconPlus className="size-4" />
          <span className="hidden sm:inline">Add a category</span>
        </button>
      }
    >
      <Panel
        title={`Home page board · ${buyCategories.length} categories`}
        note={`The first ${HERO_SLOTS} are also what the hero cycles through.`}
      >
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {buyCategories.map((c, i) => (
            <li key={c.slug} className="overflow-hidden rounded-xl border border-slate-200">
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={catImg(c.imageId)}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
                {i < HERO_SLOTS && (
                  <span className="absolute top-2 left-2 rounded-full bg-green-deep/85 px-2 py-0.5 text-[0.66rem] font-semibold text-yellow-light">
                    In the hero
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-3 p-3.5">
                <div className="min-w-0">
                  <p className="truncate text-[0.88rem] font-semibold text-slate-900">{c.name}</p>
                  <p className="truncate font-tamil text-[0.74rem] text-slate-500">{c.ta}</p>
                </div>
                <EditButton what={`the ${c.name} category`} compact />
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel
        className="mt-3"
        title={`Reference page · ${sareeTypes.length} saree types`}
        note="Shown on /what-we-buy, each with its own paragraph."
        action={
          <button
            type="button"
            onClick={() => setOpen("type")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[0.76rem] font-semibold text-slate-700 hover:bg-slate-50"
          >
            <IconPlus className="size-4" />
            Add a type
          </button>
        }
      >
        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Type</Th>
                <Th>Tamil</Th>
                <Th>Description</Th>
                <Th>Picture</Th>
                <Th right>&nbsp;</Th>
              </tr>
            </thead>
            <tbody>
              {sareeTypes.map((t) => (
                <tr key={t.slug} className="transition-colors hover:bg-slate-50">
                  <Td>{t.name}</Td>
                  <Td mute>
                    <span className="font-tamil">{t.ta}</span>
                  </Td>
                  <Td mute>
                    <span className="block max-w-[46ch] truncate">{t.blurb}</span>
                  </Td>
                  <Td mute>
                    <span className="inline-flex items-center gap-2">
                      <Image
                        src={img(t.imageId)}
                        alt=""
                        width={36}
                        height={28}
                        className="h-7 w-9 rounded object-cover"
                      />
                      silk-{t.imageId}
                    </span>
                  </Td>
                  <Td right>
                    <EditButton what={`the ${t.name} entry`} compact />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <Panel
        className="mt-3"
        title="What moves a price"
        note="The four factors published on the home page and explained to every seller."
      >
        <div className="grid gap-3 lg:grid-cols-2">
          {priceLedger.map((f) => (
            <div key={f.factor} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.88rem] font-semibold text-slate-900">{f.factor}</p>
                  <p className="text-[0.74rem] text-slate-500">{f.detail}</p>
                </div>
                <EditButton what={f.factor.toLowerCase()} compact />
              </div>
              <dl className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                <div>
                  <dt className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.04em] text-emerald-700 uppercase">
                    <IconArrowUp className="size-3" />
                    Raises it
                  </dt>
                  <dd className="mt-0.5 text-[0.82rem] text-slate-700">{f.raises}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.04em] text-slate-500 uppercase">
                    <IconArrowDown className="size-3" />
                    Lowers it
                  </dt>
                  <dd className="mt-0.5 text-[0.82rem] text-slate-700">{f.lowers}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[0.76rem] text-slate-500">
          These appear on the{" "}
          <Link href="/" className="font-semibold text-green hover:underline">
            home page
          </Link>{" "}
          and are the promise the valuation is measured against. Changing one changes
          what the shop has told every visitor.
        </p>
      </Panel>

      <Modal
        open={open !== null}
        title={open === "type" ? "Add a saree type" : "Add a category to the board"}
        note="Goes to the head office. This console cannot publish on its own."
        onClose={() => setOpen(null)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const what = open === "type" ? "The new saree type" : "The new category";
            setOpen(null);
            toast.sentToAdmin(what);
          }}
          className="space-y-3.5"
        >
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Name in English">
              <input className={inputClass} required placeholder="Arani Silk Sarees" />
            </Field>
            <Field label="Name in Tamil">
              <input className={inputClass} placeholder="ஆரணி பட்டு புடவை" />
            </Field>
          </div>
          {open === "type" && (
            <Field label="Description" hint="Two or three sentences, as on the reference page.">
              <textarea className={inputClass} rows={3} required />
            </Field>
          )}
          <Field label="Photograph" hint="Landscape. A stack rather than one saree laid flat.">
            <input type="file" accept="image/*" className={inputClass} />
          </Field>
          <Field label="What the photograph shows" hint="This becomes the alt text.">
            <textarea className={inputClass} rows={2} required />
          </Field>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <GhostButton onClick={() => setOpen(null)}>Cancel</GhostButton>
            <PrimaryButton type="submit">Send to head office</PrimaryButton>
          </div>
        </form>
      </Modal>
    </ConsoleShell>
  );
}

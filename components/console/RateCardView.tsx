"use client";

import { useState } from "react";
import { priceFactors, rateCard } from "@/config/console";
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
 * What the shop pays, by weave.
 *
 * The four factors at the foot are not invented: they are `priceLedger` from
 * config/content.ts, the same four things the public site tells a seller
 * move her price. Putting them here closes the loop. A customer reads the
 * promise on the website; the counter staff see the rates that promise is
 * made of, and the two cannot drift apart because they are one list.
 *
 * The rates themselves are sample figures, like everything else in here.
 */
export default function RateCardView() {
  const toast = useToast();
  const [open, setOpen] = useState(false);

  return (
    <ConsoleShell
      title="Rate card"
      lede="Indicative buying rates by weave, and the four things that move a figure. Sample rates; the four factors are the ones published on the website."
      actions={
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-deep px-3 py-2 text-[0.78rem] font-semibold text-cream hover:bg-green-mid"
        >
          <IconPlus className="size-4" />
          <span className="hidden sm:inline">Propose a rate</span>
        </button>
      }
    >
      <Panel
        title="Buying rates by weave"
        note="Per gram of silk, plus the zari rate per gram of recovered thread."
      >
        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Weave</Th>
                <Th right>Silk · low</Th>
                <Th right>Silk · high</Th>
                <Th right>Zari</Th>
                <Th>Demand</Th>
                <Th right>Moved</Th>
                <Th right>&nbsp;</Th>
              </tr>
            </thead>
            <tbody>
              {rateCard.map((r) => {
                const up = r.movedPct >= 0;
                return (
                  <tr key={r.slug} className="transition-colors hover:bg-slate-50">
                    <Td>
                      <span className="block font-medium">{r.name}</span>
                      <span className="block font-tamil text-[0.72rem] text-slate-400">
                        {r.ta}
                      </span>
                    </Td>
                    <Td right mute>₹{r.silkLow.toFixed(2)}/g</Td>
                    <Td right>
                      <b className="font-semibold">₹{r.silkHigh.toFixed(2)}/g</b>
                    </Td>
                    <Td right mute>₹{r.zariRate}/g</Td>
                    <Td mute>{r.demand}</Td>
                    <Td right>
                      {/* Direction is an arrow and a sign as well as a
                          colour, so it survives a colour-blind reader and a
                          black-and-white print alike. */}
                      <span
                        className={`inline-flex items-center gap-1 text-[0.78rem] font-semibold tabular-nums ${
                          up ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {up ? (
                          <IconArrowUp className="size-3" />
                        ) : (
                          <IconArrowDown className="size-3" />
                        )}
                        {up ? "+" : ""}
                        {r.movedPct}%
                      </span>
                    </Td>
                    <Td right>
                      <EditButton what={`the ${r.name} rate`} compact />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrap>
      </Panel>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {priceFactors.map((f) => (
          <Panel key={f.factor} title={f.factor} note={f.detail} action={<EditButton what={f.factor.toLowerCase()} compact />}>
            <dl className="space-y-3">
              <div>
                <dt className="flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.04em] text-emerald-700 uppercase">
                  <IconArrowUp className="size-3" />
                  Raises the figure
                </dt>
                <dd className="mt-1 text-[0.84rem] text-slate-700">{f.raises}</dd>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <dt className="flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.04em] text-slate-500 uppercase">
                  <IconArrowDown className="size-3" />
                  Lowers it
                </dt>
                <dd className="mt-1 text-[0.84rem] text-slate-700">{f.lowers}</dd>
              </div>
            </dl>
          </Panel>
        ))}
      </div>

      <Modal
        open={open}
        title="Propose a rate change"
        note="Goes to the head office for approval. Nothing is stored by this console."
        onClose={() => setOpen(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            toast.sentToAdmin("The proposed rate");
          }}
          className="space-y-3.5"
        >
          <Field label="Weave">
            <select className={inputClass} defaultValue={rateCard[0].slug}>
              {rateCard.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
          </Field>
          <div className="grid gap-3.5 sm:grid-cols-3">
            <Field label="Silk low (₹/g)">
              <input className={inputClass} type="number" step="0.05" defaultValue={2.2} />
            </Field>
            <Field label="Silk high (₹/g)">
              <input className={inputClass} type="number" step="0.05" defaultValue={3.1} />
            </Field>
            <Field label="Zari (₹/g)">
              <input className={inputClass} type="number" defaultValue={46} />
            </Field>
          </div>
          <Field label="Reason" hint="What has changed in the market to justify it.">
            <textarea className={inputClass} rows={3} />
          </Field>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <GhostButton onClick={() => setOpen(false)}>Cancel</GhostButton>
            <PrimaryButton type="submit">Send for approval</PrimaryButton>
          </div>
        </form>
      </Modal>
    </ConsoleShell>
  );
}

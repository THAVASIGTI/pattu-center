"use client";

import { useMemo, useState } from "react";
import { branches } from "@/config/business";
import {
  PAYMENT_MODES,
  formatDate,
  kilos,
  purchases,
  rupees,
  rupeesShort,
  totals,
} from "@/config/console";
import ConsoleShell from "./ConsoleShell";
import { HBarChart } from "./Charts";
import { IconPlus, IconSearch } from "./icons";
import { useToast } from "./Toast";
import {
  EditButton,
  Field,
  GhostButton,
  Modal,
  Panel,
  PrimaryButton,
  StatTile,
  TableWrap,
  Td,
  Th,
  inputClass,
} from "./ui";

/**
 * The purchase ledger: what was actually bought and paid for.
 *
 * The columns are the trade's own arithmetic, in the order the price ledger
 * on the public site explains it: pieces, then silk weight, then zari
 * weight, then the figure. A reader who has read the website should
 * recognise this table as the same four things it promised were the only
 * things that move a price.
 *
 * Zari share is computed rather than stored, because a ratio you can derive
 * is a ratio that cannot disagree with its own inputs.
 */
const PAGE = 40;

export default function PurchasesView() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [branch, setBranch] = useState("All");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return purchases.filter((p) => {
      if (branch !== "All" && p.branchSlug !== branch) return false;
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        p.id.toLowerCase().includes(needle) ||
        p.enquiryId.toLowerCase().includes(needle)
      );
    });
  }, [q, branch]);

  const shown = filtered.slice(0, PAGE);
  const subtotal = filtered.reduce((s, p) => s + p.payout, 0);

  const byMode = PAYMENT_MODES.map((mode) => ({
    label: mode,
    value: purchases.filter((p) => p.mode === mode).reduce((s, p) => s + p.payout, 0),
    note: `${purchases.filter((p) => p.mode === mode).length} buys`,
  }));

  return (
    <ConsoleShell
      title="Purchases"
      lede="Every completed purchase in the period, with the weights the figure was built from."
      actions={
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-deep px-3 py-2 text-[0.78rem] font-semibold text-cream hover:bg-green-mid"
        >
          <IconPlus className="size-4" />
          <span className="hidden sm:inline">Record purchase</span>
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Paid out · six months" value={rupees(totals.payout)} />
        <StatTile label="Purchases" value={String(totals.purchases)} />
        <StatTile label="Silk weighed in" value={kilos(totals.silkGrams)} />
        <StatTile
          label="Zari recovered"
          value={kilos(totals.zariGrams)}
          sub={`${Math.round((totals.zariGrams / totals.silkGrams) * 100)}% of silk weight`}
        />
      </div>

      <Panel className="mt-3" title="Paid out by payment method" note="Six months.">
        <HBarChart data={byMode} format={rupeesShort} labelWidth={110} />
      </Panel>

      <Panel
        className="mt-3"
        title={`${filtered.length} purchases`}
        note={`${rupees(subtotal)} in the current filter.`}
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative min-w-[12rem] flex-1">
            <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search customer or reference"
              aria-label="Search purchases"
              className={`${inputClass} pl-9`}
            />
          </div>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            aria-label="Filter by branch"
            className={`${inputClass} w-auto`}
          >
            <option value="All">All branches</option>
            {branches.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.city}
                {b.badge ? ` ${b.badge.toLowerCase()}` : ""}
              </option>
            ))}
          </select>
          {(q || branch !== "All") && (
            <GhostButton
              onClick={() => {
                setQ("");
                setBranch("All");
              }}
            >
              Clear
            </GhostButton>
          )}
        </div>

        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Reference</Th>
                <Th>Customer</Th>
                <Th>Branch</Th>
                <Th right>Pieces</Th>
                <Th right>Silk</Th>
                <Th right>Zari</Th>
                <Th right>Zari share</Th>
                <Th>Paid by</Th>
                <Th right>Payout</Th>
                <Th right>Date</Th>
                <Th right>&nbsp;</Th>
              </tr>
            </thead>
            <tbody>
              {shown.map((p) => {
                const branchName =
                  branches.find((b) => b.slug === p.branchSlug)?.city ?? p.branchSlug;
                return (
                  <tr key={p.id} className="transition-colors hover:bg-slate-50">
                    <Td mute>
                      <span className="block">{p.id}</span>
                      <span className="block text-[0.72rem] text-slate-400">{p.enquiryId}</span>
                    </Td>
                    <Td>{p.name}</Td>
                    <Td mute>{branchName}</Td>
                    <Td right>{p.pieces}</Td>
                    <Td right mute>{(p.silkGrams / 1000).toFixed(2)} kg</Td>
                    <Td right mute>{(p.zariGrams / 1000).toFixed(2)} kg</Td>
                    <Td right mute>{Math.round((p.zariGrams / p.silkGrams) * 100)}%</Td>
                    <Td mute>{p.mode}</Td>
                    <Td right>
                      <b className="font-semibold">{rupees(p.payout)}</b>
                    </Td>
                    <Td right mute>{formatDate(p.daysAgo)}</Td>
                    <Td right>
                      <EditButton what={`purchase ${p.id}`} compact />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrap>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-[0.84rem] text-slate-500">
            No purchase matches those filters.
          </p>
        )}
      </Panel>

      <Modal
        open={open}
        title="Record a purchase"
        note="Goes to the head office for approval. Nothing is stored by this console."
        onClose={() => setOpen(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            toast.sentToAdmin("The purchase");
          }}
          className="space-y-3.5"
        >
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Customer name">
              <input className={inputClass} required placeholder="Meena V." />
            </Field>
            <Field label="Enquiry reference" hint="Optional, if it began as an enquiry.">
              <input className={inputClass} placeholder="ENQ-4172" />
            </Field>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-3">
            <Field label="Pieces">
              <input className={inputClass} type="number" min={1} defaultValue={5} />
            </Field>
            <Field label="Silk weight (g)">
              <input className={inputClass} type="number" min={0} defaultValue={3200} />
            </Field>
            <Field label="Zari weight (g)">
              <input className={inputClass} type="number" min={0} defaultValue={410} />
            </Field>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Payout (₹)">
              <input className={inputClass} type="number" min={0} defaultValue={28500} />
            </Field>
            <Field label="Paid by">
              <select className={inputClass} defaultValue={PAYMENT_MODES[1]}>
                {PAYMENT_MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <GhostButton onClick={() => setOpen(false)}>Cancel</GhostButton>
            <PrimaryButton type="submit">Send for approval</PrimaryButton>
          </div>
        </form>
      </Modal>
    </ConsoleShell>
  );
}

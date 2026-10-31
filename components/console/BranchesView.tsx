"use client";

import { useState } from "react";
import { byBranch, rupees, rupeesShort, totals } from "@/config/console";
import ConsoleShell from "./ConsoleShell";
import { HBarChart } from "./Charts";
import { IconPin, IconPlus } from "./icons";
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
 * Branches as cards, which is the brief's own example of how a section
 * should work: cards, an "add new" above them, a form behind that, and a
 * toast where a save would be.
 *
 * These are the eleven real branches from config/business.ts, the same list
 * the public site renders. Only the trading figures beside them are
 * invented. That matters: a demo whose branch list disagrees with the
 * website's is a demo that cannot be shown to anybody who has seen the
 * website.
 *
 * Cards rather than a table because the question here is "how is Thanjavur
 * doing", one branch at a time, not "rank these by payout". The ranking is
 * the chart underneath, which is the right form for that question.
 */
export default function BranchesView() {
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const busiest = byBranch[0];

  return (
    <ConsoleShell
      title="Branches"
      lede="Eleven branches across Tamil Nadu. The list matches the public site; the trading figures beside each one are sample data."
      actions={
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-deep px-3 py-2 text-[0.78rem] font-semibold text-cream hover:bg-green-mid"
        >
          <IconPlus className="size-4" />
          <span className="hidden sm:inline">Add new branch</span>
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Branches" value={String(byBranch.length)} sub="Ten counters and one collection route" />
        <StatTile label="Busiest" value={busiest.city} sub={`${rupees(busiest.payout)} paid out`} />
        <StatTile label="Open enquiries" value={String(totals.openPipeline)} sub="Across all branches" />
        <StatTile
          label="Areas covered"
          value={String(byBranch.reduce((s, b) => s + b.areas, 0))}
          sub="Collection areas listed on the site"
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {byBranch.map((b) => (
          <article
            key={b.slug}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,.05)] transition-shadow hover:shadow-[0_8px_24px_rgba(15,23,42,.08)]"
          >
            <header className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="flex flex-wrap items-center gap-2 text-[1rem] font-semibold text-slate-900">
                  {b.city}
                  {b.badge && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.08em] text-slate-500 uppercase">
                      {b.badge}
                    </span>
                  )}
                  {b.isHeadOffice && (
                    <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.08em] text-amber-800 uppercase">
                      Head office
                    </span>
                  )}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-[0.76rem] text-slate-500">
                  <IconPin className="size-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">
                    {b.pickupOnly ? "Doorstep collection across the city" : b.street}
                  </span>
                </p>
              </div>
              <EditButton what={`the ${b.city} branch`} compact />
            </header>

            <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
              {[
                ["Paid out", rupeesShort(b.payout)],
                ["Purchases", String(b.purchases)],
                ["Open", String(b.open)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.66rem] tracking-[0.04em] text-slate-400 uppercase">
                    {k}
                  </dt>
                  <dd className="mt-0.5 text-[0.95rem] font-semibold text-slate-900 tabular-nums">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-3 text-[0.72rem] text-slate-400">
              {b.enquiries} enquiries · {b.areas} collection areas
            </p>
          </article>
        ))}
      </div>

      <Panel
        className="mt-3"
        title="Branches ranked by amount paid out"
        note="Six months. The grey figure is purchases made."
      >
        <HBarChart
          data={byBranch.map((b) => ({
            label: b.badge ? `${b.city} ${b.badge.replace(/Branch /, 'B')}` : b.city,
            value: b.payout,
            note: `${b.purchases} buys`,
          }))}
          format={rupeesShort}
        />
      </Panel>

      <Modal
        open={open}
        title="Add a new branch"
        note="Goes to the head office for approval. Nothing is stored by this console."
        onClose={() => setOpen(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            toast.sentToAdmin("The new branch");
          }}
          className="space-y-3.5"
        >
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Town or city">
              <input className={inputClass} required placeholder="Dindigul" />
            </Field>
            <Field label="Branch label" hint="Only needed if the town already has one.">
              <input className={inputClass} placeholder="Branch 2" />
            </Field>
          </div>
          <Field label="Street address">
            <input className={inputClass} required placeholder="No. 14, Nehruji Road" />
          </Field>
          <Field label="Landmark" hint="What a customer would look for from the road.">
            <input className={inputClass} placeholder="Opposite the bus stand" />
          </Field>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Contact number">
              <input className={inputClass} required placeholder="+91 85955 20856" />
            </Field>
            <Field label="Type">
              <select className={inputClass} defaultValue="counter">
                <option value="counter">Counter you can walk into</option>
                <option value="pickup">Collection route only</option>
              </select>
            </Field>
          </div>
          <Field
            label="Collection areas"
            hint="Separate with commas. These appear on the branch page."
          >
            <textarea className={inputClass} rows={3} placeholder="Begambur, Palani Road, NGO Colony" />
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { business } from "@/config/business";
import { branchRows, branchesMissingPins, totals } from "@/config/console";
import ConsoleShell from "./ConsoleShell";
import { IconPin, IconPlus } from "./icons";
import { useToast } from "./Toast";
import {
  EditButton,
  Field,
  GhostButton,
  Modal,
  PrimaryButton,
  StatTile,
  inputClass,
} from "./ui";

/**
 * The branches, as they are on the live site.
 *
 * This is the brief's own example of how a section should work, and the
 * part the client asked for by name: add a new branch, remove an old one,
 * change the details of one that moved. All three are here, and all three
 * end at a toast, because the site is a static export and a branch only
 * really changes when config/business.ts changes and the site is rebuilt.
 *
 * Each card carries its map state, because that is the one thing about a
 * branch that is silently wrong rather than obviously missing: without
 * `coords` the map still renders and the QR code still scans, they just
 * point at a landmark down the road instead of the shop door. Nobody
 * notices until a customer does.
 *
 * Removing is deliberately heavier than adding. A branch page is a URL
 * people have in their phones and a QR code printed on paper, so the
 * dialog says what else goes with it rather than asking "are you sure?".
 */
export default function BranchesView() {
  const toast = useToast();
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  const target = branchRows.find((b) => b.slug === removing);

  return (
    <ConsoleShell
      title="Branches"
      lede="The eleven branches exactly as the website lists them. Adding, changing or removing one takes effect when the site is rebuilt."
      actions={
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-deep px-3 py-2 text-[0.78rem] font-semibold text-cream hover:bg-green-mid"
        >
          <IconPlus className="size-4" />
          <span className="hidden sm:inline">Add new branch</span>
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Branches" value={String(totals.branches)} sub="Ten counters and one collection route" />
        <StatTile label="Collection areas" value={String(totals.areas)} sub="Listed across all branches" />
        <StatTile
          label="With a map pin"
          value={`${branchRows.filter((b) => b.hasPin).length} of ${branchRows.filter((b) => !b.pickupOnly).length}`}
          sub="Counters only; a collection route has no door"
        />
        <StatTile
          label="Needs a pin"
          value={String(branchesMissingPins.length)}
          sub={branchesMissingPins.map((b) => b.city).join(", ") || "None"}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {branchRows.map((b) => (
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
                <p className="mt-1 truncate text-[0.76rem] text-slate-500">
                  {b.pickupOnly ? "Doorstep collection across the city" : b.street}
                </p>
              </div>
              <EditButton what={`the ${b.city} branch`} compact />
            </header>

            {/* The map state, said plainly. This is the defect that hides. */}
            <p
              className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.7rem] font-medium ring-1 ring-inset ${
                b.pickupOnly
                  ? "bg-slate-100 text-slate-500 ring-slate-400/20"
                  : b.hasPin
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                    : "bg-amber-50 text-amber-800 ring-amber-600/20"
              }`}
            >
              <IconPin className="size-3" />
              {b.pickupOnly
                ? "No counter to pin"
                : b.hasPin
                  ? "Map pinned to the door"
                  : "Map searches for a landmark"}
            </p>

            <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <div>
                <dt className="text-[0.66rem] tracking-[0.04em] text-slate-400 uppercase">
                  Collection areas
                </dt>
                <dd className="mt-0.5 text-[0.95rem] font-semibold text-slate-900 tabular-nums">
                  {b.areas.length}
                </dd>
              </div>
              <div>
                <dt className="text-[0.66rem] tracking-[0.04em] text-slate-400 uppercase">
                  Phone
                </dt>
                <dd className="mt-0.5 text-[0.82rem] font-medium text-slate-700">
                  {(business.phones[b.phoneIndex] ?? business.phones[0]).label}
                </dd>
              </div>
            </dl>

            <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
              <Link
                href={`/branches/${b.slug}`}
                className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-center text-[0.76rem] font-semibold text-slate-700 hover:bg-slate-50"
              >
                View page
              </Link>
              <button
                type="button"
                onClick={() => setRemoving(b.slug)}
                className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[0.76rem] font-semibold text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ---------------- add ---------------- */}
      <Modal
        open={adding}
        title="Add a new branch"
        note="Goes to the head office. This console cannot publish on its own."
        onClose={() => setAdding(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAdding(false);
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
            <Field
              label="Map coordinates"
              hint="From the shop's own Google Maps pin. Without this the map points at a landmark."
            >
              <input className={inputClass} placeholder="10.3673, 77.9803" />
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
            hint="Separate with commas. These appear on the branch page and in search."
          >
            <textarea
              className={inputClass}
              rows={3}
              placeholder="Begambur, Palani Road, NGO Colony"
            />
          </Field>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <GhostButton onClick={() => setAdding(false)}>Cancel</GhostButton>
            <PrimaryButton type="submit">Send to head office</PrimaryButton>
          </div>
        </form>
      </Modal>

      {/* ---------------- remove ---------------- */}
      <Modal
        open={removing !== null}
        title={target ? `Remove ${target.city}${target.badge ? ` ${target.badge.toLowerCase()}` : ""}?` : "Remove branch"}
        note="Goes to the head office. This console cannot publish on its own."
        onClose={() => setRemoving(null)}
      >
        {target && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setRemoving(null);
              toast.sentToAdmin(`Removing the ${target.city} branch`);
            }}
            className="space-y-3.5"
          >
            {/* What else goes, said before it is asked for. "Are you sure?"
                asks somebody to confirm a thing they have not been told. */}
            <div className="rounded-lg bg-slate-50 p-3.5">
              <p className="text-[0.8rem] font-semibold text-slate-900">
                Removing it also takes down
              </p>
              <ul className="mt-2 space-y-1 text-[0.78rem] text-slate-600">
                <li>
                  · the page at{" "}
                  <code className="rounded bg-white px-1 py-0.5 text-[0.72rem]">
                    /branches/{target.slug}
                  </code>
                  , which customers may have saved
                </li>
                <li>· its {target.areas.length} collection areas, and their search entries</li>
                <li>· its printed QR code, which stops resolving</li>
                <li>· one card from the home page rail and the branches page</li>
              </ul>
            </div>

            <Field
              label="Why is it closing?"
              hint="Recorded so the head office can answer a customer who turns up there."
            >
              <textarea className={inputClass} rows={2} required />
            </Field>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <GhostButton onClick={() => setRemoving(null)}>Keep it</GhostButton>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-3.5 py-2 text-[0.8rem] font-semibold text-white transition-colors hover:bg-rose-700"
              >
                Request removal
              </button>
            </div>
          </form>
        )}
      </Modal>
    </ConsoleShell>
  );
}

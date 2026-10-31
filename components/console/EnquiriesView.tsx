"use client";

import { useMemo, useState } from "react";
import { branches } from "@/config/business";
import {
  CHANNELS,
  STAGES,
  type Stage,
  enquiries,
  formatDate,
} from "@/config/console";
import ConsoleShell from "./ConsoleShell";
import { IconPlus, IconSearch } from "./icons";
import { useToast } from "./Toast";
import {
  EditButton,
  Field,
  GhostButton,
  Modal,
  Panel,
  PrimaryButton,
  StageChip,
  TableWrap,
  Td,
  Th,
  inputClass,
} from "./ui";

/**
 * The enquiry list: the CRM's actual working screen.
 *
 * The filters are real. They are the one kind of interactivity a demo
 * dashboard can offer honestly, because filtering is a read: it changes what
 * is on screen without claiming anything was saved. Everything that would
 * write, the edit pencils and the logging form, ends at a toast instead, and
 * says so.
 *
 * Capped at 40 rows with the count stated. Three hundred and forty rows of
 * invented names is not more convincing than forty, it is just slower.
 */
const PAGE = 40;

export default function EnquiriesView() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<Stage | "All">("All");
  const [branch, setBranch] = useState("All");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return enquiries.filter((e) => {
      if (stage !== "All" && e.stage !== stage) return false;
      if (branch !== "All" && e.branchSlug !== branch) return false;
      if (!needle) return true;
      return (
        e.name.toLowerCase().includes(needle) ||
        e.id.toLowerCase().includes(needle) ||
        e.city.toLowerCase().includes(needle) ||
        e.phone.includes(needle)
      );
    });
  }, [q, stage, branch]);

  const shown = filtered.slice(0, PAGE);

  return (
    <ConsoleShell
      title="Enquiries"
      lede="Every enquiry received in the period, from the first call to the figure agreed. Filtering works; editing does not."
      actions={
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-deep px-3 py-2 text-[0.78rem] font-semibold text-cream hover:bg-green-mid"
        >
          <IconPlus className="size-4" />
          <span className="hidden sm:inline">Log enquiry</span>
        </button>
      }
    >
      <Panel
        title={`${filtered.length} enquiries`}
        note={
          filtered.length > PAGE
            ? `Showing the ${PAGE} most recent. Narrow the filters to see the rest.`
            : "Most recent first."
        }
      >
        {/* Filters in one row above the table, which is where a reader looks
            for them, and each one says what it is. */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative min-w-[12rem] flex-1">
            <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, reference, town or number"
              aria-label="Search enquiries"
              className={`${inputClass} pl-9`}
            />
          </div>

          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as Stage | "All")}
            aria-label="Filter by stage"
            className={`${inputClass} w-auto`}
          >
            <option value="All">All stages</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

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

          {(q || stage !== "All" || branch !== "All") && (
            <GhostButton
              onClick={() => {
                setQ("");
                setStage("All");
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
                <Th>Contact</Th>
                <Th>Branch</Th>
                <Th>Channel</Th>
                <Th right>Pieces</Th>
                <Th>Stage</Th>
                <Th right>Received</Th>
                <Th right>&nbsp;</Th>
              </tr>
            </thead>
            <tbody>
              {shown.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-slate-50">
                  <Td mute>{e.id}</Td>
                  <Td>
                    <span className="block font-medium">{e.name}</span>
                    <span className="block text-[0.72rem] text-slate-400">{e.note}</span>
                  </Td>
                  <Td mute>{e.phone}</Td>
                  <Td mute>{e.city}</Td>
                  <Td mute>{e.channel}</Td>
                  <Td right>{e.pieces}</Td>
                  <Td>
                    <StageChip stage={e.stage} />
                  </Td>
                  <Td right mute>
                    {formatDate(e.daysAgo)}
                  </Td>
                  <Td right>
                    <EditButton what={`enquiry ${e.id}`} compact />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-[0.84rem] text-slate-500">
            No enquiry matches those filters.
          </p>
        )}
      </Panel>

      <Modal
        open={open}
        title="Log an enquiry"
        note="Goes to the head office for approval. Nothing is stored by this console."
        onClose={() => setOpen(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            toast.sentToAdmin("The enquiry");
          }}
          className="space-y-3.5"
        >
          <Field label="Customer name">
            <input className={inputClass} required placeholder="Lakshmi R." />
          </Field>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Phone">
              <input className={inputClass} required placeholder="+91 98765 43210" />
            </Field>
            <Field label="Pieces offered">
              <input className={inputClass} type="number" min={1} defaultValue={4} />
            </Field>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Branch">
              <select className={inputClass} defaultValue={branches[0].slug}>
                {branches.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.city}
                    {b.badge ? ` ${b.badge.toLowerCase()}` : ""}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Came in by">
              <select className={inputClass} defaultValue={CHANNELS[0]}>
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Note" hint="What the customer has, and anything agreed on the call.">
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

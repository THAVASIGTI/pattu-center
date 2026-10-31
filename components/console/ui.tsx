"use client";

import { useEffect, useId, useRef } from "react";
import { IconArrowDown, IconArrowUp, IconClose, IconPencil } from "./icons";
import { useToast } from "./Toast";

/* ------------------------------------------------------------------ */
/* Surfaces                                                            */
/* ------------------------------------------------------------------ */

export function Panel({
  title,
  note,
  action,
  children,
  className = "",
}: {
  title?: string;
  note?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      /* min-w-0 is structural, not cosmetic. A grid item defaults to
         min-width:auto, which means it refuses to shrink below its content,
         and a chart that starts out 720px wide before its ResizeObserver
         has measured anything is content. Without this the whole overview
         grid was stretched to 770px inside a 390px phone and the page
         scrolled sideways. */
      className={`min-w-0 rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,.05)] ${className}`}
    >
      {(title || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            {title && (
              <h2 className="text-[0.9rem] font-semibold text-slate-900">{title}</h2>
            )}
            {note && <p className="mt-0.5 text-[0.74rem] text-slate-500">{note}</p>}
          </div>
          {action}
        </header>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The headline numbers                                                */
/* ------------------------------------------------------------------ */

/**
 * A stat tile, which the chart guidance is right to call a form in its own
 * right: one number with nothing to compare it against does not want a plot
 * drawn round it.
 *
 * The delta is the only place colour appears, it always carries an arrow and
 * a sign as well, and the window it compares is written out. "+18%" with no
 * arrow and no stated period is a decoration; "+18% vs previous 30 days"
 * with an arrow is a claim a reader can check.
 */
export function StatTile({
  label,
  value,
  sub,
  delta,
  deltaNote = "vs previous 30 days",
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: number;
  deltaNote?: string;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,.05)]">
      <p className="text-[0.72rem] font-medium tracking-[0.04em] text-slate-500 uppercase">
        {label}
      </p>
      <p className="mt-2 font-serif text-[1.65rem] leading-none text-slate-900 tabular-nums">
        {value}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
        {typeof delta === "number" && (
          <span
            className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.72rem] font-semibold tabular-nums ${
              up ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            }`}
          >
            {up ? <IconArrowUp className="size-3" /> : <IconArrowDown className="size-3" />}
            {up ? "+" : ""}
            {delta}%
          </span>
        )}
        <span className="text-[0.72rem] text-slate-500">
          {sub ?? (typeof delta === "number" ? deltaNote : null)}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

/**
 * The edit control, everywhere.
 *
 * There is exactly one of these in the console and it always does the same
 * thing: says who is allowed to edit. Having one component rather than a
 * pencil on each page is what stops a future screen quietly shipping a
 * button that looks identical and does nothing at all.
 */
export function EditButton({
  what,
  label = "Edit",
  compact,
}: {
  what: string;
  label?: string;
  compact?: boolean;
}) {
  const toast = useToast();
  return (
    <button
      type="button"
      onClick={() => toast.adminOnly(what)}
      aria-label={`Edit ${what}`}
      className={
        compact
          ? "inline-grid size-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          : "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[0.76rem] font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
      }
    >
      <IconPencil className="size-4" />
      {!compact && label}
    </button>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-green-deep px-3.5 py-2 text-[0.8rem] font-semibold text-cream transition-colors hover:bg-green-mid"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-[0.8rem] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Dialog                                                              */
/* ------------------------------------------------------------------ */

/**
 * A modal with the three behaviours people expect and most hand-rolled ones
 * forget: Escape closes it, the backdrop closes it, and focus moves into it
 * on open so a keyboard is not left behind on the page underneath.
 */
export function Modal({
  open,
  title,
  note,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  note?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const labelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("input,select,textarea,button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-end overflow-y-auto bg-slate-900/50 p-0 sm:place-items-center sm:p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className="relative w-full max-w-lg rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id={labelId} className="text-[1rem] font-semibold text-slate-900">
              {title}
            </h2>
            {note && <p className="mt-0.5 text-[0.76rem] text-slate-500">{note}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <IconClose className="size-4" />
          </button>
        </header>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[0.74rem] font-medium text-slate-600">{label}</span>
      <span className="mt-1 block">{children}</span>
      {hint && <span className="mt-1 block text-[0.68rem] text-slate-400">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[0.85rem] text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-green focus:ring-2 focus:ring-green/20";

/* ------------------------------------------------------------------ */
/* Table                                                               */
/* ------------------------------------------------------------------ */

export function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 overflow-x-auto sm:-mx-5">
      <div className="inline-block min-w-full px-4 align-middle sm:px-5">{children}</div>
    </div>
  );
}

export const Th = ({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: boolean;
}) => (
  <th
    scope="col"
    /* Horizontal padding is not cosmetic here. A right-aligned numeric
       column sitting against a left-aligned one has no gap at all, and the
       header row read "PIECESSTAGE" as one word. */
    className={`border-b border-slate-200 px-3 pb-2 text-[0.7rem] font-semibold tracking-[0.04em] text-slate-500 uppercase whitespace-nowrap first:pl-0 last:pr-0 ${
      right ? "text-right" : "text-left"
    }`}
  >
    {children}
  </th>
);

export const Td = ({
  children,
  right,
  mute,
}: {
  children: React.ReactNode;
  right?: boolean;
  mute?: boolean;
}) => (
  <td
    className={`border-b border-slate-100 px-3 py-2.5 text-[0.82rem] whitespace-nowrap first:pl-0 last:pr-0 ${
      right ? "text-right tabular-nums" : ""
    } ${mute ? "text-slate-500" : "text-slate-800"}`}
  >
    {children}
  </td>
);

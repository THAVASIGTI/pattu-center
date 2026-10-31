"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

/**
 * The console's toasts, and with them the console's honesty.
 *
 * Every write in here ends at a toast. Nothing is saved, because there is
 * nowhere to save it to: the site is a static export with no server and no
 * database. That is a demonstration decision, not a bug, and the toasts are
 * where it is admitted out loud. An edit button that silently did nothing
 * would be worse than one that says who is allowed to press it.
 *
 * Two of these messages are fixed by the brief and get their own helpers, so
 * the wording cannot drift from screen to screen:
 *
 *   adminOnly()   every edit control, everywhere
 *   sentToAdmin() every create form, on submit
 *
 * Tones are the status palette, not series colours. Each ships with an icon
 * and a word, never colour alone.
 */

type Tone = "info" | "success" | "warning";
type Toast = { id: number; title: string; body?: string; tone: Tone };

type Push = (t: Omit<Toast, "id">) => void;

const ToastContext = createContext<Push | null>(null);

export function useToast() {
  const push = useContext(ToastContext);
  if (!push) throw new Error("useToast must be used inside <ToastHost>");

  return useMemo(
    () => ({
      push,
      /** The brief's line, on every edit control in the console. */
      adminOnly: (what = "this record") =>
        push({
          tone: "warning",
          title: "Only an admin can edit",
          body: `Your account is read-only, so ${what} cannot be changed here. Ask the head office to raise your access.`,
        }),
      /** The brief's line, on every create form. The second sentence is
       *  the accurate part: this is a static site, so even an approved
       *  change only appears once the site is rebuilt. */
      sentToAdmin: (what: string) =>
        push({
          tone: "success",
          title: "Sent for admin approval",
          body: `${what} has gone to the head office. Nothing changes on the website until it is approved and the site is rebuilt.`,
        }),
      demo: (what: string) =>
        push({
          tone: "info",
          title: "Demonstration only",
          body: `${what} is not wired to anything. This console reads the live content but cannot publish to it.`,
        }),
    }),
    [push],
  );
}

const ICON: Record<Tone, React.ReactNode> = {
  info: (
    <path d="M12 8h.01M11 12h1v4h1" strokeLinecap="round" strokeLinejoin="round" />
  ),
  success: <path d="m8 12.5 2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />,
  warning: (
    <path d="M12 8v4.5M12 16h.01" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

const TONE: Record<Tone, { ring: string; chip: string; word: string }> = {
  info: { ring: "border-sky-200", chip: "bg-sky-50 text-sky-700", word: "Note" },
  success: {
    ring: "border-emerald-200",
    chip: "bg-emerald-50 text-emerald-700",
    word: "Done",
  },
  warning: { ring: "border-amber-200", chip: "bg-amber-50 text-amber-800", word: "Blocked" },
};

export default function ToastHost({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const seq = useRef(0);

  const push = useCallback<Push>((t) => {
    seq.current += 1;
    const id = seq.current;
    /* Newest first, and never more than three on screen. A console that
       stacks eleven toasts because somebody leaned on a button has stopped
       communicating and started obscuring the thing it is reporting on. */
    setItems((xs) => [{ ...t, id }, ...xs].slice(0, 3));
    setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 5200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      {/* aria-live so a screen reader is told what happened; the toast is
          the only feedback any of these actions give. */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-3 bottom-3 z-[80] flex flex-col items-end gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5"
      >
        {items.map((t) => {
          const tone = TONE[t.tone];
          return (
            <div
              key={t.id}
              role="status"
              className={`console-toast pointer-events-auto w-full max-w-[22rem] rounded-xl border ${tone.ring} bg-white p-3.5 shadow-[0_12px_32px_rgba(10,46,26,.18)]`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full ${tone.chip}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="size-4"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="9" opacity=".35" />
                    {ICON[t.tone]}
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[0.84rem] font-semibold text-slate-900">
                    {t.title}
                    <span
                      className={`rounded px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${tone.chip}`}
                    >
                      {tone.word}
                    </span>
                  </p>
                  {t.body && (
                    <p className="mt-1 text-[0.78rem] leading-relaxed text-slate-600">
                      {t.body}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

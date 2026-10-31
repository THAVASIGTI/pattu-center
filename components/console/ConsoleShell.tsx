"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { logoNavLight } from "@/config/content";
import {
  CONSOLE_USER,
  SESSION_HOURS,
  clearSession,
  readSession,
  sessionKey,
  timeLeftLabel,
  type Session,
} from "@/lib/console-session";
import {
  IconGrid,
  IconImage,
  IconLogout,
  IconMenu,
  IconPin,
  IconTag,
  IconUser,
  IconVideo,
} from "./icons";
import { useToast } from "./Toast";
import { useMounted } from "./useMounted";

/**
 * The frame every console page sits in, and the gate in front of it.
 *
 * THE GATE IS A DEMONSTRATION. It is explained at length in
 * lib/console-session.ts and the short version is that this is a static
 * export, so the check runs in the reader's own browser and the reader can
 * turn it off. It is here because the brief asked for a login and because a
 * dashboard without one does not read as a dashboard, not because it keeps
 * anybody out of anything. Nothing behind it is real.
 *
 * What it does do properly is expire. The five hours are carried inside the
 * cookie's value, so a session cannot be extended by editing the cookie's
 * max-age, and the check below re-runs on an interval and whenever the tab
 * is looked at again. A console left open overnight is at the login screen
 * in the morning rather than showing stale figures to whoever walks past.
 *
 * The three states matter. "checking" renders a neutral splash rather than
 * the dashboard, because the cookie cannot be read until the component is
 * mounted in a browser and flashing a dashboard at somebody before deciding
 * whether to show it to them is the one thing a gate must not do.
 */

/**
 * The cookie, subscribed to rather than polled into state.
 *
 * The session is an external system: it lives in document.cookie, it can be
 * changed by another tab, and it goes stale on a clock rather than on a
 * render. useSyncExternalStore is the hook for exactly that, and using it
 * instead of a useEffect that calls setState avoids the cascading render
 * React now warns about.
 *
 * Two things wake the subscribers, because they catch different failures.
 * The interval catches a tab left open past the five hours. The visibility
 * listener catches a laptop that was asleep, where no interval fired at all
 * and the first thing the user sees on waking would otherwise be an expired
 * dashboard.
 */
const listeners = new Set<() => void>();
let timer: number | null = null;

function wake() {
  for (const l of listeners) l();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (timer === null) {
    timer = window.setInterval(wake, 30_000);
    document.addEventListener("visibilitychange", wake);
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0 && timer !== null) {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", wake);
      timer = null;
    }
  };
}

/* Five sections, one per kind of content the website is made of. They were
   a CRM once, invented enquiries and purchases, and that was replaced: a
   console attached to a real site should manage the real site. */
const NAV = [
  { href: "/console/control/overview", label: "Overview", Icon: IconGrid },
  { href: "/console/control/hero", label: "Hero images", Icon: IconImage },
  { href: "/console/control/branches", label: "Branches", Icon: IconPin },
  { href: "/console/control/categories", label: "Categories", Icon: IconTag },
  { href: "/console/control/gallery", label: "Gallery", Icon: IconVideo },
] as const;

export default function ConsoleShell({
  title,
  lede,
  actions,
  children,
}: {
  title: string;
  lede?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  /* "" on the server and on the first hydration render, so the markup
     matches; React then re-reads on the client and renders the real
     answer. That is why the splash below is the prerendered state: a
     static export cannot know who is signed in. */
  const key = useSyncExternalStore(subscribe, sessionKey, () => "");
  const session: Session | null = useMemo(() => (key ? readSession() : null), [key]);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted || session) return;
    /* Expired or absent. Clear whatever is left so a stale cookie is not
       re-read on the login screen, then go there. */
    clearSession();
    router.replace("/console/control");
  }, [mounted, session, router]);

  // Close the profile panel on an outside click or on Escape.
  useEffect(() => {
    if (!profileOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) setProfileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProfileOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  if (!session) {
    return (
      <div className="grid min-h-dvh place-items-center bg-slate-100 px-6">
        <div className="text-center">
          <span
            aria-hidden
            className="mx-auto block size-7 animate-spin rounded-full border-2 border-slate-300 border-t-green"
          />
          <p className="mt-4 text-[0.82rem] text-slate-500">
            {mounted ? "Taking you to sign in…" : "Checking your session…"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-slate-100 text-slate-800 lg:flex">
      <Sidebar pathname={pathname} open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            className="grid size-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open navigation"
          >
            <IconMenu />
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.95rem] font-semibold text-slate-900">{title}</p>
            {/* This used to say "sample data". It cannot now: the figures
                are counted from the live content. What is still true, and
                what this has to say instead, is that nothing here saves. */}
            <p className="truncate text-[0.72rem] text-slate-500">
              Live content · changes are sent for approval, not published
            </p>
          </div>

          {actions}

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              aria-expanded={profileOpen}
              aria-haspopup="dialog"
              className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pr-3 pl-1 transition-colors hover:bg-slate-50"
            >
              <span className="grid size-8 place-items-center rounded-full bg-green-deep text-[0.72rem] font-semibold text-yellow-light">
                SK
              </span>
              <span className="hidden text-[0.8rem] font-medium text-slate-700 sm:block">
                {CONSOLE_USER.name}
              </span>
            </button>

            {profileOpen && (
              <ProfilePanel
                session={session}
                onSignOut={() => {
                  clearSession();
                  router.replace("/console/control");
                }}
              />
            )}
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-[80rem]">
            {lede && <p className="mb-6 max-w-[70ch] text-[0.9rem] text-slate-600">{lede}</p>}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar({
  pathname,
  open,
  onClose,
}: {
  pathname: string;
  open: boolean;
  onClose: () => void;
}) {
  const nav = (
    <nav className="flex h-full flex-col bg-green-deep text-cream">
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-5">
        <Image src={logoNavLight} alt="" width={32} height={32} className="size-8" />
        <span className="min-w-0">
          <span className="block truncate font-serif text-[0.98rem] leading-tight text-white">
            Kamatchi Pattu
          </span>
          <span className="block text-[0.6rem] font-semibold tracking-[0.18em] text-yellow-light/80 uppercase">
            Console
          </span>
        </span>
      </div>

      <ul className="flex-1 space-y-1 p-3">
        {NAV.map(({ href, label, Icon }) => {
          /* startsWith so a detail route under a section keeps that section
             lit. Overview is exact, or it would match everything. */
          const active =
            href.endsWith("/overview") ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.88rem] transition-colors ${
                  active
                    ? "bg-white/12 font-semibold text-white"
                    : "text-cream/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={active ? "size-[18px] text-yellow-light" : "size-[18px]"} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Said on every screen rather than buried in a tooltip, and the
          wording changed with the data. The numbers are real now, read from
          the files the site is built from; what is not real is the editing.
          The sidebar is the one piece of furniture always on screen, so it
          is where the caveat belongs. */}
      <p className="m-3 rounded-lg bg-white/5 p-3 text-[0.68rem] leading-relaxed text-cream/60">
        The figures here are read from the live site. Editing is a
        demonstration: the site is a static export, so content changes only
        take effect when it is rebuilt.
      </p>
    </nav>
  );

  return (
    <>
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="fixed inset-y-0 left-0 w-60">{nav}</div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50"
          />
          <div className="absolute inset-y-0 left-0 w-64">{nav}</div>
        </div>
      )}
    </>
  );
}

function ProfilePanel({
  session,
  onSignOut,
}: {
  session: Session;
  onSignOut: () => void;
}) {
  const toast = useToast();
  /* Ticks so the countdown is honest while the panel is open. One second is
     fine for a panel that is only ever open for a few of them. */
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const rows: [string, string][] = [
    ["Username", CONSOLE_USER.username],
    ["Role", CONSOLE_USER.role],
    ["Access", CONSOLE_USER.access],
    ["Branch", CONSOLE_USER.branch],
    ["Email", CONSOLE_USER.email],
  ];

  return (
    <div
      role="dialog"
      aria-label="Your account"
      className="absolute right-0 z-50 mt-2 w-[19rem] rounded-xl border border-slate-200 bg-white p-4 shadow-[0_18px_44px_rgba(15,23,42,.18)]"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-deep text-[0.9rem] font-semibold text-yellow-light">
          SK
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.92rem] font-semibold text-slate-900">
            {CONSOLE_USER.name}
          </p>
          <p className="truncate text-[0.76rem] text-slate-500">{CONSOLE_USER.role}</p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 border-t border-slate-100 pt-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4">
            <dt className="shrink-0 text-[0.72rem] text-slate-500">{k}</dt>
            <dd className="truncate text-right text-[0.78rem] font-medium text-slate-800">
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 rounded-lg bg-slate-50 p-3">
        <p className="flex items-center justify-between text-[0.72rem] text-slate-500">
          Session
          <span className="font-semibold text-slate-800">{timeLeftLabel(session, now)}</span>
        </p>
        <p className="mt-1 text-[0.68rem] leading-relaxed text-slate-500">
          Sign-ins last {SESSION_HOURS} hours. After that this console returns to
          the login screen on its own.
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => toast.adminOnly("your profile")}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[0.78rem] font-semibold text-slate-700 hover:bg-slate-50"
        >
          <IconUser className="size-4" />
          Edit profile
        </button>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-deep px-3 py-2 text-[0.78rem] font-semibold text-cream hover:bg-green-mid"
        >
          <IconLogout className="size-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}

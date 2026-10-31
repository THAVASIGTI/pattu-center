"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logoNavLight } from "@/config/content";
import { SESSION_HOURS, checkCredentials, grantSession, readSession } from "@/lib/console-session";
import { IconLock } from "./icons";
import { inputClass } from "./ui";
import { useMounted } from "./useMounted";

/**
 * The sign-in screen.
 *
 * What it is NOT is explained in full in lib/console-session.ts: the check
 * runs in the reader's browser, so it is a demonstration and not a control.
 * The notice at the foot of the card says as much on screen, because a login
 * box that implies protection it does not provide is the kind of lie that
 * eventually gets believed by somebody deciding where to put real data.
 *
 * Three details that make it behave like a real one:
 *
 * A live session skips it. Arriving here with five unexpired hours in the
 * cookie bounces straight through to the dashboard, which is what every
 * signed-in user expects of a login URL.
 *
 * One error message for both fields. "No such user" and "wrong password"
 * told apart is how an attacker enumerates accounts, and the habit is worth
 * keeping even where, as here, there is one account and it is in the source.
 *
 * The submit is deliberately not instant. checkCredentials hashes, which is
 * fast, so without the small floor below the form would flicker rather than
 * respond and the failure would look like a bug rather than a rejection.
 */
export default function LoginView() {
  const router = useRouter();
  const mounted = useMounted();
  /* Derived, not stored. The cookie is the source of truth and reading it
     during render is a read; copying it into state through an effect is the
     cascading render React warns about. */
  const alreadyIn = mounted && Boolean(readSession());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (alreadyIn) router.replace("/console/control/overview");
  }, [alreadyIn, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const [ok] = await Promise.all([
      checkCredentials(username.trim(), password),
      new Promise((r) => setTimeout(r, 420)),
    ]);
    if (ok) {
      grantSession(username.trim());
      router.replace("/console/control/overview");
      return;
    }
    setBusy(false);
    setPassword("");
    setError("That username and password do not match. Please try again.");
  }

  if (!mounted || alreadyIn) {
    return (
      <div className="grid min-h-dvh place-items-center bg-green-deep">
        <span
          aria-hidden
          className="size-7 animate-spin rounded-full border-2 border-white/25 border-t-yellow-light"
        />
      </div>
    );
  }

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-green-deep px-5 py-10">
      {/* A quiet nod to the site it belongs to, nowhere near the type. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(90deg,rgba(253,224,71,.6)_0_1px,transparent_1px_14px)]"
      />

      <div className="relative w-full max-w-[25rem]">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src={logoNavLight} alt="" width={56} height={56} className="size-14" />
          <h1 className="mt-3 font-serif text-[1.5rem] text-white">Kamatchi Pattu Center</h1>
          <p className="mt-1 text-[0.72rem] font-semibold tracking-[0.2em] text-yellow-light/80 uppercase">
            Staff console
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/10 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,.35)]"
        >
          <h2 className="text-[1.05rem] font-semibold text-slate-900">Sign in</h2>
          <p className="mt-1 text-[0.78rem] text-slate-500">
            Enter the credentials issued to you by the head office.
          </p>

          <div className="mt-5 space-y-3.5">
            <label className="block">
              <span className="block text-[0.74rem] font-medium text-slate-600">Username</span>
              <input
                className={`mt-1 ${inputClass}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
              />
            </label>

            <label className="block">
              <span className="block text-[0.74rem] font-medium text-slate-600">Password</span>
              <input
                className={`mt-1 ${inputClass}`}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-[0.76rem] text-rose-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-deep px-4 py-2.5 text-[0.88rem] font-semibold text-cream transition-colors hover:bg-green-mid disabled:opacity-70"
          >
            {busy ? (
              <>
                <span
                  aria-hidden
                  className="size-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream"
                />
                Checking…
              </>
            ) : (
              <>
                <IconLock className="size-4" />
                Sign in
              </>
            )}
          </button>

          <p className="mt-4 flex items-start gap-2 border-t border-slate-100 pt-3 text-[0.68rem] leading-relaxed text-slate-500">
            <IconLock className="mt-0.5 size-3.5 shrink-0 text-slate-400" />
            <span>
              Demonstration console. The check runs in your browser, so this is not
              a security control, and nothing behind it is real data. A sign-in
              lasts {SESSION_HOURS} hours.
            </span>
          </p>
        </form>

        <p className="mt-5 text-center text-[0.75rem] text-cream/50">
          <Link href="/" className="underline-offset-4 hover:text-cream hover:underline">
            Back to kamatchipattucenter.com
          </Link>
        </p>
      </div>
    </div>
  );
}

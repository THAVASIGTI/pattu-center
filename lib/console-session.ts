/**
 * The console's sign-in, such as it is.
 *
 * READ THIS BEFORE TRUSTING IT WITH ANYTHING.
 *
 * This site is a static export. There is no server, no session store and no
 * request this code could be checked on: every byte below is shipped to the
 * browser and runs there. That means the gate at /console/control is a
 * DEMONSTRATION, not a security control. Anyone who opens devtools can read
 * this file, call `grantSession()` from the console, or simply request a
 * dashboard page directly. Nothing here would stop them, and nothing here
 * could.
 *
 * That is acceptable for exactly one reason: there is nothing behind it. The
 * console shows invented figures over data that is already public on the
 * marketing site, and every write is a toast rather than a save. The moment
 * it holds a real customer's name or a real payout, this has to be replaced
 * with a server that checks a session, and the static export has to go with
 * it.
 *
 * The credential is stored as a SHA-256 digest rather than as two string
 * literals. That is not security either, for all the reasons above; it is so
 * that a working password is not sitting in plain text in a public GitHub
 * repository where a search engine can index it. The difference matters only
 * because people reuse passwords.
 */

/** sha256("sarath_1:Sarath#123$"). See the note above on why it is hashed. */
const CREDENTIAL_DIGEST =
  "552f589f4a58703acec3bf9c556f2ce351f0215837409fae7588c07d898b44e4";

/** The one account, for display. The password is not here by design. */
export const CONSOLE_USER = {
  username: "sarath_1",
  name: "M. Sarathkumar",
  role: "Partner",
  /** Viewer because every write in this console is a toast. See the edit
   *  guard in components/console/Toast.tsx. */
  access: "Viewer (read-only)",
  branch: "Madurai, head office",
  email: "srichenu84@gmail.com",
} as const;

const COOKIE = "kpc_console";

/** Five hours, the client's number. Stored inside the value as well as on
 *  the cookie, so clearing the browser's idea of expiry does not extend the
 *  session; see readSession. */
export const SESSION_HOURS = 5;
const SESSION_MS = SESSION_HOURS * 60 * 60 * 1000;

export type Session = { username: string; issuedAt: number; expiresAt: number };

/* btoa/atob handle the latin-1 range, which is all this payload is: a
   username, two numbers and some JSON punctuation. */
const encode = (s: Session) => btoa(JSON.stringify(s));
const decode = (raw: string): Session | null => {
  try {
    const s = JSON.parse(atob(raw)) as Partial<Session>;
    if (typeof s.username !== "string") return null;
    if (typeof s.issuedAt !== "number" || typeof s.expiresAt !== "number") return null;
    return s as Session;
  } catch {
    return null;
  }
};

/** Constant-time-ish compare. The timing of a string compare is not a real
 *  threat here, but writing the sloppy version invites copying it somewhere
 *  it would be. */
function sameDigest(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function sha256Hex(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * True if the pair matches the one account.
 *
 * crypto.subtle needs a secure context, which means https or localhost. The
 * site is https and dev runs on localhost, so the only way to land in the
 * catch is an http origin, where the honest answer is "no" rather than a
 * silent pass.
 */
export async function checkCredentials(username: string, password: string) {
  try {
    return sameDigest(await sha256Hex(`${username}:${password}`), CREDENTIAL_DIGEST);
  } catch {
    return false;
  }
}

export function grantSession(username: string = CONSOLE_USER.username): Session {
  const now = Date.now();
  const session: Session = { username, issuedAt: now, expiresAt: now + SESSION_MS };
  document.cookie = [
    `${COOKIE}=${encode(session)}`,
    "path=/",
    `max-age=${Math.floor(SESSION_MS / 1000)}`,
    "samesite=lax",
    location.protocol === "https:" ? "secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
  return session;
}

export function clearSession() {
  document.cookie = `${COOKIE}=; path=/; max-age=0; samesite=lax`;
}

/**
 * The live session, or null.
 *
 * Checks the expiry held INSIDE the value rather than trusting the cookie to
 * have gone. A cookie's max-age is the browser's business and can be edited;
 * the timestamp in the payload is what the five hours actually means.
 *
 * PURE ON PURPOSE. It reads and returns; it never clears. This is called
 * from a useSyncExternalStore snapshot, which React may invoke during
 * render, and a function that writes a cookie while React is rendering is a
 * side effect in the one place side effects are not allowed. Clearing an
 * expired cookie is the shell's job, on its way to the login screen.
 */
export function readSession(): Session | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (!raw) return null;
  const session = decode(raw);
  if (!session) return null;
  if (Date.now() >= session.expiresAt) return null;
  return session;
}

/**
 * The session as a plain string, for useSyncExternalStore.
 *
 * A snapshot has to be comparable with Object.is, so it cannot be a fresh
 * object every call or React re-renders for ever. An empty string means
 * signed out, and is also what the server snapshot returns, so the first
 * hydration render matches the markup that was prerendered.
 */
export function sessionKey(): string {
  const s = readSession();
  return s ? `${s.username}|${s.expiresAt}` : "";
}

/** "4h 12m left", for the profile panel. */
export function timeLeftLabel(session: Session, now = Date.now()) {
  const ms = Math.max(0, session.expiresAt - now);
  const mins = Math.floor(ms / 60000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m left` : `${m}m left`;
}

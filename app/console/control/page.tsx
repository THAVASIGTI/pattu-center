import LoginView from "@/components/console/LoginView";

export const metadata = { title: "Sign in" };

/** The console's front door. Everything it does is client-side, and why
 *  that is a demonstration rather than a control is set out in
 *  lib/console-session.ts. */
export default function ConsoleLoginPage() {
  return <LoginView />;
}

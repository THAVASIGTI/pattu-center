import type { Metadata } from "next";
import ToastHost from "@/components/console/Toast";

/**
 * The console's own root, separate from the marketing site's.
 *
 * It gets none of the site chrome because it is outside the (site) route
 * group, and that is the whole reason the group exists.
 *
 * noindex is not decoration. This is a demonstration dashboard reached from
 * a URL nobody links to, and a search engine that found it would index a
 * login screen and a pile of invented figures under the shop's own domain.
 * nofollow goes with it so the crawler does not walk into the dashboard
 * routes from here either.
 */
export const metadata: Metadata = {
  title: {
    default: "Console",
    template: "%s · Console",
  },
  robots: { index: false, follow: false, nocache: true },
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return <ToastHost>{children}</ToastHost>;
}

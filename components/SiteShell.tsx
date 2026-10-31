import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileActionBar from "@/components/MobileActionBar";
import ScrollThread from "@/components/ScrollThread";
import SocialDock from "@/components/SocialDock";

/**
 * The marketing site's chrome, lifted out of the root layout.
 *
 * It used to live in app/layout.tsx, which meant every route on the domain
 * got a header, a footer, a social dock and a fixed phone bar whether it
 * wanted them or not. The console at /console/control wants none of them: it
 * is a dashboard, and a dashboard with a "Get a Price" button in its header
 * is not a dashboard. So the root layout now carries only <html>, <body> and
 * the fonts, and this is what the (site) group wraps its pages in.
 *
 * The bottom padding comes with it. MobileActionBar is fixed to the foot of
 * a phone screen, and the 58px keeps the last line of a page from sitting
 * under it; on a console page there is no bar, so there should be no gap.
 *
 * Used by the (site) layout and by not-found, which sits outside that group
 * because a static export builds its 404 from the app root.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-[58px] xl:pb-0">
      {/* Reveal renders its children at opacity 0 and only an
          IntersectionObserver brings them back, so without JavaScript 25 of
          these blocks and 8 of the 12 section headings on the home page are
          invisible: the page is a static export whose content needs a
          script to be seen at all. The reduced-motion rule in globals.css
          already forces [data-reveal] visible; this does the same when
          nothing is running to set it. */}
      <noscript>
        <style>{`[data-reveal],[data-word]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <ScrollThread />
      <Header />
      <main>{children}</main>
      <Footer />
      <SocialDock />
      <MobileActionBar />
    </div>
  );
}

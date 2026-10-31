import SiteShell from "@/components/SiteShell";
import { Button, Section, Wrap } from "@/components/ui";

/**
 * Wraps itself in the site chrome rather than inheriting it.
 *
 * A static export builds its 404 from the app root, which is outside the
 * (site) route group, so this page does not get that group's layout. It
 * reaches for the same shell directly instead. Without this it would render
 * as a bare paragraph on a white page with no way back.
 */
export default function NotFound() {
  return (
    <SiteShell>
      <Section>
        <Wrap className="py-10 text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-yellow-ink">
            404
          </p>
          <h1 className="mt-3 font-serif text-[clamp(1.8rem,6vw,3rem)] text-green-deep">
            That page has been folded away.
          </h1>
          <p className="mx-auto mt-4 max-w-[48ch] text-ink-soft">
            The page you were looking for doesn&apos;t exist. Try our branches, or head
            back home.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            <Button href="/" variant="yellow">
              Back to home
            </Button>
            <Button href="/branches" variant="outline">
              See all branches
            </Button>
          </div>
        </Wrap>
      </Section>
    </SiteShell>
  );
}

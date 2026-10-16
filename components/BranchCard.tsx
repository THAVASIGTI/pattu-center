import Link from "next/link";
import type { Branch } from "@/config/business";
import { business } from "@/config/business";
import { ArrowRight, Clock, Phone, Pin } from "./Icons";
import { ZariBand } from "./Zari";

/**
 * A branch, at length. Used on /branches only: the home page shows the same
 * branches as a compact index instead, so this one is free to carry
 * everything a visitor might want before she decides to travel.
 *
 * The head office gets a real woven band across its top and the others get a
 * gold thread that draws across on hover, which is the whole hierarchy: one
 * card is marked permanently, the rest answer when you point at them.
 *
 * The city name does the work the icon used to. A 34px pin in a circle is the
 * same size on eleven cards and tells you nothing; the name set large is what
 * anyone is actually scanning for.
 */
export default function BranchCard({ branch }: { branch: Branch }) {
  const phone = business.phones[branch.phoneIndex] ?? business.phones[0];
  const pill =
    "inline-flex min-h-10 items-center gap-1.5 rounded-full bg-cream-2 px-3.5 py-1.5 text-[0.83rem] font-semibold text-green transition-colors hover:bg-green hover:text-cream";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line glass-soft shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-yellow hover:shadow-mid">
      {branch.isHeadOffice ? (
        <ZariBand className="h-7" />
      ) : (
        <span
          aria-hidden
          className="foil absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-[1.45rem] leading-tight text-green-deep">
          {branch.city}
          {branch.isHeadOffice && (
            <span className="ml-2 rounded-full bg-green/10 px-2 py-0.5 align-middle font-sans text-[0.6rem] font-semibold tracking-[0.12em] text-green uppercase">
              Head Office
            </span>
          )}
          {/* Tells the two Thoothukudi and two Thanjavur counters apart. */}
          {branch.badge && (
            <span className="ml-2 rounded-full bg-yellow/15 px-2 py-0.5 align-middle font-sans text-[0.6rem] font-semibold tracking-[0.12em] text-yellow-ink uppercase">
              {branch.badge}
            </span>
          )}
        </h3>

        <address className="mt-2.5 flex flex-1 gap-2.5 text-[0.92rem] leading-relaxed text-ink-soft not-italic">
          <Pin aria-hidden className="mt-1 size-4 shrink-0 text-yellow-ink" />
          <span>
            {branch.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </address>

        {/* The two things a seller asks next: when can I come, and do you
            reach my street. Both are already in the data, so neither is a
            claim this card invents. */}
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.82rem] text-ink-mute">
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5 text-yellow-ink" />
            Open all seven days
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Pin aria-hidden className="size-3.5 text-yellow-ink" />
            {branch.areas.length} areas collected
          </span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
          <a href={phone.href} className={pill}>
            <Phone className="size-3.5" />
            Call
          </a>
          <Link href={`/branches/${branch.slug}`} className={pill}>
            Branch page
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

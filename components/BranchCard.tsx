import Link from "next/link";
import type { Branch } from "@/config/business";
import { business } from "@/config/business";
import { ArrowRight, Phone, Pin } from "./Icons";

export default function BranchCard({ branch }: { branch: Branch }) {
  const phone = business.phones[branch.phoneIndex] ?? business.phones[0];
  const pill =
    "inline-flex min-h-10 items-center gap-1.5 rounded-full bg-cream-2 px-3.5 py-1.5 text-[0.83rem] font-semibold text-green transition-colors hover:bg-green hover:text-cream";

  return (
    <article className="flex flex-col rounded-[22px] border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-line-yellow hover:shadow-mid">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-yellow-pale">
          <Pin className="size-[15px] text-green" />
        </span>
        <h3 className="font-serif text-[1.25rem] text-green-deep">
          {branch.city}
          {branch.isHeadOffice && (
            <span className="ml-2 rounded-full bg-green/10 px-2 py-0.5 align-middle font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-green">
              Head Office
            </span>
          )}
        </h3>
      </div>

      <address className="flex-1 text-[0.92rem] leading-relaxed text-ink-soft not-italic">
        {branch.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
        <a href={phone.href} className={pill}>
          <Phone className="size-3.5" />
          Call
        </a>
        <Link href={`/branches/${branch.slug}`} className={pill}>
          Branch page
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";
import { img } from "@/config/content";
import { Crumbs, Ornament, Wrap } from "./ui";

/** Shared hero band for every inner page. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image = img(7676347),
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  image?: string;
  crumbs: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-green-deep text-cream">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[radial-gradient(780px_440px_at_10%_2%,rgba(202,154,4,.24),transparent_58%),radial-gradient(680px_560px_at_92%_96%,rgba(34,197,94,.46),transparent_64%),linear-gradient(172deg,rgba(10,46,26,.84),rgba(10,46,26,.95))]" />
      </div>

      <Wrap className="relative z-10 py-11 text-center sm:py-16 lg:py-20">
        <Crumbs items={crumbs} />
        <Ornament />
        {eyebrow && (
          <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-yellow-light">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2.5 font-serif text-[clamp(2rem,7vw,3.4rem)] leading-[1.14] text-white">
          {title}
        </h1>
        {lead && <p className="mx-auto mt-3.5 max-w-[58ch] text-cream/75">{lead}</p>}
        {children && <div className="mt-6 flex flex-wrap justify-center gap-2.5">{children}</div>}
      </Wrap>
    </section>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { Lotus } from "./Icons";

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-7 ${className}`}>{children}</div>;
}

export function Section({
  children,
  tone = "plain",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "plain" | "cream" | "green";
  className?: string;
  id?: string;
}) {
  const tones = {
    plain: "",
    cream: "bg-[linear-gradient(180deg,#eef4ea_0%,#e4f0e6_50%,#eef4ea_100%)]",
    green:
      "text-cream bg-[radial-gradient(760px_440px_at_88%_-10%,rgba(202,154,4,.18),transparent_62%),radial-gradient(620px_520px_at_6%_104%,rgba(34,197,94,.34),transparent_66%),linear-gradient(168deg,#14532d_0%,#0a2e1a_100%)]",
  };
  return (
    // overflow-x-clip contains decorative transforms (slide-in reveals, offset
    // rings) without creating a scroll container or affecting the sticky header
    <section
      id={id}
      className={`overflow-x-clip py-14 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

export function Ornament({ align = "center" }: { align?: "center" | "left" }) {
  const rule = "h-px w-8 sm:w-12 foil";
  return (
    <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : "justify-start"}`}>
      {align === "center" && <span className={rule} />}
      <Lotus className="size-5 shrink-0 text-yellow" />
      <span className={rule} />
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`mb-8 sm:mb-12 max-w-[660px] ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <Ornament align={align} />
      <p className={`mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${tone === "dark" ? "text-yellow-light" : "text-yellow"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-2.5 font-serif text-[clamp(1.6rem,5.4vw,2.7rem)] leading-[1.16] ${tone === "dark" ? "text-white" : "text-green-deep"}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-3.5 text-[1.02rem] ${tone === "dark" ? "text-cream/75" : "text-ink-soft"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const btnBase =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] border-transparent px-6 py-3 text-[0.93rem] font-semibold transition-all duration-200 active:translate-y-px";

const variants = {
  yellow: "foil text-[#3a2a06] shadow-[0_6px_20px_rgba(202,154,4,.36)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(202,154,4,.46)]",
  whatsapp: "bg-[#25d366] text-[#06301a] shadow-[0_6px_20px_rgba(37,211,102,.34)] hover:-translate-y-0.5 hover:bg-[#37e378]",
  green: "grad-green text-[#eafff0] shadow-[0_6px_20px_rgba(21,128,61,.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(21,128,61,.5)]",
  ghost: "border-cream/40 text-cream hover:-translate-y-0.5 hover:border-cream hover:bg-cream/10",
  outline: "border-green text-green hover:-translate-y-0.5 hover:bg-green hover:text-cream",
} as const;

type BtnProps = {
  href: string;
  variant?: keyof typeof variants;
  external?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({ href, variant = "yellow", external, className = "", children }: BtnProps) {
  const cls = `${btnBase} ${variants[variant]} ${className}`;
  if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-line-yellow hover:shadow-mid ${className}`}
    >
      <span className="foil absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 text-[0.8rem] text-cream/55">
      {items.map((it, i) => (
        <span key={it.label}>
          {i > 0 && <span className="mx-2">/</span>}
          {it.href ? (
            <Link href={it.href} className="transition-colors hover:text-yellow-light">
              {it.label}
            </Link>
          ) : (
            <span>{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

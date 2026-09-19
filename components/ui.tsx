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
  tone?: "plain" | "cream" | "royal";
  className?: string;
  id?: string;
}) {
  const tones = {
    plain: "",
    cream: "bg-[linear-gradient(180deg,#edf2fb_0%,#e4ecf9_50%,#edf2fb_100%)]",
    royal:
      "text-cream bg-[radial-gradient(760px_440px_at_88%_-10%,rgba(192,145,47,.18),transparent_62%),radial-gradient(620px_520px_at_6%_104%,rgba(58,99,216,.34),transparent_66%),linear-gradient(168deg,#1a3480_0%,#0a1738_100%)]",
  };
  return (
    <section id={id} className={`py-14 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}

export function Ornament({ align = "center" }: { align?: "center" | "left" }) {
  const rule = "h-px w-8 sm:w-12 foil";
  return (
    <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : "justify-start"}`}>
      {align === "center" && <span className={rule} />}
      <Lotus className="size-5 shrink-0 text-gold" />
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
      <p className={`mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${tone === "dark" ? "text-gold-light" : "text-gold"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-2.5 font-serif text-[clamp(1.6rem,5.4vw,2.7rem)] leading-[1.16] ${tone === "dark" ? "text-white" : "text-royal-deep"}`}>
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
  gold: "foil text-[#3a2a06] shadow-[0_6px_20px_rgba(192,145,47,.36)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(192,145,47,.46)]",
  whatsapp: "bg-[#25d366] text-[#06301a] shadow-[0_6px_20px_rgba(37,211,102,.34)] hover:-translate-y-0.5 hover:bg-[#37e378]",
  royal: "grad-royal text-[#eaf0ff] shadow-[0_6px_20px_rgba(30,64,175,.4)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(30,64,175,.5)]",
  ghost: "border-cream/40 text-cream hover:-translate-y-0.5 hover:border-cream hover:bg-cream/10",
  outline: "border-royal text-royal hover:-translate-y-0.5 hover:bg-royal hover:text-cream",
} as const;

type BtnProps = {
  href: string;
  variant?: keyof typeof variants;
  external?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({ href, variant = "gold", external, className = "", children }: BtnProps) {
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
      className={`group relative flex flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-line-gold hover:shadow-mid ${className}`}
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
            <Link href={it.href} className="transition-colors hover:text-gold-light">
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

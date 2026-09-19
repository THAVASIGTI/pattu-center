import Link from "next/link";
import { business, waLink } from "@/config/business";
import { Phone, Pin, WhatsApp } from "./Icons";

/** Fixed bottom bar on small screens — call, WhatsApp and branches always reachable. */
export default function MobileActionBar() {
  const cell =
    "flex min-h-[58px] flex-col items-center justify-center gap-1 px-1.5 py-2 text-[0.71rem] font-semibold tracking-wide text-gold-pale active:bg-gold/15";

  return (
    <div className="fixed inset-x-0 bottom-0 z-[75] grid grid-cols-3 border-t border-gold/35 bg-[linear-gradient(90deg,rgba(10,23,56,.98),rgba(20,42,107,.98),rgba(10,23,56,.98))] pb-[env(safe-area-inset-bottom)] backdrop-blur-md xl:hidden">
      <a href={business.phones[0].href} className={cell}>
        <Phone className="size-[19px]" />
        <span>Call</span>
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cell} border-x border-gold/20`}
      >
        <WhatsApp className="size-[19px] text-[#6ef0a0]" />
        <span>WhatsApp</span>
      </a>
      <Link href="/branches" className={cell}>
        <Pin className="size-[19px]" />
        <span>Branches</span>
      </Link>
    </div>
  );
}

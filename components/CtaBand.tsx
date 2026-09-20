import { business, waLink } from "@/config/business";
import { Phone, WhatsApp } from "./Icons";
import { Button, Section, Wrap } from "./ui";

/** Closing call-to-action reused at the bottom of every page. */
export default function CtaBand({
  title = "Find out what your silk is worth today.",
}: {
  title?: string;
}) {
  return (
    <Section>
      <Wrap>
        <div className="relative grid gap-6 overflow-hidden rounded-[30px] border border-yellow/30 p-8 shadow-deep sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-8 bg-[radial-gradient(520px_280px_at_88%_6%,rgba(202,154,4,.28),transparent_64%),radial-gradient(460px_320px_at_4%_96%,rgba(34,197,94,.45),transparent_66%),linear-gradient(140deg,#15803d,#0a2e1a)]">
          <div>
            <h2 className="max-w-[18ch] font-serif text-[clamp(1.6rem,5vw,2.5rem)] leading-tight text-white">
              {title}
            </h2>
            <p className="mt-3 font-tamil text-yellow-light">
              {business.tagline}. இன்றே அழையுங்கள்
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button href={business.phones[0].href} variant="yellow" className="flex-1 sm:flex-none">
              <Phone className="size-[17px]" />
              Call now
            </Button>
            <Button href={waLink()} variant="ghost" external className="flex-1 sm:flex-none">
              <WhatsApp className="size-[17px]" />
              WhatsApp
            </Button>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

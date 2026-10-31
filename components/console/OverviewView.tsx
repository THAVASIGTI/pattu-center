"use client";

import Link from "next/link";
import {
  type Section,
  branchRows,
  branchesMissingPins,
  inventory,
  inventoryItems,
  issues,
  issuesBySeverity,
  totals,
} from "@/config/console";
import ConsoleShell from "./ConsoleShell";
import { BarChart, HBarChart } from "./Charts";
import { IconPin } from "./icons";
import { EditButton, Panel, StatTile, TableWrap, Td, Th } from "./ui";

/**
 * What the site contains, and what is wrong with it.
 *
 * Both halves are counted from the files the live site renders from, so
 * every figure on this screen is checkable by opening the website. There
 * are no trends here and no charts of change over time, because content is
 * not a time series and inventing one would be the only way to draw it.
 * What a content dashboard can honestly show is how much there is, how it
 * is distributed, and where it is thin.
 *
 * The attention list is the part worth having. Every entry is a real defect
 * in the real content, found while the site was built and still true: two
 * branches whose maps point at a landmark rather than a door, a set of
 * collection areas nobody at the shop confirmed, three placeholder reviews.
 * A dashboard that only ever says everything is fine is decoration.
 */
const SEVERITY_STYLE: Record<string, string> = {
  "Needs a decision": "bg-amber-50 text-amber-800 ring-amber-600/20",
  "Worth fixing": "bg-sky-50 text-sky-700 ring-sky-600/20",
  "For information": "bg-slate-100 text-slate-600 ring-slate-400/20",
};

const SECTIONS: Section[] = ["Branches", "What we buy", "Pictures & video", "Words"];

export default function OverviewView() {
  /* inventoryItems, not inventory: the derived rows are excluded. Summing
     11 branches with their own 127 collection areas gave a "Branches" bar
     of 138, three times the next one, which is three different units added
     together and told the reader nothing. */
  const bySection = SECTIONS.map((section) => ({
    label: section === "Pictures & video" ? "Pictures" : section,
    value: inventoryItems
      .filter((i) => i.section === section)
      .reduce((s, i) => s + i.count, 0),
  }));

  return (
    <ConsoleShell
      title="Overview"
      lede="Everything the website is made of, counted from the files it is built from. Open any page on the site and these numbers will match it."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Branches" value={String(totals.branches)} sub={`${totals.areas} collection areas`} />
        <StatTile
          label="Pictures & video"
          value={String(totals.media)}
          sub={`${totals.images} photographs, ${totals.videos} clips`}
        />
        <StatTile label="Public pages" value={String(totals.pages)} sub="Including a branch page each" />
        <StatTile
          label="Needs attention"
          value={String(issues.length)}
          sub={`${issuesBySeverity[0].items.length} need a decision`}
        />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-5">
        <Panel
          className="xl:col-span-2"
          title="Content by area"
          note="Countable items only. Collection areas belong to a branch, so they are counted with it rather than beside it."
        >
          <BarChart data={bySection} />
        </Panel>

        <Panel
          className="xl:col-span-3"
          title="Collection areas by branch"
          note="The towns and streets each branch says it collects from."
          action={
            <Link
              href="/console/control/branches"
              className="text-[0.76rem] font-semibold text-green hover:underline"
            >
              Manage branches
            </Link>
          }
        >
          <HBarChart
            data={branchRows.map((b) => ({
              label: b.badge ? `${b.city} ${b.badge.replace(/Branch /, "B")}` : b.city,
              value: b.areas.length,
              note: b.hasPin ? "pinned" : "no pin",
            }))}
            format={(n) => String(n)}
          />
        </Panel>
      </div>

      <Panel
        className="mt-3"
        title={`Needs attention · ${issues.length}`}
        note="Real gaps in the live content, not a demonstration. Fix one and it should be removed from this list."
      >
        <ul className="space-y-2.5">
          {issuesBySeverity.flatMap(({ severity, items }) =>
            items.map((it) => (
              <li
                key={it.id}
                className="flex flex-wrap items-start gap-x-3 gap-y-2 rounded-xl border border-slate-200 p-3.5"
              >
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[0.68rem] font-semibold whitespace-nowrap ring-1 ring-inset ${SEVERITY_STYLE[severity]}`}
                >
                  {severity}
                </span>
                <div className="min-w-[14rem] flex-1">
                  <p className="text-[0.86rem] font-semibold text-slate-900">{it.title}</p>
                  <p className="mt-0.5 text-[0.78rem] leading-relaxed text-slate-600">
                    {it.detail}
                  </p>
                  <p className="mt-1.5 text-[0.7rem] text-slate-400">
                    {it.section} · {it.where}
                  </p>
                </div>
                <EditButton what={it.title.toLowerCase()} compact />
              </li>
            )),
          )}
        </ul>
      </Panel>

      {branchesMissingPins.length > 0 && (
        <Panel
          className="mt-3"
          title="Branches without a map pin"
          note="Their maps and printed QR codes search for a landmark instead of pointing at the door."
        >
          <ul className="flex flex-wrap gap-2">
            {branchesMissingPins.map((b) => (
              <li
                key={b.slug}
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[0.78rem] text-amber-900"
              >
                <IconPin className="size-3.5" />
                {b.city}
                {b.badge ? ` ${b.badge.toLowerCase()}` : ""}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel
        className="mt-3"
        title="Everything, counted"
        note="Where each piece of content lives, and where a visitor meets it."
      >
        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Content</Th>
                <Th right>Count</Th>
                <Th>Area</Th>
                <Th>Lives in</Th>
                <Th>Seen on</Th>
                <Th right>&nbsp;</Th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-slate-50">
                  <Td>{row.label}</Td>
                  <Td right>
                    <b className="font-semibold">{row.count}</b>
                  </Td>
                  <Td mute>{row.section}</Td>
                  <Td mute>
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.74rem]">
                      {row.where}
                    </code>
                  </Td>
                  <Td mute>
                    <Link href={row.href} className="text-green hover:underline">
                      {row.href}
                    </Link>
                  </Td>
                  <Td right>
                    <EditButton what={row.label.toLowerCase()} compact />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Panel>
    </ConsoleShell>
  );
}

"use client";

import Link from "next/link";
import {
  averagePayout,
  byBranch,
  byChannel,
  byStage,
  conversionRate,
  enquiries,
  formatDate,
  kilos,
  last30,
  monthly,
  rupees,
  rupeesShort,
  totals,
  trend,
} from "@/config/console";
import ConsoleShell from "./ConsoleShell";
import { AreaChart, BarChart, DualLineChart, Funnel, HBarChart, Legend, CHART_COLOURS } from "./Charts";
import { EditButton, Panel, StageChip, StatTile, TableWrap, Td, Th } from "./ui";

/**
 * The dashboard's front page.
 *
 * Ordered by what somebody opening it at nine in the morning needs, which is
 * not the same as what is most interesting. The row of tiles answers "are we
 * ahead or behind" in one glance; the two time charts answer "since when";
 * the funnel and the channel split answer "where is it coming from and where
 * is it getting stuck"; the branch league and the recent list are the detail
 * you drill into. Charts never repeat what the tile above them already said.
 */
export default function OverviewView() {
  const recent = enquiries.slice(0, 8);

  return (
    <ConsoleShell
      title="Overview"
      lede="Trading summary across all eleven branches. Figures are sample data generated for this demonstration and are not the shop's books."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Paid out · 30 days"
          value={rupees(last30.payout)}
          delta={trend.payout}
        />
        <StatTile
          label="Enquiries · 30 days"
          value={String(last30.enquiries)}
          delta={trend.enquiries}
        />
        <StatTile
          label="Purchases · 30 days"
          value={String(last30.purchases)}
          delta={trend.purchases}
        />
        <StatTile
          label="Enquiry to purchase"
          value={`${conversionRate}%`}
          sub={`${totals.purchases} of ${totals.enquiries} over six months`}
        />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-5">
        <Panel
          className="xl:col-span-3"
          title="Paid out by month"
          note="Six months to the period end. One measure, one axis."
        >
          <AreaChart
            data={monthly.map((m) => ({ label: m.label, value: m.payout }))}
            format={rupeesShort}
          />
        </Panel>

        <Panel
          className="xl:col-span-2"
          title="Enquiries against purchases"
          note="Both are counts, so they share one scale."
          action={
            <Legend
              items={[
                { label: "Enquiries", colour: CHART_COLOURS.series1 },
                { label: "Purchases", colour: CHART_COLOURS.series2 },
              ]}
            />
          }
        >
          <DualLineChart
            data={monthly.map((m) => ({
              label: m.label,
              a: m.enquiries,
              b: m.purchases,
            }))}
          />
        </Panel>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-5">
        <Panel
          className="xl:col-span-2"
          title="Where enquiries come from"
          note="Six months. The figure under each bar is how many became a purchase."
        >
          <BarChart
            data={byChannel.map((c) => ({
              label: c.channel.replace("Phone call", "Phone"),
              value: c.count,
              sub: `${c.converted} bought`,
            }))}
          />
        </Panel>

        <Panel
          className="xl:col-span-3"
          title="Pipeline"
          note="Every enquiry in the period, by the stage it reached."
          action={<EditButton what="the pipeline stages" />}
        >
          <Funnel data={byStage} total={totals.enquiries} />
        </Panel>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-5">
        <Panel
          className="xl:col-span-3"
          title="Branches by amount paid out"
          note="Six months. The grey figure is purchases made."
          action={
            <Link
              href="/console/control/branches"
              className="text-[0.76rem] font-semibold text-green hover:underline"
            >
              All branches
            </Link>
          }
        >
          <HBarChart
            data={byBranch.slice(0, 8).map((b) => ({
              label: b.badge ? `${b.city} ${b.badge.replace(/Branch /, 'B')}` : b.city,
              value: b.payout,
              note: `${b.purchases} buys`,
            }))}
            format={rupeesShort}
          />
        </Panel>

        <Panel className="xl:col-span-2" title="Six months in total">
          <dl className="space-y-3">
            {[
              ["Silk weighed in", kilos(totals.silkGrams)],
              ["Zari recovered", kilos(totals.zariGrams)],
              ["Pieces bought", String(totals.pieces)],
              ["Average per purchase", rupees(averagePayout)],
              ["Open enquiries now", String(totals.openPipeline)],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-2.5 last:border-0 last:pb-0"
              >
                <dt className="text-[0.82rem] text-slate-600">{k}</dt>
                <dd className="text-[0.92rem] font-semibold text-slate-900 tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>

      <Panel
        className="mt-3"
        title="Latest enquiries"
        note="The eight most recent across every branch."
        action={
          <Link
            href="/console/control/enquiries"
            className="text-[0.76rem] font-semibold text-green hover:underline"
          >
            Open the list
          </Link>
        }
      >
        <TableWrap>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <Th>Reference</Th>
                <Th>Customer</Th>
                <Th>Branch</Th>
                <Th>Channel</Th>
                <Th right>Pieces</Th>
                <Th>Stage</Th>
                <Th right>Received</Th>
                <Th right>&nbsp;</Th>
              </tr>
            </thead>
            <tbody>
              {recent.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-slate-50">
                  <Td mute>{e.id}</Td>
                  <Td>{e.name}</Td>
                  <Td mute>{e.city}</Td>
                  <Td mute>{e.channel}</Td>
                  <Td right>{e.pieces}</Td>
                  <Td>
                    <StageChip stage={e.stage} />
                  </Td>
                  <Td right mute>
                    {formatDate(e.daysAgo)}
                  </Td>
                  <Td right>
                    <EditButton what={`enquiry ${e.id}`} compact />
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

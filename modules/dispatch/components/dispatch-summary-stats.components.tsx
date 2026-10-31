import { AnimatePresence, motion } from "motion/react";
import { sharedValuePopMotion } from "@/modules/shared/config/shared-motion.config";
import type { DispatchBoardSummary } from "../types/dispatch.types";

type DispatchSummaryStatsProps = {
  summary: DispatchBoardSummary;
};

export function DispatchSummaryStats({ summary }: DispatchSummaryStatsProps) {
  const summaryStats = [
    { label: "Services", value: summary.totalTrips },
    { label: "Assigned", value: `${summary.assignedTrips}/${summary.totalTrips}` },
    { label: "Notices sent", value: summary.sentNotices },
  ];

  return (
    <dl className="grid grid-cols-3 gap-3">
      {summaryStats.map((summaryStat) => (
        <div key={summaryStat.label} className="rounded-2xl border border-line bg-surface px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{summaryStat.label}</dt>
          {/* The number pops when it changes (a new service, a notice sent). */}
          <dd className="mt-1 text-2xl font-bold tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={summaryStat.value} className="inline-block" {...sharedValuePopMotion}>
                {summaryStat.value}
              </motion.span>
            </AnimatePresence>
          </dd>
        </div>
      ))}
    </dl>
  );
}

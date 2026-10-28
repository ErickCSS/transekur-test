"use client";

import { SharedButton } from "@/modules/shared/components/shared-button.components";
import { SharedPageHeader } from "@/modules/shared/components/shared-page-header.components";
import { useDispatchTripsBoard } from "../hooks/use-dispatch-trips-board.hooks";
import { DispatchSummaryStats } from "./dispatch-summary-stats.components";
import { DispatchTripForm } from "./dispatch-trip-form.components";
import { DispatchTripsList } from "./dispatch-trips-list.components";

export function DispatchDashboardContent() {
  const {
    availableDrivers,
    selectedDateInputValue,
    selectedDateLabel,
    todayLabel,
    selectedDayTripRows,
    selectedDaySummary,
    changeSelectedDate,
    assignDriverFromBoard,
    resetDemoData,
  } = useDispatchTripsBoard();

  return (
    <div className="flex flex-col gap-8">
      <SharedPageHeader
        eyebrow="Dispatch"
        title="Pickup board"
        description={todayLabel}
        actions={
          <SharedButton variant="outline" onClick={resetDemoData}>
            Reset demo data
          </SharedButton>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[22rem_1fr] lg:items-start">
        <div className="lg:sticky lg:top-6">
          <DispatchTripForm availableDrivers={availableDrivers} onTripCreated={changeSelectedDate} />
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">
              Services <span className="font-medium text-ink-soft">· {selectedDateLabel}</span>
            </h2>
            <input
              type="date"
              aria-label="Show services for date"
              value={selectedDateInputValue}
              onChange={(event) => changeSelectedDate(event.target.value)}
              className="h-9 rounded-lg border border-line bg-surface px-2 text-sm outline-none focus:border-ink"
            />
          </div>
          <DispatchSummaryStats summary={selectedDaySummary} />
          <DispatchTripsList
            tripRows={selectedDayTripRows}
            availableDrivers={availableDrivers}
            onDriverAssigned={assignDriverFromBoard}
          />
        </section>
      </div>
    </div>
  );
}

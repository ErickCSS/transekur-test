"use client";

import { AnimatePresence, motion } from "motion/react";
import { SharedButton } from "@/modules/shared/components/shared-button.components";
import { SharedLiveStatus } from "@/modules/shared/components/shared-live-status.components";
import { SharedPageHeader } from "@/modules/shared/components/shared-page-header.components";
import { Alert, AlertDescription } from "@/modules/shared/components/ui/alert";
import { SharedDatePickerField } from "@/modules/shared/components/shared-date-picker-field.components";
import { sharedRevealMotion } from "@/modules/shared/config/shared-motion.config";
import { useDispatchTripsBoard } from "../hooks/use-dispatch-trips-board.hooks";
import { DispatchSummaryStats } from "./dispatch-summary-stats.components";
import { DispatchTripForm } from "./dispatch-trip-form.components";
import { DispatchTripsList } from "./dispatch-trips-list.components";
import type { DispatchBoardData } from "../types/dispatch.types";

type DispatchDashboardContentProps = {
  boardData: DispatchBoardData;
};

export function DispatchDashboardContent({ boardData }: DispatchDashboardContentProps) {
  const {
    availableDrivers,
    selectedDateInputValue,
    selectedDateLabel,
    todayLabel,
    selectedDayTripRows,
    selectedDaySummary,
    boardErrorMessage,
    isResettingDemoData,
    changeSelectedDate,
    addOptimisticNewTrip,
    assignDriverFromBoard,
    resetDemoData,
  } = useDispatchTripsBoard(boardData);

  return (
    <div className="flex flex-col gap-8">
      <SharedPageHeader
        eyebrow="Dispatch"
        title="Pickup board"
        description={todayLabel}
        actions={
          <>
            <SharedLiveStatus />
            <SharedButton variant="outline" onClick={resetDemoData} disabled={isResettingDemoData}>
              {isResettingDemoData ? "Resetting…" : "Reset demo data"}
            </SharedButton>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[22rem_1fr] xl:items-start">
        <div className="xl:sticky xl:top-6">
          <DispatchTripForm
            availableDrivers={availableDrivers}
            onOptimisticTripCreated={addOptimisticNewTrip}
            onShowDay={changeSelectedDate}
          />
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">
              Services <span className="font-medium text-ink-soft">· {selectedDateLabel}</span>
            </h2>
            <SharedDatePickerField
              aria-label="Show services for date"
              value={selectedDateInputValue}
              onValueChange={changeSelectedDate}
            />
          </div>
          <DispatchSummaryStats summary={selectedDaySummary} />
          <AnimatePresence initial={false}>
            {boardErrorMessage ? (
              <motion.div key="board-error" {...sharedRevealMotion}>
                <Alert variant="destructive">
                  <AlertDescription>{boardErrorMessage}</AlertDescription>
                </Alert>
              </motion.div>
            ) : null}
          </AnimatePresence>
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

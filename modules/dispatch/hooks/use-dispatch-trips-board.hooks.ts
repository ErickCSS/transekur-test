"use client";

import { useOptimistic, useState, useTransition } from "react";
import { findNoticeForTrip } from "@/modules/notifications/utils/notifications-notice-builder.utils";
import type { Trip } from "@/modules/shared/types/shared-trip.types";
import {
  combineDateAndTimeInputs,
  formatLongDate,
  formatLongDateFromInputValue,
  isSameCalendarDay,
  sortByScheduledTime,
  toDateInputValue,
} from "@/modules/shared/utils/shared-date-format.utils";
import { assignDriverToTripAction, resetDispatchDemoDataAction } from "../actions/dispatch-trips.actions";
import type { DispatchBoardData, DispatchBoardSummary, DispatchTripRow } from "../types/dispatch.types";
import { applyOptimisticTripChange, isOptimisticTrip } from "../utils/dispatch-optimistic-trips.utils";

// Dates are formatted in the operation's time zone, so server and browser render the same text.
export function useDispatchTripsBoard({ drivers, trips, notices }: DispatchBoardData) {
  const [selectedDateInputValue, setSelectedDateInputValue] = useState(() => toDateInputValue(new Date()));
  const [boardErrorMessage, setBoardErrorMessage] = useState<string | null>(null);
  const [isResettingDemoData, startResettingDemoData] = useTransition();
  const [, startAssigningDriver] = useTransition();
  // New services and driver changes show up at once; the server's refresh replaces them with the real rows.
  const [optimisticTrips, addOptimisticTripChange] = useOptimistic(trips, applyOptimisticTripChange);

  // Noon avoids landing on the previous day when the date is read in another time zone.
  const selectedDate = new Date(combineDateAndTimeInputs(selectedDateInputValue, "12:00"));
  const isSelectedDateToday = selectedDateInputValue === toDateInputValue(new Date());

  const selectedDayTripRows: DispatchTripRow[] = sortByScheduledTime(
    optimisticTrips.filter((trip) => isSameCalendarDay(trip.scheduledAt, selectedDate)),
  ).map((trip) => ({
    trip,
    assignedDriver: drivers.find((driver) => driver.id === trip.driverId) ?? null,
    notice: findNoticeForTrip(notices, trip.id),
    isSaving: isOptimisticTrip(trip),
  }));

  const selectedDaySummary: DispatchBoardSummary = {
    totalTrips: selectedDayTripRows.length,
    assignedTrips: selectedDayTripRows.filter((tripRow) => tripRow.assignedDriver).length,
    sentNotices: selectedDayTripRows.filter((tripRow) => tripRow.notice).length,
  };

  // Called by the form inside its own transition.
  function addOptimisticNewTrip(trip: Trip) {
    addOptimisticTripChange({ type: "create", trip });
  }

  function assignDriverFromBoard(tripId: string, driverId: string) {
    setBoardErrorMessage(null);
    startAssigningDriver(async () => {
      addOptimisticTripChange({ type: "assign", tripId, driverId: driverId || null });
      const { errorMessage } = await assignDriverToTripAction(tripId, driverId || null);
      setBoardErrorMessage(errorMessage);
    });
  }

  function resetDemoData() {
    setBoardErrorMessage(null);
    startResettingDemoData(async () => {
      await resetDispatchDemoDataAction();
      setSelectedDateInputValue(toDateInputValue(new Date()));
    });
  }

  return {
    availableDrivers: drivers,
    selectedDateInputValue,
    selectedDateLabel: isSelectedDateToday ? "Today" : formatLongDateFromInputValue(selectedDateInputValue),
    todayLabel: formatLongDate(new Date()),
    selectedDayTripRows,
    selectedDaySummary,
    boardErrorMessage,
    isResettingDemoData,
    changeSelectedDate: setSelectedDateInputValue,
    addOptimisticNewTrip,
    assignDriverFromBoard,
    resetDemoData,
  };
}

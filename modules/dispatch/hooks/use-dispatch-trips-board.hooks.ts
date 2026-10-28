"use client";

import { useState } from "react";
import { findNoticeForTrip } from "@/modules/notifications/utils/notifications-notice-builder.utils";
import { findMockDriverById, mockDrivers } from "@/modules/shared/data/shared-drivers-mock.data";
import { useSharedMockDatabase } from "@/modules/shared/hooks/use-shared-mock-database.hooks";
import {
  formatLongDate,
  isSameCalendarDay,
  sortByScheduledTime,
  toDateInputValue,
} from "@/modules/shared/utils/shared-date-format.utils";
import { assignDriverToTrip, resetDispatchDemoData } from "../services/dispatch-trips.services";
import type { DispatchBoardSummary, DispatchTripRow } from "../types/dispatch.types";

// Mounted only on the client (behind SharedMockDatabaseGate), so `new Date()` is safe here.
export function useDispatchTripsBoard() {
  const { trips, notices } = useSharedMockDatabase();
  const [selectedDateInputValue, setSelectedDateInputValue] = useState(() => toDateInputValue(new Date()));

  const selectedDate = new Date(`${selectedDateInputValue}T00:00`);
  const isSelectedDateToday = selectedDateInputValue === toDateInputValue(new Date());

  const selectedDayTripRows: DispatchTripRow[] = sortByScheduledTime(
    trips.filter((trip) => isSameCalendarDay(trip.scheduledAt, selectedDate)),
  ).map((trip) => ({
    trip,
    assignedDriver: findMockDriverById(trip.driverId),
    notice: findNoticeForTrip(notices, trip.id),
  }));

  const selectedDaySummary: DispatchBoardSummary = {
    totalTrips: selectedDayTripRows.length,
    assignedTrips: selectedDayTripRows.filter((tripRow) => tripRow.assignedDriver).length,
    sentNotices: selectedDayTripRows.filter((tripRow) => tripRow.notice).length,
  };

  function assignDriverFromBoard(tripId: string, driverId: string) {
    assignDriverToTrip(tripId, driverId || null);
  }

  function resetDemoData() {
    resetDispatchDemoData();
    setSelectedDateInputValue(toDateInputValue(new Date()));
  }

  return {
    availableDrivers: mockDrivers,
    selectedDateInputValue,
    selectedDateLabel: isSelectedDateToday ? "Today" : formatLongDate(selectedDate),
    todayLabel: formatLongDate(new Date()),
    selectedDayTripRows,
    selectedDaySummary,
    changeSelectedDate: setSelectedDateInputValue,
    assignDriverFromBoard,
    resetDemoData,
  };
}

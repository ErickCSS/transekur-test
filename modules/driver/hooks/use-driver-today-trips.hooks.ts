"use client";

import { findNoticeForTrip } from "@/modules/notifications/utils/notifications-notice-builder.utils";
import { useSharedMockDatabase } from "@/modules/shared/hooks/use-shared-mock-database.hooks";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import { formatLongDate, isSameCalendarDay, sortByScheduledTime } from "@/modules/shared/utils/shared-date-format.utils";
import { sendDriverTenMinutesAwayNotice } from "../services/driver-today-trips.services";
import type { DriverTodayTrip } from "../types/driver.types";

// Mounted only on the client (behind SharedMockDatabaseGate), so `new Date()` is safe here.
export function useDriverTodayTrips(driver: Driver) {
  const { trips, notices } = useSharedMockDatabase();
  const today = new Date();

  const driverTodayTrips: DriverTodayTrip[] = sortByScheduledTime(
    trips.filter((trip) => trip.driverId === driver.id && isSameCalendarDay(trip.scheduledAt, today)),
  ).map((trip) => ({ trip, notice: findNoticeForTrip(notices, trip.id) }));

  const pendingTripsCount = driverTodayTrips.filter((driverTodayTrip) => !driverTodayTrip.notice).length;

  function notifyClientDriverIsTenMinutesAway(tripId: string) {
    sendDriverTenMinutesAwayNotice(tripId, driver);
  }

  return {
    todayLabel: formatLongDate(today),
    driverTodayTrips,
    pendingTripsCount,
    notifyClientDriverIsTenMinutesAway,
  };
}

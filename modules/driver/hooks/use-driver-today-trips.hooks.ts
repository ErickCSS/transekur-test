"use client";

import { useState, useTransition } from "react";
import { formatLongDate } from "@/modules/shared/utils/shared-date-format.utils";
import { sendTenMinutesAwayNoticeAction } from "../actions/driver-today-trips.actions";
import type { DriverTodayTrip } from "../types/driver.types";

// The list comes already filtered by the server: only this driver's services for today.
export function useDriverTodayTrips(driverTodayTrips: DriverTodayTrip[]) {
  const [sendingTripId, setSendingTripId] = useState<string | null>(null);
  const [noticeErrorMessage, setNoticeErrorMessage] = useState<string | null>(null);
  const [, startSendingNotice] = useTransition();

  const pendingTripsCount = driverTodayTrips.filter((driverTodayTrip) => !driverTodayTrip.notice).length;

  function notifyClientDriverIsTenMinutesAway(tripId: string) {
    setSendingTripId(tripId);
    setNoticeErrorMessage(null);
    startSendingNotice(async () => {
      const { errorMessage } = await sendTenMinutesAwayNoticeAction(tripId);
      setNoticeErrorMessage(errorMessage);
      setSendingTripId(null);
    });
  }

  return {
    todayLabel: formatLongDate(new Date()),
    driverTodayTrips,
    pendingTripsCount,
    sendingTripId,
    noticeErrorMessage,
    notifyClientDriverIsTenMinutesAway,
  };
}

"use client";

import { useState, useTransition } from "react";
import {
  formatLongDate,
  formatLongDateFromInputValue,
  formatTimeOfDay,
  getNextDateInputValue,
  toDateInputValue,
} from "@/modules/shared/utils/shared-date-format.utils";
import { sendTenMinutesAwayNoticeAction } from "../actions/driver-today-trips.actions";
import type { DriverTripsByDay, DriverTripsDay } from "../types/driver.types";

// The lists come already filtered by the server: only this driver's services for today and tomorrow.
export function useDriverTrips({ todayTrips, tomorrowTrips }: DriverTripsByDay) {
  const [selectedDay, setSelectedDay] = useState<DriverTripsDay>("today");
  // The first paint shows Today as is; only a tab change fades the list in.
  const [hasSwitchedDay, setHasSwitchedDay] = useState(false);
  const [sendingTripId, setSendingTripId] = useState<string | null>(null);
  const [noticeErrorMessage, setNoticeErrorMessage] = useState<string | null>(null);
  const [, startSendingNotice] = useTransition();

  const todayInputValue = toDateInputValue(new Date());
  const pendingTodayTripsCount = todayTrips.filter((driverTrip) => !driverTrip.notice).length;
  const firstTomorrowTrip = tomorrowTrips[0]?.trip ?? null;

  // Called by the tabs, which hand over the tab value as a string.
  function selectDay(day: string) {
    if (day !== "today" && day !== "tomorrow") return;
    setSelectedDay(day);
    setHasSwitchedDay(true);
  }

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
    selectedDay,
    hasSwitchedDay,
    selectDay,
    todayLabel: formatLongDate(new Date()),
    tomorrowLabel: formatLongDateFromInputValue(getNextDateInputValue(todayInputValue)),
    todayTrips,
    tomorrowTrips,
    pendingTodayTripsCount,
    firstTomorrowPickupTime: firstTomorrowTrip ? formatTimeOfDay(firstTomorrowTrip.scheduledAt) : null,
    sendingTripId,
    noticeErrorMessage,
    notifyClientDriverIsTenMinutesAway,
  };
}

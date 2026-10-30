"use server";

import { refresh } from "next/cache";
import { getCurrentDriver } from "@/modules/driver-auth/actions/driver-auth.actions";
import { getNextDateInputValue, toDateInputValue } from "@/modules/shared/utils/shared-date-format.utils";
import { listDriverTripsForDay, sendDriverTenMinutesAwayNotice } from "../services/driver-today-trips.services";
import type { DriverNoticeActionResult, DriverTripsByDay } from "../types/driver.types";

// The driver always comes from the verified session, never from the client.
export async function getCurrentDriverTrips(): Promise<DriverTripsByDay> {
  const currentDriver = await getCurrentDriver();
  const todayInputValue = toDateInputValue(new Date());
  const [todayTrips, tomorrowTrips] = await Promise.all([
    listDriverTripsForDay(currentDriver.id, todayInputValue),
    listDriverTripsForDay(currentDriver.id, getNextDateInputValue(todayInputValue)),
  ]);
  return { todayTrips, tomorrowTrips };
}

export async function sendTenMinutesAwayNoticeAction(tripId: string): Promise<DriverNoticeActionResult> {
  const currentDriver = await getCurrentDriver();
  const wasSent = await sendDriverTenMinutesAwayNotice(String(tripId), currentDriver);
  refresh();
  return { errorMessage: wasSent ? null : "This service can't be notified anymore." };
}

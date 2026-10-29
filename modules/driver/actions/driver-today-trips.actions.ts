"use server";

import { refresh } from "next/cache";
import { getCurrentDriver } from "@/modules/driver-auth/actions/driver-auth.actions";
import { listDriverTodayTrips, sendDriverTenMinutesAwayNotice } from "../services/driver-today-trips.services";
import type { DriverNoticeActionResult } from "../types/driver.types";

// The driver always comes from the verified session, never from the client.
export async function getCurrentDriverTodayTrips() {
  const currentDriver = await getCurrentDriver();
  return listDriverTodayTrips(currentDriver.id);
}

export async function sendTenMinutesAwayNoticeAction(tripId: string): Promise<DriverNoticeActionResult> {
  const currentDriver = await getCurrentDriver();
  const wasSent = await sendDriverTenMinutesAwayNotice(String(tripId), currentDriver);
  refresh();
  return { errorMessage: wasSent ? null : "This service can't be notified anymore." };
}

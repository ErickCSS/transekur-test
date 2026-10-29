"use server";

import { refresh } from "next/cache";
import { findDriverById } from "@/modules/shared/services/shared-drivers.services";
import type { NewTripInput } from "@/modules/shared/types/shared-trip.types";
import { keepOnlyPhoneDigits } from "@/modules/shared/utils/shared-phone-format.utils";
import {
  assignDriverToTrip,
  createDispatchTrip,
  listDispatchBoardData,
  resetDispatchDemoData,
} from "../services/dispatch-trips.services";
import type { DispatchActionResult } from "../types/dispatch.types";

// Dispatch has no login in this test (agreed with the client), so these actions only validate input.

export async function getDispatchBoardData() {
  return listDispatchBoardData();
}

export async function createDispatchTripAction(newTrip: NewTripInput): Promise<DispatchActionResult> {
  const clientName = String(newTrip.clientName ?? "").trim();
  const clientPhone = keepOnlyPhoneDigits(String(newTrip.clientPhone ?? ""));
  const pickupPoint = String(newTrip.pickupPoint ?? "").trim();
  const scheduledAt = new Date(String(newTrip.scheduledAt ?? ""));
  const driverId = newTrip.driverId ? String(newTrip.driverId) : null;

  if (!clientName || !pickupPoint) return { errorMessage: "Client name and pickup point are required." };
  if (clientPhone.length < 10 || clientPhone.length > 15) return { errorMessage: "Enter a phone with country code." };
  if (Number.isNaN(scheduledAt.getTime())) return { errorMessage: "Pick a valid date and time." };
  if (driverId && !(await findDriverById(driverId))) return { errorMessage: "That driver does not exist." };

  await createDispatchTrip({ clientName, clientPhone, pickupPoint, scheduledAt: scheduledAt.toISOString(), driverId });
  refresh();
  return { errorMessage: null };
}

export async function assignDriverToTripAction(tripId: string, driverId: string | null): Promise<DispatchActionResult> {
  if (driverId && !(await findDriverById(driverId))) return { errorMessage: "That driver does not exist." };

  const wasAssigned = await assignDriverToTrip(String(tripId), driverId);
  refresh();
  return { errorMessage: wasAssigned ? null : "The client was already notified; the driver can't change." };
}

export async function resetDispatchDemoDataAction() {
  await resetDispatchDemoData();
  refresh();
}

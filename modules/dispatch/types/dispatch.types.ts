import type { Driver } from "@/modules/shared/types/shared-driver.types";
import type { Notice } from "@/modules/shared/types/shared-notice.types";
import type { Trip } from "@/modules/shared/types/shared-trip.types";

export type DispatchBoardData = {
  drivers: Driver[];
  trips: Trip[];
  notices: Notice[];
};

export type DispatchActionResult = {
  errorMessage: string | null;
};

export type DispatchTripRow = {
  trip: Trip;
  assignedDriver: Driver | null;
  notice: Notice | null;
  // Shown before the server confirms it (optimistic row).
  isSaving: boolean;
};

export type DispatchTripConfirmation = {
  message: string;
  // Set when the service is for another day, so the board can jump there on request.
  otherDayInputValue: string | null;
};

export type DispatchBoardSummary = {
  totalTrips: number;
  assignedTrips: number;
  sentNotices: number;
};

export type DispatchTripFormValues = {
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  pickupPoint: string;
  driverId: string;
};

export type DispatchTripFormErrors = Partial<Record<keyof DispatchTripFormValues, string>>;

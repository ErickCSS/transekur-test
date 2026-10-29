import type { Notice } from "@/modules/shared/types/shared-notice.types";
import type { Trip } from "@/modules/shared/types/shared-trip.types";

export type DriverTodayTrip = {
  trip: Trip;
  notice: Notice | null;
};

export type DriverNoticeActionResult = {
  errorMessage: string | null;
};

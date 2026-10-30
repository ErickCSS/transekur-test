import type { Notice } from "@/modules/shared/types/shared-notice.types";
import type { Trip } from "@/modules/shared/types/shared-trip.types";

export type DriverTrip = {
  trip: Trip;
  notice: Notice | null;
};

// Today's services can be notified; tomorrow's are shown so the driver can prepare.
export type DriverTripsByDay = {
  todayTrips: DriverTrip[];
  tomorrowTrips: DriverTrip[];
};

export type DriverTripsDay = "today" | "tomorrow";

export type DriverNoticeActionResult = {
  errorMessage: string | null;
};

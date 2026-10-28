import { buildDriverTenMinutesAwayNotice } from "@/modules/notifications/utils/notifications-notice-builder.utils";
import { createMockDatabaseId, updateMockDatabase } from "@/modules/shared/services/shared-mock-database.services";
import type { Driver } from "@/modules/shared/types/shared-driver.types";

// Phase 1: mock database. Phase 2: a server action that re-checks the driver owns the trip.
export function sendDriverTenMinutesAwayNotice(tripId: string, driver: Driver) {
  updateMockDatabase((currentState) => {
    const tripToNotify = currentState.trips.find((trip) => trip.id === tripId && trip.driverId === driver.id);
    const wasAlreadyNotified = currentState.notices.some((notice) => notice.tripId === tripId);
    if (!tripToNotify || wasAlreadyNotified) return currentState;

    const tenMinutesAwayNotice = buildDriverTenMinutesAwayNotice(
      createMockDatabaseId("notice"),
      tripToNotify,
      driver,
      new Date(),
    );

    return {
      ...currentState,
      trips: currentState.trips.map((trip) =>
        trip.id === tripId ? { ...trip, status: "driver_ten_minutes_away" } : trip,
      ),
      notices: [...currentState.notices, tenMinutesAwayNotice],
    };
  });
}

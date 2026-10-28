import {
  createMockDatabaseId,
  resetMockDatabase,
  updateMockDatabase,
} from "@/modules/shared/services/shared-mock-database.services";
import type { NewTripInput, Trip } from "@/modules/shared/types/shared-trip.types";

// Phase 1: mock database. Phase 2: these become Supabase calls behind server actions.
export function createDispatchTrip(newTrip: NewTripInput): Trip {
  const createdTrip: Trip = {
    ...newTrip,
    id: createMockDatabaseId("trip"),
    status: "scheduled",
    createdAt: new Date().toISOString(),
  };
  updateMockDatabase((currentState) => ({ ...currentState, trips: [...currentState.trips, createdTrip] }));
  return createdTrip;
}

export function assignDriverToTrip(tripId: string, driverId: string | null) {
  updateMockDatabase((currentState) => ({
    ...currentState,
    trips: currentState.trips.map((trip) => (trip.id === tripId ? { ...trip, driverId } : trip)),
  }));
}

export function resetDispatchDemoData() {
  resetMockDatabase();
}

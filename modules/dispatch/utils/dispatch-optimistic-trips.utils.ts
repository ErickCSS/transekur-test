import type { NewTripInput, Trip } from "@/modules/shared/types/shared-trip.types";

// Changes shown on the board right away, before the server confirms them.
export type DispatchOptimisticTripChange =
  | { type: "create"; trip: Trip }
  | { type: "assign"; tripId: string; driverId: string | null };

// Same id the server will save, so the row keeps its identity (and its animation) when the real one arrives.
export function buildOptimisticTrip(newTrip: NewTripInput): Trip {
  return {
    ...newTrip,
    status: "scheduled",
    createdAt: new Date().toISOString(),
  };
}

export function applyOptimisticTripChange(currentTrips: Trip[], change: DispatchOptimisticTripChange): Trip[] {
  if (change.type === "create") return [...currentTrips, change.trip];
  return currentTrips.map((trip) => (trip.id === change.tripId ? { ...trip, driverId: change.driverId } : trip));
}

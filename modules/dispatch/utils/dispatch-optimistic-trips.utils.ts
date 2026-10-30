import type { NewTripInput, Trip } from "@/modules/shared/types/shared-trip.types";

// Changes shown on the board right away, before the server confirms them.
export type DispatchOptimisticTripChange =
  | { type: "create"; trip: Trip }
  | { type: "assign"; tripId: string; driverId: string | null };

const optimisticTripIdPrefix = "optimistic-";

export function buildOptimisticTrip(newTrip: NewTripInput): Trip {
  return {
    ...newTrip,
    id: `${optimisticTripIdPrefix}${crypto.randomUUID()}`,
    status: "scheduled",
    createdAt: new Date().toISOString(),
  };
}

export function isOptimisticTrip(trip: Trip) {
  return trip.id.startsWith(optimisticTripIdPrefix);
}

export function applyOptimisticTripChange(currentTrips: Trip[], change: DispatchOptimisticTripChange): Trip[] {
  if (change.type === "create") return [...currentTrips, change.trip];
  return currentTrips.map((trip) => (trip.id === change.tripId ? { ...trip, driverId: change.driverId } : trip));
}

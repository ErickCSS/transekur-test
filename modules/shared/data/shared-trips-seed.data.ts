import type { Trip } from "../types/shared-trip.types";

type TripSeed = Omit<Trip, "scheduledAt" | "createdAt"> & { hour: number; minute: number };

// Made-up clients and pickup points, always scheduled for "today".
const todayTripSeeds: TripSeed[] = [
  {
    id: "trip-seed-1",
    clientName: "Ana Rodríguez",
    clientPhone: "18095550201",
    pickupPoint: "Las Américas Airport, Terminal B",
    driverId: "driver-carlos-mendez",
    status: "scheduled",
    hour: 8,
    minute: 30,
  },
  {
    id: "trip-seed-2",
    clientName: "José Martínez",
    clientPhone: "18095550202",
    pickupPoint: "Hotel Jaragua, main lobby",
    driverId: "driver-carlos-mendez",
    status: "scheduled",
    hour: 11,
    minute: 0,
  },
  {
    id: "trip-seed-3",
    clientName: "María Gómez",
    clientPhone: "18095550203",
    pickupPoint: "Ágora Mall, door 3",
    driverId: "driver-laura-pena",
    status: "scheduled",
    hour: 15,
    minute: 45,
  },
  {
    id: "trip-seed-4",
    clientName: "Pedro Castillo",
    clientPhone: "18095550204",
    pickupPoint: "Calle El Conde 101, Zona Colonial",
    driverId: null,
    status: "scheduled",
    hour: 18,
    minute: 20,
  },
];

export function buildTodayTripsSeed(today: Date): Trip[] {
  return todayTripSeeds.map(({ hour, minute, ...trip }) => {
    const scheduledAt = new Date(today);
    scheduledAt.setHours(hour, minute, 0, 0);
    return { ...trip, scheduledAt: scheduledAt.toISOString(), createdAt: today.toISOString() };
  });
}

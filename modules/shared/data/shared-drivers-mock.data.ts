import type { Driver } from "../types/shared-driver.types";

// Made-up drivers. `authEmail` links each one to a Supabase Auth test account.
export const mockDrivers: Driver[] = [
  {
    id: "driver-carlos-mendez",
    authEmail: "carlos.mendez@driver.test",
    fullName: "Carlos Méndez",
    phone: "18095550101",
    vehicle: { make: "Toyota", model: "Corolla", color: "Gray", plate: "A123456" },
  },
  {
    id: "driver-laura-pena",
    authEmail: "laura.pena@driver.test",
    fullName: "Laura Peña",
    phone: "18095550102",
    vehicle: { make: "Hyundai", model: "Tucson", color: "White", plate: "G789012" },
  },
  {
    id: "driver-miguel-santos",
    authEmail: "miguel.santos@driver.test",
    fullName: "Miguel Santos",
    phone: "18095550103",
    vehicle: { make: "Kia", model: "Sportage", color: "Black", plate: "G345678" },
  },
];

export function findMockDriverById(driverId: string | null) {
  return mockDrivers.find((driver) => driver.id === driverId) ?? null;
}

export function findMockDriverByAuthEmail(authEmail: string) {
  return mockDrivers.find((driver) => driver.authEmail === authEmail.toLowerCase()) ?? null;
}

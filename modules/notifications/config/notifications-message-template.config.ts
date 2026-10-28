import type { Driver } from "@/modules/shared/types/shared-driver.types";

export function buildDriverTenMinutesAwayMessage(clientName: string, driver: Driver) {
  const { color, make, model, plate } = driver.vehicle;
  const clientFirstName = clientName.split(" ")[0];
  return `Hi ${clientFirstName}, your driver ${driver.fullName} is 10 minutes away. Vehicle: ${color} ${make} ${model}, plate ${plate}.`;
}

// "Trip" is what the test calls a "service" (see docs/decisions/0005).
export type TripStatus = "scheduled" | "driver_ten_minutes_away" | "completed";

export type Trip = {
  id: string;
  clientName: string;
  clientPhone: string;
  pickupPoint: string;
  scheduledAt: string;
  driverId: string | null;
  status: TripStatus;
  createdAt: string;
};

export type NewTripInput = {
  clientName: string;
  clientPhone: string;
  pickupPoint: string;
  scheduledAt: string;
  driverId: string | null;
};

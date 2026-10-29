import type { TripStatus } from "./shared-trip.types";

// Rows as they come from Supabase (snake_case). Mapped to domain types in shared-database-rows.utils.
export type DriverRow = {
  id: string;
  auth_email: string;
  full_name: string;
  phone: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_color: string;
  vehicle_plate: string;
};

export type TripRow = {
  id: string;
  client_name: string;
  client_phone: string;
  pickup_point: string;
  scheduled_at: string;
  driver_id: string | null;
  status: TripStatus;
  created_at: string;
};

export type NoticeRow = {
  id: string;
  trip_id: string;
  message: string;
  whatsapp_link: string;
  sent_at: string;
  trips: { client_name: string; client_phone: string } | null;
};

export const noticeColumns = "id, trip_id, message, whatsapp_link, sent_at, trips(client_name, client_phone)";

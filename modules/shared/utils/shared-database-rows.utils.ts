import type { DriverRow, NoticeRow, TripRow } from "../types/shared-database.types";
import type { Driver } from "../types/shared-driver.types";
import type { Notice } from "../types/shared-notice.types";
import type { Trip } from "../types/shared-trip.types";

export function mapDriverRow(driverRow: DriverRow): Driver {
  return {
    id: driverRow.id,
    authEmail: driverRow.auth_email,
    fullName: driverRow.full_name,
    phone: driverRow.phone,
    vehicle: {
      make: driverRow.vehicle_make,
      model: driverRow.vehicle_model,
      color: driverRow.vehicle_color,
      plate: driverRow.vehicle_plate,
    },
  };
}

export function mapTripRow(tripRow: TripRow): Trip {
  return {
    id: tripRow.id,
    clientName: tripRow.client_name,
    clientPhone: tripRow.client_phone,
    pickupPoint: tripRow.pickup_point,
    scheduledAt: new Date(tripRow.scheduled_at).toISOString(),
    driverId: tripRow.driver_id,
    status: tripRow.status,
    createdAt: new Date(tripRow.created_at).toISOString(),
  };
}

export function mapNoticeRow(noticeRow: NoticeRow): Notice {
  return {
    id: noticeRow.id,
    tripId: noticeRow.trip_id,
    clientName: noticeRow.trips?.client_name ?? "",
    clientPhone: noticeRow.trips?.client_phone ?? "",
    message: noticeRow.message,
    whatsAppLink: noticeRow.whatsapp_link,
    sentAt: new Date(noticeRow.sent_at).toISOString(),
  };
}

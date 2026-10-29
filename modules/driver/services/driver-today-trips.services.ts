import "server-only";
import { buildDriverTenMinutesAwayMessage } from "@/modules/notifications/config/notifications-message-template.config";
import { buildWhatsAppNoticeLink } from "@/modules/notifications/utils/notifications-whatsapp-link.utils";
import { operationTimeZone } from "@/modules/shared/config/shared-operation.config";
import { createSupabaseAdminClient } from "@/modules/shared/services/shared-supabase-admin-client.services";
import { noticeColumns, type NoticeRow, type TripRow } from "@/modules/shared/types/shared-database.types";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import { mapNoticeRow, mapTripRow } from "@/modules/shared/utils/shared-database-rows.utils";
import { getCalendarDayRange, toDateInputValue } from "@/modules/shared/utils/shared-date-format.utils";
import type { DriverTodayTrip } from "../types/driver.types";

// Only the driver's own services scheduled today, in the operation's time zone.
export async function listDriverTodayTrips(driverId: string): Promise<DriverTodayTrip[]> {
  const supabase = await createSupabaseAdminClient();
  const { dayStartIso, dayEndIso } = getCalendarDayRange(toDateInputValue(new Date()));

  const { data: tripRows, error: tripsError } = await supabase
    .from("trips")
    .select("*")
    .eq("driver_id", driverId)
    .gte("scheduled_at", dayStartIso)
    .lt("scheduled_at", dayEndIso)
    .order("scheduled_at")
    .overrideTypes<TripRow[], { merge: false }>();
  if (tripsError) throw new Error(`Could not load your services: ${tripsError.message}`);

  const tripIds = tripRows.map((tripRow) => tripRow.id);
  const { data: noticeRows, error: noticesError } = await supabase
    .from("notices")
    .select(noticeColumns)
    .in("trip_id", tripIds)
    .overrideTypes<NoticeRow[], { merge: false }>();
  if (noticesError) throw new Error(`Could not load your notices: ${noticesError.message}`);

  const notices = noticeRows.map(mapNoticeRow);
  return tripRows.map((tripRow) => ({
    trip: mapTripRow(tripRow),
    notice: notices.find((notice) => notice.tripId === tripRow.id) ?? null,
  }));
}

// Returns false when the trip is not the driver's, not today's, or was already notified.
export async function sendDriverTenMinutesAwayNotice(tripId: string, driver: Driver) {
  const supabase = await createSupabaseAdminClient();
  const { data: tripRow, error: tripError } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .eq("driver_id", driver.id)
    .maybeSingle<TripRow>();
  if (tripError) throw new Error(`Could not load the service: ${tripError.message}`);
  if (!tripRow) return false;

  const message = buildDriverTenMinutesAwayMessage(tripRow.client_name, driver);
  const { data: wasSent, error: sendError } = await supabase.rpc("send_ten_minutes_away_notice", {
    p_trip_id: tripId,
    p_driver_id: driver.id,
    p_message: message,
    p_whatsapp_link: buildWhatsAppNoticeLink(tripRow.client_phone, message),
    p_time_zone: operationTimeZone,
  });
  if (sendError) throw new Error(`Could not send the notice: ${sendError.message}`);
  return wasSent === true;
}

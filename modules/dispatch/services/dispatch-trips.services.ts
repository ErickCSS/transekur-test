import "server-only";
import { buildTodayTripsSeed } from "@/modules/shared/data/shared-trips-seed.data";
import { listDrivers } from "@/modules/shared/services/shared-drivers.services";
import { createSupabaseAdminClient } from "@/modules/shared/services/shared-supabase-admin-client.services";
import { noticeColumns, type NoticeRow, type TripRow } from "@/modules/shared/types/shared-database.types";
import type { NewTripInput } from "@/modules/shared/types/shared-trip.types";
import { mapNoticeRow, mapTripRow } from "@/modules/shared/utils/shared-database-rows.utils";
import type { DispatchBoardData } from "../types/dispatch.types";

export async function listDispatchBoardData(): Promise<DispatchBoardData> {
  const supabase = await createSupabaseAdminClient();
  const [drivers, tripsResult, noticesResult] = await Promise.all([
    listDrivers(),
    supabase.from("trips").select("*").order("scheduled_at").overrideTypes<TripRow[], { merge: false }>(),
    supabase.from("notices").select(noticeColumns).order("sent_at").overrideTypes<NoticeRow[], { merge: false }>(),
  ]);
  if (tripsResult.error) throw new Error(`Could not load services: ${tripsResult.error.message}`);
  if (noticesResult.error) throw new Error(`Could not load notices: ${noticesResult.error.message}`);

  return {
    drivers,
    trips: tripsResult.data.map(mapTripRow),
    notices: noticesResult.data.map(mapNoticeRow),
  };
}

export async function createDispatchTrip(newTrip: NewTripInput) {
  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase.from("trips").insert({
    client_name: newTrip.clientName,
    client_phone: newTrip.clientPhone,
    pickup_point: newTrip.pickupPoint,
    scheduled_at: newTrip.scheduledAt,
    driver_id: newTrip.driverId,
  });
  if (error) throw new Error(`Could not create the service: ${error.message}`);
}

// Only services that were not notified yet can change driver.
export async function assignDriverToTrip(tripId: string, driverId: string | null) {
  const supabase = await createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("trips")
    .update({ driver_id: driverId })
    .eq("id", tripId)
    .eq("status", "scheduled")
    .select("id");
  if (error) throw new Error(`Could not assign the driver: ${error.message}`);
  return data.length > 0;
}

export async function resetDispatchDemoData() {
  const supabase = await createSupabaseAdminClient();
  const { error: deleteError } = await supabase.from("trips").delete().not("id", "is", null);
  if (deleteError) throw new Error(`Could not clear services: ${deleteError.message}`);

  const drivers = await listDrivers();
  const seedTrips = buildTodayTripsSeed(new Date()).map((tripSeed) => ({
    client_name: tripSeed.clientName,
    client_phone: tripSeed.clientPhone,
    pickup_point: tripSeed.pickupPoint,
    scheduled_at: tripSeed.scheduledAt,
    driver_id: drivers.find((driver) => driver.authEmail === tripSeed.driverAuthEmail)?.id ?? null,
  }));

  const { error: insertError } = await supabase.from("trips").insert(seedTrips);
  if (insertError) throw new Error(`Could not load demo services: ${insertError.message}`);
}

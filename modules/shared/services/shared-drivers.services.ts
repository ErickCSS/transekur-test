import "server-only";
import type { DriverRow } from "../types/shared-database.types";
import { mapDriverRow } from "../utils/shared-database-rows.utils";
import { createSupabaseAdminClient } from "./shared-supabase-admin-client.services";

export async function listDrivers() {
  const supabase = await createSupabaseAdminClient();
  const { data, error } = await supabase.from("drivers").select("*").order("full_name").overrideTypes<DriverRow[], { merge: false }>();
  if (error) throw new Error(`Could not load drivers: ${error.message}`);
  return data.map(mapDriverRow);
}

export async function findDriverByAuthUserId(authUserId: string) {
  const supabase = await createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("auth_user_id", authUserId)
    .maybeSingle<DriverRow>();
  if (error) throw new Error(`Could not load the driver: ${error.message}`);
  return data ? mapDriverRow(data) : null;
}

export async function findDriverById(driverId: string) {
  const supabase = await createSupabaseAdminClient();
  const { data, error } = await supabase.from("drivers").select("*").eq("id", driverId).maybeSingle<DriverRow>();
  if (error) throw new Error(`Could not load the driver: ${error.message}`);
  return data ? mapDriverRow(data) : null;
}

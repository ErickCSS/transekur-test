import "server-only";
import { createClient } from "@supabase/supabase-js";
import { connection } from "next/server";
import { supabaseUrl } from "../config/shared-env.config";

// Service role client: bypasses RLS, so it only runs on the server.
// Every action that uses it checks who is calling first (docs/decisions/0007).
export async function createSupabaseAdminClient() {
  // Database reads must happen per request, never during prerender.
  await connection();
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY ?? "", {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

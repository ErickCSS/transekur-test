import "server-only";
import { createSupabaseServerClient } from "@/modules/shared/services/shared-supabase-server-client.services";
import type { SignInDriverResult } from "../types/driver-auth.types";

export async function signInDriverWithPassword(email: string, password: string): Promise<SignInDriverResult> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { errorMessage: error ? error.message : null, authUserId: data.user?.id ?? null };
}

export async function signOutDriver() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}

// getClaims verifies the session JWT, so the user id can be trusted.
export async function getAuthenticatedDriverUserId(): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const authUserId = data?.claims.sub;
  return typeof authUserId === "string" ? authUserId : null;
}

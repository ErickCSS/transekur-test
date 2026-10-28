import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseAnonKey, supabaseUrl } from "@/modules/shared/config/shared-env.config";
import { driverAuthRoutes } from "../config/driver-auth-routes.config";

// Refreshes the Supabase session cookies and does the optimistic redirects.
// The page still verifies the driver on the server (docs/decisions/0004).
export async function refreshDriverSessionInProxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([headerName, headerValue]) => response.headers.set(headerName, headerValue));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const isDriverSignedIn = Boolean(data?.claims);
  const requestedPath = request.nextUrl.pathname;

  if (!isDriverSignedIn && requestedPath.startsWith(driverAuthRoutes.todayTrips)) {
    return redirectKeepingSessionCookies(request, response, driverAuthRoutes.signIn);
  }

  if (isDriverSignedIn && requestedPath === driverAuthRoutes.signIn) {
    return redirectKeepingSessionCookies(request, response, driverAuthRoutes.todayTrips);
  }

  return response;
}

function redirectKeepingSessionCookies(request: NextRequest, sessionResponse: NextResponse, targetPath: string) {
  const redirectResponse = NextResponse.redirect(new URL(targetPath, request.url));
  sessionResponse.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));
  return redirectResponse;
}

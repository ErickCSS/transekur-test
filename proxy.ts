import type { NextRequest } from "next/server";
import { refreshDriverSessionInProxy } from "@/modules/driver-auth/services/driver-auth-proxy-session.services";

export async function proxy(request: NextRequest) {
  return refreshDriverSessionInProxy(request);
}

export const config = {
  matcher: ["/driver/:path*", "/driver"],
};

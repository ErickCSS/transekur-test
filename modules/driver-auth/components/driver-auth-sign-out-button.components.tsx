"use client";

import { SharedButton } from "@/modules/shared/components/shared-button.components";
import { useDriverAuthSignOut } from "../hooks/use-driver-auth-sign-out.hooks";

export function DriverAuthSignOutButton() {
  const { isSigningOut, signOutCurrentDriver } = useDriverAuthSignOut();

  return (
    <SharedButton
      variant="ghost"
      onClick={signOutCurrentDriver}
      disabled={isSigningOut}
      className="text-white/70 hover:bg-white/10 hover:text-white"
    >
      {isSigningOut ? "Signing out…" : "Sign out"}
    </SharedButton>
  );
}

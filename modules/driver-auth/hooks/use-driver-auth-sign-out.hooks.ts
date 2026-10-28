"use client";

import { useTransition } from "react";
import { logoutDriver } from "../actions/driver-auth.actions";

export function useDriverAuthSignOut() {
  const [isSigningOut, startSignOutTransition] = useTransition();

  function signOutCurrentDriver() {
    startSignOutTransition(async () => {
      await logoutDriver();
    });
  }

  return { isSigningOut, signOutCurrentDriver };
}

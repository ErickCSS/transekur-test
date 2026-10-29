"use server";

import { redirect } from "next/navigation";
import { findDriverByAuthUserId } from "@/modules/shared/services/shared-drivers.services";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import { driverAuthRoutes } from "../config/driver-auth-routes.config";
import {
  getAuthenticatedDriverUserId,
  signInDriverWithPassword,
  signOutDriver,
} from "../services/driver-auth.services";
import type { DriverAuthLoginFormState } from "../types/driver-auth.types";

export async function loginDriverWithEmail(
  _previousState: DriverAuthLoginFormState,
  formData: FormData,
): Promise<DriverAuthLoginFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { errorMessage: "Enter your email and password.", submittedEmail: email };
  }

  const { errorMessage, authUserId } = await signInDriverWithPassword(email, password);
  if (errorMessage || !authUserId) {
    return { errorMessage: "Wrong email or password.", submittedEmail: email };
  }

  if (!(await findDriverByAuthUserId(authUserId))) {
    await signOutDriver();
    return { errorMessage: "This account is not linked to a driver.", submittedEmail: email };
  }

  redirect(driverAuthRoutes.todayTrips);
}

export async function logoutDriver() {
  await signOutDriver();
  redirect(driverAuthRoutes.signIn);
}

export async function getCurrentDriver(): Promise<Driver> {
  const authUserId = await getAuthenticatedDriverUserId();
  const currentDriver = authUserId ? await findDriverByAuthUserId(authUserId) : null;
  if (!currentDriver) redirect(driverAuthRoutes.signIn);
  return currentDriver;
}

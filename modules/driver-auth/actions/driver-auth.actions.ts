"use server";

import { redirect } from "next/navigation";
import { findMockDriverByAuthEmail } from "@/modules/shared/data/shared-drivers-mock.data";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import { driverAuthRoutes } from "../config/driver-auth-routes.config";
import {
  getAuthenticatedDriverEmail,
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

  const { errorMessage } = await signInDriverWithPassword(email, password);
  if (errorMessage) {
    return { errorMessage: "Wrong email or password.", submittedEmail: email };
  }

  if (!findMockDriverByAuthEmail(email)) {
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
  const authenticatedEmail = await getAuthenticatedDriverEmail();
  const currentDriver = authenticatedEmail ? findMockDriverByAuthEmail(authenticatedEmail) : null;
  if (!currentDriver) redirect(driverAuthRoutes.signIn);
  return currentDriver;
}

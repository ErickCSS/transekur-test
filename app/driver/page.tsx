import type { Metadata } from "next";
import { DriverAuthLoginScreen } from "@/modules/driver-auth/components/driver-auth-login-screen.components";

export const metadata: Metadata = { title: "Driver sign in · Ten Minutes Away" };

export default function DriverSignInPage() {
  return <DriverAuthLoginScreen />;
}

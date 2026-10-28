import type { Metadata } from "next";
import { DispatchDashboardScreen } from "@/modules/dispatch/components/dispatch-dashboard-screen.components";

export const metadata: Metadata = { title: "Dispatch · Ten Minutes Away" };

export default function DispatchPage() {
  return <DispatchDashboardScreen />;
}

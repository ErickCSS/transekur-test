import type { Metadata } from "next";
import { DriverTodayTripsPage } from "@/modules/driver/components/driver-today-trips-page.components";

export const metadata: Metadata = { title: "My services · Ten Minutes Away" };

export default function DriverServicesPage() {
  return <DriverTodayTripsPage />;
}

import { DriverAuthSignOutButton } from "@/modules/driver-auth/components/driver-auth-sign-out-button.components";
import { CarIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedLiveStatus } from "@/modules/shared/components/shared-live-status.components";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import type { DriverTripsByDay } from "../types/driver.types";
import { DriverTodayTripsContent } from "./driver-today-trips-content.components";

type DriverTodayTripsScreenProps = {
  driver: Driver;
  driverTrips: DriverTripsByDay;
};

export function DriverTodayTripsScreen({ driver, driverTrips }: DriverTodayTripsScreenProps) {
  const { color, make, model, plate } = driver.vehicle;

  return (
    <>
      <header className="bg-ink px-5 pb-6 pt-12 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Driver</span>
            <SharedLiveStatus tone="dark" />
          </div>
          <DriverAuthSignOutButton />
        </div>
        <h1 className="mt-2 text-2xl font-bold">Hi, {driver.fullName.split(" ")[0]}</h1>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
          <CarIcon className="size-4 text-accent" />
          {color} {make} {model} · {plate}
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <DriverTodayTripsContent driverTrips={driverTrips} />
      </div>
    </>
  );
}

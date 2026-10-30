import { Suspense } from "react";
import { getCurrentDriver } from "@/modules/driver-auth/actions/driver-auth.actions";
import { SharedLoadingSkeleton } from "@/modules/shared/components/shared-loading-skeleton.components";
import { SharedPhoneFrame } from "@/modules/shared/components/shared-phone-frame.components";
import { getCurrentDriverTrips } from "../actions/driver-today-trips.actions";
import { DriverTodayTripsScreen } from "./driver-today-trips-screen.components";

// Reading the session needs the request, so it streams in behind Suspense (cacheComponents).
async function DriverTodayTripsForSignedInDriver() {
  const [currentDriver, driverTrips] = await Promise.all([getCurrentDriver(), getCurrentDriverTrips()]);
  return <DriverTodayTripsScreen driver={currentDriver} driverTrips={driverTrips} />;
}

export function DriverTodayTripsPage() {
  return (
    <SharedPhoneFrame>
      <Suspense
        fallback={
          <div className="px-5 pt-14">
            <SharedLoadingSkeleton rows={3} />
          </div>
        }
      >
        <DriverTodayTripsForSignedInDriver />
      </Suspense>
    </SharedPhoneFrame>
  );
}

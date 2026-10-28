"use client";

import { CarIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedEmptyState } from "@/modules/shared/components/shared-empty-state.components";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import { useDriverTodayTrips } from "../hooks/use-driver-today-trips.hooks";
import { DriverTripCard } from "./driver-trip-card.components";

type DriverTodayTripsContentProps = {
  driver: Driver;
};

export function DriverTodayTripsContent({ driver }: DriverTodayTripsContentProps) {
  const { todayLabel, driverTodayTrips, pendingTripsCount, notifyClientDriverIsTenMinutesAway } =
    useDriverTodayTrips(driver);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold">Today</h2>
        <p className="text-xs text-ink-soft">{todayLabel}</p>
      </div>

      {driverTodayTrips.length === 0 ? (
        <SharedEmptyState
          icon={<CarIcon />}
          title="No services for today"
          description="When dispatch assigns you a pickup, it shows up here."
        />
      ) : (
        <>
          <p className="text-sm text-ink-soft">
            {pendingTripsCount === 0
              ? "All clients notified. Drive safe!"
              : `${pendingTripsCount} of ${driverTodayTrips.length} pickups waiting for your 10-minute notice.`}
          </p>
          <ul className="flex flex-col gap-3">
            {driverTodayTrips.map((driverTodayTrip) => (
              <DriverTripCard
                key={driverTodayTrip.trip.id}
                driverTodayTrip={driverTodayTrip}
                onTenMinutesAwayPressed={notifyClientDriverIsTenMinutesAway}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

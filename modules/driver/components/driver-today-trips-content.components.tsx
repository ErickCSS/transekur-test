"use client";

import { CarIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedEmptyState } from "@/modules/shared/components/shared-empty-state.components";
import { useDriverTodayTrips } from "../hooks/use-driver-today-trips.hooks";
import type { DriverTodayTrip } from "../types/driver.types";
import { DriverTripCard } from "./driver-trip-card.components";

type DriverTodayTripsContentProps = {
  driverTodayTrips: DriverTodayTrip[];
};

export function DriverTodayTripsContent({ driverTodayTrips: serverDriverTodayTrips }: DriverTodayTripsContentProps) {
  const {
    todayLabel,
    driverTodayTrips,
    pendingTripsCount,
    sendingTripId,
    noticeErrorMessage,
    notifyClientDriverIsTenMinutesAway,
  } = useDriverTodayTrips(serverDriverTodayTrips);

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
          {noticeErrorMessage ? (
            <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {noticeErrorMessage}
            </p>
          ) : null}
          <ul className="flex flex-col gap-3">
            {driverTodayTrips.map((driverTodayTrip) => (
              <DriverTripCard
                key={driverTodayTrip.trip.id}
                driverTodayTrip={driverTodayTrip}
                isSendingNotice={sendingTripId === driverTodayTrip.trip.id}
                onTenMinutesAwayPressed={notifyClientDriverIsTenMinutesAway}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

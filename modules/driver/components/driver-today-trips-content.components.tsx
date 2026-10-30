"use client";

import { CarIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedEmptyState } from "@/modules/shared/components/shared-empty-state.components";
import { useDriverTrips } from "../hooks/use-driver-trips.hooks";
import type { DriverTripsByDay } from "../types/driver.types";
import { DriverTripCard } from "./driver-trip-card.components";
import { DriverTripsDayTabs } from "./driver-trips-day-tabs.components";

type DriverTodayTripsContentProps = {
  driverTrips: DriverTripsByDay;
};

export function DriverTodayTripsContent({ driverTrips }: DriverTodayTripsContentProps) {
  const {
    selectedDay,
    selectDay,
    todayLabel,
    tomorrowLabel,
    todayTrips,
    tomorrowTrips,
    pendingTodayTripsCount,
    firstTomorrowPickupTime,
    sendingTripId,
    noticeErrorMessage,
    notifyClientDriverIsTenMinutesAway,
  } = useDriverTrips(driverTrips);

  const isTodaySelected = selectedDay === "today";
  const selectedDayTrips = isTodaySelected ? todayTrips : tomorrowTrips;
  const tomorrowPickupsLabel = `${tomorrowTrips.length} ${tomorrowTrips.length === 1 ? "pickup" : "pickups"}`;

  return (
    <section className="flex flex-col gap-4">
      <DriverTripsDayTabs
        selectedDay={selectedDay}
        todayTripsCount={todayTrips.length}
        tomorrowTripsCount={tomorrowTrips.length}
        onDaySelected={selectDay}
      />

      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold">{isTodaySelected ? "Today" : "Tomorrow"}</h2>
        <p className="text-xs text-ink-soft">{isTodaySelected ? todayLabel : tomorrowLabel}</p>
      </div>

      {selectedDayTrips.length === 0 ? (
        <SharedEmptyState
          icon={<CarIcon />}
          title={isTodaySelected ? "No services for today" : "Nothing scheduled for tomorrow yet"}
          description={
            isTodaySelected
              ? "When dispatch assigns you a pickup, it shows up here."
              : "Tomorrow's pickups show up here as soon as dispatch assigns them, so you can plan your day."
          }
        />
      ) : (
        <>
          {isTodaySelected ? (
            <p className="text-sm text-ink-soft">
              {pendingTodayTripsCount === 0
                ? "All clients notified. Drive safe!"
                : `${pendingTodayTripsCount} of ${todayTrips.length} pickups waiting for your 10-minute notice.`}
            </p>
          ) : (
            <p className="text-sm text-ink-soft">
              First pickup tomorrow at <strong className="text-ink">{firstTomorrowPickupTime}</strong> ·{" "}
              {tomorrowPickupsLabel}.
            </p>
          )}
          {isTodaySelected && noticeErrorMessage ? (
            <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {noticeErrorMessage}
            </p>
          ) : null}
          <ul className="flex flex-col gap-3">
            {selectedDayTrips.map((driverTrip) => (
              <DriverTripCard
                key={driverTrip.trip.id}
                driverTrip={driverTrip}
                canNotify={isTodaySelected}
                isSendingNotice={sendingTripId === driverTrip.trip.id}
                onTenMinutesAwayPressed={notifyClientDriverIsTenMinutesAway}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

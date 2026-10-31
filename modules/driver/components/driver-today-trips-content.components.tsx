"use client";

import { AnimatePresence, motion } from "motion/react";
import { CarIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedEmptyState } from "@/modules/shared/components/shared-empty-state.components";
import { Alert, AlertDescription } from "@/modules/shared/components/ui/alert";
import { Tabs, TabsContent } from "@/modules/shared/components/ui/tabs";
import {
  sharedNewAgendaItemMotion,
  sharedRevealMotion,
  sharedViewSwitchMotion,
} from "@/modules/shared/config/shared-motion.config";
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
    hasSwitchedDay,
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
    <Tabs value={selectedDay} onValueChange={selectDay}>
      <DriverTripsDayTabs todayTripsCount={todayTrips.length} tomorrowTripsCount={tomorrowTrips.length} />

      {/* Only the selected day is mounted; the key remounts it so the list fades in on a tab change. */}
      <TabsContent key={selectedDay} value={selectedDay} asChild>
        <motion.section
          className="flex flex-col gap-4"
          {...sharedViewSwitchMotion}
          initial={hasSwitchedDay ? sharedViewSwitchMotion.initial : false}
        >
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
              <AnimatePresence initial={false}>
                {isTodaySelected && noticeErrorMessage ? (
                  <motion.div key="notice-error" {...sharedRevealMotion}>
                    <Alert variant="destructive">
                      <AlertDescription>{noticeErrorMessage}</AlertDescription>
                    </Alert>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {/* Services that dispatch assigns while the app is open slide in; the rest make room. */}
              <ul className="relative flex flex-col gap-3">
                <AnimatePresence initial={false} mode="popLayout">
                  {selectedDayTrips.map((driverTrip) => (
                    <motion.li key={driverTrip.trip.id} className="rounded-2xl" {...sharedNewAgendaItemMotion}>
                      <DriverTripCard
                        driverTrip={driverTrip}
                        canNotify={isTodaySelected}
                        isSendingNotice={sendingTripId === driverTrip.trip.id}
                        onTenMinutesAwayPressed={notifyClientDriverIsTenMinutesAway}
                      />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </>
          )}
        </motion.section>
      </TabsContent>
    </Tabs>
  );
}

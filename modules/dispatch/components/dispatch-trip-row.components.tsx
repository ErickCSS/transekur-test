import { AnimatePresence, motion } from "motion/react";
import { MapPinIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedStatusBadge } from "@/modules/shared/components/shared-status-badge.components";
import { sharedStateSwapMotion } from "@/modules/shared/config/shared-motion.config";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import { cn } from "@/modules/shared/utils/shared-class-names.utils";
import { formatTimeOfDay } from "@/modules/shared/utils/shared-date-format.utils";
import { formatPhoneForDisplay } from "@/modules/shared/utils/shared-phone-format.utils";
import type { DispatchTripRow as DispatchTripRowData } from "../types/dispatch.types";
import { DispatchDriverAssignSelect } from "./dispatch-driver-assign-select.components";
import { DispatchNoticeStatusBadge } from "./dispatch-notice-status-badge.components";

type DispatchTripRowProps = {
  tripRow: DispatchTripRowData;
  availableDrivers: Driver[];
  onDriverAssigned: (tripId: string, driverId: string) => void;
};

export function DispatchTripRow({ tripRow, availableDrivers, onDriverAssigned }: DispatchTripRowProps) {
  const { trip, assignedDriver, notice, isSaving } = tripRow;
  const noticeStatusKey = isSaving ? "saving" : notice ? "sent" : "not-sent";

  return (
    <div
      aria-busy={isSaving}
      className={cn(
        "grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 px-4 py-4 transition-colors duration-500 md:grid-cols-[5.5rem_1fr_1.2fr_1.5fr_7.5rem] md:items-center",
        isSaving && "bg-accent/10",
      )}
    >
      <p className="row-span-2 whitespace-nowrap text-lg font-bold tabular-nums md:row-span-1">{formatTimeOfDay(trip.scheduledAt)}</p>

      <div className="min-w-0">
        <p className="truncate font-semibold">{trip.clientName}</p>
        <p className="text-xs text-ink-soft tabular-nums">{formatPhoneForDisplay(trip.clientPhone)}</p>
      </div>

      <p className="col-start-2 flex min-w-0 items-start gap-1.5 text-sm text-ink-soft md:col-start-auto">
        <MapPinIcon className="mt-0.5 size-4 shrink-0" />
        <span className="line-clamp-2">{trip.pickupPoint}</span>
      </p>

      <div className="col-start-2 flex min-w-0 flex-col gap-1 md:col-start-auto">
        <DispatchDriverAssignSelect
          tripId={trip.id}
          assignedDriverId={trip.driverId}
          availableDrivers={availableDrivers}
          isLocked={Boolean(notice) || isSaving}
          onDriverAssigned={onDriverAssigned}
        />
        {assignedDriver ? (
          <p className="truncate text-xs text-ink-soft">
            {assignedDriver.vehicle.color} {assignedDriver.vehicle.make} {assignedDriver.vehicle.model} ·{" "}
            {assignedDriver.vehicle.plate}
          </p>
        ) : null}
      </div>

      <div className="col-start-2 md:col-start-auto md:justify-self-end">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={noticeStatusKey} {...sharedStateSwapMotion}>
            {isSaving ? (
              <SharedStatusBadge tone="warning">Saving…</SharedStatusBadge>
            ) : (
              <DispatchNoticeStatusBadge notice={notice} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

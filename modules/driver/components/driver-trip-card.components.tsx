import { MapPinIcon, UserIcon } from "@/modules/shared/components/shared-icons.components";
import { formatTimeOfDay } from "@/modules/shared/utils/shared-date-format.utils";
import { formatPhoneForDisplay } from "@/modules/shared/utils/shared-phone-format.utils";
import type { DriverTodayTrip } from "../types/driver.types";
import { DriverTenMinutesAwayButton } from "./driver-ten-minutes-away-button.components";

type DriverTripCardProps = {
  driverTodayTrip: DriverTodayTrip;
  isSendingNotice: boolean;
  onTenMinutesAwayPressed: (tripId: string) => void;
};

export function DriverTripCard({ driverTodayTrip, isSendingNotice, onTenMinutesAwayPressed }: DriverTripCardProps) {
  const { trip, notice } = driverTodayTrip;

  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl border p-4 ${
        notice ? "border-line bg-canvas/60" : "border-line bg-surface shadow-sm"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold tabular-nums">{formatTimeOfDay(trip.scheduledAt)}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Pickup</p>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <p className="flex items-center gap-2">
          <UserIcon className="size-4 shrink-0 text-ink-soft" />
          <span className="font-semibold">{trip.clientName}</span>
          <span className="text-ink-soft tabular-nums">{formatPhoneForDisplay(trip.clientPhone)}</span>
        </p>
        <p className="flex items-start gap-2">
          <MapPinIcon className="mt-0.5 size-4 shrink-0 text-ink-soft" />
          <span>{trip.pickupPoint}</span>
        </p>
      </div>

      <DriverTenMinutesAwayButton
        notice={notice}
        isSending={isSendingNotice}
        onTenMinutesAwayPressed={() => onTenMinutesAwayPressed(trip.id)}
      />
    </li>
  );
}

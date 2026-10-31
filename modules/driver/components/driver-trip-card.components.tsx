import { ClockIcon, MapPinIcon, UserIcon } from "@/modules/shared/components/shared-icons.components";
import { formatTimeOfDay } from "@/modules/shared/utils/shared-date-format.utils";
import { formatPhoneForDisplay } from "@/modules/shared/utils/shared-phone-format.utils";
import type { DriverTrip } from "../types/driver.types";
import { DriverTenMinutesAwayButton } from "./driver-ten-minutes-away-button.components";

type DriverTripCardProps = {
  driverTrip: DriverTrip;
  // Only today's services can be notified; tomorrow's are shown to plan ahead.
  canNotify: boolean;
  isSendingNotice: boolean;
  onTenMinutesAwayPressed: (tripId: string) => void;
};

export function DriverTripCard({ driverTrip, canNotify, isSendingNotice, onTenMinutesAwayPressed }: DriverTripCardProps) {
  const { trip, notice } = driverTrip;

  return (
    <article
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

      {canNotify ? (
        <DriverTenMinutesAwayButton
          notice={notice}
          isSending={isSendingNotice}
          onTenMinutesAwayPressed={() => onTenMinutesAwayPressed(trip.id)}
        />
      ) : (
        <p className="flex h-12 items-center justify-center gap-2 rounded-xl bg-canvas text-sm font-medium text-ink-soft">
          <ClockIcon className="size-4" />
          You can notify the client on the day
        </p>
      )}
    </article>
  );
}

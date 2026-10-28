import type { Driver } from "@/modules/shared/types/shared-driver.types";

type DispatchDriverAssignSelectProps = {
  tripId: string;
  assignedDriverId: string | null;
  availableDrivers: Driver[];
  isLocked: boolean;
  onDriverAssigned: (tripId: string, driverId: string) => void;
};

export function DispatchDriverAssignSelect({
  tripId,
  assignedDriverId,
  availableDrivers,
  isLocked,
  onDriverAssigned,
}: DispatchDriverAssignSelectProps) {
  const isUnassigned = !assignedDriverId;

  return (
    <select
      aria-label="Assigned driver"
      value={assignedDriverId ?? ""}
      disabled={isLocked}
      onChange={(event) => onDriverAssigned(tripId, event.target.value)}
      className={`h-9 w-full rounded-lg border px-2 text-sm font-medium outline-none transition-colors focus:border-ink disabled:cursor-not-allowed disabled:opacity-70 ${
        isUnassigned ? "border-accent bg-accent/10 text-ink" : "border-line bg-surface text-ink"
      }`}
    >
      <option value="">Assign driver…</option>
      {availableDrivers.map((driver) => (
        <option key={driver.id} value={driver.id}>
          {driver.fullName}
        </option>
      ))}
    </select>
  );
}

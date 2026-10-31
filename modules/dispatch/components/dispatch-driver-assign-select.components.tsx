import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/shared/components/ui/select";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import { cn } from "@/modules/shared/utils/shared-class-names.utils";
import {
  fromDriverSelectValue,
  toDriverSelectValue,
  unassignedDriverSelectValue,
} from "../config/dispatch-driver-select.config";

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
  const assignedDriver = availableDrivers.find((driver) => driver.id === assignedDriverId);
  const isUnassigned = !assignedDriver;

  return (
    <Select
      value={toDriverSelectValue(assignedDriverId)}
      disabled={isLocked}
      onValueChange={(selectValue) => onDriverAssigned(tripId, fromDriverSelectValue(selectValue))}
    >
      <SelectTrigger
        size="sm"
        aria-label="Assigned driver"
        className={cn("font-medium", isUnassigned && "border-accent bg-accent/10")}
      >
        {/* Text given up front so the first paint isn't blank (Radix fills it in after hydration). */}
        <SelectValue>{assignedDriver?.fullName ?? "Assign driver…"}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={unassignedDriverSelectValue}>Assign driver…</SelectItem>
        {availableDrivers.map((driver) => (
          <SelectItem key={driver.id} value={driver.id}>
            {driver.fullName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

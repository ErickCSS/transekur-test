import { AnimatePresence, motion } from "motion/react";
import { CarIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedEmptyState } from "@/modules/shared/components/shared-empty-state.components";
import { Card } from "@/modules/shared/components/ui/card";
import { sharedListItemMotion } from "@/modules/shared/config/shared-motion.config";
import type { Driver } from "@/modules/shared/types/shared-driver.types";
import type { DispatchTripRow as DispatchTripRowData } from "../types/dispatch.types";
import { DispatchTripRow } from "./dispatch-trip-row.components";

type DispatchTripsListProps = {
  tripRows: DispatchTripRowData[];
  availableDrivers: Driver[];
  onDriverAssigned: (tripId: string, driverId: string) => void;
};

const tripsListColumnTitles = ["Time", "Client", "Pickup point", "Driver", "Client notice"];

export function DispatchTripsList({ tripRows, availableDrivers, onDriverAssigned }: DispatchTripsListProps) {
  if (tripRows.length === 0) {
    return (
      <SharedEmptyState
        icon={<CarIcon />}
        title="No services for this day"
        description="Create one with the form and it will show up here."
      />
    );
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <div className="hidden grid-cols-[5.5rem_1fr_1.2fr_1.5fr_7.5rem] gap-x-4 border-b border-line bg-canvas/60 px-4 py-2.5 md:grid">
        {tripsListColumnTitles.map((columnTitle) => (
          <span
            key={columnTitle}
            className="text-xs font-semibold uppercase tracking-wide text-ink-soft last:justify-self-end"
          >
            {columnTitle}
          </span>
        ))}
      </div>
      {/* A new service slides into its time slot and the rows below make room. The optimistic row and the saved one
          share the id, so it doesn't animate twice. */}
      <ul className="relative divide-y divide-line">
        <AnimatePresence initial={false}>
          {tripRows.map((tripRow) => (
            <motion.li key={tripRow.trip.id} className="bg-surface" {...sharedListItemMotion}>
              <DispatchTripRow tripRow={tripRow} availableDrivers={availableDrivers} onDriverAssigned={onDriverAssigned} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Card>
  );
}

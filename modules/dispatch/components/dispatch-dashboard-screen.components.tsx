import { SharedLoadingSkeleton } from "@/modules/shared/components/shared-loading-skeleton.components";
import { SharedMockDatabaseGate } from "@/modules/shared/components/shared-mock-database-gate.components";
import { DispatchDashboardContent } from "./dispatch-dashboard-content.components";

export function DispatchDashboardScreen() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <SharedMockDatabaseGate fallback={<SharedLoadingSkeleton rows={4} />}>
        <DispatchDashboardContent />
      </SharedMockDatabaseGate>
    </main>
  );
}

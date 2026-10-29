import { Suspense } from "react";
import { SharedLoadingSkeleton } from "@/modules/shared/components/shared-loading-skeleton.components";
import { getDispatchBoardData } from "../actions/dispatch-trips.actions";
import { DispatchDashboardContent } from "./dispatch-dashboard-content.components";

// The board reads the database per request, so it streams in behind Suspense (cacheComponents).
async function DispatchDashboardWithBoardData() {
  const boardData = await getDispatchBoardData();
  return <DispatchDashboardContent boardData={boardData} />;
}

export function DispatchDashboardScreen() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Suspense fallback={<SharedLoadingSkeleton rows={4} />}>
        <DispatchDashboardWithBoardData />
      </Suspense>
    </main>
  );
}

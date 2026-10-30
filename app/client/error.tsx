"use client";

import { useEffect } from "react";
import { SharedRouteErrorState } from "@/modules/shared/components/shared-route-error-state.components";

export default function ClientError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <SharedRouteErrorState onRetry={retry} />;
}

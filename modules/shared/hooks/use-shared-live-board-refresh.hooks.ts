"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { subscribeToBoardChanges } from "../services/shared-supabase-browser-client.services";
import type { SharedLiveConnectionStatus } from "../types/shared-live.types";

// One change can fire several messages (trip update + notice insert), so refreshes are grouped.
const refreshDelayMilliseconds = 300;

export function useSharedLiveBoardRefresh() {
  const router = useRouter();
  const [liveConnectionStatus, setLiveConnectionStatus] = useState<SharedLiveConnectionStatus>("connecting");

  useEffect(() => {
    let pendingRefreshTimeout: ReturnType<typeof setTimeout> | undefined;

    function refreshBoardSoon() {
      clearTimeout(pendingRefreshTimeout);
      pendingRefreshTimeout = setTimeout(() => router.refresh(), refreshDelayMilliseconds);
    }

    // Phones pause background tabs; catch up on anything missed when the screen comes back.
    function refreshWhenScreenIsVisibleAgain() {
      if (document.visibilityState === "visible") refreshBoardSoon();
    }

    const unsubscribeFromBoardChanges = subscribeToBoardChanges(refreshBoardSoon, setLiveConnectionStatus);
    document.addEventListener("visibilitychange", refreshWhenScreenIsVisibleAgain);
    return () => {
      clearTimeout(pendingRefreshTimeout);
      document.removeEventListener("visibilitychange", refreshWhenScreenIsVisibleAgain);
      unsubscribeFromBoardChanges();
    };
  }, [router]);

  return { liveConnectionStatus };
}

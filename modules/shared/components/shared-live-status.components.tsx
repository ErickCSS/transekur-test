"use client";

import { useSharedLiveBoardRefresh } from "../hooks/use-shared-live-board-refresh.hooks";
import type { SharedLiveConnectionStatus } from "../types/shared-live.types";

type SharedLiveStatusTone = "light" | "dark";

const liveStatusLabels: Record<SharedLiveConnectionStatus, string> = {
  connecting: "Connecting…",
  live: "Live",
  offline: "Offline · refresh to update",
};

const liveStatusDotClassNames: Record<SharedLiveConnectionStatus, string> = {
  connecting: "bg-accent",
  live: "bg-success animate-pulse",
  offline: "bg-red-500",
};

const liveStatusToneClassNames: Record<SharedLiveStatusTone, string> = {
  light: "bg-ink/5 text-ink-soft",
  dark: "bg-white/10 text-white/80",
};

type SharedLiveStatusProps = {
  tone?: SharedLiveStatusTone;
};

// Keeps the screen in sync with the database and shows whether live updates are on.
export function SharedLiveStatus({ tone = "light" }: SharedLiveStatusProps) {
  const { liveConnectionStatus } = useSharedLiveBoardRefresh();

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${liveStatusToneClassNames[tone]}`}
    >
      <span aria-hidden className={`size-2 rounded-full ${liveStatusDotClassNames[liveConnectionStatus]}`} />
      {liveStatusLabels[liveConnectionStatus]}
    </span>
  );
}

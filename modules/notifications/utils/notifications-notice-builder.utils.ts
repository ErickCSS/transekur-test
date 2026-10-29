import type { Notice } from "@/modules/shared/types/shared-notice.types";

export function findNoticeForTrip(notices: Notice[], tripId: string) {
  return notices.find((notice) => notice.tripId === tripId) ?? null;
}

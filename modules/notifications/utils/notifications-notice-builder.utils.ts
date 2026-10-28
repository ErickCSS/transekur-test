import type { Driver } from "@/modules/shared/types/shared-driver.types";
import type { Notice } from "@/modules/shared/types/shared-notice.types";
import type { Trip } from "@/modules/shared/types/shared-trip.types";
import { buildDriverTenMinutesAwayMessage } from "../config/notifications-message-template.config";
import { buildWhatsAppNoticeLink } from "./notifications-whatsapp-link.utils";

export function buildDriverTenMinutesAwayNotice(
  noticeId: string,
  trip: Trip,
  driver: Driver,
  sentAt: Date,
): Notice {
  const message = buildDriverTenMinutesAwayMessage(trip.clientName, driver);
  return {
    id: noticeId,
    tripId: trip.id,
    clientName: trip.clientName,
    clientPhone: trip.clientPhone,
    message,
    whatsAppLink: buildWhatsAppNoticeLink(trip.clientPhone, message),
    sentAt: sentAt.toISOString(),
  };
}

export function findNoticeForTrip(notices: Notice[], tripId: string) {
  return notices.find((notice) => notice.tripId === tripId) ?? null;
}

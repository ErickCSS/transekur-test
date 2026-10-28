import { keepOnlyPhoneDigits } from "@/modules/shared/utils/shared-phone-format.utils";

export function buildWhatsAppNoticeLink(clientPhone: string, message: string) {
  return `https://wa.me/${keepOnlyPhoneDigits(clientPhone)}?text=${encodeURIComponent(message)}`;
}

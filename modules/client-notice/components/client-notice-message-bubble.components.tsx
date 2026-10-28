import type { Notice } from "@/modules/shared/types/shared-notice.types";
import { formatTimeOfDay } from "@/modules/shared/utils/shared-date-format.utils";

type ClientNoticeMessageBubbleProps = {
  notice: Notice;
};

export function ClientNoticeMessageBubble({ notice }: ClientNoticeMessageBubbleProps) {
  return (
    <li className="flex max-w-[85%] flex-col gap-2 self-start">
      <div className="rounded-2xl rounded-tl-md bg-surface px-4 py-3 text-sm leading-relaxed shadow-sm">
        <p>{notice.message}</p>
        <p className="mt-1 text-right text-[11px] text-ink-soft tabular-nums">{formatTimeOfDay(notice.sentAt)}</p>
      </div>
      <a
        href={notice.whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#25d366] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1ebe5a]"
      >
        Open in WhatsApp
      </a>
    </li>
  );
}

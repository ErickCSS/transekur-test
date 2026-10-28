import { CheckIcon, ClockIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedStatusBadge } from "@/modules/shared/components/shared-status-badge.components";
import type { Notice } from "@/modules/shared/types/shared-notice.types";
import { formatTimeOfDay } from "@/modules/shared/utils/shared-date-format.utils";

type DispatchNoticeStatusBadgeProps = {
  notice: Notice | null;
};

export function DispatchNoticeStatusBadge({ notice }: DispatchNoticeStatusBadgeProps) {
  if (!notice) {
    return (
      <SharedStatusBadge tone="neutral">
        <ClockIcon className="size-3.5" />
        Not sent
      </SharedStatusBadge>
    );
  }

  return (
    <span title={notice.message}>
      <SharedStatusBadge tone="success">
        <CheckIcon className="size-3.5" />
        Sent {formatTimeOfDay(notice.sentAt)}
      </SharedStatusBadge>
    </span>
  );
}

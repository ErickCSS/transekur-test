import { SharedButton } from "@/modules/shared/components/shared-button.components";
import { CheckIcon, ClockIcon } from "@/modules/shared/components/shared-icons.components";
import type { Notice } from "@/modules/shared/types/shared-notice.types";
import { formatTimeOfDay } from "@/modules/shared/utils/shared-date-format.utils";

type DriverTenMinutesAwayButtonProps = {
  notice: Notice | null;
  isSending: boolean;
  onTenMinutesAwayPressed: () => void;
};

export function DriverTenMinutesAwayButton({ notice, isSending, onTenMinutesAwayPressed }: DriverTenMinutesAwayButtonProps) {
  if (notice) {
    return (
      <div className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-success-soft text-sm font-semibold text-success">
        <CheckIcon className="size-5" />
        Client notified at {formatTimeOfDay(notice.sentAt)}
      </div>
    );
  }

  return (
    <SharedButton variant="accent" size="lg" isFullWidth disabled={isSending} onClick={onTenMinutesAwayPressed}>
      <ClockIcon />
      {isSending ? "Notifying client…" : "I'm 10 min away"}
    </SharedButton>
  );
}

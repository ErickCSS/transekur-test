import { LoaderCircleIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SharedButton } from "@/modules/shared/components/shared-button.components";
import { CheckIcon, ClockIcon } from "@/modules/shared/components/shared-icons.components";
import { sharedStateSwapMotion } from "@/modules/shared/config/shared-motion.config";
import type { Notice } from "@/modules/shared/types/shared-notice.types";
import { formatTimeOfDay } from "@/modules/shared/utils/shared-date-format.utils";

type DriverTenMinutesAwayButtonProps = {
  notice: Notice | null;
  isSending: boolean;
  onTenMinutesAwayPressed: () => void;
};

export function DriverTenMinutesAwayButton({ notice, isSending, onTenMinutesAwayPressed }: DriverTenMinutesAwayButtonProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {notice ? (
        <motion.div
          key="notified"
          {...sharedStateSwapMotion}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-success-soft text-sm font-semibold text-success"
        >
          <CheckIcon className="size-5" />
          Client notified at {formatTimeOfDay(notice.sentAt)}
        </motion.div>
      ) : (
        <motion.div key="notify" {...sharedStateSwapMotion}>
          <SharedButton variant="accent" size="lg" isFullWidth disabled={isSending} onClick={onTenMinutesAwayPressed}>
            {isSending ? <LoaderCircleIcon className="size-5 animate-spin" /> : <ClockIcon />}
            {isSending ? "Notifying client…" : "I'm 10 min away"}
          </SharedButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

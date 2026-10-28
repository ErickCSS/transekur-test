import { SharedLoadingSkeleton } from "@/modules/shared/components/shared-loading-skeleton.components";
import { SharedMockDatabaseGate } from "@/modules/shared/components/shared-mock-database-gate.components";
import { SharedPhoneFrame } from "@/modules/shared/components/shared-phone-frame.components";
import { ClientNoticeInboxContent } from "./client-notice-inbox-content.components";

export function ClientNoticeInboxScreen() {
  return (
    <SharedPhoneFrame>
      <SharedMockDatabaseGate
        fallback={
          <div className="px-5 pt-14">
            <SharedLoadingSkeleton rows={3} />
          </div>
        }
      >
        <ClientNoticeInboxContent />
      </SharedMockDatabaseGate>
    </SharedPhoneFrame>
  );
}

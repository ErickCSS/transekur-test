import { Suspense } from "react";
import { SharedLoadingSkeleton } from "@/modules/shared/components/shared-loading-skeleton.components";
import { SharedPhoneFrame } from "@/modules/shared/components/shared-phone-frame.components";
import { getClientNoticeInboxData } from "../actions/client-notice-inbox.actions";
import { ClientNoticeInboxContent } from "./client-notice-inbox-content.components";

// The inbox reads the database per request, so it streams in behind Suspense (cacheComponents).
async function ClientNoticeInboxWithData() {
  const inboxData = await getClientNoticeInboxData();
  return <ClientNoticeInboxContent inboxData={inboxData} />;
}

export function ClientNoticeInboxScreen() {
  return (
    <SharedPhoneFrame>
      <Suspense
        fallback={
          <div className="px-5 pt-14">
            <SharedLoadingSkeleton rows={3} />
          </div>
        }
      >
        <ClientNoticeInboxWithData />
      </Suspense>
    </SharedPhoneFrame>
  );
}

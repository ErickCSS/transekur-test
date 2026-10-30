"use client";

import Link from "next/link";
import { ArrowLeftIcon, MessageIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedEmptyState } from "@/modules/shared/components/shared-empty-state.components";
import { SharedLiveStatus } from "@/modules/shared/components/shared-live-status.components";
import { formatPhoneForDisplay } from "@/modules/shared/utils/shared-phone-format.utils";
import { useClientNoticeInbox } from "../hooks/use-client-notice-inbox.hooks";
import type { ClientNoticeInboxData } from "../types/client-notice.types";
import { ClientNoticeMessageBubble } from "./client-notice-message-bubble.components";

type ClientNoticeInboxContentProps = {
  inboxData: ClientNoticeInboxData;
};

export function ClientNoticeInboxContent({ inboxData }: ClientNoticeInboxContentProps) {
  const { clientContacts, selectedClientPhone, selectedClientContact, selectedClientNotices, selectClientPhone } =
    useClientNoticeInbox(inboxData);

  return (
    <>
      <header className="flex flex-col gap-3 border-b border-line bg-surface px-5 pb-4 pt-12">
        <div className="flex items-center justify-between">
          <Link href="/" target="_top" className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
            <ArrowLeftIcon className="size-4" />
            All apps
          </Link>
          <div className="flex items-center gap-2">
            <SharedLiveStatus />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-strong">Client phone</span>
          </div>
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Viewing phone of</span>
          <select
            value={selectedClientPhone}
            onChange={(event) => selectClientPhone(event.target.value)}
            className="h-10 rounded-xl border border-line bg-canvas px-3 text-sm font-semibold outline-none focus:border-ink"
          >
            {clientContacts.map((clientContact) => (
              <option key={clientContact.clientPhone} value={clientContact.clientPhone}>
                {clientContact.clientName} · {formatPhoneForDisplay(clientContact.clientPhone)}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#ece9e1] px-4 py-5">
        <p className="self-center rounded-full bg-surface/70 px-3 py-1 text-[11px] font-semibold text-ink-soft">
          Pickup notices
        </p>
        {selectedClientNotices.length === 0 ? (
          <SharedEmptyState
            icon={<MessageIcon />}
            title="No messages yet"
            description={`${selectedClientContact?.clientName ?? "This client"} will get a message here when the driver is 10 minutes away.`}
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {selectedClientNotices.map((notice) => (
              <ClientNoticeMessageBubble key={notice.id} notice={notice} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

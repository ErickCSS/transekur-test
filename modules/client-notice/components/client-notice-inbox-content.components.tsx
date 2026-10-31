"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeftIcon, MessageIcon } from "@/modules/shared/components/shared-icons.components";
import { SharedEmptyState } from "@/modules/shared/components/shared-empty-state.components";
import { SharedLiveStatus } from "@/modules/shared/components/shared-live-status.components";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/shared/components/ui/select";
import { sharedMessageBubbleMotion, sharedViewSwitchMotion } from "@/modules/shared/config/shared-motion.config";
import { formatPhoneForDisplay } from "@/modules/shared/utils/shared-phone-format.utils";
import { useClientNoticeInbox } from "../hooks/use-client-notice-inbox.hooks";
import type { ClientNoticeInboxData } from "../types/client-notice.types";
import { ClientNoticeMessageBubble } from "./client-notice-message-bubble.components";

type ClientNoticeInboxContentProps = {
  inboxData: ClientNoticeInboxData;
};

export function ClientNoticeInboxContent({ inboxData }: ClientNoticeInboxContentProps) {
  const {
    clientContacts,
    selectedClientPhone,
    selectedClientContact,
    selectedClientNotices,
    messagesScrollRef,
    selectClientPhone,
  } = useClientNoticeInbox(inboxData);

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
        <div className="flex flex-col gap-1">
          <span id="client-phone-label" className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            Viewing phone of
          </span>
          <Select value={selectedClientPhone} onValueChange={selectClientPhone}>
            <SelectTrigger aria-labelledby="client-phone-label" className="h-10 bg-canvas font-semibold">
              {/* Text given up front so the first paint isn't blank (Radix fills it in after hydration). */}
              <SelectValue placeholder="No clients yet">
                {selectedClientContact
                  ? `${selectedClientContact.clientName} · ${formatPhoneForDisplay(selectedClientContact.clientPhone)}`
                  : null}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {clientContacts.map((clientContact) => (
                <SelectItem key={clientContact.clientPhone} value={clientContact.clientPhone}>
                  {clientContact.clientName} · {formatPhoneForDisplay(clientContact.clientPhone)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div ref={messagesScrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#ece9e1] px-4 py-5">
        <p className="self-center rounded-full bg-surface/70 px-3 py-1 text-[11px] font-semibold text-ink-soft">
          Pickup notices
        </p>
        {/* Changing phones fades the conversation in; a message that arrives live pops in on its own. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selectedClientPhone} {...sharedViewSwitchMotion}>
            {selectedClientNotices.length === 0 ? (
              <SharedEmptyState
                icon={<MessageIcon />}
                title="No messages yet"
                description={`${selectedClientContact?.clientName ?? "This client"} will get a message here when the driver is 10 minutes away.`}
              />
            ) : (
              <ul className="flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {selectedClientNotices.map((notice) => (
                    <motion.li key={notice.id} className="flex max-w-[85%] flex-col self-start" {...sharedMessageBubbleMotion}>
                      <ClientNoticeMessageBubble notice={notice} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

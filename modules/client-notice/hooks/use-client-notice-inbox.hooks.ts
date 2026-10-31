"use client";

import { useEffect, useRef, useState } from "react";
import type { ClientNoticeInboxData } from "../types/client-notice.types";

export function useClientNoticeInbox({ clientContacts, notices }: ClientNoticeInboxData) {
  const [chosenClientPhone, setChosenClientPhone] = useState<string | null>(null);
  const messagesScrollRef = useRef<HTMLDivElement>(null);

  const latestNotifiedClientPhone = notices.at(-1)?.clientPhone ?? null;
  const selectedClientPhone = chosenClientPhone ?? latestNotifiedClientPhone ?? clientContacts[0]?.clientPhone ?? "";
  const selectedClientContact =
    clientContacts.find((clientContact) => clientContact.clientPhone === selectedClientPhone) ?? null;

  const selectedClientNotices = notices
    .filter((notice) => notice.clientPhone === selectedClientPhone)
    .sort((first, second) => first.sentAt.localeCompare(second.sentAt));
  const latestSelectedNoticeId = selectedClientNotices.at(-1)?.id ?? null;

  // Like a chat app: when a new message arrives, scroll down to it.
  useEffect(() => {
    if (!latestSelectedNoticeId) return;
    const messagesScrollElement = messagesScrollRef.current;
    messagesScrollElement?.scrollTo({ top: messagesScrollElement.scrollHeight, behavior: "smooth" });
  }, [latestSelectedNoticeId]);

  return {
    clientContacts,
    selectedClientPhone,
    selectedClientContact,
    selectedClientNotices,
    messagesScrollRef,
    selectClientPhone: setChosenClientPhone,
  };
}

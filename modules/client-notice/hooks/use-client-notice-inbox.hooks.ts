"use client";

import { useState } from "react";
import type { ClientNoticeInboxData } from "../types/client-notice.types";

export function useClientNoticeInbox({ clientContacts, notices }: ClientNoticeInboxData) {
  const [chosenClientPhone, setChosenClientPhone] = useState<string | null>(null);

  const latestNotifiedClientPhone = notices.at(-1)?.clientPhone ?? null;
  const selectedClientPhone = chosenClientPhone ?? latestNotifiedClientPhone ?? clientContacts[0]?.clientPhone ?? "";
  const selectedClientContact =
    clientContacts.find((clientContact) => clientContact.clientPhone === selectedClientPhone) ?? null;

  const selectedClientNotices = notices
    .filter((notice) => notice.clientPhone === selectedClientPhone)
    .sort((first, second) => first.sentAt.localeCompare(second.sentAt));

  return {
    clientContacts,
    selectedClientPhone,
    selectedClientContact,
    selectedClientNotices,
    selectClientPhone: setChosenClientPhone,
  };
}

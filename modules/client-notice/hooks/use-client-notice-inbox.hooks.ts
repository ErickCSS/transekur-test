"use client";

import { useState } from "react";
import { useSharedMockDatabase } from "@/modules/shared/hooks/use-shared-mock-database.hooks";
import type { Trip } from "@/modules/shared/types/shared-trip.types";
import type { ClientNoticeContact } from "../types/client-notice.types";

function listClientContactsFromTrips(trips: Trip[]): ClientNoticeContact[] {
  const clientContactsByPhone = new Map<string, ClientNoticeContact>();
  trips.forEach((trip) => clientContactsByPhone.set(trip.clientPhone, { clientPhone: trip.clientPhone, clientName: trip.clientName }));
  return [...clientContactsByPhone.values()].sort((first, second) => first.clientName.localeCompare(second.clientName));
}

export function useClientNoticeInbox() {
  const { trips, notices } = useSharedMockDatabase();
  const [chosenClientPhone, setChosenClientPhone] = useState<string | null>(null);

  const clientContacts = listClientContactsFromTrips(trips);
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

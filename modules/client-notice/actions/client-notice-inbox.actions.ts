"use server";

import { listClientNoticeInboxData } from "../services/client-notice-inbox.services";

// The client phone is a simulation, open to anyone with the demo link.
export async function getClientNoticeInboxData() {
  return listClientNoticeInboxData();
}

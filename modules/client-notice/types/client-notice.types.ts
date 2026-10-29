import type { Notice } from "@/modules/shared/types/shared-notice.types";

export type ClientNoticeContact = {
  clientPhone: string;
  clientName: string;
};

export type ClientNoticeInboxData = {
  clientContacts: ClientNoticeContact[];
  notices: Notice[];
};

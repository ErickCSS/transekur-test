import "server-only";
import { createSupabaseAdminClient } from "@/modules/shared/services/shared-supabase-admin-client.services";
import { noticeColumns, type NoticeRow } from "@/modules/shared/types/shared-database.types";
import { mapNoticeRow } from "@/modules/shared/utils/shared-database-rows.utils";
import type { ClientNoticeContact, ClientNoticeInboxData } from "../types/client-notice.types";

// Simulated phones: every client that has a service, with the notices sent to that phone.
export async function listClientNoticeInboxData(): Promise<ClientNoticeInboxData> {
  const supabase = await createSupabaseAdminClient();
  const [contactsResult, noticesResult] = await Promise.all([
    supabase.from("trips").select("client_name, client_phone").overrideTypes<
      { client_name: string; client_phone: string }[],
      { merge: false }
    >(),
    supabase.from("notices").select(noticeColumns).order("sent_at").overrideTypes<NoticeRow[], { merge: false }>(),
  ]);
  if (contactsResult.error) throw new Error(`Could not load clients: ${contactsResult.error.message}`);
  if (noticesResult.error) throw new Error(`Could not load messages: ${noticesResult.error.message}`);

  const clientContactsByPhone = new Map<string, ClientNoticeContact>();
  contactsResult.data.forEach((contactRow) =>
    clientContactsByPhone.set(contactRow.client_phone, {
      clientPhone: contactRow.client_phone,
      clientName: contactRow.client_name,
    }),
  );

  return {
    clientContacts: [...clientContactsByPhone.values()].sort((first, second) =>
      first.clientName.localeCompare(second.clientName),
    ),
    notices: noticesResult.data.map(mapNoticeRow),
  };
}

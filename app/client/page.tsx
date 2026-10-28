import type { Metadata } from "next";
import { ClientNoticeInboxScreen } from "@/modules/client-notice/components/client-notice-inbox-screen.components";

export const metadata: Metadata = { title: "Client phone · Ten Minutes Away" };

export default function ClientPage() {
  return <ClientNoticeInboxScreen />;
}

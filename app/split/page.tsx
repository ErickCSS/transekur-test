import type { Metadata } from "next";
import { SplitViewScreen } from "@/modules/split-view/components/split-view-screen.components";

export const metadata: Metadata = { title: "Side by side · Ten Minutes Away" };

export default function SplitPage() {
  return <SplitViewScreen />;
}

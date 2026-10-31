import type { ReactNode } from "react";
import { Badge } from "./ui/badge";

export type SharedStatusBadgeTone = "neutral" | "success" | "warning";

type SharedStatusBadgeProps = {
  tone: SharedStatusBadgeTone;
  children: ReactNode;
};

export function SharedStatusBadge({ tone, children }: SharedStatusBadgeProps) {
  return <Badge variant={tone}>{children}</Badge>;
}

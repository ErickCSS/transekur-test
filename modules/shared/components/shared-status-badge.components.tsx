import type { ReactNode } from "react";

export type SharedStatusBadgeTone = "neutral" | "success" | "warning";

const statusBadgeToneClassNames: Record<SharedStatusBadgeTone, string> = {
  neutral: "bg-ink/5 text-ink-soft",
  success: "bg-success-soft text-success",
  warning: "bg-accent/20 text-ink",
};

type SharedStatusBadgeProps = {
  tone: SharedStatusBadgeTone;
  children: ReactNode;
};

export function SharedStatusBadge({ tone, children }: SharedStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeToneClassNames[tone]}`}
    >
      {children}
    </span>
  );
}

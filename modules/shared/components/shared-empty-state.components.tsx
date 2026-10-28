import type { ReactNode } from "react";

type SharedEmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function SharedEmptyState({ icon, title, description }: SharedEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line px-6 py-10 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-canvas text-ink-soft">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="max-w-xs text-sm text-ink-soft">{description}</p>
    </div>
  );
}

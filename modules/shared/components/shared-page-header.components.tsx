import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon } from "./shared-icons.components";

type SharedPageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
};

export function SharedPageHeader({ eyebrow, title, description, actions }: SharedPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <Link
          href="/"
          target="_top"
          className="mb-2 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink"
        >
          <ArrowLeftIcon className="size-4" />
          All apps
        </Link>
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-strong">{eyebrow}</span>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description ? <div className="text-sm text-ink-soft">{description}</div> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

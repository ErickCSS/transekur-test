"use client";

import Link from "next/link";
import { SharedButton } from "./shared-button.components";
import { ArrowLeftIcon } from "./shared-icons.components";

type SharedRouteErrorStateProps = {
  onRetry: () => void;
};

// Shown by the routes' error.tsx when the data can't be loaded or saved (e.g. the database is unreachable).
export function SharedRouteErrorState({ onRetry }: SharedRouteErrorStateProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-strong">Something went wrong</p>
      <h1 className="text-2xl font-bold">We couldn&apos;t reach the server</h1>
      <p className="text-sm text-ink-soft">Check your connection and try again. Nothing was lost.</p>
      <div className="flex items-center gap-2">
        <SharedButton variant="accent" onClick={onRetry}>
          Try again
        </SharedButton>
        <Link
          href="/"
          target="_top"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-ink-soft hover:text-ink"
        >
          <ArrowLeftIcon className="size-4" />
          All apps
        </Link>
      </div>
    </main>
  );
}

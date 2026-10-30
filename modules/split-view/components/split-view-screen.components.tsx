import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/modules/shared/components/shared-icons.components";
import { splitViewPanes } from "../config/split-view-panes.config";
import { SplitViewPane } from "./split-view-pane.components";

// The three apps at once. Browsers don't let a page open their own split view,
// so this page lays the apps out side by side instead.
export function SplitViewScreen() {
  return (
    <main className="flex h-dvh flex-col">
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line bg-surface px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink">
            <ArrowLeftIcon className="size-4" />
            All apps
          </Link>
          <h1 className="text-base font-bold">Side by side</h1>
        </div>
        <p className="text-xs text-ink-soft">
          Create a service in Dispatch → sign in as its driver → tap <strong>I&apos;m 10 min away</strong> and watch the
          other two update.
        </p>
      </header>

      {/* The panes need the room of a computer screen; the iframes are lazy, so smaller screens don't load them. */}
      <div className="hidden min-h-0 flex-1 gap-4 p-4 xl:flex">
        {splitViewPanes.map((pane) => (
          <SplitViewPane key={pane.href} pane={pane} />
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 px-6 py-10 text-center xl:hidden">
        <h2 className="text-xl font-bold">Side by side works best on a computer</h2>
        <p className="text-sm text-ink-soft">Use a wider screen, or open each app in its own tab:</p>
        <ul className="flex flex-col gap-2">
          {splitViewPanes.map((pane) => (
            <li key={pane.href}>
              <a
                href={pane.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold hover:border-ink"
              >
                <span>
                  <span className="mr-2 text-[11px] uppercase tracking-widest text-ink-soft">{pane.stepLabel}</span>
                  {pane.title}
                </span>
                <ExternalLinkIcon className="size-4 text-ink-soft" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

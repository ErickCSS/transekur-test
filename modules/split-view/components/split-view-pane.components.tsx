import { ExternalLinkIcon } from "@/modules/shared/components/shared-icons.components";
import type { SplitViewPane as SplitViewPaneData } from "../config/split-view-panes.config";

type SplitViewPaneProps = {
  pane: SplitViewPaneData;
};

// Each app runs in its own same-origin iframe, so sessions, actions and live updates work as in a tab.
export function SplitViewPane({ pane }: SplitViewPaneProps) {
  const isPhonePane = pane.kind === "phone";

  return (
    <section
      aria-label={pane.title}
      className={`flex min-h-0 flex-col gap-2 ${isPhonePane ? "w-[376px] shrink-0" : "min-w-0 flex-1"}`}
    >
      <header className="flex items-center justify-between gap-2 px-1">
        <p className="flex items-baseline gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">{pane.stepLabel}</span>
          <span className="text-sm font-bold">{pane.title}</span>
        </p>
        <a
          href={pane.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-ink"
        >
          Open in new tab
          <ExternalLinkIcon className="size-3.5" />
        </a>
      </header>

      <div
        className={`min-h-0 flex-1 overflow-hidden bg-surface ${
          isPhonePane ? "rounded-[2.25rem] border-8 border-ink shadow-xl" : "rounded-2xl border border-line shadow-sm"
        }`}
      >
        <iframe src={pane.href} title={pane.title} loading="lazy" className="size-full" />
      </div>
    </section>
  );
}

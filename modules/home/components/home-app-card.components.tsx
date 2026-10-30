import Link from "next/link";
import {
  ArrowRightIcon,
  CarIcon,
  ExternalLinkIcon,
  HeadsetIcon,
  PhoneIcon,
} from "@/modules/shared/components/shared-icons.components";
import type { HomeAppLink, HomeAppLinkIcon } from "../config/home-app-links.config";

const homeAppIconsByName: Record<HomeAppLinkIcon, typeof CarIcon> = {
  dispatch: HeadsetIcon,
  driver: CarIcon,
  client: PhoneIcon,
};

type HomeAppCardProps = {
  appLink: HomeAppLink;
};

// The title link covers the whole card; "Open in new tab" sits above it, so there is no link inside a link.
export function HomeAppCard({ appLink }: HomeAppCardProps) {
  const AppIcon = homeAppIconsByName[appLink.icon];

  return (
    <div className="group relative flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-lg sm:flex-col sm:items-start sm:p-6">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-ink">
        <AppIcon className="size-6" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">{appLink.stepLabel}</span>
        <Link href={appLink.href} className="text-lg font-bold after:absolute after:inset-0 after:rounded-2xl">
          {appLink.title}
        </Link>
        <span className="text-sm text-ink-soft">{appLink.description}</span>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:mt-auto sm:w-full sm:justify-between">
        <a
          href={appLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 hidden items-center gap-1 text-xs font-semibold text-ink-soft hover:text-ink sm:inline-flex"
        >
          Open in new tab
          <ExternalLinkIcon className="size-3.5" />
        </a>
        <ArrowRightIcon className="size-5 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-ink" />
      </div>
    </div>
  );
}

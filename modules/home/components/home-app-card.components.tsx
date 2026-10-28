import Link from "next/link";
import {
  ArrowRightIcon,
  CarIcon,
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

export function HomeAppCard({ appLink }: HomeAppCardProps) {
  const AppIcon = homeAppIconsByName[appLink.icon];

  return (
    <Link
      href={appLink.href}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-lg sm:flex-col sm:items-start sm:p-6"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-ink">
        <AppIcon className="size-6" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">{appLink.stepLabel}</span>
        <span className="text-lg font-bold">{appLink.title}</span>
        <span className="text-sm text-ink-soft">{appLink.description}</span>
      </div>
      <ArrowRightIcon className="size-5 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-ink sm:mt-auto" />
    </Link>
  );
}

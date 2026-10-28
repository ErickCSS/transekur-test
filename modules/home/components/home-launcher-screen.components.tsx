import { ClockIcon } from "@/modules/shared/components/shared-icons.components";
import { homeAppLinks } from "../config/home-app-links.config";
import { HomeAppCard } from "./home-app-card.components";

export function HomeLauncherScreen() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white">
          <ClockIcon className="size-4 text-accent" />
          Ten Minutes Away
        </span>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Let clients know their driver is almost there.
        </h1>
        <p className="max-w-xl text-ink-soft">
          A mini demo of the “driver 10 minutes away” notice. Open each app in its own tab and follow the steps.
        </p>
      </div>

      <nav aria-label="Demo apps" className="grid gap-4 sm:grid-cols-3">
        {homeAppLinks.map((appLink) => (
          <HomeAppCard key={appLink.href} appLink={appLink} />
        ))}
      </nav>

      <p className="text-xs text-ink-soft">All names, phones and vehicles are made up.</p>
    </main>
  );
}

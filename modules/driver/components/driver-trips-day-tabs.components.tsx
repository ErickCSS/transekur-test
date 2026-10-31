import { TabsList, TabsTrigger } from "@/modules/shared/components/ui/tabs";
import type { DriverTripsDay } from "../types/driver.types";

type DriverTripsDayTabsProps = {
  todayTripsCount: number;
  tomorrowTripsCount: number;
};

// Rendered inside the <Tabs> root of the trips content, which owns the selected day.
export function DriverTripsDayTabs({ todayTripsCount, tomorrowTripsCount }: DriverTripsDayTabsProps) {
  const dayTabs: { day: DriverTripsDay; label: string; tripsCount: number }[] = [
    { day: "today", label: "Today", tripsCount: todayTripsCount },
    { day: "tomorrow", label: "Tomorrow", tripsCount: tomorrowTripsCount },
  ];

  return (
    <TabsList aria-label="Services by day">
      {dayTabs.map(({ day, label, tripsCount }) => (
        <TabsTrigger key={day} value={day} className="group">
          {label}
          <span className="min-w-5 rounded-full bg-ink/10 px-1.5 text-xs tabular-nums transition-colors group-data-[state=active]:bg-accent group-data-[state=active]:text-ink">
            {tripsCount}
          </span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

import type { DriverTripsDay } from "../types/driver.types";

type DriverTripsDayTabsProps = {
  selectedDay: DriverTripsDay;
  todayTripsCount: number;
  tomorrowTripsCount: number;
  onDaySelected: (day: DriverTripsDay) => void;
};

export function DriverTripsDayTabs({
  selectedDay,
  todayTripsCount,
  tomorrowTripsCount,
  onDaySelected,
}: DriverTripsDayTabsProps) {
  const dayTabs: { day: DriverTripsDay; label: string; tripsCount: number }[] = [
    { day: "today", label: "Today", tripsCount: todayTripsCount },
    { day: "tomorrow", label: "Tomorrow", tripsCount: tomorrowTripsCount },
  ];

  return (
    <div role="tablist" aria-label="Services by day" className="grid grid-cols-2 gap-1 rounded-xl bg-canvas p-1">
      {dayTabs.map(({ day, label, tripsCount }) => {
        const isSelected = day === selectedDay;
        return (
          <button
            key={day}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onDaySelected(day)}
            className={`flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors ${
              isSelected ? "bg-surface text-ink shadow-sm" : "text-ink-soft hover:text-ink"
            }`}
          >
            {label}
            <span
              className={`min-w-5 rounded-full px-1.5 text-xs tabular-nums ${isSelected ? "bg-accent text-ink" : "bg-ink/10"}`}
            >
              {tripsCount}
            </span>
          </button>
        );
      })}
    </div>
  );
}

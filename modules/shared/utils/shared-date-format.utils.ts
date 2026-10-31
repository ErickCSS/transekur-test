import { operationTimeZone } from "../config/shared-operation.config";

// Every date is read and shown in the operation's time zone (shared-operation.config).
export function formatTimeOfDay(isoDate: string) {
  return new Date(isoDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: operationTimeZone,
  });
}

export function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: operationTimeZone,
  });
}

// YYYY-MM-DD, the format of <input type="date">.
export function toDateInputValue(date: Date) {
  return date.toLocaleDateString("en-CA", { timeZone: operationTimeZone });
}

export function isSameCalendarDay(isoDate: string, referenceDate: Date) {
  return toDateInputValue(new Date(isoDate)) === toDateInputValue(referenceDate);
}

// Minutes to add to UTC to get the operation's local time at that instant (e.g. -240).
function getOperationTimeZoneOffsetMinutes(date: Date) {
  const timeZoneName =
    new Intl.DateTimeFormat("en-US", { timeZone: operationTimeZone, timeZoneName: "longOffset" })
      .formatToParts(date)
      .find((datePart) => datePart.type === "timeZoneName")?.value ?? "GMT";
  const offsetMatch = /GMT([+-])(\d{2}):(\d{2})/.exec(timeZoneName);
  if (!offsetMatch) return 0;
  const offsetMinutes = Number(offsetMatch[2]) * 60 + Number(offsetMatch[3]);
  return offsetMatch[1] === "-" ? -offsetMinutes : offsetMinutes;
}

// "2026-10-28" + "14:30" read as operation local time → ISO string in UTC.
export function combineDateAndTimeInputs(dateInputValue: string, timeInputValue: string) {
  const sameClockInUtc = new Date(`${dateInputValue}T${timeInputValue}:00Z`);
  const offsetMinutes = getOperationTimeZoneOffsetMinutes(sameClockInUtc);
  return new Date(sameClockInUtc.getTime() - offsetMinutes * 60_000).toISOString();
}

// Start (inclusive) and end (exclusive) of a calendar day, as UTC ISO strings for database filters.
export function getCalendarDayRange(dateInputValue: string) {
  const dayStart = new Date(combineDateAndTimeInputs(dateInputValue, "00:00"));
  const nextDayStart = new Date(dayStart.getTime() + 36 * 60 * 60_000);
  return {
    dayStartIso: dayStart.toISOString(),
    dayEndIso: combineDateAndTimeInputs(toDateInputValue(nextDayStart), "00:00"),
  };
}

// The calendar day after `dateInputValue`, in the operation's time zone.
export function getNextDateInputValue(dateInputValue: string) {
  return toDateInputValue(new Date(getCalendarDayRange(dateInputValue).dayEndIso));
}

// "2026-10-30" → "Friday, October 30". Noon avoids landing on the previous day.
export function formatLongDateFromInputValue(dateInputValue: string) {
  return formatLongDate(new Date(combineDateAndTimeInputs(dateInputValue, "12:00")));
}

// The calendar works with local Dates; a YYYY-MM-DD value is only a calendar day, so local midnight keeps it the same day.
export function parseDateInputValue(dateInputValue: string) {
  const [year, month, day] = dateInputValue.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toDateInputValueFromLocalDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export type TimeSlotOption = { value: string; label: string };

// "06:00" … "23:45" every `stepMinutes`, labelled like the rest of the app ("02:30 PM").
export function buildTimeSlotOptions(stepMinutes = 15, firstHour = 6): TimeSlotOption[] {
  const timeSlotOptions: TimeSlotOption[] = [];
  for (let minutesOfDay = firstHour * 60; minutesOfDay < 24 * 60; minutesOfDay += stepMinutes) {
    const hours = Math.floor(minutesOfDay / 60);
    const minutes = String(minutesOfDay % 60).padStart(2, "0");
    const twelveHour = String(hours % 12 === 0 ? 12 : hours % 12).padStart(2, "0");
    timeSlotOptions.push({
      value: `${String(hours).padStart(2, "0")}:${minutes}`,
      label: `${twelveHour}:${minutes} ${hours < 12 ? "AM" : "PM"}`,
    });
  }
  return timeSlotOptions;
}

export function sortByScheduledTime<T extends { scheduledAt: string }>(items: T[]) {
  return [...items].sort((first, second) => first.scheduledAt.localeCompare(second.scheduledAt));
}

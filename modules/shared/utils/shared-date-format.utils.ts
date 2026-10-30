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

export function sortByScheduledTime<T extends { scheduledAt: string }>(items: T[]) {
  return [...items].sort((first, second) => first.scheduledAt.localeCompare(second.scheduledAt));
}

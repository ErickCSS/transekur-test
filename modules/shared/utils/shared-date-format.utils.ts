export function formatTimeOfDay(isoDate: string) {
  return new Date(isoDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export function isSameCalendarDay(isoDate: string, referenceDate: Date) {
  return new Date(isoDate).toDateString() === referenceDate.toDateString();
}

export function toDateInputValue(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function combineDateAndTimeInputs(dateInputValue: string, timeInputValue: string) {
  return new Date(`${dateInputValue}T${timeInputValue}`).toISOString();
}

export function sortByScheduledTime<T extends { scheduledAt: string }>(items: T[]) {
  return [...items].sort((first, second) => first.scheduledAt.localeCompare(second.scheduledAt));
}

"use client";

import { useState } from "react";
import {
  formatLongDateFromInputValue,
  parseDateInputValue,
  toDateInputValueFromLocalDate,
} from "../utils/shared-date-format.utils";

type UseSharedDatePickerOptions = {
  // YYYY-MM-DD, the same value a native date input uses.
  value: string;
  onValueChange: (dateInputValue: string) => void;
  // Days before this one can't be picked.
  disabledBefore?: string;
};

export function useSharedDatePicker({ value, onValueChange, disabledBefore }: UseSharedDatePickerOptions) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Picking a day closes the calendar; clicking the selected day again keeps the value.
  function selectCalendarDate(date: Date | undefined) {
    if (date) onValueChange(toDateInputValueFromLocalDate(date));
    setIsCalendarOpen(false);
  }

  return {
    isCalendarOpen,
    setIsCalendarOpen,
    selectedDate: value ? parseDateInputValue(value) : undefined,
    selectedDateLabel: value ? formatLongDateFromInputValue(value) : null,
    disabledDays: disabledBefore ? { before: parseDateInputValue(disabledBefore) } : undefined,
    selectCalendarDate,
  };
}

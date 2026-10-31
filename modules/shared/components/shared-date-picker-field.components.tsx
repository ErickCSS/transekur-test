"use client";

import { CalendarDaysIcon, ChevronDownIcon } from "lucide-react";
import { useId } from "react";
import { useSharedDatePicker } from "../hooks/use-shared-date-picker.hooks";
import { cn } from "../utils/shared-class-names.utils";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type SharedDatePickerFieldProps = {
  value: string;
  onValueChange: (dateInputValue: string) => void;
  // Without a label it is a compact filter (give it an aria-label).
  label?: string;
  "aria-label"?: string;
  placeholder?: string;
  errorMessage?: string;
  disabledBefore?: string;
  className?: string;
};

// A button that looks like a field and opens a calendar. The value stays a YYYY-MM-DD string.
export function SharedDatePickerField({
  value,
  onValueChange,
  label,
  "aria-label": ariaLabel,
  placeholder = "Pick a date",
  errorMessage,
  disabledBefore,
  className,
}: SharedDatePickerFieldProps) {
  const fieldId = useId();
  const { isCalendarOpen, setIsCalendarOpen, selectedDate, selectedDateLabel, disabledDays, selectCalendarDate } =
    useSharedDatePicker({ value, onValueChange, disabledBefore });
  const isCompact = !label;

  const datePicker = (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <button
          id={fieldId}
          type="button"
          aria-label={ariaLabel}
          data-invalid={errorMessage ? true : undefined}
          aria-describedby={errorMessage ? `${fieldId}-error` : undefined}
          className={cn(
            "flex w-full min-w-0 items-center gap-2 rounded-xl border border-input bg-card px-3 text-left text-sm text-foreground shadow-xs transition-[color,border-color,box-shadow] outline-none",
            "hover:bg-muted/60 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/10 data-[state=open]:border-ring",
            "data-[invalid=true]:border-destructive data-[invalid=true]:ring-destructive/15",
            isCompact ? "h-9 w-auto rounded-lg font-medium" : "h-11",
            className,
          )}
        >
          <CalendarDaysIcon className="size-4 shrink-0 text-muted-foreground" />
          <span className={cn("flex-1 truncate", !selectedDateLabel && "text-muted-foreground/70")}>
            {selectedDateLabel ?? placeholder}
          </span>
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={isCompact ? "end" : "start"}>
        <Calendar
          mode="single"
          selected={selectedDate}
          defaultMonth={selectedDate}
          onSelect={selectCalendarDate}
          disabled={disabledDays}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );

  if (isCompact) return datePicker;

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={fieldId} className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </Label>
      {datePicker}
      {errorMessage ? (
        <span id={`${fieldId}-error`} className="text-xs font-medium text-red-600">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

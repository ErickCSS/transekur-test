import { useId, type ComponentProps, type ReactNode } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type SharedFieldLabelProps = {
  fieldId: string;
  label: string;
  errorMessage?: string;
  children: ReactNode;
};

function SharedFieldLabel({ fieldId, label, errorMessage, children }: SharedFieldLabelProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <Label htmlFor={fieldId} className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </Label>
      {children}
      {errorMessage ? (
        <span id={`${fieldId}-error`} className="text-xs font-medium text-red-600">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

function buildFieldErrorProps(fieldId: string, errorMessage?: string) {
  return errorMessage ? { "aria-invalid": true, "aria-describedby": `${fieldId}-error` } : {};
}

type SharedTextFieldProps = ComponentProps<"input"> & {
  label: string;
  errorMessage?: string;
};

export function SharedTextField({ label, errorMessage, id, ...inputProps }: SharedTextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <SharedFieldLabel fieldId={fieldId} label={label} errorMessage={errorMessage}>
      <Input id={fieldId} {...buildFieldErrorProps(fieldId, errorMessage)} {...inputProps} />
    </SharedFieldLabel>
  );
}

export type SharedSelectOption = { value: string; label: string };

type SharedSelectFieldProps = {
  label: string;
  // An empty value shows the placeholder.
  value: string;
  onValueChange: (value: string) => void;
  options: SharedSelectOption[];
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
};

export function SharedSelectField({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  errorMessage,
  disabled,
}: SharedSelectFieldProps) {
  const fieldId = useId();
  // Radix fills the value in after hydration; giving the text up front avoids a blank field on first paint.
  const selectedOptionLabel = options.find((option) => option.value === value)?.label;

  return (
    <SharedFieldLabel fieldId={fieldId} label={label} errorMessage={errorMessage}>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger id={fieldId} {...buildFieldErrorProps(fieldId, errorMessage)}>
          <SelectValue placeholder={placeholder}>{selectedOptionLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SharedFieldLabel>
  );
}

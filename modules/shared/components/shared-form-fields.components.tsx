import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

const fieldControlClassName =
  "h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-ink";

type SharedFieldLabelProps = {
  label: string;
  errorMessage?: string;
  children: ReactNode;
};

function SharedFieldLabel({ label, errorMessage, children }: SharedFieldLabelProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</span>
      {children}
      {errorMessage ? <span className="text-xs font-medium text-red-600">{errorMessage}</span> : null}
    </label>
  );
}

type SharedTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorMessage?: string;
};

export function SharedTextField({ label, errorMessage, className = "", ...inputProps }: SharedTextFieldProps) {
  return (
    <SharedFieldLabel label={label} errorMessage={errorMessage}>
      <input className={`${fieldControlClassName} ${className}`} {...inputProps} />
    </SharedFieldLabel>
  );
}

type SharedSelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  errorMessage?: string;
};

export function SharedSelectField({
  label,
  errorMessage,
  className = "",
  children,
  ...selectProps
}: SharedSelectFieldProps) {
  return (
    <SharedFieldLabel label={label} errorMessage={errorMessage}>
      <select className={`${fieldControlClassName} ${className}`} {...selectProps}>
        {children}
      </select>
    </SharedFieldLabel>
  );
}

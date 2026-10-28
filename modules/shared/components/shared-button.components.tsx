import type { ButtonHTMLAttributes } from "react";

export type SharedButtonVariant = "accent" | "ink" | "outline" | "ghost";
export type SharedButtonSize = "md" | "lg";

const buttonVariantClassNames: Record<SharedButtonVariant, string> = {
  accent: "bg-accent text-ink hover:bg-accent-strong",
  ink: "bg-ink text-white hover:bg-ink/85",
  outline: "border border-line bg-surface text-ink hover:bg-canvas",
  ghost: "text-ink-soft hover:bg-ink/5 hover:text-ink",
};

const buttonSizeClassNames: Record<SharedButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-14 px-6 text-base",
};

export function buildSharedButtonClassName(
  variant: SharedButtonVariant = "ink",
  size: SharedButtonSize = "md",
  isFullWidth = false,
) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
    buttonVariantClassNames[variant],
    buttonSizeClassNames[size],
    isFullWidth ? "w-full" : "",
  ].join(" ");
}

type SharedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: SharedButtonVariant;
  size?: SharedButtonSize;
  isFullWidth?: boolean;
};

export function SharedButton({
  variant,
  size,
  isFullWidth,
  className = "",
  type = "button",
  ...buttonProps
}: SharedButtonProps) {
  return (
    <button
      type={type}
      className={`${buildSharedButtonClassName(variant, size, isFullWidth)} ${className}`}
      {...buttonProps}
    />
  );
}

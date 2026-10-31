import type { ComponentProps } from "react";
import { cn } from "../utils/shared-class-names.utils";
import { Button, buttonVariants } from "./ui/button";

export type SharedButtonVariant = "accent" | "ink" | "outline" | "ghost";
export type SharedButtonSize = "md" | "lg";

const buttonVariantsBySharedVariant = {
  accent: "accent",
  ink: "default",
  outline: "outline",
  ghost: "ghost",
} as const satisfies Record<SharedButtonVariant, string>;

const buttonSizesBySharedSize = {
  md: "default",
  lg: "lg",
} as const satisfies Record<SharedButtonSize, string>;

export function buildSharedButtonClassName(
  variant: SharedButtonVariant = "ink",
  size: SharedButtonSize = "md",
  isFullWidth = false,
) {
  return cn(
    buttonVariants({ variant: buttonVariantsBySharedVariant[variant], size: buttonSizesBySharedSize[size] }),
    isFullWidth && "w-full",
  );
}

type SharedButtonProps = Omit<ComponentProps<"button">, "size"> & {
  variant?: SharedButtonVariant;
  size?: SharedButtonSize;
  isFullWidth?: boolean;
};

export function SharedButton({
  variant = "ink",
  size = "md",
  isFullWidth = false,
  className,
  type = "button",
  ...buttonProps
}: SharedButtonProps) {
  return (
    <Button
      type={type}
      variant={buttonVariantsBySharedVariant[variant]}
      size={buttonSizesBySharedSize[size]}
      className={cn(isFullWidth && "w-full", className)}
      {...buttonProps}
    />
  );
}

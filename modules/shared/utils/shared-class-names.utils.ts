import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Joins class names and lets later Tailwind classes win over earlier ones (used by the shadcn primitives).
export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}

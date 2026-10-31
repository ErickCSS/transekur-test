"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

type SharedMotionProviderProps = {
  children: ReactNode;
};

// Respects the system "reduce motion" setting: movement turns off, fades stay.
export function SharedMotionProvider({ children }: SharedMotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

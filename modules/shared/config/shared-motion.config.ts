import type { HTMLMotionProps, Transition } from "motion/react";

// One set of motions for the three apps, so a new service or message moves the same way everywhere.

const listItemSpring: Transition = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 };

// Rows and cards that arrive while the screen is open (lists use AnimatePresence initial={false}).
export const sharedListItemMotion = {
  layout: "position",
  initial: { opacity: 0, y: 14, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
  transition: listItemSpring,
} satisfies HTMLMotionProps<"li">;

// A service that just landed in a driver's agenda: an amber ring that fades out.
export const sharedNewAgendaItemMotion = {
  ...sharedListItemMotion,
  initial: { ...sharedListItemMotion.initial, boxShadow: "0 0 0 3px rgba(245, 184, 61, 0.9)" },
  animate: { ...sharedListItemMotion.animate, boxShadow: "0 0 0 0px rgba(245, 184, 61, 0)" },
  transition: { ...listItemSpring, boxShadow: { duration: 2.4, ease: "easeOut", delay: 0.4 } },
} satisfies HTMLMotionProps<"li">;

// A chat bubble that grows from the sender's corner.
export const sharedMessageBubbleMotion = {
  layout: "position",
  initial: { opacity: 0, y: 18, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.15 } },
  transition: { type: "spring", stiffness: 380, damping: 26 },
  style: { originX: 0, originY: 1 },
} satisfies HTMLMotionProps<"li">;

// Swapping one state for another in the same place (button → "notified", badge → "sent").
export const sharedStateSwapMotion = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.94 },
  transition: { duration: 0.18, ease: "easeOut" },
} satisfies HTMLMotionProps<"div">;

// Alerts and confirmations that open and close in the flow of the page.
export const sharedRevealMotion = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.22, ease: "easeOut" },
  style: { overflow: "hidden" },
} satisfies HTMLMotionProps<"div">;

// A number that changed (summary counters).
export const sharedValuePopMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 500, damping: 30 },
} satisfies HTMLMotionProps<"span">;

// Switching what a screen shows (Today ↔ Tomorrow, another client's phone).
export const sharedViewSwitchMotion = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: "easeOut" },
} satisfies HTMLMotionProps<"div">;

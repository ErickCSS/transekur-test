# 0009 — shadcn/ui for base components, Motion for live animations

- **Date:** 2026-10-30
- **Status:** Accepted

## Context
The flow works end to end. For the final polish, the base components (buttons, fields, selects, badges, tabs, alerts) were hand-written Tailwind, and things that arrive live (a client message, a service in a driver's agenda, a row on the board) just popped into place, so they were easy to miss.

## Options
- **shadcn/ui + Motion** — chosen. shadcn copies accessible primitives (Radix) into the repo, so they can be styled to the brand; Motion handles enter/exit and layout animations in React.
- Keep hand-written components + CSS transitions — CSS can't animate an element leaving the list or the others making room for a new one.
- A packaged UI kit (MUI, Chakra) — its own theme and runtime, harder to make look like this app.

## Decision
- **Where they live:** `modules/shared/components/ui/`, with the CLI's own file names (`button.tsx`, `tabs.tsx`…). This is the one exception to the `<module>-<what>.<type>.tsx` rule, so `pnpm dlx shadcn add` keeps working. `cn()` is in `modules/shared/utils/shared-class-names.utils.ts`. Paths are set in `components.json`.
- **The rest of the app keeps its API:** `SharedButton`, `SharedTextField`, `SharedSelectField`, `SharedStatusBadge` and `SharedLoadingSkeleton` render the shadcn primitives underneath; `SharedDatePickerField` is new. Screens use `Alert`, `Tabs`, `Card` and `Select` directly where they need them.
- **Selects and dates:** every select is the Radix `Select`, and dates use a `Popover` + `Calendar` (react-day-picker) behind `SharedDatePickerField`, which keeps the `YYYY-MM-DD` string the date utils already use. The service time is a `Select` with 15-minute slots from 6:00 AM, so there is no native time input left. Radix can't have an option with an empty value, so "no driver" is the value `unassigned` in the selects (`dispatch-driver-select.config.ts`). The selected text is also passed to `SelectValue`, because Radix only fills it in after hydration and the first paint would show an empty field.
- **Theme:** shadcn's tokens (`--primary`, `--muted`, `--border`…) point to the existing palette in `app/globals.css`. `--accent` stays the amber brand color (in shadcn it is a grey hover color), so the generated components use `bg-muted` / `bg-ink/5` for hovers. No dark mode, so the generated `dark:` classes were removed (Tailwind 4 would apply them from the OS setting).
- **Motion presets** in `modules/shared/config/shared-motion.config.ts`, so the three apps move the same way. Lists use `AnimatePresence initial={false}`: the first paint is not animated (no flash after the server render); only items that arrive while the screen is open animate in, and items that leave fade out.
- **Reduced motion:** `SharedMotionProvider` wraps the app in `MotionConfig reducedMotion="user"`.
- **Same id for the optimistic row and the saved row:** the browser makes the new service's uuid and sends it with `createDispatchTripAction` (which checks it is a uuid). Before, the optimistic row had an `optimistic-…` id, so with animations the board would have removed it and added the real row. A row is *Saving…* until the server's list includes its id.

## Consequences
- New dependencies: `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` (icons inside the primitives; the app keeps its own icons), `tw-animate-css`, `react-day-picker` and `motion`.
- The files in `components/ui/` are ours to edit; updating one from the CLI means checking our brand changes again.
- A client could send an id that is already used; the database rejects it (primary key) and the form shows the error.

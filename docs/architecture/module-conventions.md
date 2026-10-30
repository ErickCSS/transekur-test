# Module conventions

## Module layout
```
modules/<module>/
  components/   UI. Only renders, no logic.
  hooks/        Client-side logic (state, events, derived data).
  actions/      Server logic ('use server'). Check the caller and orchestrate services.
  services/     Talk to the data source (Supabase, Realtime). Server-only except the browser Realtime client.
  config/       Constants and configurable texts.
  data/         Seed data.
  types/        Module types.
  utils/        Small pure functions.
```
Only the folders a module needs are created.

## File names
`<module>-<what it does>.<type>.ts(x)`

| Type | Example |
| --- | --- |
| Component | `dispatch-trip-form.components.tsx` |
| Hook | `use-dispatch-trip-form.hooks.ts` |
| Action | `dispatch-trips.actions.ts` |
| Service | `dispatch-trips.services.ts` |
| Config | `notifications-message-template.config.ts` |
| Data | `shared-trips-seed.data.ts` |
| Types | `shared-trip.types.ts` |
| Utils | `shared-date-format.utils.ts` |

## Dependency flow
```
app/**/page.tsx   →  <Module>Screen (Server Component, loads data behind Suspense)
Server Component  →  action  (reads)
client component  →  hook    →  action (writes)  →  service  →  Supabase
```
- A client component never imports services or actions directly; it uses its hook.
- A service doesn't know about React.
- Code shared between modules lives in `modules/shared`.
- Server Components call read actions directly (there are no hooks on the server).

## Function names
Verb + what + context: `createDispatchTrip`, `assignDriverToTrip`, `sendDriverTenMinutesAwayNotice`, `buildWhatsAppNoticeLink`.

## Project modules
| Module | Responsibility |
| --- | --- |
| `home` | Start page with the three options. |
| `dispatch` | Create services, assign drivers, see the notice status. |
| `driver-auth` | Driver sign in / sign out (Supabase Auth). |
| `driver` | Driver's services for today and the "10 min away" button. |
| `client-notice` | Client inbox (phone simulation). |
| `notifications` | Message template and WhatsApp link. |
| `shared` | Base UI, domain types, Supabase clients, live updates, date and phone utils. |

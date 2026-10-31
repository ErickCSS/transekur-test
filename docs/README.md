# Docs — Driver 10 minutes away

Living project documentation, split by type.

| Folder | Contents |
| --- | --- |
| [decisions/](decisions/) | Architecture decisions (ADR). One decision per file, numbered. |
| [architecture/](architecture/) | Module conventions, data model and flows. |
| [design/](design/) | What each screen shows. |
| [logbook/](logbook/) | One entry per work session. |
| [ai-usage.md](ai-usage.md) | Tools used (AI included), as the test asks. |
| [one-pager.md](one-pager.md) | One-page plan: what gets built, assumptions, out of scope and questions. |

## Decisions

1. [0001 — One app, three modules](decisions/0001-one-app-three-modules.md)
2. [0002 — Supabase as the backend](decisions/0002-supabase.md)
3. [0003 — Simulated notice + WhatsApp link](decisions/0003-simulated-notice-whatsapp-link.md)
4. [0004 — Driver login with Supabase Auth](decisions/0004-driver-login-supabase-auth.md)
5. [0005 — Module conventions](decisions/0005-module-conventions.md)
6. [0006 — Design first, with a mock database](decisions/0006-design-first-with-mock-data.md) (superseded by 0007)
7. [0007 — Supabase tables behind server actions](decisions/0007-supabase-tables-server-actions.md)
8. [0008 — Live updates with a Realtime broadcast](decisions/0008-live-updates-realtime-broadcast.md)
9. [0009 — shadcn/ui for base components, Motion for live animations](decisions/0009-shadcn-ui-and-motion.md)

## The test (summary)

1. **Dispatch**: create a service (client, phone, date/time, pickup point) and assign a driver.
2. **Driver app** (mobile web): the driver signs in, sees only their services for today and taps "10 min away".
3. **Client notice**: the client gets a message with the driver's name and vehicle. Dispatch sees that it went out and when.

Rules: any tools (say which), free plans, simulated SMS, made-up data.

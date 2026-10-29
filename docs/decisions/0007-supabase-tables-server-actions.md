# 0007 — Supabase tables behind server actions

- **Date:** 2026-10-28
- **Status:** Accepted

## Context
The client confirmed: dispatch without login, driver login required, one notice per service (no resend or undo), no reassigning or cancelling. Services and notices move from the browser mock store to Supabase.

## Decision
- Tables `drivers`, `trips`, `notices` ([migration](../../supabase/migrations/20261028120000_init.sql)). RLS on with **no policies**: the public key cannot read or write anything.
- The server talks to the database with the service role key (`createSupabaseAdminClient`, `server-only`). Every action checks the caller first:
  - Dispatch actions validate input (dispatch has no login, as agreed).
  - Driver actions take the driver from the verified session (`getClaims` → `drivers.auth_user_id`), never from the request.
- Sending the notice is one database function, `send_ten_minutes_away_notice`: it only succeeds for the assigned driver, for a service scheduled today that was not notified yet, and writes the status change and the notice together. `notices.trip_id` is unique as a last guard.
- A notified service can't change driver (the update filters on `status = 'scheduled'`).
- After each mutation the action calls `refresh()` so the screen re-renders with fresh server data.
- All dates use the operation time zone (`shared-operation.config.ts`), so the server (UTC) and the browser render the same text.

## Consequences
- Components keep the same shape: Server Components load the data behind `Suspense`, client hooks call the actions.
- Live updates without refresh need Realtime, which needs read policies or a broadcast channel.

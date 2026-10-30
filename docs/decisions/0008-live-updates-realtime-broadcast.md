# 0008 — Live updates with a Realtime broadcast

- **Date:** 2026-10-29
- **Status:** Accepted

## Context
The client said a refresh is acceptable and real time is a plus. Dispatch, the client phone and the driver app should update by themselves, but the tables have no public access ([0007](0007-supabase-tables-server-actions.md)), so Realtime *Postgres Changes* (which follows RLS) would need read policies for the public key.

## Options
- **Database triggers → public broadcast with no data; the screen reloads through the server** — chosen.
- Read policies for the public key + Postgres Changes — exposes client names and phones to anyone with the key.
- Polling every few seconds — simple, but slower and wasteful.

## Decision
- Triggers on `trips` and `notices` call `realtime.send(...)` on the public channel `board-changes` with event `board_changed` ([migration](../../supabase/migrations/20261029120000_board_change_broadcast.sql)). The message only says which table changed.
- Every screen listens with the public key (`useSharedLiveBoardRefresh`) and calls `router.refresh()`. The data still comes from the server actions, with the same checks as always.
- One channel per browser tab, opened once (`shared-supabase-browser-client.services.ts`). Creating it on every mount raced with the previous unsubscribe, because the client reuses a channel with the same topic.
- Messages are grouped (300 ms) because one notice changes two tables. The screen also refreshes when a phone brings the tab back to the front.
- A small **Live** pill shows the connection state on each screen.

## Consequences
- Changes from anywhere (app, SQL editor, seed) reach every open screen.
- Anyone with the public key can listen to the channel, but it carries no data.

# 0002 — Supabase as the backend

- **Date:** 2026-10-27
- **Status:** Accepted

## Context
The three screens must stay in sync (the driver taps "10 min away" and dispatch and the client see it). We need persistent data, auth and real time, on a free plan.

## Options
- **Supabase** (Postgres + Auth + Realtime) — chosen.
- JSON file + polling — doesn't persist on Vercel (serverless).
- localStorage + BroadcastChannel — only works inside one browser.

## Decision
Supabase free plan. Keys in `.env` (ignored by git; see `.env.example`).

## Consequences
- Packages `@supabase/supabase-js` and `@supabase/ssr` (session in cookies).
- Writes only from server actions ([0007](0007-supabase-tables-server-actions.md)); Realtime keeps the screens fresh ([0008](0008-live-updates-realtime-broadcast.md)).

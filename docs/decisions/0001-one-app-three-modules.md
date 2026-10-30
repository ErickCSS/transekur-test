# 0001 — One app, three modules

- **Date:** 2026-10-27
- **Status:** Accepted

## Context
The test has three actors: dispatch, driver and client. It could be a monorepo with three apps or a single app.

## Decision
One Next.js 16 app with a **home that offers three options** (`/dispatch`, `/driver`, `/client`). Each actor is its own module in `modules/`.

## Why
- One deploy and one URL for the reviewer.
- Modules already give the isolation we want, without the extra setup of a monorepo.
- If the apps ever need to be split, each module can move to its own app almost unchanged.

## Consequences
- Routes in `app/` are thin: they only mount the module's screen.
- Shared pieces (base UI, domain types, Supabase) live in `modules/shared`.

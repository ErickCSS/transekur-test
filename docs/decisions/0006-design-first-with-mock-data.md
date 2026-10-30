# 0006 — Design first, with a mock database

- **Date:** 2026-10-27
- **Status:** Superseded by [0007](0007-supabase-tables-server-actions.md)

## Context
We wanted to validate the screens before wiring the real logic.

## Decision
- Services and notices were first stored in a **browser mock database** (`localStorage`) that notified every open tab, so the full flow (dispatch → driver → client) could be tried early.
- Components never touched the mock database directly: they went through hooks and services, so replacing it would not change the components.
- Login was real from the start ([0004](0004-driver-login-supabase-auth.md)).

## Outcome
The mock database was replaced by Supabase tables behind server actions ([0007](0007-supabase-tables-server-actions.md)). The components kept their shape, as planned.

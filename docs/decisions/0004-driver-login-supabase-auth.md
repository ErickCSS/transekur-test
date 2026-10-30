# 0004 — Driver login with Supabase Auth

- **Date:** 2026-10-27
- **Status:** Accepted

## Context
The driver must sign in and see **only** their own services.

## Options
- **Supabase Auth, email + password** — chosen.
- PIN against a `drivers` table with a custom cookie — simpler, but reinvents sessions.
- Magic link / OTP — depends on real emails and free-plan limits.

## Decision
- Made-up test accounts created with `scripts/seed-driver-accounts.mjs` (uses the service role key, local only). The script also creates the matching `drivers` rows.
- Session in cookies with `@supabase/ssr`.
- `proxy.ts` (in Next 16 *middleware* was renamed *proxy*) refreshes the session and does the optimistic redirect `/driver/services` ↔ `/driver`.
- The page verifies the user again on the server (`getClaims`) before showing data.
- The Auth user is linked to the driver through `drivers.auth_user_id`.

## Consequences
- With `cacheComponents` on, everything that reads cookies renders inside `<Suspense>`.

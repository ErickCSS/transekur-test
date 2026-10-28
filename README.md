# Ten Minutes Away

Mini standalone version of the **"driver 10 minutes away"** client notice.

| App | Route | What it does |
| --- | --- | --- |
| Dispatch | `/dispatch` | Create a service (client, phone, date/time, pickup point), assign a driver, see when the notice went out. |
| Driver app | `/driver` | Mobile web. Driver signs in, sees only their services for today, taps **I'm 10 min away**. |
| Client phone | `/client` | Simulated phone inbox with the message (driver name + vehicle) and an **Open in WhatsApp** link. |

## Run it

```bash
pnpm install
pnpm dev
```

Needs a `.env` with the Supabase project keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
Create the driver test accounts once:

```bash
node --env-file=.env scripts/seed-driver-accounts.mjs
```

Demo accounts: see [supabase/seed-accounts.md](supabase/seed-accounts.md).

## Current status (Phase 1 — design)

- Driver login is real (Supabase Auth, cookie session, `proxy.ts`).
- Services and notices live in a browser mock database (`localStorage`), shared by every open tab. Use **Reset demo data** in dispatch to start over.
- Phase 2 moves services and notices to Supabase tables with Realtime.

## Structure

Each feature is a module in `modules/` with its own `components`, `hooks`, `actions`, `services`, `config`, `data`, `types`. Routes in `app/` only mount a module screen. Details and decisions in [docs/](docs/README.md).

## Tools used

Next.js 16, React 19, Tailwind CSS 4, Supabase (free plan), Claude Code (AI pair programmer). See [docs/ai-usage.md](docs/ai-usage.md).

All data is made up.

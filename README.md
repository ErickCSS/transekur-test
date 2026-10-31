# Ten Minutes Away

Mini standalone version of the **"driver 10 minutes away"** client notice.

| App | Route | What it does |
| --- | --- | --- |
| Dispatch | `/dispatch` | Create a service (client, phone, date/time, pickup point), assign a driver, see when the notice went out. |
| Driver app | `/driver` | Mobile web. Driver signs in, sees only their services for today, taps **I'm 10 min away**. |
| Client phone | `/client` | Simulated phone inbox with the message (driver name + vehicle) and an **Open in WhatsApp** link. |
| Side by side | `/split` | The three apps at once on a computer screen, each one live. |

## Run it

```bash
pnpm install
pnpm dev
```

Needs a `.env` with the Supabase project keys (copy [.env.example](.env.example)).
Apply the schema in [supabase/migrations/](supabase/migrations/) (Supabase SQL editor or `supabase db push`), then create the driver test accounts once:

```bash
node --env-file=.env scripts/seed-driver-accounts.mjs
```

Demo accounts: see [supabase/seed-accounts.md](supabase/seed-accounts.md). Use **Reset demo data** in dispatch to load the sample services: 6 for today (3 in the morning, 3 in the afternoon) and 3 for tomorrow, with pickups less than an hour apart so there's always one coming up soon.

## How it works

- Driver login with Supabase Auth (cookie session, `proxy.ts`).
- Services, drivers and notices live in Supabase Postgres. Every read and write goes through the server (server actions); the tables have RLS on and are not reachable with the public key.
- A driver only sees and can notify their own services for today. The notice and the service status change are written in one database function, and the database allows one notice per service.
- "Today" and all times use the operation's time zone (`America/Santo_Domingo`).
- Live updates: dispatch, the driver app and the client phone refresh by themselves when a service or notice changes (Supabase Realtime broadcast from database triggers, with no data in the message). The **Live** pill shows the connection.

## Structure

Each feature is a module in `modules/` with its own `components`, `hooks`, `actions`, `services`, `config`, `data`, `types`. Routes in `app/` only mount a module screen. Details and decisions in [docs/](docs/README.md).

## Tools used

Next.js 16, React 19, Tailwind CSS 4, shadcn/ui (Radix), Motion, Supabase (free plan), Claude Code (AI pair programmer). See [docs/ai-usage.md](docs/ai-usage.md).

All data is made up.

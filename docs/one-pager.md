# Driver 10 Minutes Away — Plan

**Author:** Erick Cs · **Date:** 2026-10-27

## What I'll build

One Next.js web app with three entry points, one per actor:

| Screen | Route | What it does |
| --- | --- | --- |
| **Dispatch** | `/dispatch` | Create a service (client name, phone, date/time, pickup point), assign a driver, and see whether the notice went out and at what time (*Not sent* / *Sent 14:32*). |
| **Driver app** | `/driver` | Mobile-first web. The driver signs in, sees **only their own services for today**, and taps **I'm 10 min away**. |
| **Client phone** | `/client` | Simulated phone inbox showing the message with the driver's name and vehicle, plus an **Open in WhatsApp** link with the text prefilled. |

**Message:** *Hi {client}, your driver {driver} is 10 minutes away. Vehicle: {color} {make} {model}, plate {plate}.*

**Stack (free plans):** Next.js 16, React 19, Tailwind CSS 4, Supabase (Postgres + Auth + Realtime), deployed on Vercel. Claude Code as an AI pair programmer (documented in the repo).

**Delivery in two phases:**
1. **Design + full flow on mock data** — real driver login (Supabase Auth); services and notices in a browser mock store so the screens can be validated end to end.
2. **Real backend** — services and notices in Supabase tables, writes through server actions, Realtime so dispatch and client update without refreshing.

## Assumptions

- The "10 min" notice is **triggered manually** by the driver; no GPS or ETA calculation.
- A notice is sent **once per service**; after that the button is disabled and the service shows as notified.
- "Today" means the calendar day in the **operation's local time zone**.
- Drivers and their vehicles are **pre-loaded** (seed script); dispatch only picks from that list.
- Dispatch is an internal screen and **does not require login** for this test.
- Client phone numbers are in international format, used as-is for the `wa.me` link.
- The UI is in English; all data (names, phones, plates, emails) is made up.
- Timeline is **5 days**, with a **3-line update by email each day**.
- The demo will be on a **Vercel** public link, and the walkthrough video as a **private YouTube link**.

## Out of scope

- Real SMS / WhatsApp delivery (WhatsApp Business API, Twilio, etc.) — simulated as allowed.
- GPS tracking, maps, or automatic ETA.
- Dispatch accounts, roles, and permissions.
- Managing drivers and vehicles (create / edit / delete).
- Editing or cancelling services, full trip lifecycle (pickup, drop-off, completion), pricing, payments.
- Native mobile apps and push notifications.
- Multi-company / multi-tenant support and translations.

## Questions

1. **Message language:** should the client message be in English, Spanish, or follow the client's language?
2. **Repeat notices:** can the driver send the notice again or undo it if tapped by mistake?
3. **Reassigning:** should dispatch be able to change the driver after assigning, or cancel a service?
4. **Dispatch access:** is it OK for dispatch to have no login, or do you expect it protected too?
5. **Live updates:** is it required that dispatch sees the notice in real time, or is a refresh acceptable?
6. **Code delivery:** should I send the code as a compressed file in this same email thread, or would you share a GitHub username so I can invite you to a private repository?

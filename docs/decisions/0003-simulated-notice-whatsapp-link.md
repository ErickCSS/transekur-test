# 0003 — Client notice: simulated inbox + WhatsApp link

- **Date:** 2026-10-27
- **Status:** Accepted

## Context
The test doesn't ask for real SMS; an on-screen simulation, email or WhatsApp link is accepted.

## Decision
- A phone-like `/client` screen shows the received message.
- Each message has an **Open in WhatsApp** button (`https://wa.me/<phone>?text=<message>`) with the text prefilled.
- Dispatch shows the notice status: *Not sent* / *Sent HH:MM*.

## Message template
> Hi {client}, your driver {driver} is 10 minutes away. Vehicle: {color} {make} {model}, plate {plate}.

It lives in `modules/notifications/config/notifications-message-template.config.ts`. The message is in English, as confirmed by the client.

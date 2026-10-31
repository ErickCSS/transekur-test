# Screens

UI in English. Mobile first. Palette: dark ink (`ink`) + amber accent (taxi) + green for "sent". Base components from shadcn/ui, styled to this palette.

## Motion
- Only what arrives or changes while the screen is open is animated; the first paint is not.
- Respects the system "reduce motion" setting (movement off).
- Client: a new message comes in as a chat bubble from the sender's corner and the inbox scrolls to it; changing the phone fades the conversation in.
- Driver: a service that dispatch assigns slides into its time slot with an amber ring that fades out, and the other cards make room; a service reassigned to someone else fades out. *I'm 10 min away* swaps to *Client notified* with a short fade. Changing Today/Tomorrow fades the list in.
- Dispatch: a new service slides into the list (one row, from *Saving…* to saved); the notice badge swaps from *Not sent* to *Sent*; the summary numbers pop when they change; confirmations and errors open and close smoothly.

## Home `/`
- Product name and one line about what it does.
- Three big cards: **Dispatch**, **Driver app**, **Client phone**. Each with icon, description, arrow and an *Open in new tab* link.
- From `xl` up: **See all three side by side** button → `/split`.

## Side by side `/split`
- The three apps at once, for reviewing on a computer: Dispatch takes the free width; Driver and Client are drawn as phones.
- Each pane is the real app in a same-origin iframe, so the driver session, actions and live updates work as in separate tabs. Each pane header has *Open in new tab*.
- Short hint at the top: create a service → sign in as its driver → tap *I'm 10 min away*.
- *All apps* links inside a pane open the home in the whole window (`target="_top"`).
- Below `xl`: a note ("Side by side works best on a computer") with links to open each app in its own tab.
- Browsers don't let a web page open their own split view (Chrome's `chrome.tabs` split API is for extensions only), so the layout is done by the page.

## Dispatch `/dispatch`
- Header with name, today's date, **Live** pill and *Reset demo data* button.
  - The reset loads 6 services for today (8:30, 9:10, 10:30 AM · 2:00, 2:45, 3:30 PM, one of them unassigned) and 3 for tomorrow (8:00, 8:45 AM · 2:30 PM), spread across the three drivers. Pickups are close together so a reviewer can try the notice without waiting hours.
- Summary for the selected day: services · assigned · notices sent.
- **New service** form: client name, phone, date (calendar; past days can't be picked), time (every 15 min from 6:00 AM), pickup point, driver (select with vehicle). Two columns on mid-size screens.
  - When the date isn't today, an amber hint says when the driver will see it (tomorrow → under *Tomorrow* in their app).
  - On submit the service appears in the list at once (*Saving…*), the board stays on the same day, and the confirmation says where the service went (*Show that day* for other dates).
- **Services** list for the selected day (pick the day with the calendar button above the list): time, client + phone, pickup, driver select (locked once notified), notice status (*Not sent* grey / *Sent 14:32* green).
- Cards on mobile, a table from `md` up, and the form beside the list from `xl` up.

## Driver `/driver` (sign in)
- Phone frame: logo, "Driver sign in", email, password, *Sign in* button. Inline error.
- Test accounts are listed in the README.

## Driver `/driver/services`
- Greeting with the driver's name and vehicle, **Live** pill, *Sign out* button.
- Tabs **Today (n) | Tomorrow (n)**.
- **Today**: the driver's services for today — big time, client, pickup. Amber main button **I'm 10 min away**. While sending: *Notifying client…*. Then a green *Client notified at 14:32* state. Empty state: "No services for today".
- **Tomorrow**: the same cards, read-only, with "You can notify the client on the day", and a summary "First pickup tomorrow at 7:15 AM · 2 pickups" so the driver can plan when to leave. Empty state: "Nothing scheduled for tomorrow yet".

## Client `/client`
- Phone frame (centered on desktop, full screen on mobile).
- Client selector (simulates "whose phone this is").
- Chat-style messages: notice text + time + *Open in WhatsApp* button.
- Empty state: "No messages yet".

## Errors
- If the server can't be reached, each route shows "We couldn't reach the server" with *Try again* (`error.tsx`).

# Flows

## 1. Dispatch creates a service
1. `DispatchTripForm` → `useDispatchTripForm` validates the fields.
2. The new service is added to the board **optimistically** (`useOptimistic` in `useDispatchTripsBoard`, row marked *Saving…*) and the form clears. The board stays on the day being viewed.
3. The hook calls `createDispatchTripAction` → validates again on the server → `createDispatchTrip` inserts the trip (`status = scheduled`).
4. The action calls `refresh()`: the real row replaces the optimistic one in the same transition. On an error the optimistic row disappears and the form gets its values back.
5. The trigger broadcasts `board_changed` and every open screen refreshes. If the service is for another day, the confirmation says so and offers *Show that day*.

Changing a driver from the list works the same way: the select and vehicle update at once, then the server confirms.

## 2. The driver signs in
1. `/driver` → `DriverAuthLoginForm` → `useDriverAuthLoginForm` → action `loginDriverWithEmail`.
2. The action signs in with Supabase Auth (cookie session) and checks the user is linked to a driver (`drivers.auth_user_id`).
3. Redirect to `/driver/services`. `proxy.ts` protects the route; the page checks again with `getCurrentDriver`.
4. `getCurrentDriverTrips` loads only that driver's services for **today** and **tomorrow** (`listDriverTripsForDay`, day ranges in the operation time zone). Tomorrow's list is read-only so the driver can plan; the notice only works on the day.

## 3. The driver taps "I'm 10 min away"
1. `DriverTripCard` → `useDriverTodayTrips.notifyClientDriverIsTenMinutesAway(tripId)` → `sendTenMinutesAwayNoticeAction`.
2. The action takes the driver from the session, builds the message from the template and calls `send_ten_minutes_away_notice`. If it's not their service, not today's, or already notified, nothing is written and the driver sees a message.
3. The trigger broadcasts `board_changed`: `/client` shows the message + WhatsApp button and `/dispatch` shows *Sent HH:MM*, without reloading.

## 4. Live updates
`SharedLiveStatus` (on each screen) → `useSharedLiveBoardRefresh` → one Realtime channel per tab → `router.refresh()`. See [0008](../decisions/0008-live-updates-realtime-broadcast.md).

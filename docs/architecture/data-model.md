# Data model

Supabase Postgres. Schema in [supabase/migrations/](../../supabase/migrations/). RLS is on in every table with no policies: only the server (service role) reads and writes.

## `drivers`
| Column | Type | Note |
| --- | --- | --- |
| id | uuid | |
| auth_user_id | uuid | fk `auth.users`, unique. Links the signed-in user to the driver. |
| auth_email | text | unique, used by the seed script |
| full_name | text | |
| phone | text | |
| vehicle_make, vehicle_model, vehicle_color, vehicle_plate | text | |

## `trips` (in the UI: *services*)
| Column | Type | Note |
| --- | --- | --- |
| id | uuid | |
| client_name | text | not empty |
| client_phone | text | international format, digits only (10–15), used as-is for `wa.me` |
| pickup_point | text | not empty |
| scheduled_at | timestamptz | |
| driver_id | fk drivers | null = unassigned |
| status | enum | `scheduled` · `driver_ten_minutes_away` · `completed` |
| created_at | timestamptz | |

## `notices`
| Column | Type | Note |
| --- | --- | --- |
| id | uuid | |
| trip_id | fk trips | **unique**: one notice per service |
| driver_id | fk drivers | who sent it |
| message | text | already filled from the template |
| whatsapp_link | text | `https://wa.me/...` |
| sent_at | timestamptz | what dispatch shows |

## Functions and triggers
- `send_ten_minutes_away_notice(trip, driver, message, link, time_zone)` → `boolean`. Sets the trip to `driver_ten_minutes_away` and inserts the notice in one transaction, only for the assigned driver, for a service scheduled today in the operation time zone that was not notified yet. Only the service role can run it.
- `broadcast_board_change()`: triggers on `trips` and `notices` send `board_changed` to the public Realtime channel `board-changes`, with no data.

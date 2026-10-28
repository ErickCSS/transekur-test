# Modelo de datos

Mismo modelo en la base mock (Fase 1) y en Supabase (Fase 2).

## `drivers`
| Campo | Tipo | Nota |
| --- | --- | --- |
| id | text / uuid | |
| auth_email | text | Enlace con Supabase Auth en la fase mock |
| auth_user_id | uuid | Fase 2, fk `auth.users` |
| full_name | text | |
| phone | text | |
| vehicle_make, vehicle_model, vehicle_color, vehicle_plate | text | |

## `trips` (en la UI: *services*)
| Campo | Tipo | Nota |
| --- | --- | --- |
| id | uuid | |
| client_name | text | |
| client_phone | text | Formato internacional, solo dígitos para `wa.me` |
| pickup_point | text | |
| scheduled_at | timestamptz | |
| driver_id | fk drivers | null = sin asignar |
| status | enum | `scheduled` · `driver_ten_minutes_away` · `completed` |
| created_at | timestamptz | |

## `notices`
| Campo | Tipo | Nota |
| --- | --- | --- |
| id | uuid | |
| trip_id | fk trips | |
| message | text | Texto ya armado con la plantilla |
| whatsapp_link | text | `https://wa.me/...` |
| sent_at | timestamptz | Lo que ve dispatch |

-- Drivers, services (trips) and client notices.
-- RLS is on with no policies: only the server, with the service role key, reads and writes.

create table public.drivers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users (id) on delete set null,
  auth_email text not null unique,
  full_name text not null,
  phone text not null,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_color text not null,
  vehicle_plate text not null,
  created_at timestamptz not null default now()
);

create type public.trip_status as enum ('scheduled', 'driver_ten_minutes_away', 'completed');

create table public.trips (
  id uuid primary key default gen_random_uuid(),
  client_name text not null check (length(trim(client_name)) > 0),
  client_phone text not null check (client_phone ~ '^[0-9]{10,15}$'),
  pickup_point text not null check (length(trim(pickup_point)) > 0),
  scheduled_at timestamptz not null,
  driver_id uuid references public.drivers (id) on delete set null,
  status public.trip_status not null default 'scheduled',
  created_at timestamptz not null default now()
);

create index trips_scheduled_at_idx on public.trips (scheduled_at);
create index trips_driver_id_scheduled_at_idx on public.trips (driver_id, scheduled_at);

-- One notice per service: the unique trip_id is the last line of defense.
create table public.notices (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null unique references public.trips (id) on delete cascade,
  driver_id uuid not null references public.drivers (id),
  message text not null,
  whatsapp_link text not null,
  sent_at timestamptz not null default now()
);

alter table public.drivers enable row level security;
alter table public.trips enable row level security;
alter table public.notices enable row level security;

-- Marks the trip and records the notice in one transaction.
-- Only works for the assigned driver, for a trip scheduled today (in the operation's time zone)
-- that was not notified yet. Returns false otherwise.
create function public.send_ten_minutes_away_notice(
  p_trip_id uuid,
  p_driver_id uuid,
  p_message text,
  p_whatsapp_link text,
  p_time_zone text
) returns boolean
language plpgsql
set search_path = ''
as $$
begin
  update public.trips
  set status = 'driver_ten_minutes_away'
  where id = p_trip_id
    and driver_id = p_driver_id
    and status = 'scheduled'
    and (scheduled_at at time zone p_time_zone)::date = (now() at time zone p_time_zone)::date;

  if not found then
    return false;
  end if;

  insert into public.notices (trip_id, driver_id, message, whatsapp_link)
  values (p_trip_id, p_driver_id, p_message, p_whatsapp_link);

  return true;
end;
$$;

revoke execute on function public.send_ten_minutes_away_notice(uuid, uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.send_ten_minutes_away_notice(uuid, uuid, text, text, text) to service_role;

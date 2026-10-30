-- Tells open screens that services or notices changed, through a public Realtime broadcast.
-- The message carries no data: screens reload it through the server, so the tables stay
-- closed to the public key.

create function public.broadcast_board_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform realtime.send(
    jsonb_build_object('table', tg_table_name, 'operation', tg_op),
    'board_changed',
    'board-changes',
    false
  );
  return null;
end;
$$;

revoke execute on function public.broadcast_board_change() from public, anon, authenticated;

create trigger trips_broadcast_board_change
after insert or update or delete on public.trips
for each statement execute function public.broadcast_board_change();

create trigger notices_broadcast_board_change
after insert or update or delete on public.notices
for each statement execute function public.broadcast_board_change();

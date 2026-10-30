// Public Realtime channel fed by database triggers (supabase/migrations/*_board_change_broadcast.sql).
// It only says "something changed"; screens reload the data through the server.
export const boardChangesChannelName = "board-changes";
export const boardChangedEventName = "board_changed";

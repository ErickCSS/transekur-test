import { createClient, type RealtimeChannel, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "../config/shared-env.config";
import { boardChangedEventName, boardChangesChannelName } from "../config/shared-realtime.config";
import type { SharedLiveConnectionStatus } from "../types/shared-live.types";

let browserSupabaseClient: SupabaseClient | null = null;
let boardChangesChannel: RealtimeChannel | null = null;
let latestLiveConnectionStatus: SharedLiveConnectionStatus = "connecting";
const boardChangedListeners = new Set<() => void>();
const liveConnectionStatusListeners = new Set<(liveConnectionStatus: SharedLiveConnectionStatus) => void>();

// Browser client with the public key, used only to listen to Realtime.
// The tables have no public access, so it can't read or write data.
function getSupabaseBrowserClient() {
  if (!browserSupabaseClient) {
    browserSupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return browserSupabaseClient;
}

// One channel per tab, opened once and kept for the tab's life. Re-creating it on every mount
// races with the previous unsubscribe (the client reuses a channel with the same topic).
function openBoardChangesChannel() {
  if (boardChangesChannel) return;
  boardChangesChannel = getSupabaseBrowserClient()
    .channel(boardChangesChannelName)
    .on("broadcast", { event: boardChangedEventName }, () => {
      boardChangedListeners.forEach((onBoardChanged) => onBoardChanged());
    })
    .subscribe((channelStatus) => {
      if (channelStatus === "SUBSCRIBED") latestLiveConnectionStatus = "live";
      else if (channelStatus === "CHANNEL_ERROR" || channelStatus === "TIMED_OUT") latestLiveConnectionStatus = "offline";
      else return;
      liveConnectionStatusListeners.forEach((onStatusChange) => onStatusChange(latestLiveConnectionStatus));
    });
}

export function subscribeToBoardChanges(
  onBoardChanged: () => void,
  onLiveConnectionStatusChange: (liveConnectionStatus: SharedLiveConnectionStatus) => void,
) {
  openBoardChangesChannel();
  boardChangedListeners.add(onBoardChanged);
  liveConnectionStatusListeners.add(onLiveConnectionStatusChange);
  onLiveConnectionStatusChange(latestLiveConnectionStatus);

  return () => {
    boardChangedListeners.delete(onBoardChanged);
    liveConnectionStatusListeners.delete(onLiveConnectionStatusChange);
  };
}

import type { Notice } from "./shared-notice.types";
import type { Trip } from "./shared-trip.types";

export type MockDatabaseState = {
  isLoaded: boolean;
  trips: Trip[];
  notices: Notice[];
};

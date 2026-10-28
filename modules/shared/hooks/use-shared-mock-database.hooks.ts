"use client";

import { useSyncExternalStore } from "react";
import {
  getMockDatabaseServerSnapshot,
  getMockDatabaseSnapshot,
  subscribeToMockDatabase,
} from "../services/shared-mock-database.services";

export function useSharedMockDatabase() {
  return useSyncExternalStore(
    subscribeToMockDatabase,
    getMockDatabaseSnapshot,
    getMockDatabaseServerSnapshot,
  );
}

"use client";

import type { ReactNode } from "react";
import { useSharedMockDatabase } from "../hooks/use-shared-mock-database.hooks";

type SharedMockDatabaseGateProps = {
  fallback: ReactNode;
  children: ReactNode;
};

// The mock database lives in the browser, so its content only mounts on the client.
export function SharedMockDatabaseGate({ fallback, children }: SharedMockDatabaseGateProps) {
  const { isLoaded } = useSharedMockDatabase();
  return isLoaded ? children : fallback;
}

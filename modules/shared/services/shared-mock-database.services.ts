import { buildTodayTripsSeed } from "../data/shared-trips-seed.data";
import type { MockDatabaseState } from "../types/shared-mock-database.types";

// Browser-only fake database for Phase 1 (docs/decisions/0006).
// Persists in localStorage and notifies every open tab when it changes.
const mockDatabaseStorageKey = "ten-minutes-away:mock-database:v1";

const emptyMockDatabaseState: MockDatabaseState = { isLoaded: false, trips: [], notices: [] };

let cachedMockDatabaseState: MockDatabaseState | null = null;
const mockDatabaseListeners = new Set<() => void>();

function buildSeedMockDatabaseState(): MockDatabaseState {
  return { isLoaded: true, trips: buildTodayTripsSeed(new Date()), notices: [] };
}

function readMockDatabaseFromStorage(): MockDatabaseState {
  try {
    const storedValue = window.localStorage.getItem(mockDatabaseStorageKey);
    if (!storedValue) return buildSeedMockDatabaseState();
    const storedState = JSON.parse(storedValue) as Partial<MockDatabaseState>;
    return { isLoaded: true, trips: storedState.trips ?? [], notices: storedState.notices ?? [] };
  } catch {
    return buildSeedMockDatabaseState();
  }
}

function saveMockDatabaseToStorage(state: MockDatabaseState) {
  try {
    window.localStorage.setItem(
      mockDatabaseStorageKey,
      JSON.stringify({ trips: state.trips, notices: state.notices }),
    );
  } catch {
    // Storage can be blocked (private mode); the in-memory state still works in this tab.
  }
}

function notifyMockDatabaseListeners() {
  mockDatabaseListeners.forEach((listener) => listener());
}

export function getMockDatabaseSnapshot(): MockDatabaseState {
  if (!cachedMockDatabaseState) cachedMockDatabaseState = readMockDatabaseFromStorage();
  return cachedMockDatabaseState;
}

export function getMockDatabaseServerSnapshot(): MockDatabaseState {
  return emptyMockDatabaseState;
}

export function subscribeToMockDatabase(listener: () => void) {
  mockDatabaseListeners.add(listener);

  function handleStorageChangeFromOtherTab(event: StorageEvent) {
    if (event.key !== mockDatabaseStorageKey) return;
    cachedMockDatabaseState = readMockDatabaseFromStorage();
    listener();
  }

  window.addEventListener("storage", handleStorageChangeFromOtherTab);
  return () => {
    mockDatabaseListeners.delete(listener);
    window.removeEventListener("storage", handleStorageChangeFromOtherTab);
  };
}

export function updateMockDatabase(
  buildNextState: (currentState: MockDatabaseState) => MockDatabaseState,
) {
  const nextState = buildNextState(getMockDatabaseSnapshot());
  cachedMockDatabaseState = nextState;
  saveMockDatabaseToStorage(nextState);
  notifyMockDatabaseListeners();
}

export function resetMockDatabase() {
  updateMockDatabase(() => buildSeedMockDatabaseState());
}

export function createMockDatabaseId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

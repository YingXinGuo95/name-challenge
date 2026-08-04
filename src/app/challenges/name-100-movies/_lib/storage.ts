import { GameState } from "./types";
import config from "./config";

const STORAGE_KEY = "name_100_movies_state";
const SUBMISSION_RECORD_KEY = "name_100_movies_submitted";

const EMPTY_STATE: GameState = {
  startTime: 0,
  validatedNames: [],
  count: 0,
};

export function loadGameState(): GameState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as GameState;
    if (
      typeof parsed.startTime === "number" &&
      Array.isArray(parsed.validatedNames) &&
      typeof parsed.count === "number"
    ) {
      return parsed;
    }
    return EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

export function saveGameState(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

export function clearGameState(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SUBMISSION_RECORD_KEY);
  } catch {
    // ignore
  }
}

export function findDuplicate(
  state: GameState,
  input: string
): string | null {
  const norm = input.trim().toLowerCase();
  const found = state.validatedNames.find(
    (item) => item.valid && item.input.trim().toLowerCase() === norm
  );
  return found ? found.input : null;
}

export function isAlreadySubmitted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(SUBMISSION_RECORD_KEY) === "true";
  } catch {
    return false;
  }
}

export function markAsSubmitted(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SUBMISSION_RECORD_KEY, "true");
  } catch {
    // ignore
  }
}

export function clearSubmissionRecord(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SUBMISSION_RECORD_KEY);
  } catch {
    // ignore
  }
}

export const TARGET_COUNT = config.targetCount;

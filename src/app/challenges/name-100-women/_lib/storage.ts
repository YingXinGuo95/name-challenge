import { GameState } from "@/app/challenges/name-100-women/_lib/types";

const STORAGE_KEY = "name100women_v1";

/** Default empty game state. */
function createDefaultState(): GameState {
  return {
    startTime: 0,
    validatedNames: [],
    count: 0,
  };
}

/** Load game state from localStorage. Returns default state if not found. */
export function loadGameState(): GameState {
  if (typeof window === "undefined") {
    return createDefaultState();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw) as GameState;
    // Basic validation
    if (
      typeof parsed.startTime !== "number" ||
      !Array.isArray(parsed.validatedNames) ||
      typeof parsed.count !== "number"
    ) {
      return createDefaultState();
    }
    return parsed;
  } catch {
    return createDefaultState();
  }
}

/** Persist game state to localStorage. */
export function saveGameState(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently fail, game still works in-memory
  }
}

/** Clear saved game state (start a new game). */
export function clearGameState(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Check if a name has already been submitted (case-insensitive).
 * Returns the existing entry if found.
 */
export function findDuplicate(
  state: GameState,
  name: string
): { input: string; valid: boolean } | undefined {
  const normalized = name.toLowerCase().trim();
  return state.validatedNames.find(
    (n) => n.input.toLowerCase().trim() === normalized
  );
}

// ── Score Submission Tracking ─────────────────────────────────────

const SUBMISSION_KEY = "name100women_submission_v1";

export interface SubmissionRecord {
  submittedAt: number; // timestamp
  entryId: string; // Supabase UUID of the submitted entry
  nickname: string;
  rank: number;
}

/** Check if the user has already submitted a score for this challenge session. */
export function getSubmissionRecord(): SubmissionRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SUBMISSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SubmissionRecord;
    if (
      typeof parsed.submittedAt !== "number" ||
      typeof parsed.entryId !== "string" ||
      typeof parsed.nickname !== "string" ||
      typeof parsed.rank !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Save a submission record to prevent duplicate submissions. */
export function saveSubmissionRecord(record: SubmissionRecord): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SUBMISSION_KEY, JSON.stringify(record));
  } catch {
    // silently fail
  }
}

/** Check if a score has already been submitted. */
export function hasSubmittedScore(): boolean {
  return getSubmissionRecord() !== null;
}

/** Clear the submission record (e.g., when starting a new game). */
export function clearSubmissionRecord(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SUBMISSION_KEY);
  } catch {
    // ignore
  }
}

import { GameState } from "@/app/challenges/name-100-pokemon/_lib/types";

const STORAGE_KEY = "name100pokemon_v1";

function createDefaultState(): GameState {
  return { startTime: 0, validatedNames: [], count: 0 };
}

export function loadGameState(): GameState {
  if (typeof window === "undefined") return createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw) as GameState;
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

export function saveGameState(state: GameState): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

export function clearGameState(): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}

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

const SUBMISSION_KEY = "name100pokemon_submission_v1";

export interface SubmissionRecord {
  submittedAt: number;
  entryId: string;
  nickname: string;
  rank: number;
}

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
    ) return null;
    return parsed;
  } catch { return null; }
}

export function saveSubmissionRecord(record: SubmissionRecord): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(SUBMISSION_KEY, JSON.stringify(record)); } catch { /* ignore */ }
}

export function hasSubmittedScore(): boolean {
  return getSubmissionRecord() !== null;
}

export function clearSubmissionRecord(): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(SUBMISSION_KEY); } catch { /* ignore */ }
}

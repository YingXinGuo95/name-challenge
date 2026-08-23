// ── Game State (localStorage) ──────────────────────────────────────

export interface GameState {
  startTime: number; // timestamp of first validated input
  validatedNames: ValidatedName[]; // all validated names in order
  count: number; // current valid count (0-100)
}

export interface ValidatedName {
  input: string; // original user input, e.g. "Pizza"
  valid: boolean;
  reason?: ValidationReason;
  qid?: string; // Wikidata Q-ID (only when valid)
  display?: string; // canonical food name (only when valid)
}

// ── API Types ──────────────────────────────────────────────────────

export type ValidationReason = "not_found" | "not_food";

export interface ValidateResponse {
  valid: boolean;
  qid?: string;
  display?: string;
  reason?: ValidationReason;
  error?: string;
  retryAfter?: number;
}

// ── Cache Types ────────────────────────────────────────────────────

export interface CacheEntry {
  valid: boolean;
  qid?: string;
  display?: string;
  expiresAt: number;
}

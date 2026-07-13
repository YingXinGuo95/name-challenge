// ── Game State (localStorage) ──────────────────────────────────────

export interface GameState {
  startTime: number; // timestamp of first validated input
  validatedNames: ValidatedName[]; // all validated names in order
  count: number; // current valid count (0-100)
}

export interface ValidatedName {
  input: string; // original user input, e.g. "France"
  valid: boolean;
  reason?: ValidationReason;
  code?: string; // ISO-3166 alpha-2 code (only when valid)
  display?: string; // canonical display name (only when valid)
}

// ── API Types ──────────────────────────────────────────────────────

export type ValidationReason = "not_found" | "not_a_country";

export interface ValidateResponse {
  valid: boolean;
  code?: string;
  display?: string;
  reason?: ValidationReason;
  error?: string;
}

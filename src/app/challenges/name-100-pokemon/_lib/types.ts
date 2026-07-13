// ── Game State (localStorage) ──────────────────────────────────────

export interface GameState {
  startTime: number;
  validatedNames: ValidatedName[];
  count: number;
}

export interface ValidatedName {
  input: string;
  valid: boolean;
  reason?: ValidationReason;
  display?: string; // canonical display name (only when valid)
}

// ── API Types ──────────────────────────────────────────────────────

export type ValidationReason = "not_found";

export interface ValidateResponse {
  valid: boolean;
  display?: string;
  reason?: ValidationReason;
  error?: string;
}

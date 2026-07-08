// ── Game State (localStorage) ──────────────────────────────────────

export interface GameState {
  startTime: number; // timestamp of first validated input
  validatedNames: ValidatedName[]; // all validated names in order
  count: number; // current valid count (0-100)
}

export interface ValidatedName {
  input: string; // original user input, e.g. "Emma Watson"
  valid: boolean;
  reason?: ValidationReason;
  qid?: string; // Wikidata Q-ID (only when valid)
}

// ── API Types ──────────────────────────────────────────────────────

export type ValidationReason = "not_found" | "not_human" | "not_female";

export interface ValidateResponse {
  valid: boolean;
  qid?: string;
  reason?: ValidationReason;
  error?: string;
  retryAfter?: number;
}

// ── Cache Types ────────────────────────────────────────────────────

export interface CacheEntry {
  valid: boolean;
  qid?: string;
  expiresAt: number;
}

// ── Wikidata SPARQL Response ───────────────────────────────────────

export interface SparqlBinding {
  item: {
    type: "uri";
    value: string;
  };
}

export interface SparqlResponse {
  results: {
    bindings: SparqlBinding[];
  };
}

// ── Wikidata API Endpoints ──────────────────────────────────────────

/** Wikidata REST API for entity search (same indexed search as the search box). */
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

/** Wikidata SPARQL endpoint — only used for lightweight ASK verification. */
export const WIKIDATA_SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

/** User-Agent header required by Wikidata policy. */
export const USER_AGENT =
  "Name100Challenge/1.0 (https://name100challenge.me; yingxinguo.cn@gmail.com)";

// ── Wikidata Q-IDs for taxonomy ─────────────────────────────────────
// Q16521 = taxon (taxonomic group)
// Q729   = Animalia (animal kingdom)
// Q7432  = species (taxonomic rank)
// Q68947 = subspecies (taxonomic rank)
// P105   = taxon rank
// P171   = parent taxon
// P31    = instance of
// P279   = subclass of

/** Taxon ranks that are accepted as valid "species-level" answers. */
const ACCEPTED_RANKS = ["wd:Q7432"]; // species

/** Taxon ranks that are explicitly rejected (subspecies, breed, variety). */
const REJECTED_RANKS = [
  "wd:Q68947", // subspecies
];

// ── Entity Search (REST API) ────────────────────────────────────────

interface WbSearchResult {
  id: string;
  label: string;
  description?: string;
}

interface WbSearchResponse {
  search: WbSearchResult[];
}

/**
 * Search Wikidata entities using the REST API (wbsearchentities).
 * Uses the same indexed search as the Wikidata search box — fast (~100-200ms).
 */
export async function searchEntities(
  name: string,
  limit = 5
): Promise<WbSearchResult[]> {
  const url = `${WIKIDATA_API}?${new URLSearchParams({
    action: "wbsearchentities",
    search: name,
    language: "en",
    format: "json",
    type: "item",
    limit: String(limit),
  })}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(8_000),
  });

  if (res.status === 429) {
    throw new Error("rate_limited");
  }
  if (!res.ok) {
    throw new Error(`Entity search returned ${res.status}`);
  }

  const data: WbSearchResponse = await res.json();
  return data.search ?? [];
}

// ── Animal Species Verification (SPARQL ASK) ───────────────────────

/**
 * Build a SPARQL ASK query to verify an entity is an animal species.
 *
 * Criteria:
 * 1. Entity must have taxon rank = species (P105 = Q7432)
 * 2. Entity's parent taxon chain must include Animalia (P171* = Q729)
 *
 * This rejects subspecies (Q68947), breeds, varieties, and non-animals.
 */
function buildAnimalSpeciesQuery(qid: string): string {
  // Check: is this a species-rank taxon within kingdom Animalia?
  // We use a two-part check:
  // 1. P105 = Q7432 → taxon rank is "species"
  // 2. P171* wd:Q729 → parent taxon chain (transitive) includes Animalia
  return `ASK WHERE { wd:${qid} wdt:P105 wd:Q7432; wdt:P171* wd:Q729. }`;
}

/**
 * Verify that a Wikidata entity is an animal species.
 * Uses a lightweight ASK query — instant lookup, no scan.
 */
export async function verifyAnimalSpecies(qid: string): Promise<boolean> {
  const query = buildAnimalSpeciesQuery(qid);
  const url = `${WIKIDATA_SPARQL_ENDPOINT}?format=json&query=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(8_000),
  });

  if (res.status === 429) {
    throw new Error("rate_limited");
  }
  if (!res.ok) {
    throw new Error(`ASK query returned ${res.status}`);
  }

  const data: { boolean: boolean } = await res.json();
  return data.boolean === true;
}

/**
 * Check if an entity is explicitly a subspecies (rejected).
 */
function buildSubspeciesCheckQuery(qid: string): string {
  return `ASK WHERE { wd:${qid} wdt:P105 wd:Q68947. }`;
}

/**
 * Verify that a Wikidata entity is explicitly a subspecies (should be rejected).
 */
export async function isSubspecies(qid: string): Promise<boolean> {
  const query = buildSubspeciesCheckQuery(qid);
  const url = `${WIKIDATA_SPARQL_ENDPOINT}?format=json&query=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(8_000),
  });

  if (!res.ok) return false;
  const data: { boolean: boolean } = await res.json();
  return data.boolean === true;
}

// ── Combined Validation ─────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  qid?: string;
  reason?: string;
}

/**
 * Validate a name against Wikidata: search for the entity via REST API,
 * then verify it is an animal species with a lightweight SPARQL ASK.
 *
 * @param name  The animal name to search for.
 */
export async function validateWikidata(
  name: string
): Promise<ValidationResult> {
  // Step 1: Fast entity search via REST API
  const candidates = await searchEntities(name);

  if (candidates.length === 0) {
    return { valid: false, reason: "not_found" };
  }

  // Step 2: Verify candidates — check animal species with ASK query
  // Try up to 5 candidates (the search API ranks by relevance)
  const topCandidates = candidates.slice(0, 5);
  for (const candidate of topCandidates) {
    try {
      // First check if it's explicitly a subspecies — reject immediately
      const subspecies = await isSubspecies(candidate.id);
      if (subspecies) {
        return { valid: false, reason: "subspecies", qid: candidate.id };
      }

      // Then check if it's a valid animal species
      const isSpecies = await verifyAnimalSpecies(candidate.id);
      if (isSpecies) {
        return { valid: true, qid: candidate.id };
      }
    } catch {
      // Skip this candidate if verification fails, try next one
      continue;
    }
  }

  return { valid: false, reason: "not_animal" };
}

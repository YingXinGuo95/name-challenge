/** Supported gender values for Wikidata validation. */
export type Gender = "female" | "male";

/** Map gender to the corresponding Wikidata Q-ID for property P21 (sex or gender). */
const GENDER_QID: Record<Gender, string> = {
  female: "wd:Q6581072",
  male: "wd:Q6581097",
};

// ── Wikidata API Endpoints ──────────────────────────────────────────

/** Wikidata REST API for entity search (same indexed search as the search box). */
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

/** Wikidata SPARQL endpoint — only used for lightweight ASK verification. */
export const WIKIDATA_SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

/** User-Agent header required by Wikidata policy. */
export const USER_AGENT =
  "Name100Challenge/1.0 (https://name100challenge.me; yingxinguo.cn@gmail.com)";

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

// ── Gender Verification (lightweight SPARQL ASK) ────────────────────

/**
 * Verify that a Wikidata entity is a human of the specified gender.
 * Uses a lightweight ASK query against a specific Q-ID — instant lookup, no scan.
 */
export async function verifyHumanGender(
  qid: string,
  gender: Gender
): Promise<boolean> {
  const genderQid = GENDER_QID[gender];
  const query = `ASK WHERE { wd:${qid} wdt:P31 wd:Q5; wdt:P21 ${genderQid}. }`;
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

// ── Combined Validation ─────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  qid?: string;
  reason?: string;
}

/**
 * Validate a name against Wikidata: search for the entity via REST API,
 * then verify human + gender with a lightweight SPARQL ASK.
 *
 * @param name  The display name to search for.
 * @param gender  "female" or "male".
 */
export async function validateWikidata(
  name: string,
  gender: Gender
): Promise<ValidationResult> {
  // Step 1: Fast entity search via REST API
  const candidates = await searchEntities(name);

  if (candidates.length === 0) {
    return { valid: false, reason: "not_found" };
  }

  // Step 2: Verify candidates — check human + gender with ASK query
  // Try up to 3 candidates (the search API ranks by relevance)
  const topCandidates = candidates.slice(0, 3);
  for (const candidate of topCandidates) {
    try {
      const isMatch = await verifyHumanGender(candidate.id, gender);
      if (isMatch) {
        return { valid: true, qid: candidate.id };
      }
    } catch {
      // Skip this candidate if verification fails, try next one
      continue;
    }
  }

  return { valid: false, reason: "not_found" };
}

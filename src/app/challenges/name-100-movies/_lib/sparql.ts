import { searchEntities } from "@/app/challenges/name-100-women/_lib/sparql";

export const WIKIDATA_SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";
export const USER_AGENT =
  "Name100Challenge/1.0 (https://name100challenge.me; contact@name100challenge.me)";

export interface ValidationResult {
  valid: boolean;
  qid?: string;
  reason?: string;
}

/**
 * Verify that a Wikidata entity is a film/movie (Q11424 or any subclass of film).
 * Uses a lightweight SPARQL ASK query against a specific Q-ID.
 */
export async function verifyMovie(qid: string): Promise<boolean> {
  const query = `ASK WHERE { wd:${qid} wdt:P31/wdt:P279* wd:Q11424. }`;
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
 * Validate a movie title against Wikidata: search for entity via REST API,
 * then verify instance of film (or subclass of film) with SPARQL ASK.
 */
export async function validateWikidata(name: string): Promise<ValidationResult> {
  // Step 1: Search for candidates
  const candidates = await searchEntities(name, 5);

  if (candidates.length === 0) {
    return { valid: false, reason: "not_found" };
  }

  // Step 2: Test top 3 candidates against film verification query
  const topCandidates = candidates.slice(0, 3);
  for (const candidate of topCandidates) {
    try {
      const isMovie = await verifyMovie(candidate.id);
      if (isMovie) {
        return { valid: true, qid: candidate.id };
      }
    } catch {
      continue;
    }
  }

  return { valid: false, reason: "not_movie" };
}

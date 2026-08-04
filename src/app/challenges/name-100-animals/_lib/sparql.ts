// ── Wikidata API Endpoints ──────────────────────────────────────────

/** Wikidata REST API base. */
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

/** User-Agent header required by Wikidata policy. */
export const USER_AGENT =
  "Name100Challenge/1.0 (https://name100challenge.me; contact@name100challenge.me)";

// Taxonomy Q-IDs:
// Q7432  = species (taxon rank — ACCEPT)
// Q68947 = subspecies (taxon rank — REJECT)
// P105   = taxon rank property

// ── Proxy-aware fetch ───────────────────────────────────────────────

/**
 * Build fetch init with proxy dispatcher if HTTP_PROXY / HTTPS_PROXY is set.
 * Node.js's built-in fetch (undici) does NOT automatically respect these
 * env vars — we must configure a ProxyAgent explicitly.
 */
function buildFetchInit(signal: AbortSignal): RequestInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const init: RequestInit & { dispatcher?: any } = {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
    signal,
  };

  const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  if (proxy) {
    // Dynamic import to avoid issues if undici types aren't available
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ProxyAgent } = require("undici");
      init.dispatcher = new ProxyAgent(proxy);
    } catch {
      // undici ProxyAgent not available — fall through without proxy
    }
  }

  return init;
}

function proxyFetch(url: string, timeoutMs = 3_000): Promise<Response> {
  return fetch(url, buildFetchInit(AbortSignal.timeout(timeoutMs)));
}

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
 * Same indexed search as the Wikidata search box — fast (~100-200ms).
 */
export async function searchEntities(
  name: string,
  limit = 3
): Promise<WbSearchResult[]> {
  const url = `${WIKIDATA_API}?${new URLSearchParams({
    action: "wbsearchentities",
    search: name,
    language: "en",
    format: "json",
    type: "item",
    limit: String(limit),
  })}`;

  const res = await proxyFetch(url);

  if (res.status === 429) throw new Error("rate_limited");
  if (!res.ok) throw new Error(`Entity search returned ${res.status}`);

  const data: WbSearchResponse = await res.json();
  return data.search ?? [];
}

// ── Batch Entity Claims Fetch (REST API — replaces all SPARQL) ──────

interface WbEntityClaims {
  id: string;
  claims?: Record<string, Array<{ mainsnak?: { datavalue?: { value?: { id?: string } } } }>>;
}

interface WbEntitiesResponse {
  entities: Record<string, WbEntityClaims>;
}

/**
 * Fetch claims for multiple Q-IDs in a SINGLE REST API call.
 * Uses wbgetentities which is fast and proxy-friendly.
 * Returns a map of Q-ID → taxon rank value (e.g. "Q7432" for species).
 */
async function batchGetTaxonRanks(qids: string[]): Promise<Map<string, string | null>> {
  const result = new Map<string, string | null>();

  if (qids.length === 0) return result;

  const url = `${WIKIDATA_API}?${new URLSearchParams({
    action: "wbgetentities",
    ids: qids.join("|"),
    props: "claims",
    format: "json",
  })}`;

  const res = await proxyFetch(url);

  if (res.status === 429) throw new Error("rate_limited");
  if (!res.ok) throw new Error(`Get entities returned ${res.status}`);

  const data: WbEntitiesResponse = await res.json();

  for (const qid of qids) {
    const entity = data.entities?.[qid];
    if (!entity?.claims) {
      result.set(qid, null);
      continue;
    }

    // Look for P105 (taxon rank) claim
    const p105 = entity.claims["P105"];
    if (!p105 || p105.length === 0) {
      result.set(qid, null);
      continue;
    }

    const rankValue = p105[0]?.mainsnak?.datavalue?.value?.id;
    result.set(qid, rankValue ?? null);
  }

  return result;
}

// ── Combined Validation ─────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  qid?: string;
  reason?: string;
}

/**
 * Validate a name against Wikidata with only 2 HTTP calls total:
 *
 *   1. wbsearchentities → find candidate Q-IDs
 *   2. wbgetentities (batch) → fetch P105 for all candidates at once
 *
 * This replaces the previous approach that made 1 search + up to 6 SPARQL
 * calls. The REST API is faster and works better through proxies.
 */
export async function validateWikidata(
  name: string
): Promise<ValidationResult> {
  // Step 1: Search for entity (1 HTTP call)
  const candidates = await searchEntities(name, 3);

  if (candidates.length === 0) {
    return { valid: false, reason: "not_found" };
  }

  // Step 2: Batch-fetch taxon ranks for ALL candidates (1 HTTP call)
  const qids = candidates.map((c) => c.id);
  const ranks = await batchGetTaxonRanks(qids);

  // Step 3: Check results — first species wins, subspecies is rejected
  for (const candidate of candidates) {
    const rank = ranks.get(candidate.id);

    if (rank === "Q7432") {
      // Species → accept
      return { valid: true, qid: candidate.id };
    }

    if (rank === "Q68947") {
      // Subspecies → explicitly reject
      return { valid: false, reason: "subspecies", qid: candidate.id };
    }
    // No P105 or other rank → skip to next candidate
  }

  return { valid: false, reason: "not_animal" };
}

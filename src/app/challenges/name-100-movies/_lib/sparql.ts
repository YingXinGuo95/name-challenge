// ── Wikidata API Endpoints ──────────────────────────────────────────

/** Wikidata REST API base. */
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

/** User-Agent header required by Wikidata policy. */
export const USER_AGENT =
  "Name100Challenge/1.0 (https://name100challenge.me; contact@name100challenge.me)";

// Film-class Q-IDs: direct P31 values that indicate an entity is a film.
// Every ID is Q11424 (film) itself or a P279 subclass of it — the SPARQL
// equivalent of `wdt:P31/wdt:P279* wd:Q11424`. Keep this set in sync with
// Wikidata; see famous-movies.ts for the "verify Q-IDs" convention.
const FILM_CLASS_QIDS = new Set<string>([
  // Base + formats
  "Q11424", // film
  "Q24869", // feature film
  "Q506240", // television film
  "Q93204", // documentary film
  "Q202866", // animated film
  "Q2916889", // animated feature film
  "Q24862", // short film
  "Q17517379", // animated short film
  "Q22692", // silent film
  "Q20650540", // anime
  // Genre classes (film subclasses that some films use directly as P31)
  "Q157443", // comedy film
  "Q188473", // action film
  "Q193247", // horror film
  "Q471839", // science fiction film
  "Q842256", // musical film
  "Q278454", // western film
  "Q959790", // crime film
  "Q319221", // adventure film
  "Q1169555", // fantasy film
  "Q2484376", // thriller film
  "Q406359", // romance film
  "Q211145", // drama film
  "Q111260", // war film
  "Q645928", // biographical film
  "Q860626", // romantic comedy
  "Q1616074", // mystery film
  "Q1187301", // comedy-drama
  "Q597633", // art film
]);

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

  const res = await proxyFetch(url, 3_000);

  if (res.status === 429) throw new Error("rate_limited");
  if (!res.ok) throw new Error(`Entity search returned ${res.status}`);

  const data: WbSearchResponse = await res.json();
  return data.search ?? [];
}

// ── Batch Claims Fetch (REST API — replaces all SPARQL) ─────────────

interface WbEntityClaims {
  id: string;
  claims?: Record<string, Array<{ mainsnak?: { datavalue?: { value?: { id?: string } } } }>>;
}

interface WbEntitiesResponse {
  entities: Record<string, WbEntityClaims>;
}

/**
 * Fetch P31 (instance of) claims for multiple candidate Q-IDs in a SINGLE
 * REST API call (wbgetentities). Returns qid → list of all P31 value Q-IDs.
 */
async function batchGetFilmClasses(qids: string[]): Promise<Map<string, string[]>> {
  const result = new Map<string, string[]>();

  if (qids.length === 0) return result;

  const url = `${WIKIDATA_API}?${new URLSearchParams({
    action: "wbgetentities",
    ids: qids.join("|"),
    props: "claims",
    format: "json",
  })}`;

  const res = await proxyFetch(url, 4_000);

  if (res.status === 429) throw new Error("rate_limited");
  if (!res.ok) throw new Error(`Get entities returned ${res.status}`);

  const data: WbEntitiesResponse = await res.json();

  for (const qid of qids) {
    const entity = data.entities?.[qid];
    const p31: string[] = [];
    if (entity?.claims) {
      for (const claim of entity.claims["P31"] ?? []) {
        const value = claim.mainsnak?.datavalue?.value?.id;
        if (value) p31.push(value);
      }
    }
    result.set(qid, p31);
  }

  return result;
}

/** True if any P31 value is a known film class. */
function isFilmClass(p31Values: string[]): boolean {
  return p31Values.some((value) => FILM_CLASS_QIDS.has(value));
}

// ── Combined Validation ─────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  qid?: string;
  reason?: string;
}

/**
 * Validate a movie title against Wikidata with only 2 HTTP calls total:
 *
 *   1. wbsearchentities → find candidate Q-IDs
 *   2. wbgetentities (batch) → fetch P31 for all candidates at once
 *
 * This replaces the previous search + up to 3 sequential SPARQL ASK calls.
 * The REST API is faster and works better through proxies.
 */
export async function validateWikidata(
  name: string
): Promise<ValidationResult> {
  // Step 1: Search for entity (1 HTTP call)
  const candidates = await searchEntities(name, 3);

  if (candidates.length === 0) {
    return { valid: false, reason: "not_found" };
  }

  // Step 2: Batch-fetch P31 film classes for ALL candidates (1 HTTP call)
  const qids = candidates.map((c) => c.id);
  const filmClasses = await batchGetFilmClasses(qids);

  // Step 3: First candidate that's a known film class wins
  for (const candidate of candidates) {
    const p31 = filmClasses.get(candidate.id);
    if (p31 && isFilmClass(p31)) {
      return { valid: true, qid: candidate.id };
    }
  }

  return { valid: false, reason: "not_movie" };
}

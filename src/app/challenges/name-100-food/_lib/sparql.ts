// ── Wikidata API Endpoints ──────────────────────────────────────────

/** Wikidata REST API base. */
const WIKIDATA_API = "https://www.wikidata.org/w/api.php";

/** User-Agent header required by Wikidata policy. */
export const USER_AGENT =
  "Name100Challenge/1.0 (https://name100challenge.me; contact@name100challenge.me)";

// ── Food class Q-IDs (P31 instance-of values that make something food) ──
//
// Verified against Wikidata labels and the real P31 values of known foods:
//   pizza/sushi → "type of food or dish" (Q19861951)
//   apple       → "type of fruit"       (Q140646522)
//   beef        → "meat"                (Q10990)
//   ramen       → "soup"                (Q41415)
//   tofu        → "food ingredient"     (Q25403900)
//   kimchi      → "fermented food"      (Q6950796)
//
// Deliberately NOT included: "taxon" (Q16521) — that would let any plant or
// animal species count as food, causing false positives (e.g. "zebra" matching
// a fish). Foods classified only as taxa are covered by the local dataset.

const FOOD_CLASS_IDS = new Set([
  "Q2095", // food
  "Q746549", // dish
  "Q40050", // drink / beverage
  "Q3314483", // fruit
  "Q11004", // vegetable
  "Q10990", // meat
  "Q192935", // seafood
  "Q2995529", // grain
  "Q185217", // dairy product
  "Q182940", // dessert
  "Q749316", // snack
  "Q7802", // bread
  "Q178", // pasta
  "Q477248", // pastry
  "Q41415", // soup
  "Q178359", // sauce
  "Q2596997", // condiment
  "Q10943", // cheese
  "Q195", // chocolate
  "Q13266", // cookie
  "Q13276", // cake
  "Q19861951", // type of food or dish
  "Q140646522", // type of fruit
  "Q25403900", // food ingredient
  "Q6950796", // fermented food
  "Q6460735", // meal
]);

// ── Category words (never count as a specific food) ──────────────────
//
// A player typing a pure food *category* ("fruit", "meat", "drink") must not
// score a point. The self-class exclusion above catches category entities
// whose QID is itself a whitelist class, but some categories resolve to other
// food-classified entities (e.g. "vegetable" → "fruit vegetable" Q1470762,
// "food" → "human food" Q8195619) that slip through. This blocklist rejects
// them before any Wikidata query.
//
// Only words that are NOT specific foods belong here — "soup", "bread",
// "cheese", "tea", "juice", "chocolate" etc. are real foods and are NOT listed.

const CATEGORY_WORDS = new Set([
  "food", "foods", "dish", "dishes", "meal", "meals",
  "breakfast", "brunch", "lunch", "dinner", "supper",
  "fruit", "fruits", "vegetable", "vegetables", "veggie", "veggies",
  "meat", "meats", "poultry", "seafood", "sea food",
  "grain", "grains", "staple", "staples", "staple food",
  "dairy", "dairy product", "milk product",
  "drink", "drinks", "beverage", "beverages",
  "dessert", "desserts", "snack", "snacks", "snack food",
  "condiment", "condiments", "ingredient", "ingredients", "seasoning",
  "sauce", "sauces", "dressing", "dressings", "salad dressing",
  "spice", "spices", "herb", "herbs",
  "produce", "cuisine", "cuisines", "grocery", "groceries",
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

  const res = await proxyFetch(url);

  if (res.status === 429) throw new Error("rate_limited");
  if (!res.ok) throw new Error(`Entity search returned ${res.status}`);

  const data: WbSearchResponse = await res.json();
  return data.search ?? [];
}

// ── Batch Entity Claims Fetch (REST API) ────────────────────────────

interface WbEntityClaims {
  id: string;
  claims?: Record<string, Array<{ mainsnak?: { datavalue?: { value?: { id?: string } } } }>>;
}

interface WbEntitiesResponse {
  entities: Record<string, WbEntityClaims>;
}

/**
 * Fetch P31 (instance of) values for multiple Q-IDs in a SINGLE REST API call.
 * Uses wbgetentities which is fast and proxy-friendly.
 * Returns a map of Q-ID → list of P31 class Q-IDs.
 */
async function batchGetFoodClasses(qids: string[]): Promise<Map<string, string[]>> {
  const result = new Map<string, string[]>();

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
      result.set(qid, []);
      continue;
    }

    const p31 = entity.claims["P31"];
    if (!p31 || p31.length === 0) {
      result.set(qid, []);
      continue;
    }

    const values = p31
      .map((c) => c.mainsnak?.datavalue?.value?.id)
      .filter((v): v is string => typeof v === "string");

    result.set(qid, values);
  }

  return result;
}

// ── Combined Validation ─────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  qid?: string;
  reason?: string;
  display?: string;
}

/** Normalize a name for the category blocklist lookup. */
function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Validate a name against Wikidata with at most 2 HTTP calls:
 *
 *   1. wbsearchentities → find candidate Q-IDs
 *   2. wbgetentities (batch) → fetch P31 for all candidates at once
 *
 * A candidate counts as food if any of its P31 (instance of) values is in
 * FOOD_CLASS_IDS. The first matching candidate (in search relevance order)
 * wins.
 */
export async function validateWikidata(
  name: string
): Promise<ValidationResult> {
  // Reject pure food-category words (e.g. "fruit", "meat", "drink") before
  // spending any HTTP calls — a category name is not a specific food.
  if (CATEGORY_WORDS.has(normalizeName(name))) {
    return { valid: false, reason: "not_food" };
  }

  // Step 1: Search for entity (1 HTTP call)
  const candidates = await searchEntities(name, 5);

  if (candidates.length === 0) {
    return { valid: false, reason: "not_found" };
  }

  // Step 2: Batch-fetch P31 classes for ALL candidates (1 HTTP call)
  const qids = candidates.map((c) => c.id);
  const classes = await batchGetFoodClasses(qids);

  // Step 3: First candidate that is an instance of a food class wins
  for (const candidate of candidates) {
    const p31 = classes.get(candidate.id) ?? [];
    if (p31.some((v) => FOOD_CLASS_IDS.has(v))) {
      // Skip food-category entities themselves (e.g. "Fruit" → Q3314483,
      // "Vegetable" → Q11004). A category name is not a specific food, so it
      // must not score a point. Specific foods that share a whitelist QID
      // (chocolate, cheese, bread, …) are covered by the local dataset and
      // never reach this path.
      if (FOOD_CLASS_IDS.has(candidate.id)) {
        continue;
      }
      return {
        valid: true,
        qid: candidate.id,
        display: candidate.label,
      };
    }
  }

  return { valid: false, reason: "not_food" };
}

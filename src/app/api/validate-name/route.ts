import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet } from "@/lib/cache";
import {
  buildValidationQuery,
  WIKIDATA_SPARQL_ENDPOINT,
  USER_AGENT,
} from "@/lib/sparql";
import { SparqlResponse, ValidateResponse } from "@/types";
import logger from "@/lib/logger";
import { localLookup } from "@/data/famous-women";

// ── Rate Limiting (simple in-memory) ────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 10_000; // 10 seconds
const RATE_LIMIT_MAX = 10; // max requests per window

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

// ── SPARQL Query ────────────────────────────────────────────────────

async function queryWikidata(name: string): Promise<{
  valid: boolean;
  qid?: string;
  reason?: string;
}> {
  const query = buildValidationQuery(name);
  const url = `${WIKIDATA_SPARQL_ENDPOINT}?format=json&query=${encodeURIComponent(query)}`;

  logger.info({ name }, "Querying Wikidata SPARQL");

  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(10_000), // 10s timeout
  });

  if (res.status === 429) {
    logger.warn("Wikidata rate limited (429)");
    throw new Error("rate_limited");
  }

  if (!res.ok) {
    logger.error({ status: res.status }, "Wikidata request failed");
    throw new Error(`Wikidata returned ${res.status}`);
  }

  const data: SparqlResponse = await res.json();
  const bindings = data.results?.bindings;

  if (!bindings || bindings.length === 0) {
    return { valid: false, reason: "not_found" };
  }

  const itemUri = bindings[0].item.value;
  // Extract Q-ID from URI like http://www.wikidata.org/entity/Q25397
  const qid = itemUri.split("/").pop() || itemUri;

  return { valid: true, qid };
}

// ── API Handler ─────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawName = searchParams.get("q");

  // --- Input validation ---
  if (!rawName || rawName.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing or empty 'q' parameter" },
      { status: 400 }
    );
  }

  // Truncate overly long inputs to prevent abuse
  const name = rawName.trim().slice(0, 200);
  const cacheKey = name.toLowerCase();

  // --- Rate limiting ---
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: rateCheck.retryAfter },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateCheck.retryAfter),
        },
      }
    );
  }

  // --- Cache lookup ---
  const cached = cacheGet(cacheKey);
  if (cached) {
    logger.info({ name, cacheKey }, "Cache hit");
    const response: ValidateResponse = { valid: cached.valid };
    if (cached.qid) response.qid = cached.qid;
    return NextResponse.json(response);
  }

  // --- Wikidata query (with local fallback) ---
  logger.info({ name, cacheKey }, "Cache miss — fetching from Wikidata");

  try {
    const result = await queryWikidata(name);

    // Only cache valid results (per PRD)
    if (result.valid) {
      cacheSet(cacheKey, { valid: true, qid: result.qid });
    }

    const response: ValidateResponse = { valid: result.valid };
    if (result.qid) response.qid = result.qid;
    if (result.reason) response.reason = result.reason as ValidateResponse["reason"];

    return NextResponse.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (message === "rate_limited") {
      return NextResponse.json(
        { error: "rate_limited", retryAfter: 10 },
        { status: 429 }
      );
    }

    // --- Fallback: local dataset ---
    logger.warn({ err: message }, "Wikidata unreachable, falling back to local dataset");
    const local = localLookup(name);

    if (local) {
      // Cache the local result too so retries are instant
      cacheSet(cacheKey, { valid: true, qid: local.qid });
      return NextResponse.json({ valid: true, qid: local.qid });
    }

    return NextResponse.json({ valid: false, reason: "not_found" });
  }
}

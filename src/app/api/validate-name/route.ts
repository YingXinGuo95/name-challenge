import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet } from "@/app/challenges/name-100-women/_lib/cache";
import {
  validateWikidata,
  type Gender,
} from "@/app/challenges/name-100-women/_lib/sparql";
import { ValidateResponse } from "@/app/challenges/name-100-women/_lib/types";
import logger from "@/lib/logger";
import { localLookup as localLookupWomen } from "@/app/challenges/name-100-women/_lib/famous-women";
import config from "@/app/challenges/name-100-women/_lib/config";

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

// ── Wikidata Validation ────────────────────────────────────────────────

async function queryWikidata(name: string, gender: Gender): Promise<{
  valid: boolean;
  qid?: string;
  reason?: string;
}> {
  logger.info({ name, gender }, "Querying Wikidata (REST API + SPARQL ASK)");
  return validateWikidata(name, gender);
}

// ── API Handler ─────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawName = searchParams.get("q");
  const rawGender = searchParams.get("gender") || "female";

  // --- Input validation ---
  if (!rawName || rawName.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing or empty 'q' parameter" },
      { status: 400 }
    );
  }

  // Validate gender
  if (rawGender !== "female" && rawGender !== "male") {
    return NextResponse.json(
      { error: "Invalid 'gender' parameter. Must be 'female' or 'male'." },
      { status: 400 }
    );
  }

  const gender: Gender = rawGender;

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
  const cached = cacheGet(cacheKey, gender);
  if (cached) {
    logger.info({ name, cacheKey, gender }, "Cache hit");
    const response: ValidateResponse = { valid: cached.valid };
    if (cached.qid) response.qid = cached.qid;
    return NextResponse.json(response);
  }

  // Resolve local lookup based on gender
  const localLookupFn = gender === "male"
    ? await import("@/app/challenges/name-100-men/_lib/famous-men").then(m => m.localLookup).catch(() => null)
    : localLookupWomen;

  // --- Local-only mode ---
  if (config.dataSource === "local") {
    logger.info({ name, cacheKey, gender }, "Local-only mode");
    const local = localLookupFn?.(name);
    if (local) {
      cacheSet(cacheKey, { valid: true, qid: local.qid }, gender);
      return NextResponse.json({ valid: true, qid: local.qid });
    }
    return NextResponse.json({ valid: false, reason: "not_found" });
  }

  // --- Wikidata query (with local fallback) ---
  logger.info({ name, cacheKey, gender }, "Cache miss — fetching from Wikidata");

  try {
    const result = await queryWikidata(name, gender);

    // Only cache valid results (per PRD)
    if (result.valid) {
      cacheSet(cacheKey, { valid: true, qid: result.qid }, gender);
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
    logger.warn({ err: message, gender }, "Wikidata unreachable, falling back to local dataset");
    const local = localLookupFn?.(name);

    if (local) {
      // Cache the local result too so retries are instant
      cacheSet(cacheKey, { valid: true, qid: local.qid }, gender);
      return NextResponse.json({ valid: true, qid: local.qid });
    }

    return NextResponse.json({ valid: false, reason: "not_found" });
  }
}

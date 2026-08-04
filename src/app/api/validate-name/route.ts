import { NextRequest, NextResponse } from "next/server";
import { cacheGet, cacheSet } from "@/app/challenges/name-100-women/_lib/cache";
import { cacheGet as cacheGetAnimals, cacheSet as cacheSetAnimals } from "@/app/challenges/name-100-animals/_lib/cache";
import { cacheGet as cacheGetMovies, cacheSet as cacheSetMovies } from "@/app/challenges/name-100-movies/_lib/cache";
import {
  validateWikidata,
  type Gender,
} from "@/app/challenges/name-100-women/_lib/sparql";
import {
  validateWikidata as validateAnimalWikidata,
} from "@/app/challenges/name-100-animals/_lib/sparql";
import {
  validateWikidata as validateMovieWikidata,
} from "@/app/challenges/name-100-movies/_lib/sparql";
import { ValidateResponse } from "@/app/challenges/name-100-women/_lib/types";
import { ValidateResponse as AnimalsValidateResponse } from "@/app/challenges/name-100-animals/_lib/types";
import { ValidateResponse as MoviesValidateResponse } from "@/app/challenges/name-100-movies/_lib/types";
import logger from "@/lib/logger";
import { localLookup as localLookupWomen } from "@/app/challenges/name-100-women/_lib/famous-women";
import config from "@/app/challenges/name-100-women/_lib/config";
import { localLookup as localLookupAnimals } from "@/app/challenges/name-100-animals/_lib/animals";
import animalsConfig from "@/app/challenges/name-100-animals/_lib/config";
import { localLookup as localLookupMovies } from "@/app/challenges/name-100-movies/_lib/famous-movies";
import moviesConfig from "@/app/challenges/name-100-movies/_lib/config";

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

async function queryAnimalWikidata(name: string): Promise<{
  valid: boolean;
  qid?: string;
  reason?: string;
}> {
  logger.info({ name }, "Querying Wikidata for animal species (REST API)");
  return validateAnimalWikidata(name);
}

async function queryMovieWikidata(name: string): Promise<{
  valid: boolean;
  qid?: string;
  reason?: string;
}> {
  logger.info({ name }, "Querying Wikidata for movies (REST API + SPARQL ASK)");
  return validateMovieWikidata(name);
}

// ── API Handler ─────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawName = searchParams.get("q");
  const rawGender = searchParams.get("gender") || "female";
  const challenge = searchParams.get("challenge") || "women";

  // --- Input validation ---
  if (!rawName || rawName.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing or empty 'q' parameter" },
      { status: 400 }
    );
  }

  // Truncate overly long inputs to prevent abuse
  const name = rawName.trim().slice(0, 200);

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

  // ── Movies Challenge ──────────────────────────────────────────────

  if (challenge === "movies" || challenge === "name-100-movies") {
    const cacheKey = name.toLowerCase();

    // --- Cache lookup ---
    const cached = cacheGetMovies(cacheKey);
    if (cached) {
      logger.info({ name, cacheKey, challenge }, "Cache hit (movies)");
      const response: MoviesValidateResponse = { valid: cached.valid };
      if (cached.qid) response.qid = cached.qid;
      return NextResponse.json(response);
    }

    // --- Step 1: Local dataset lookup (always checked first if local mode or hit) ---
    if (moviesConfig.dataSource === "local") {
      logger.info({ name, cacheKey, challenge }, "Local-only mode (movies)");
      const local = localLookupMovies(name);
      if (local) {
        cacheSetMovies(cacheKey, { valid: true, qid: local.qid });
        return NextResponse.json({ valid: true, qid: local.qid });
      }
      return NextResponse.json({ valid: false, reason: "not_found" });
    }

    const localMatch = localLookupMovies(name);
    if (localMatch) {
      logger.info({ name, cacheKey, challenge }, "Local dataset hit (movies)");
      cacheSetMovies(cacheKey, { valid: true, qid: localMatch.qid });
      return NextResponse.json({ valid: true, qid: localMatch.qid });
    }

    // --- Step 2: Query Wikidata ---
    logger.info({ name, cacheKey, challenge }, "Not in local dataset — fetching from Wikidata (movies)");

    try {
      const result = await queryMovieWikidata(name);

      if (result.valid) {
        cacheSetMovies(cacheKey, { valid: true, qid: result.qid });
      }

      const response: MoviesValidateResponse = { valid: result.valid };
      if (result.qid) response.qid = result.qid;
      if (result.reason) response.reason = result.reason as MoviesValidateResponse["reason"];

      return NextResponse.json(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";

      if (message === "rate_limited") {
        return NextResponse.json(
          { error: "rate_limited", retryAfter: 10 },
          { status: 429 }
        );
      }

      logger.warn({ err: message, challenge }, "Wikidata unreachable, not in local dataset — marking as not_found (movies)");
      return NextResponse.json({ valid: false, reason: "not_found" });
    }
  }

  // ── Animals Challenge ──────────────────────────────────────────────

  if (challenge === "animals") {
    const cacheKey = name.toLowerCase();

    // --- Cache lookup ---
    const cached = cacheGetAnimals(cacheKey);
    if (cached) {
      logger.info({ name, cacheKey, challenge }, "Cache hit (animals)");
      const response: AnimalsValidateResponse = { valid: cached.valid };
      if (cached.qid) response.qid = cached.qid;
      return NextResponse.json(response);
    }

    // --- Step 1: Local dataset lookup (always checked first) ---
    if (animalsConfig.dataSource === "local") {
      logger.info({ name, cacheKey, challenge }, "Local-only mode (animals)");
      const local = localLookupAnimals(name);
      if (local) {
        cacheSetAnimals(cacheKey, { valid: true, qid: local.qid });
        return NextResponse.json({ valid: true, qid: local.qid });
      }
      return NextResponse.json({ valid: false, reason: "not_found" });
    }

    // --- Step 1: Check local dataset first ---
    const localMatch = localLookupAnimals(name);
    if (localMatch) {
      logger.info({ name, cacheKey, challenge }, "Local dataset hit (animals)");
      cacheSetAnimals(cacheKey, { valid: true, qid: localMatch.qid });
      return NextResponse.json({ valid: true, qid: localMatch.qid });
    }

    // --- Step 2: Query Wikidata for species not in local dataset ---
    logger.info({ name, cacheKey, challenge }, "Not in local dataset — fetching from Wikidata (animals)");

    try {
      const result = await queryAnimalWikidata(name);

      if (result.valid) {
        cacheSetAnimals(cacheKey, { valid: true, qid: result.qid });
      }

      const response: AnimalsValidateResponse = { valid: result.valid };
      if (result.qid) response.qid = result.qid;
      if (result.reason) response.reason = result.reason as AnimalsValidateResponse["reason"];

      return NextResponse.json(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";

      if (message === "rate_limited") {
        return NextResponse.json(
          { error: "rate_limited", retryAfter: 10 },
          { status: 429 }
        );
      }

      // --- Wikidata unreachable & not in local dataset → not_found ---
      logger.warn({ err: message, challenge }, "Wikidata unreachable, not in local dataset — marking as not_found (animals)");
      return NextResponse.json({ valid: false, reason: "not_found" });
    }
  }

  // ── Human Challenges (Women / Men) ─────────────────────────────────

  // Validate gender
  if (rawGender !== "female" && rawGender !== "male") {
    return NextResponse.json(
      { error: "Invalid 'gender' parameter. Must be 'female' or 'male'." },
      { status: 400 }
    );
  }

  const gender: Gender = rawGender;
  const cacheKey = name.toLowerCase();

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

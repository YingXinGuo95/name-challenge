import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import logger from "@/lib/logger";
import type {
  LeaderboardSubmitRequest,
  LeaderboardSubmitResponse,
  LeaderboardGetResponse,
} from "@/lib/leaderboard/types";

// ── Rate Limiting (simple in-memory) ────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 60 seconds
const RATE_LIMIT_MAX = 3; // max submissions per window

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

// ── Validation ──────────────────────────────────────────────────────

function validateSubmitBody(
  body: unknown
): { valid: true; data: LeaderboardSubmitRequest } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body is required" };
  }

  const data = body as Record<string, unknown>;

  // nickname: string, trimmed length 1-30
  if (typeof data.nickname !== "string" || data.nickname.trim().length < 1) {
    return { valid: false, error: "Nickname is required (1-30 characters)" };
  }
  if (data.nickname.trim().length > 30) {
    return { valid: false, error: "Nickname must be 30 characters or fewer" };
  }

  // score: integer 0-100
  if (typeof data.score !== "number" || !Number.isInteger(data.score)) {
    return { valid: false, error: "Score must be an integer" };
  }
  if (data.score < 0 || data.score > 100) {
    return { valid: false, error: "Score must be between 0 and 100" };
  }

  // elapsed_seconds: integer >= 0
  if (
    typeof data.elapsed_seconds !== "number" ||
    !Number.isInteger(data.elapsed_seconds)
  ) {
    return { valid: false, error: "elapsed_seconds must be an integer" };
  }
  if (data.elapsed_seconds < 0) {
    return { valid: false, error: "elapsed_seconds must be non-negative" };
  }

  // challenge_slug: non-empty string
  if (typeof data.challenge_slug !== "string" || data.challenge_slug.trim().length === 0) {
    return { valid: false, error: "challenge_slug is required" };
  }

  return {
    valid: true,
    data: {
      nickname: data.nickname.trim(),
      score: data.score,
      elapsed_seconds: data.elapsed_seconds,
      challenge_slug: data.challenge_slug.trim(),
    },
  };
}

// ── POST: Submit a score ────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many submissions. Please wait." },
      {
        status: 429,
        headers: { "Retry-After": String(rateCheck.retryAfter) },
      }
    );
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const validation = validateSubmitBody(body);
  if (!validation.valid) {
    return NextResponse.json(
      { success: false, error: validation.error },
      { status: 400 }
    );
  }

  const { nickname, score, elapsed_seconds, challenge_slug } = validation.data;

  logger.info({ nickname, score, elapsed_seconds, challenge_slug }, "Leaderboard submission");

  try {
    const supabase = createClient();

    const { data: entry, error: insertError } = await supabase
      .from("leaderboard")
      .insert({
        nickname,
        score,
        elapsed_seconds,
        challenge_slug,
      })
      .select()
      .single();

    if (insertError) {
      logger.error({ error: insertError }, "Failed to insert leaderboard entry");
      return NextResponse.json(
        { success: false, error: "Failed to save score. Please try again." },
        { status: 500 }
      );
    }

    // Calculate rank: count entries with better score (higher score, or same score with lower time)
    const { count: rankCount, error: rankError } = await supabase
      .from("leaderboard")
      .select("*", { count: "exact", head: true })
      .eq("challenge_slug", challenge_slug)
      .or(
        `score.gt.${score},and(score.eq.${score},elapsed_seconds.lt.${elapsed_seconds})`
      );

    const rank = rankError ? null : (rankCount ?? 0) + 1;

    const response: LeaderboardSubmitResponse = {
      success: true,
      entry,
      rank: rank ?? undefined,
    };

    return NextResponse.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.error({ err: message }, "Leaderboard POST error");
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ── GET: Fetch leaderboard ──────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get("challenge");
  const limitParam = searchParams.get("limit");
  const offsetParam = searchParams.get("offset");

  // Validate challenge param
  if (!challenge || challenge.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing 'challenge' query parameter" },
      { status: 400 }
    );
  }

  // Parse and clamp limit
  let limit = 50;
  if (limitParam) {
    const parsed = parseInt(limitParam, 10);
    if (!isNaN(parsed) && parsed > 0) {
      limit = Math.min(parsed, 100);
    }
  }

  // Parse offset
  let offset = 0;
  if (offsetParam) {
    const parsed = parseInt(offsetParam, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      offset = parsed;
    }
  }

  try {
    const supabase = createClient();

    // Get total count
    const { count: total, error: countError } = await supabase
      .from("leaderboard")
      .select("*", { count: "exact", head: true })
      .eq("challenge_slug", challenge.trim());

    if (countError) {
      logger.error({ error: countError }, "Failed to count leaderboard entries");
      return NextResponse.json(
        { error: "Failed to fetch leaderboard" },
        { status: 500 }
      );
    }

    // Get entries ordered by score DESC, then elapsed ASC
    const { data: entries, error: fetchError } = await supabase
      .from("leaderboard")
      .select("*")
      .eq("challenge_slug", challenge.trim())
      .order("score", { ascending: false })
      .order("elapsed_seconds", { ascending: true })
      .range(offset, offset + limit - 1);

    if (fetchError) {
      logger.error({ error: fetchError }, "Failed to fetch leaderboard entries");
      return NextResponse.json(
        { error: "Failed to fetch leaderboard" },
        { status: 500 }
      );
    }

    const response: LeaderboardGetResponse = {
      entries: entries ?? [],
      total: total ?? 0,
    };

    return NextResponse.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.error({ err: message }, "Leaderboard GET error");
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

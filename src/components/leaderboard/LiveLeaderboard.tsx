"use client";

import { useState, useEffect, useCallback } from "react";
import { Trophy, Medal, Loader2, AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/leaderboard/types";

// ── Helpers ──────────────────────────────────────────────────────────

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function getRankBadge(rank: number): { icon: React.ReactNode; color: string } {
  switch (rank) {
    case 1:
      return { icon: <Trophy className="h-4 w-4" />, color: "text-yellow-500" };
    case 2:
      return { icon: <Medal className="h-4 w-4" />, color: "text-gray-400" };
    case 3:
      return { icon: <Medal className="h-4 w-4" />, color: "text-amber-600" };
    default:
      return { icon: null, color: "" };
  }
}

// ── Constants ────────────────────────────────────────────────────────

const REFRESH_INTERVAL = 30_000; // 30 seconds
const PAGE_SIZE = 10;
const MAX_ENTRIES = 100; // top 100
const DEFAULT_CHALLENGE_SLUG = "name-100-women";

// ── Component ────────────────────────────────────────────────────────

export function LiveLeaderboard({ challengeSlug }: { challengeSlug?: string }) {
  const slug = challengeSlug ?? DEFAULT_CHALLENGE_SLUG;
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [page, setPage] = useState(0); // 0-indexed

  const totalPages = Math.min(Math.ceil(total / PAGE_SIZE), Math.ceil(MAX_ENTRIES / PAGE_SIZE));

  const fetchLeaderboard = useCallback(async (pageIndex: number) => {
    try {
      const offset = pageIndex * PAGE_SIZE;
      const res = await fetch(
        `/api/leaderboard?challenge=${encodeURIComponent(slug)}&limit=${PAGE_SIZE}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEntries(data.entries ?? []);
      setTotal(Math.min(data.total ?? 0, MAX_ENTRIES));
      setLastUpdated(new Date());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch + auto-refresh (current page only)
  useEffect(() => {
    fetchLeaderboard(page);

    const interval = setInterval(() => fetchLeaderboard(page), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchLeaderboard, page]);

  const handlePrev = useCallback(() => {
    if (page > 0) {
      setIsLoading(true);
      setPage((p) => p - 1);
    }
  }, [page]);

  const handleNext = useCallback(() => {
    if (page < totalPages - 1) {
      setIsLoading(true);
      setPage((p) => p + 1);
    }
  }, [page, totalPages]);

  // ── Loading State ─────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex w-[280px] flex-col items-center gap-3 rounded-[24px] border-[2.5px] border-[#2D2D2D]/20 bg-white/60 px-4 py-10">
        <Loader2 className="h-5 w-5 animate-spin text-[#2D2D2D]/40" />
        <span className="text-xs font-medium text-muted-foreground">
          Loading leaderboard...
        </span>
      </div>
    );
  }

  // ── Error State ───────────────────────────────────────────────────

  if (error) {
    return (
      <div className="flex w-[280px] flex-col items-center gap-3 rounded-[24px] border-[2.5px] border-[#FF8FAB]/40 bg-[#FF8FAB]/10 px-4 py-8">
        <AlertCircle className="h-5 w-5 text-[#FF8FAB]" />
        <span className="text-xs font-bold text-[#2D2D2D]">
          Failed to load
        </span>
        <button
          onClick={() => {
            setIsLoading(true);
            setError(false);
            fetchLeaderboard(page);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#2D2D2D] px-3 py-1.5 text-xs font-bold text-[#2D2D2D] transition-transform hover:scale-105"
        >
          <RefreshCw className="h-3 w-3" />
          Retry
        </button>
      </div>
    );
  }

  // ── Empty State ───────────────────────────────────────────────────

  if (entries.length === 0) {
    return (
      <div className="flex w-[280px] flex-col items-center gap-3 rounded-[24px] border-[2.5px] border-dashed border-[#2D2D2D]/25 bg-white/40 px-4 py-10 text-center">
        <Trophy className="h-8 w-8 text-[#2D2D2D]/25" />
        <p className="text-xs font-bold uppercase tracking-wide text-[#2D2D2D]/50">
          No Scores Yet
        </p>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Be the first to complete the challenge!
        </p>
      </div>
    );
  }

  // ── Entries for current page with global rank ─────────────────────

  const startRank = page * PAGE_SIZE + 1;

  // ── Leaderboard Table ─────────────────────────────────────────────

  return (
    <div className="flex w-[280px] flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Trophy className="h-4 w-4 text-[#2D2D2D]" />
          <h3 className="text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D]">
            Leaderboard
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-[10px] text-muted-foreground">
              {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button
            onClick={() => fetchLeaderboard(page)}
            className="rounded-full p-1 text-[#2D2D2D]/40 transition-colors hover:bg-[#2D2D2D]/5 hover:text-[#2D2D2D]/70"
            aria-label="Refresh leaderboard"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-hidden rounded-[20px] border-[2.5px] border-[#2D2D2D] bg-white"
        style={{ boxShadow: "2px 4px 0 rgba(0,0,0,0.06)" }}
      >
        {/* Table Header */}
        <div className="flex items-center gap-1 border-b-[2.5px] border-[#2D2D2D]/10 bg-[#F5E6D3]/60 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-[#2D2D2D]/50">
          <span className="w-6 text-center">#</span>
          <span className="flex-1">Name</span>
          <span className="w-14 text-right">Time</span>
        </div>

        {/* Table Body */}
        <div className="max-h-[360px] overflow-y-auto">
          {entries.map((entry, index) => {
            const rank = startRank + index;
            const badge = getRankBadge(rank);

            return (
              <div
                key={entry.id}
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium transition-colors even:bg-[#FFF8E7]/50"
              >
                {/* Rank */}
                <span
                  className={`flex w-6 items-center justify-center text-[11px] font-extrabold tabular-nums ${badge.color}`}
                >
                  {badge.icon ?? rank}
                </span>

                {/* Nickname */}
                <span
                  className="flex-1 truncate text-[#2D2D2D]/80"
                  title={entry.nickname}
                >
                  {entry.nickname}
                </span>

                {/* Time */}
                <span className="w-14 text-right text-[11px] font-bold tabular-nums text-[#2D2D2D]">
                  {formatTime(entry.elapsed_seconds)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="inline-flex items-center gap-0.5 rounded-full border-[2.5px] border-[#2D2D2D] bg-white px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#2D2D2D] transition-all hover:bg-[#F5E6D3]/60 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ boxShadow: "1px 2px 0 rgba(0,0,0,0.06)" }}
          >
            <ChevronLeft className="h-3 w-3" />
            Prev
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {page + 1} / {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="inline-flex items-center gap-0.5 rounded-full border-[2.5px] border-[#2D2D2D] bg-white px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#2D2D2D] transition-all hover:bg-[#F5E6D3]/60 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ boxShadow: "1px 2px 0 rgba(0,0,0,0.06)" }}
          >
            Next
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

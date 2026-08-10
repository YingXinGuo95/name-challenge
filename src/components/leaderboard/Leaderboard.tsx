"use client";

import { Trophy, Medal, Loader2, AlertCircle } from "lucide-react";
import type { LeaderboardEntry } from "@/lib/leaderboard/types";
import { TruncatedText } from "@/components/leaderboard/TruncatedText";

// ── Helpers ──────────────────────────────────────────────────────────

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getRankBadge(rank: number): { icon: React.ReactNode; color: string } {
  switch (rank) {
    case 1:
      return {
        icon: <Trophy className="h-5 w-5" />,
        color: "text-yellow-500",
      };
    case 2:
      return {
        icon: <Medal className="h-5 w-5" />,
        color: "text-gray-400",
      };
    case 3:
      return {
        icon: <Medal className="h-5 w-5" />,
        color: "text-amber-600",
      };
    default:
      return { icon: null, color: "" };
  }
}

// ── Component Props ──────────────────────────────────────────────────

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserEntryId?: string;
  currentUserRank?: number;
}

// ── Component ────────────────────────────────────────────────────────

export function Leaderboard({
  entries,
  currentUserEntryId,
  currentUserRank,
}: LeaderboardProps) {
  if (entries.length === 0) {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-[32px] border-[2.5px] border-dashed border-[#2D2D2D]/30 bg-white/50 px-8 py-12 text-center">
        <Trophy className="h-10 w-10 text-[#2D2D2D]/30" />
        <div className="space-y-1">
          <p className="text-sm font-bold uppercase tracking-wide text-[#2D2D2D]/50">
            Be the First!
          </p>
          <p className="text-xs text-muted-foreground">
            No scores yet. Complete the challenge and claim the top spot!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-center gap-2">
        <Trophy className="h-5 w-5 text-[#2D2D2D]" />
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-[#2D2D2D]">
          Leaderboard
        </h3>
      </div>

      {/* User's rank banner */}
      {currentUserRank && (
        <div className="rounded-full border-[2.5px] border-[#FF8FAB] bg-[#FF8FAB]/10 px-5 py-2 text-center">
          <p className="text-sm font-bold text-[#2D2D2D]">
            You ranked{" "}
            <span className="text-base font-extrabold text-[#FF8FAB]">
              #{currentUserRank}
            </span>
          </p>
        </div>
      )}

      {/* Leaderboard Table */}
      <div
        className="overflow-hidden rounded-[28px] border-[2.5px] border-[#2D2D2D] bg-white"
        style={{ boxShadow: "2px 4px 0 rgba(0,0,0,0.06)" }}
      >
        {/* Table Header */}
        <div className="flex items-center gap-2 border-b-[2.5px] border-[#2D2D2D]/10 bg-[#F5E6D3]/60 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-[#2D2D2D]/60">
          <span className="w-8 text-center">#</span>
          <span className="flex-1">Nickname</span>
          <span className="w-20 text-right">Date</span>
          <span className="w-20 text-right">Time</span>
        </div>

        {/* Table Body */}
        <div className="max-h-[420px] overflow-y-auto">
          {entries.map((entry, index) => {
            const rank = index + 1;
            const badge = getRankBadge(rank);
            const isCurrentUser = entry.id === currentUserEntryId;

            return (
              <div
                key={entry.id}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  isCurrentUser
                    ? "border-l-4 border-[#FF8FAB] bg-[#FF8FAB]/10"
                    : "border-l-4 border-transparent even:bg-[#FFF8E7]/50"
                }`}
              >
                {/* Rank */}
                <span
                  className={`flex w-8 items-center justify-center text-xs font-extrabold tabular-nums ${badge.color}`}
                >
                  {badge.icon ?? rank}
                </span>

                {/* Nickname */}
                <TruncatedText
                  text={entry.nickname}
                  className={`flex-1 ${
                    isCurrentUser ? "font-extrabold text-[#2D2D2D]" : "text-[#2D2D2D]/80"
                  }`}
                />

                {/* Date */}
                <span className="w-20 text-right text-xs tabular-nums text-[#2D2D2D]/40">
                  {formatDate(entry.created_at)}
                </span>

                {/* Time */}
                <span className="w-20 text-right tabular-nums text-[#2D2D2D]/60">
                  {formatTime(entry.elapsed_seconds)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Loading & Error States (for use by parent) ──────────────────────

export function LeaderboardLoading() {
  return (
    <div className="flex w-full max-w-md items-center justify-center gap-2 rounded-[32px] border-[2.5px] border-[#2D2D2D]/20 bg-white/50 py-12">
      <Loader2 className="h-5 w-5 animate-spin text-[#2D2D2D]/50" />
      <span className="text-sm font-medium text-muted-foreground">
        Loading leaderboard...
      </span>
    </div>
  );
}

export function LeaderboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className="retro-card flex w-full max-w-md items-center gap-3 bg-[#FF8FAB]/20 px-5 py-4 text-sm font-bold text-[#2D2D2D]"
      role="alert"
    >
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="flex-1">Failed to load leaderboard</span>
      <button
        onClick={onRetry}
        className="retro-btn h-8 px-3 text-xs font-extrabold uppercase tracking-wider"
      >
        Retry
      </button>
    </div>
  );
}

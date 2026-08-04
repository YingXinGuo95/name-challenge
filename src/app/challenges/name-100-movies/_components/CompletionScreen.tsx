"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Trophy, Share2, RotateCcw, Check, Camera, Send, Loader2, AlertCircle } from "lucide-react";
import { toBlob } from "html-to-image";
import confetti from "canvas-confetti";
import {
  isAlreadySubmitted,
  markAsSubmitted,
} from "../_lib/storage";
import {
  Leaderboard,
  LeaderboardLoading,
  LeaderboardError,
} from "@/components/leaderboard/Leaderboard";
import type { LeaderboardEntry, LeaderboardSubmitResponse, LeaderboardGetResponse } from "@/lib/leaderboard/types";

interface CompletionScreenProps {
  elapsedSeconds: number;
  targetCount: number;
  challengeSlug: string;
  onRestart: () => void;
}

type ScreenState = "celebration" | "submitting" | "leaderboard";

function formatElapsed(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function CompletionScreen({
  elapsedSeconds,
  targetCount,
  challengeSlug,
  onRestart,
}: CompletionScreenProps) {
  const [copied, setCopied] = useState(false);
  const [imageCopied, setImageCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const submitted = isAlreadySubmitted();
  const [screenState, setScreenState] = useState<ScreenState>(
    submitted ? "leaderboard" : "celebration"
  );
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Leaderboard data
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [leaderboardTotal, setLeaderboardTotal] = useState(0);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  // Trigger confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    setIsLoadingLeaderboard(true);
    setLeaderboardError(null);
    try {
      const res = await fetch(`/api/leaderboard?challenge=${challengeSlug}&limit=50`);
      if (!res.ok) throw new Error("Failed to load leaderboard");
      const data: LeaderboardGetResponse = await res.json();
      setLeaderboardData(data.entries);
      setLeaderboardTotal(data.total);
    } catch (err) {
      setLeaderboardError(err instanceof Error ? err.message : "Error loading leaderboard");
    } finally {
      setIsLoadingLeaderboard(false);
    }
  }, [challengeSlug]);

  useEffect(() => {
    if (screenState === "leaderboard") {
      fetchLeaderboard();
    }
  }, [screenState, fetchLeaderboard]);

  const handleShareText = useCallback(() => {
    const text = `🎬 I named ${targetCount} movies in ${formatElapsed(elapsedSeconds)} on Name 100 Challenge! Can you beat my time? https://name100challenge.me/challenges/${challengeSlug}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [targetCount, elapsedSeconds, challengeSlug]);

  const handleCopyCardImage = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const blob = await toBlob(cardRef.current, { pixelRatio: 2 });
      if (!blob) return;
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setImageCopied(true);
      setTimeout(() => setImageCopied(false), 2000);
    } catch {
      // Fall back to text share
      handleShareText();
    }
  }, [handleShareText]);

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenge_slug: challengeSlug,
          nickname: nickname.trim(),
          time_seconds: elapsedSeconds,
        }),
      });

      const data: LeaderboardSubmitResponse = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      markAsSubmitted();
      if (data.entry) {
        setHighlightId(data.entry.id);
      }
      setScreenState("leaderboard");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit score");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
      {screenState === "celebration" && (
        <div
          ref={cardRef}
          className="relative flex w-full flex-col items-center gap-5 rounded-3xl border-[2.5px] border-[#2D2D2D] bg-white p-6 sm:p-8 shadow-[4px_6px_0_rgba(0,0,0,0.12)] text-center"
        >
          <div className="retro-btn h-16 w-16 !rounded-2xl text-3xl bg-[#9333EA]/10">
            🏆
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#2D2D2D]">
              Challenge Completed!
            </h2>
            <p className="text-xs font-bold uppercase tracking-wider text-[#9333EA]">
              Name 100 Movies
            </p>
          </div>

          <div className="flex w-full items-center justify-around rounded-2xl border-[2.5px] border-[#2D2D2D]/15 bg-[#F5E6D3]/40 p-4">
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Time
              </span>
              <span className="text-2xl font-black text-[#2D2D2D]">
                {formatElapsed(elapsedSeconds)}
              </span>
            </div>
            <div className="h-8 w-[2px] bg-[#2D2D2D]/15" />
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Movies Named
              </span>
              <span className="text-2xl font-black text-[#2D2D2D]">
                {targetCount}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex w-full flex-col gap-2.5 sm:flex-row">
            <button
              onClick={() => setScreenState("submitting")}
              className="flex-1 retro-btn-dark py-3 text-xs font-extrabold uppercase tracking-wider text-white bg-[#9333EA] border-[#2D2D2D]"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Submit Score
            </button>
            <button
              onClick={handleCopyCardImage}
              className="retro-btn flex-1 py-3 text-xs font-extrabold uppercase tracking-wider text-[#2D2D2D]"
            >
              {imageCopied ? <Check className="mr-2 h-4 w-4 text-emerald-600" /> : <Camera className="mr-2 h-4 w-4" />}
              {imageCopied ? "Card Copied!" : "Share Card"}
            </button>
          </div>

          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-[#2D2D2D] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Play Again
          </button>
        </div>
      )}

      {screenState === "submitting" && (
        <form
          onSubmit={handleSubmitScore}
          className="flex w-full flex-col gap-5 rounded-3xl border-[2.5px] border-[#2D2D2D] bg-white p-6 sm:p-8 shadow-[4px_6px_0_rgba(0,0,0,0.12)] text-center"
        >
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold uppercase text-[#2D2D2D]">
              Enter Your Leaderboard Name
            </h3>
            <p className="text-xs font-medium text-muted-foreground">
              Your time: <strong>{formatElapsed(elapsedSeconds)}</strong>
            </p>
          </div>

          {submitError && (
            <div className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Your Nickname (e.g. Cinephile99)"
            required
            maxLength={30}
            className="w-full rounded-2xl border-[2.5px] border-[#2D2D2D] bg-[#F5E6D3]/30 px-4 py-3.5 text-sm font-bold text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#9333EA]/30"
          />

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setScreenState("celebration")}
              className="retro-btn flex-1 py-3 text-xs uppercase text-[#2D2D2D]"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !nickname.trim()}
              className="retro-btn-dark flex-1 py-3 text-xs uppercase tracking-wider text-white bg-[#9333EA]"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Submit"}
            </button>
          </div>
        </form>
      )}

      {screenState === "leaderboard" && (
        <div className="flex w-full flex-col gap-4 rounded-3xl border-[2.5px] border-[#2D2D2D] bg-white p-6 shadow-[4px_6px_0_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between border-b-[2.5px] border-[#2D2D2D]/15 pb-4">
            <div>
              <h3 className="text-lg font-extrabold uppercase text-[#2D2D2D]">
                Global Leaderboard
              </h3>
              <p className="text-xs font-bold uppercase text-[#9333EA]">
                Top Film Buffs ({leaderboardTotal})
              </p>
            </div>
            <button
              onClick={onRestart}
              className="retro-btn px-3 py-1.5 text-xs uppercase"
            >
              Play Again
            </button>
          </div>

          {isLoadingLeaderboard ? (
            <LeaderboardLoading />
          ) : leaderboardError ? (
            <LeaderboardError onRetry={fetchLeaderboard} />
          ) : (
            <Leaderboard entries={leaderboardData} currentUserEntryId={highlightId ?? undefined} />
          )}
        </div>
      )}
    </div>
  );
}

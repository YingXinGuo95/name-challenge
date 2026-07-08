"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Trophy, Share2, RotateCcw, Check, Camera, Send, Loader2, AlertCircle } from "lucide-react";
import { toBlob } from "html-to-image";
import confetti from "canvas-confetti";
import {
  hasSubmittedScore,
  getSubmissionRecord,
  saveSubmissionRecord,
  type SubmissionRecord,
} from "../_lib/storage";
import {
  Leaderboard,
  LeaderboardLoading,
  LeaderboardError,
} from "@/components/leaderboard/Leaderboard";
import { createClient } from "@/lib/supabase/client";
import type { LeaderboardEntry, LeaderboardSubmitResponse, LeaderboardGetResponse } from "@/lib/leaderboard/types";

// ── Types ────────────────────────────────────────────────────────────

interface CompletionScreenProps {
  elapsedSeconds: number;
  targetCount: number;
  challengeSlug: string;
  onRestart: () => void;
}

type ScreenState = "celebration" | "submitting" | "leaderboard";

// ── Helpers ──────────────────────────────────────────────────────────

function formatElapsed(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

// ── Component ────────────────────────────────────────────────────────

export function CompletionScreen({
  elapsedSeconds,
  targetCount,
  challengeSlug,
  onRestart,
}: CompletionScreenProps) {
  const [copied, setCopied] = useState(false);
  const [imageCopied, setImageCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Submission & Leaderboard state
  const existingSubmission = getSubmissionRecord();
  const [screenState, setScreenState] = useState<ScreenState>(
    existingSubmission ? "leaderboard" : "celebration"
  );
  const [nickname, setNickname] = useState(existingSubmission?.nickname ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionRecord | null>(
    existingSubmission
  );
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(false);
  const alreadySubmitted = hasSubmittedScore();

  const elapsed = formatElapsed(elapsedSeconds);

  const [isShaking, setIsShaking] = useState(false);
  const [isCheckingRank, setIsCheckingRank] = useState(!alreadySubmitted);
  const [currentRank, setCurrentRank] = useState<number | null>(null);

  // Confetti on mount
  useEffect(() => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#FFE066", "#6CB4EE", "#FF8FAB", "#5CC9C7", "#FFD700"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#FFE066", "#6CB4EE", "#FF8FAB", "#5CC9C7", "#FFD700"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#FFE066", "#6CB4EE", "#FF8FAB", "#5CC9C7", "#FFD700"],
    });

    // Continuous side stream
    setTimeout(() => requestAnimationFrame(frame), 300);
  }, []);

  // Auto-fetch leaderboard when entering leaderboard state
  useEffect(() => {
    if (screenState === "leaderboard") {
      fetchLeaderboard();
    }
  }, [screenState]);

  // Check if user's time ranks in the top 100
  useEffect(() => {
    if (alreadySubmitted) return;

    let cancelled = false;
    async function checkRank() {
      try {
        const supabase = createClient();
        const { count, error: countError } = await supabase
          .from("leaderboard")
          .select("*", { count: "exact", head: true })
          .eq("challenge_slug", challengeSlug)
          .eq("score", targetCount)
          .lt("elapsed_seconds", elapsedSeconds);

        if (countError) throw countError;

        if (!cancelled) {
          // Rank = number of people faster + 1
          const rank = (count ?? 0) + 1;
          setCurrentRank(rank);
          setIsCheckingRank(false);
        }
      } catch {
        // On error, allow submission (optimistic)
        if (!cancelled) {
          setCurrentRank(null);
          setIsCheckingRank(false);
        }
      }
    }
    checkRank();
    return () => { cancelled = true; };
  }, [alreadySubmitted, challengeSlug, targetCount, elapsedSeconds]);

  // ── Share Handlers ───────────────────────────────────────────────

  function buildShareText(): string {
    if (submissionResult) {
      return `🏆 I ranked #${submissionResult.rank} — named ${targetCount} famous women in ${elapsed}!\n\nCan you beat my score? Play Name 100 Women Challenge!`;
    }
    return `🏆 I just named ${targetCount} famous women in ${elapsed}!\n\nCan you beat my score? Play Name 100 Women Challenge!`;
  }

  async function handleShare() {
    const text = buildShareText();
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // User cancelled — no-op
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const handleCopyImage = useCallback(async () => {
    if (!cardRef.current) return;

    try {
      const blob = await toBlob(cardRef.current, {
        backgroundColor: "#F5E6D3",
        pixelRatio: 2,
      });

      if (!blob) {
        alert("Failed to capture image. Please try again.");
        return;
      }

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      setImageCopied(true);
      setTimeout(() => setImageCopied(false), 2000);
    } catch {
      // Fallback: download the image if clipboard API fails
      try {
        if (!cardRef.current) return;
        const blob = await toBlob(cardRef.current, {
          backgroundColor: "#F5E6D3",
          pixelRatio: 2,
        });
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "name-100-women-result.png";
        a.click();
        URL.revokeObjectURL(url);
      } catch {
        // silently fail
      }
    }
  }, []);

  // ── Leaderboard ──────────────────────────────────────────────────

  async function fetchLeaderboard() {
    setIsLoadingLeaderboard(true);
    setLeaderboardError(false);

    try {
      const res = await fetch(
        `/api/leaderboard?challenge=${encodeURIComponent(challengeSlug)}&limit=50`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data: LeaderboardGetResponse = await res.json();
      setLeaderboardEntries(data.entries);
    } catch {
      setLeaderboardError(true);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  }

  async function handleSubmitScore() {
    const trimmed = nickname.trim();
    if (!trimmed || trimmed.length < 1) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: trimmed,
          score: targetCount,
          elapsed_seconds: elapsedSeconds,
          challenge_slug: challengeSlug,
        }),
      });

      const data: LeaderboardSubmitResponse = await res.json();

      if (res.ok && data.success && data.entry) {
        const record: SubmissionRecord = {
          submittedAt: Date.now(),
          entryId: data.entry.id,
          nickname: trimmed,
          rank: data.rank ?? 0,
        };
        saveSubmissionRecord(record);
        setSubmissionResult(record);

        // Trigger confetti for successful submission
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ["#FFE066", "#6CB4EE", "#FF8FAB", "#5CC9C7", "#FFD700"],
        });

        setScreenState("leaderboard");
      } else {
        setSubmitError(data.error ?? "Failed to submit score. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleViewLeaderboard() {
    setScreenState("leaderboard");
  }

  // ── Render: Celebration Screen ───────────────────────────────────

  if (screenState === "celebration") {
    return (
      <div className="flex flex-col items-center gap-8">
        {/* Result Card (image-capturable) */}
        <div
          ref={cardRef}
          className="flex w-full max-w-md flex-col items-center gap-6 rounded-[48px] border-4 border-gray-900 bg-white px-8 py-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(255,255,255,0.8)]"
        >
          {/* Trophy icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-[#FFF8E7]">
            <Trophy className="h-6 w-6 text-gray-700" />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Your Time
            </p>
            <div className="inline-block rounded-2xl bg-[#FFF8E7] px-8 py-3">
              <span className="text-6xl font-black tabular-nums text-gray-900">
                {elapsed}
              </span>
            </div>
          </div>

          {/* Title + detail */}
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-800">
              Challenge Complete!
            </h2>
            <p className="text-sm text-gray-600">
              You named{" "}
              <span className="font-bold text-red-600">{targetCount} famous women</span>.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {/* Copy image */}
            <button
              onClick={handleCopyImage}
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-800 px-5 py-3 text-sm font-bold text-gray-800 transition-transform hover:scale-105 hover:bg-gray-100"
            >
              {imageCopied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4" />
                  Copy Image
                </>
              )}
            </button>

            {/* Share text */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-800 px-5 py-3 text-sm font-bold text-gray-800 transition-transform hover:scale-105 hover:bg-gray-100"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  Share Text
                </>
              )}
            </button>

            {/* Submit Score — only if in top 100 */}
            {!alreadySubmitted && isCheckingRank && (
              <button
                disabled
                className="inline-flex items-center gap-2 rounded-full bg-[#FF8FAB]/50 px-6 py-3 text-sm font-bold text-[#2D2D2D]/50"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking rank...
              </button>
            )}

            {!alreadySubmitted && !isCheckingRank && currentRank !== null && currentRank <= 100 && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-bold text-[#2D2D2D]">
                  🎉 You&apos;re in the{" "}
                  <span className="text-base font-extrabold text-[#FF8FAB]">
                    top {currentRank}
                  </span>
                  ! Submit your score now!
                </p>
                <button
                  onClick={() => setScreenState("submitting")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF8FAB] px-6 py-3 text-sm font-bold text-[#2D2D2D] transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  Submit Score
                </button>
              </div>
            )}

            {!alreadySubmitted && !isCheckingRank && currentRank !== null && currentRank > 100 && (
              <div className="rounded-full border-[2.5px] border-[#2D2D2D]/20 bg-white px-5 py-2 text-center">
                <p className="text-xs font-medium text-muted-foreground">
                  Your time is outside the top 100 — keep trying!
                </p>
              </div>
            )}

            {/* Fallback: rank check failed, allow submission anyway */}
            {!alreadySubmitted && !isCheckingRank && currentRank === null && (
              <button
                onClick={() => setScreenState("submitting")}
                className="inline-flex items-center gap-2 rounded-full bg-[#FF8FAB] px-6 py-3 text-sm font-bold text-[#2D2D2D] transition-transform hover:scale-105"
              >
                <Trophy className="h-4 w-4" />
                Submit Score
              </button>
            )}

            {/* View Leaderboard (always available) */}
            <button
              onClick={handleViewLeaderboard}
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-800 px-5 py-3 text-sm font-bold text-gray-800 transition-transform hover:scale-105 hover:bg-gray-100"
            >
              <Trophy className="h-4 w-4" />
              {alreadySubmitted ? "View Leaderboard" : "Leaderboard"}
            </button>

            {/* Play Again */}
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-gray-800"
            >
              <RotateCcw className="h-4 w-4" />
              Play Again
            </button>
          </div>
        </div>

        {/* Already submitted reminder */}
        {alreadySubmitted && (
          <div className="rounded-full border-[2.5px] border-[#FF8FAB] bg-[#FF8FAB]/10 px-5 py-2 text-center">
            <p className="text-sm font-bold text-[#2D2D2D]">
              You ranked{" "}
              <span className="text-base font-extrabold text-[#FF8FAB]">
                #{submissionResult?.rank ?? "?"}
              </span>
              {" "}on the leaderboard!
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── Render: Submitting Screen (Nickname Input) ────────────────────

  if (screenState === "submitting") {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        {/* Result Card (compact) */}
        <div
          ref={cardRef}
          className="flex w-full flex-col items-center gap-5 rounded-[48px] border-4 border-gray-900 bg-white px-8 py-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(255,255,255,0.8)]"
        >
          {/* Trophy icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-[#FFF8E7]">
            <Trophy className="h-6 w-6 text-gray-700" />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Your Time
            </p>
            <div className="inline-block rounded-2xl bg-[#FFF8E7] px-8 py-3">
              <span className="text-6xl font-black tabular-nums text-gray-900">
                {elapsed}
              </span>
            </div>
          </div>

          <h2 className="text-lg font-bold uppercase tracking-wide text-gray-800">
            Submit Your Score
          </h2>
          <p className="text-sm text-gray-600">
            Enter a nickname to join the leaderboard!
          </p>

          {/* Error Banner */}
          {submitError && (
            <div
              className="retro-card flex w-full items-center gap-2 bg-[#FF8FAB]/30 px-4 py-3 text-sm font-bold text-[#2D2D2D]"
              role="alert"
            >
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {submitError}
            </div>
          )}

          {/* Nickname Input + Submit */}
          <div className={`flex w-full gap-3 ${isShaking ? "animate-shake" : ""}`}>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value.slice(0, 30))}
              placeholder="Enter your nickname"
              maxLength={30}
              disabled={isSubmitting}
              className="h-12 flex-1 rounded-full border-[2.5px] border-[#2D2D2D] bg-white px-5 text-base font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-shadow focus-visible:ring-4 focus-visible:ring-[#2D2D2D]/10 disabled:opacity-50"
              style={{ boxShadow: "2px 3px 0 rgba(0,0,0,0.06)" }}
              aria-label="Enter your nickname for the leaderboard"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmitScore();
              }}
            />
            <button
              onClick={handleSubmitScore}
              disabled={isSubmitting || !nickname.trim()}
              className="retro-btn-dark h-12 gap-1.5 px-5 text-base disabled:opacity-50"
              aria-label="Submit score"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Submit</span>
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            {nickname.trim().length}/30 characters
          </p>
        </div>

        {/* Skip to leaderboard */}
        <button
          onClick={handleViewLeaderboard}
          className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-[#2D2D2D]"
        >
          Skip — just show me the leaderboard
        </button>
      </div>
    );
  }

  // ── Render: Leaderboard Screen ────────────────────────────────────

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Compact Result Card */}
      <div
        ref={cardRef}
        className="flex w-full max-w-md flex-col items-center gap-4 rounded-[48px] border-4 border-gray-900 bg-white px-6 py-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(255,255,255,0.8)]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-[#FFF8E7]">
          <Trophy className="h-5 w-5 text-gray-700" />
        </div>

        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Your Time
          </p>
          <span className="text-4xl font-black tabular-nums text-gray-900">
            {elapsed}
          </span>
        </div>

        <h2 className="text-base font-bold uppercase tracking-wide text-gray-800">
          Challenge Complete!
        </h2>

        {/* Buttons (compact) */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={handleCopyImage}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-gray-800 px-4 py-2 text-xs font-bold text-gray-800 transition-transform hover:scale-105"
          >
            {imageCopied ? <Check className="h-3.5 w-3.5" /> : <Camera className="h-3.5 w-3.5" />}
            {imageCopied ? "Copied!" : "Copy Image"}
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-gray-800 px-4 py-2 text-xs font-bold text-gray-800 transition-transform hover:scale-105"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Share"}
          </button>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Play Again
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      {isLoadingLeaderboard && <LeaderboardLoading />}

      {leaderboardError && (
        <LeaderboardError onRetry={fetchLeaderboard} />
      )}

      {!isLoadingLeaderboard && !leaderboardError && (
        <Leaderboard
          entries={leaderboardEntries}
          currentUserEntryId={submissionResult?.entryId}
          currentUserRank={submissionResult?.rank}
        />
      )}
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { GameInput } from "./GameInput";
import { NameList } from "./NameList";
import { ProgressBar } from "./ProgressBar";
import { CompletionScreen } from "./CompletionScreen";
import { GameRules } from "./GameRules";
import { LiveLeaderboard } from "@/components/leaderboard/LiveLeaderboard";
import { MobileLeaderboardDialog } from "@/components/leaderboard/MobileLeaderboardDialog";
import { findDuplicate, clearSubmissionRecord } from "../_lib/storage";
import { GameState, ValidatedName } from "../_lib/types";
import { localLookup } from "../_lib/pokemon";
import { AlertCircle, Sparkles, Timer } from "lucide-react";
import config from "../_lib/config";

const TOTAL = config.targetCount;

const EMPTY_STATE: GameState = {
  startTime: 0,
  validatedNames: [],
  count: 0,
};

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ChallengeGame() {
  const [gameState, setGameState] = useState<GameState>(EMPTY_STATE);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hasCompleted = gameState.count >= TOTAL;

  // Live timer — starts on first input, stops on completion
  useEffect(() => {
    if (gameState.startTime > 0 && !hasCompleted) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - gameState.startTime) / 1000));
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.startTime, hasCompleted]);

  const handleAdd = useCallback(
    (name: string) => {
      setError(null);

      // --- Duplicate check (raw input) ---
      const duplicate = findDuplicate(gameState, name);
      if (duplicate) {
        const entry: ValidatedName = {
          input: name,
          valid: false,
        };
        setGameState((prev) => ({
          ...prev,
          startTime: prev.startTime === 0 ? Date.now() : prev.startTime,
          validatedNames: [...prev.validatedNames, entry],
        }));
        return;
      }

      // --- Local validation ---
      const result = localLookup(name);

      // --- Duplicate check (canonical form) ---
      // e.g. "NidoranM" and "Nidoran M" both resolve to "Nidoran M"
      if (result) {
        const canonicalDisplay = result.display.toLowerCase();
        const alreadyNamed = gameState.validatedNames.some(
          (n) => n.valid && n.display?.toLowerCase() === canonicalDisplay
        );
        if (alreadyNamed) {
          const entry: ValidatedName = {
            input: name,
            valid: false,
          };
          setGameState((prev) => ({
            ...prev,
            startTime: prev.startTime === 0 ? Date.now() : prev.startTime,
            validatedNames: [...prev.validatedNames, entry],
          }));
          return;
        }
      }

      const entry: ValidatedName = {
        input: name,
        valid: result !== null,
        reason: result ? undefined : "not_found",
        display: result?.display,
      };

      setGameState((prev) => {
        const newNames = [...prev.validatedNames, entry];
        const newCount = result ? prev.count + 1 : prev.count;
        const startTime =
          prev.startTime === 0 ? Date.now() : prev.startTime;

        return {
          startTime,
          validatedNames: newNames,
          count: newCount,
        };
      });
    },
    [gameState]
  );

  const handleRestart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState(EMPTY_STATE);
    setElapsed(0);
    setError(null);
    clearSubmissionRecord();
  }, []);

  // --- Completion Screen ---
  if (hasCompleted) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <CompletionScreen
          elapsedSeconds={elapsed}
          targetCount={TOTAL}
          challengeSlug="name-100-pokemon"
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // --- Main Game UI ---
  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-10 sm:py-14 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-0 lg:px-8">
      {/* Left: Game Rules (desktop only) */}
      <div className="hidden lg:block lg:sticky lg:top-24 lg:col-start-1 lg:justify-self-start lg:pl-4">
        <GameRules />
      </div>

      {/* Center: Game Content */}
      <div className="flex flex-col items-center gap-8 lg:col-start-2 lg:max-w-xl">
        {/* Header */}
        <div className="space-y-4 text-center">
          {/* Decorative icon row */}
          <div className="flex items-center justify-center gap-2" aria-hidden="true">
            <Sparkles className="h-4 w-4 text-[#FFCB05]/60" />
            <div className="retro-btn h-10 w-10 !rounded-xl text-lg">
              ⚡
            </div>
            <Sparkles className="h-4 w-4 text-[#FFCB05]/60" />
          </div>

          {/* Title with "Pokémon" highlighted */}
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-[#2D2D2D] sm:text-5xl">
            Name 100{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#FFCB05]">Pokémon</span>
              <span
                className="absolute bottom-0 left-0 z-0 h-[10px] w-full rounded-full bg-[#FFCB05]/20"
                aria-hidden="true"
              />
            </span>
            {" "}Challenge
          </h1>

          <p className="mx-auto max-w-md text-sm font-medium leading-relaxed text-muted-foreground">
            Gotta name 'em all! From Kanto to Paldea —{" "}
            <strong className="font-extrabold uppercase text-[#FFCB05]">
              test your Pokémon knowledge
            </strong>
            {" "}with instant local validation.
            <br className="hidden sm:block" />
            Type a Pokémon name and press Enter or click Add.
          </p>
        </div>

        {/* Mobile leaderboard dialog (mobile only) */}
        <MobileLeaderboardDialog challengeSlug="name-100-pokemon" />

        {/* Input */}
        <GameInput
          onAdd={handleAdd}
          disabled={false}
          hasCompleted={hasCompleted}
        />

        {/* Error Banner */}
        {error && (
          <div
            className="retro-card flex w-full max-w-xl items-center gap-2 bg-[#FFCB05]/30 px-5 py-3 text-sm font-bold text-[#2D2D2D]"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}

        {/* Progress + Timer */}
        <div className="w-full max-w-xl space-y-3">
          <ProgressBar current={gameState.count} total={TOTAL} />

          {/* Timer */}
          <div className="flex items-center justify-center">
            <div
              className={`inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#2D2D2D] bg-white px-5 py-2 transition-opacity ${
                gameState.startTime > 0 ? "opacity-100" : "opacity-40"
              }`}
              style={{ boxShadow: "2px 3px 0 rgba(0,0,0,0.06)" }}
              aria-label={`Elapsed time: ${formatTimer(elapsed)}`}
            >
              <Timer className="h-4 w-4 text-[#2D2D2D]" aria-hidden="true" />
              <span className="text-lg font-extrabold tabular-nums tracking-wide text-[#2D2D2D]">
                {formatTimer(elapsed)}
              </span>
            </div>
          </div>
        </div>

        {/* Name List */}
        <NameList names={gameState.validatedNames} />
      </div>

      {/* Right: Live Leaderboard (desktop only) */}
      <div className="hidden lg:block lg:sticky lg:top-24 lg:col-start-3 lg:justify-self-end lg:pr-0">
        <LiveLeaderboard challengeSlug="name-100-pokemon" />
      </div>
    </div>
  );
}

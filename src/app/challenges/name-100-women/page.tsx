"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { GameInput } from "./_components/GameInput";
import { NameList } from "./_components/NameList";
import { ProgressBar } from "./_components/ProgressBar";
import { CompletionScreen } from "./_components/CompletionScreen";
import { findDuplicate } from "./_lib/storage";
import { GameState, ValidateResponse, ValidatedName } from "./_lib/types";
import { AlertCircle, Timer } from "lucide-react";
import config from "./_lib/config";

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

export default function ChallengePage() {
  const [gameState, setGameState] = useState<GameState>(EMPTY_STATE);
  const [isChecking, setIsChecking] = useState(false);
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
    async (name: string) => {
      setError(null);

      // --- Duplicate check (frontend) ---
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

      // --- Validate via API ---
      setIsChecking(true);
      try {
        const res = await fetch(
          `/api/validate-name?q=${encodeURIComponent(name)}`
        );
        const data: ValidateResponse = await res.json();

        if (res.status === 429) {
          setError(
            `Rate limited. Please wait ${data.retryAfter ?? 10} seconds before trying again.`
          );
          return;
        }

        if (!res.ok || data.error) {
          setError(data.error || "Validation failed. Please try again.");
          return;
        }

        const entry: ValidatedName = {
          input: name,
          valid: data.valid,
          reason: data.reason,
          qid: data.qid,
        };

        setGameState((prev) => {
          const newNames = [...prev.validatedNames, entry];
          const newCount = data.valid ? prev.count + 1 : prev.count;
          const startTime =
            prev.startTime === 0 ? Date.now() : prev.startTime;

          return {
            startTime,
            validatedNames: newNames,
            count: newCount,
          };
        });
      } catch {
        setError(
          "Network error. Please check your connection and try again."
        );
      } finally {
        setIsChecking(false);
      }
    },
    [gameState]
  );

  const handleRestart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState(EMPTY_STATE);
    setElapsed(0);
    setError(null);
  }, []);

  // --- Completion Screen ---
  if (hasCompleted) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <CompletionScreen
          elapsedSeconds={elapsed}
          targetCount={TOTAL}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // --- Main Game UI ---
  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-[#2D2D2D] sm:text-5xl">
          Name 100 Women<br className="sm:hidden" /> Challenge
        </h1>
        <p className="mx-auto max-w-md text-sm font-medium text-muted-foreground">
          Name <strong className="font-extrabold uppercase text-[#2D2D2D]">100 famous women</strong> —
          real female public figures verified by Wikidata.
          Type a name and press Enter or click Add.
        </p>
      </div>

      {/* Input */}
      <GameInput
        onAdd={handleAdd}
        disabled={isChecking}
        hasCompleted={hasCompleted}
      />

      {/* Error Banner */}
      {error && (
        <div className="retro-card flex w-full max-w-xl items-center gap-2 bg-[#FF8FAB]/30 px-5 py-3 text-sm font-bold text-[#2D2D2D]">
          <AlertCircle className="h-4 w-4 shrink-0" />
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
          >
            <Timer className="h-4 w-4 text-[#2D2D2D]" />
            <span className="text-lg font-extrabold tabular-nums tracking-wide text-[#2D2D2D]">
              {formatTimer(elapsed)}
            </span>
          </div>
        </div>
      </div>

      {/* Name List */}
      <NameList names={gameState.validatedNames} />
    </div>
  );
}

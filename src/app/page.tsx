"use client";

import { useState, useCallback, useEffect } from "react";
import { GameInput } from "@/components/GameInput";
import { NameList } from "@/components/NameList";
import { ProgressBar } from "@/components/ProgressBar";
import { CompletionScreen } from "@/components/CompletionScreen";
import { loadGameState, saveGameState, clearGameState, findDuplicate } from "@/lib/storage";
import { GameState, ValidateResponse, ValidatedName } from "@/types";
import { AlertCircle } from "lucide-react";

const TOTAL = 100;

const EMPTY_STATE: GameState = {
  startTime: 0,
  validatedNames: [],
  count: 0,
};

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>(EMPTY_STATE);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hydrate from localStorage after mount (avoid SSR mismatch)
  useEffect(() => {
    setGameState(loadGameState());
    setIsHydrated(true);
  }, []);

  // Persist game state on every change (skip before hydration)
  useEffect(() => {
    if (isHydrated) {
      saveGameState(gameState);
    }
  }, [gameState, isHydrated]);

  const hasCompleted = gameState.count >= TOTAL;

  const handleAdd = useCallback(
    async (name: string) => {
      setError(null);

      // --- Duplicate check (frontend) ---
      const duplicate = findDuplicate(gameState, name);
      if (duplicate) {
        const entry: ValidatedName = {
          input: name,
          valid: false,
          // No reason = duplicate marker
        };
        setGameState((prev) => ({
          ...prev,
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
            prev.startTime === 0 && data.valid ? Date.now() : prev.startTime;

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
    clearGameState();
    setGameState({
      startTime: 0,
      validatedNames: [],
      count: 0,
    });
    setError(null);
  }, []);

  // --- Completion Screen ---
  if (hasCompleted) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <CompletionScreen
          startTime={gameState.startTime}
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

      {/* Progress */}
      <ProgressBar current={gameState.count} total={TOTAL} />

      {/* Name List */}
      <NameList names={gameState.validatedNames} />
    </div>
  );
}

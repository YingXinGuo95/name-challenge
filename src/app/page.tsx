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

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>(() => loadGameState());
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist game state on every change
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

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
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Name 100 Women Challenge
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Name <strong>100 famous women</strong> — real female public figures
          verified by Wikidata. Type a name and press Enter or click Add.
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
        <div className="flex w-full max-w-xl items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
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

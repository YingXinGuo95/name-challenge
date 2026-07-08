"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Share2, RotateCcw, Copy, Check } from "lucide-react";

interface CompletionScreenProps {
  startTime: number;
  onRestart: () => void;
}

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export function CompletionScreen({ startTime, onRestart }: CompletionScreenProps) {
  const [elapsed, setElapsed] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const endTime = Date.now();
    setElapsed(formatElapsed(endTime - startTime));
  }, [startTime]);

  function buildShareText(): string {
    const emoji = "🏆";
    const elapsedStr = formatElapsed(Date.now() - startTime);
    return `${emoji} I just named 100 famous women in ${elapsedStr}!\n\nCan you beat my score? Play Name 100 Women Challenge!`;
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

  return (
    <Card className="flex w-full max-w-xl flex-col items-center gap-6 p-8 text-center">
      <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-900/30">
        <Trophy className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          🎉 Challenge Complete!
        </h2>
        <p className="text-muted-foreground">
          You named <span className="font-semibold text-foreground">100 famous women</span>{" "}
          in{" "}
          <span className="font-semibold text-foreground">{elapsed}</span>.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={handleShare}
          size="lg"
          className="font-semibold"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="mr-2 h-4 w-4" />
              Share Result
            </>
          )}
        </Button>
        <Button
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="font-semibold"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Play Again
        </Button>
      </div>
    </Card>
  );
}

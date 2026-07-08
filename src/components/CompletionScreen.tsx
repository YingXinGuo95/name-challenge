"use client";

import { useEffect, useState } from "react";
import { Trophy, Share2, RotateCcw, Check } from "lucide-react";

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
    return `🏆 I just named 100 famous women in ${formatElapsed(Date.now() - startTime)}!\n\nCan you beat my score? Play Name 100 Women Challenge!`;
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
    <div className="retro-card flex w-full max-w-xl flex-col items-center gap-6 bg-white px-8 py-10 text-center">
      {/* Trophy icon in white rounded-square box with black border */}
      <div className="retro-btn h-16 w-16 !rounded-2xl">
        <Trophy className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#2D2D2D]">
          Challenge Complete!
        </h2>
        <p className="text-sm font-medium text-muted-foreground">
          You named{" "}
          <span className="font-extrabold uppercase text-[#2D2D2D]">100 famous women</span>{" "}
          in{" "}
          <span className="font-extrabold uppercase text-[#2D2D2D]">{elapsed}</span>.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={handleShare}
          className="retro-btn h-11 gap-2 px-5 text-sm"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Share Result
            </>
          )}
        </button>
        <button
          onClick={onRestart}
          className="retro-btn-dark h-11 gap-2 px-5 text-sm"
        >
          <RotateCcw className="h-4 w-4" />
          Play Again
        </button>
      </div>
    </div>
  );
}

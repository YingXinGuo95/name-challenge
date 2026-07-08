"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Trophy, Share2, RotateCcw, Check, Camera } from "lucide-react";
import { toBlob } from "html-to-image";
import confetti from "canvas-confetti";

interface CompletionScreenProps {
  elapsedSeconds: number;
  targetCount: number;
  onRestart: () => void;
}

function formatElapsed(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function CompletionScreen({
  elapsedSeconds,
  targetCount,
  onRestart,
}: CompletionScreenProps) {
  const [copied, setCopied] = useState(false);
  const [imageCopied, setImageCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const elapsed = formatElapsed(elapsedSeconds);

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

  function buildShareText(): string {
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

  return (
    <div
      ref={cardRef}
      className="flex w-full max-w-md flex-col items-center gap-6 rounded-[48px] border-4 border-gray-900 bg-white px-8 py-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.15),inset_0_4px_8px_rgba(255,255,255,0.8)]"
    >
      {/* Trophy icon — warm circular bg */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-[#FFF8E7]">
        <Trophy className="h-6 w-6 text-gray-700" />
      </div>

      {/* Time — hero focal point */}
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

        {/* Play Again — solid dark */}
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-gray-800"
        >
          <RotateCcw className="h-4 w-4" />
          Play Again
        </button>
      </div>
    </div>
  );
}

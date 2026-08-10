"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Trophy, X } from "lucide-react";
import { LiveLeaderboard } from "./LiveLeaderboard";

interface MobileLeaderboardDialogProps {
  challengeSlug: string;
}

/**
 * Mobile-only trigger button that opens the live leaderboard in a dialog.
 * Desktop keeps its sidebar layout — this button is hidden at `lg:` and up.
 */
export function MobileLeaderboardDialog({ challengeSlug }: MobileLeaderboardDialogProps) {
  const [open, setOpen] = useState(false);

  // Close on Escape + lock body scroll while the dialog is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile-only trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="lg:hidden inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-[#2D2D2D] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#2D2D2D] transition-all hover:bg-[#F5E6D3]/60"
        style={{ boxShadow: "2px 3px 0 rgba(0,0,0,0.06)" }}
      >
        <Trophy className="h-3.5 w-3.5" />
        Leaderboard
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Leaderboard"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D2D2D]/60 p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-sm overflow-hidden rounded-[28px] border-[2.5px] border-[#2D2D2D] bg-[#F5E6D3]/95 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-[2.5px] border-[#2D2D2D]/10 px-5 py-3">
                <span className="text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D]">
                  Leaderboard
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close leaderboard"
                  className="rounded-full p-1.5 text-[#2D2D2D]/60 transition-colors hover:bg-[#2D2D2D]/5 hover:text-[#2D2D2D]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[72vh] overflow-y-auto p-4">
                <LiveLeaderboard challengeSlug={challengeSlug} />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

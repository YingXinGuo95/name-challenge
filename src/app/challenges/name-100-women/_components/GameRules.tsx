"use client";

import { Info, CheckCircle, Ban, Timer, Target } from "lucide-react";
import config from "../_lib/config";

const TOTAL = config.targetCount;

const rules = [
  {
    icon: Target,
    label: "Goal",
    text: `Name ${TOTAL} famous women — real female public figures verified by Wikidata.`,
  },
  {
    icon: CheckCircle,
    label: "How to play",
    text: "Type a name and press Enter or click Add. Each valid name counts toward your total.",
  },
  {
    icon: Ban,
    label: "No duplicates",
    text: "Each name can only be used once. Duplicates won't count.",
  },
  {
    icon: Timer,
    label: "Timer",
    text: "The clock starts with your first submission. Try to finish as fast as you can!",
  },
];

export function GameRules() {
  return (
    <div className="flex w-[260px] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <Info className="h-4 w-4 text-[#2D2D2D]" />
        <h3 className="text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D]">
          How to Play
        </h3>
      </div>

      {/* Rules Card */}
      <div
        className="overflow-hidden rounded-[20px] border-[2.5px] border-[#2D2D2D] bg-white"
        style={{ boxShadow: "2px 4px 0 rgba(0,0,0,0.06)" }}
      >
        <ul className="divide-y-[2.5px] divide-[#2D2D2D]/10">
          {rules.map((rule) => (
            <li
              key={rule.label}
              className="flex gap-3 px-4 py-3"
            >
              <rule.icon
                className="mt-0.5 h-4 w-4 shrink-0 text-[#2D2D2D]/50"
                aria-hidden="true"
              />
              <div className="min-w-0 space-y-0.5">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#2D2D2D]/50">
                  {rule.label}
                </span>
                <p className="text-xs font-medium leading-relaxed text-[#2D2D2D]/75">
                  {rule.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tip */}
      <p className="text-[11px] font-medium leading-relaxed text-muted-foreground">
        <strong className="font-extrabold uppercase text-[#2D2D2D]/60">
          💡 Tip:
        </strong>{" "}
        Think across categories — scientists, artists, activists, athletes,
        writers, politicians, and more!
      </p>
    </div>
  );
}

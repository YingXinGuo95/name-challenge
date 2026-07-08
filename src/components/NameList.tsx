"use client";

import { ValidatedName } from "@/types";
import { Check, X, AlertTriangle } from "lucide-react";

interface NameListProps {
  names: ValidatedName[];
}

const CARD_COLORS = [
  "bg-white",
  "bg-[#FFE066]",
  "bg-[#6CB4EE]",
  "bg-[#FF8FAB]",
  "bg-[#5CC9C7]",
];

function getStatus(entry: ValidatedName): {
  icon: React.ReactNode;
  label: string;
} {
  if (!entry.valid && entry.reason === undefined) {
    return {
      icon: <AlertTriangle className="h-4 w-4" />,
      label: "dup",
    };
  }
  if (entry.valid) {
    return { icon: <Check className="h-4 w-4" />, label: "ok" };
  }
  return { icon: <X className="h-4 w-4" />, label: entry.reason?.replace("not_", "") ?? "no" };
}

export function NameList({ names }: NameListProps) {
  if (names.length === 0) {
    return (
      <div className="flex min-h-[200px] w-full max-w-xl items-center justify-center rounded-full border-[2.5px] border-dashed border-[#2D2D2D]/30 px-8 py-12">
        <p className="text-center text-sm font-medium text-muted-foreground">
          No names yet. Start typing a famous woman&apos;s name above!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl space-y-3">
      {names.map((entry, i) => {
        const { icon, label } = getStatus(entry);
        const bgColor = CARD_COLORS[i % CARD_COLORS.length];
        const rotation = i % 2 === 0 ? "rotate-[0.6deg]" : "-rotate-[0.4deg]";

        return (
          <div
            key={`${entry.input}-${i}`}
            className={`retro-card flex items-center gap-3 px-5 py-3 ${bgColor} ${rotation} transition-all duration-200 hover:rotate-0`}
          >
            <span className="flex-1 truncate text-base font-bold uppercase tracking-wide">
              {entry.input}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full border-[2px] border-[#2D2D2D] px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider ${
                entry.valid ? "bg-white text-[#2D2D2D]" : "bg-[#2D2D2D] text-white"
              }`}
            >
              {icon}
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

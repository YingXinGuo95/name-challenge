"use client";

import { ValidatedName } from "@/types";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface NameListProps {
  names: ValidatedName[];
}

const iconMap = {
  valid: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />,
  invalid: <XCircle className="h-5 w-5 shrink-0 text-red-500" />,
  duplicate: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />,
};

const bgMap = {
  valid: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800",
  invalid: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800",
  duplicate: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
};

function getEntryStyle(entry: ValidatedName): {
  icon: React.ReactNode;
  bg: string;
  text: string;
} {
  // Check if it's a duplicate (already in the list)
  if (!entry.valid && entry.reason === undefined) {
    return { icon: iconMap.duplicate, bg: bgMap.duplicate, text: "text-amber-700 dark:text-amber-300" };
  }
  if (entry.valid) {
    return { icon: iconMap.valid, bg: bgMap.valid, text: "text-emerald-700 dark:text-emerald-300" };
  }
  return { icon: iconMap.invalid, bg: bgMap.invalid, text: "text-red-700 dark:text-red-300" };
}

function getStatusLabel(entry: ValidatedName): string {
  if (!entry.valid && entry.reason === undefined) return "⚠️ Duplicate";
  if (entry.valid) return "✅ Valid";
  switch (entry.reason) {
    case "not_found":
      return "❌ Not found";
    case "not_human":
      return "❌ Not a person";
    case "not_female":
      return "❌ Not female";
    default:
      return "❌ Invalid";
  }
}

export function NameList({ names }: NameListProps) {
  if (names.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 p-8">
        <p className="text-center text-sm text-muted-foreground">
          No names yet. Start typing a famous woman&apos;s name above!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl space-y-2">
      {names.map((entry, i) => {
        const style = getEntryStyle(entry);
        return (
          <div
            key={`${entry.input}-${i}`}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-200 ${style.bg}`}
          >
            {style.icon}
            <span className={`flex-1 font-medium ${style.text}`}>{entry.input}</span>
            <span className={`text-xs font-semibold ${style.text}`}>
              {getStatusLabel(entry)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

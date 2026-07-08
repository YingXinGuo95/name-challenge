"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full max-w-xl space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold tabular-nums">
          <span className="text-primary">{current}</span>
          <span className="text-muted-foreground"> / {total}</span>
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {percentage}%
        </span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Progress: ${current} of ${total} women named`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

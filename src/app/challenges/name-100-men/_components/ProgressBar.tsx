"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full max-w-xl space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold tabular-nums text-[#2D2D2D]">
            {current}
          </span>
          <span className="text-lg font-bold text-muted-foreground">
            / {total}
          </span>
        </div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
          {percentage}% done
        </span>
      </div>
      <div
        className="retro-card h-4 w-full overflow-hidden bg-white"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Progress: ${current} of ${total} men named`}
      >
        <div
          className="h-full rounded-full bg-[#2D2D2D] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

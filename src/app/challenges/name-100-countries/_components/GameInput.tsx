"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";

interface GameInputProps {
  onAdd: (name: string) => void;
  disabled?: boolean;
  hasCompleted?: boolean;
}

export function GameInput({ onAdd, disabled = false, hasCompleted = false }: GameInputProps) {
  const [value, setValue] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = disabled || hasCompleted;

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }
    onAdd(trimmed);
    setValue("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="flex w-full max-w-xl gap-3">
      <div className={`flex-1 ${isShaking ? "animate-shake" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., France"
          disabled={isDisabled}
          maxLength={200}
          className="h-12 w-full rounded-full border-[2.5px] border-[#2D2D2D] bg-white px-5 text-base font-medium text-foreground placeholder:text-muted-foreground/50 outline-none transition-shadow focus-visible:ring-4 focus-visible:ring-[#2D2D2D]/10 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ boxShadow: "2px 3px 0 rgba(0,0,0,0.06)" }}
          aria-label="Enter a country name"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isDisabled || !value.trim()}
        className="retro-btn h-12 gap-1.5 px-5 text-base disabled:opacity-50"
        aria-label="Add country"
      >
        <Send className="h-4 w-4" />
        <span className="hidden sm:inline">Add</span>
      </button>
    </div>
  );
}

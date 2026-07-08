"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";

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
    <div className="flex w-full max-w-xl gap-2">
      <div className={`flex-1 ${isShaking ? "animate-shake" : ""}`}>
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Emma Watson"
          disabled={isDisabled}
          maxLength={200}
          className="h-12 text-base"
          aria-label="Enter a famous woman's name"
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={isDisabled || !value.trim()}
        className="h-12 px-6 text-base font-semibold"
        size="lg"
      >
        {disabled ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        Add
      </Button>
    </div>
  );
}

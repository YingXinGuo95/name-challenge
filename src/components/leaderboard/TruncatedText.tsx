"use client";

import { useRef, useState, useEffect } from "react";

interface TruncatedTextProps {
  text: string;
  /** Applied to the root span. Callers should include `flex-1` when used in a flex row. */
  className?: string;
}

/**
 * Text that truncates with an ellipsis, and shows a retro tooltip bubble with
 * the full text on hover — but only when the text is actually clipped.
 *
 * Truncation is detected by comparing the inner span's scrollWidth to its
 * clientWidth; a ResizeObserver re-checks when the container resizes.
 */
export function TruncatedText({ text, className = "" }: TruncatedTextProps) {
  const innerRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const check = () => {
      if (innerRef.current) {
        setIsTruncated(innerRef.current.scrollWidth > innerRef.current.clientWidth + 1);
      }
    };
    check();

    // Re-check when the element resizes (font load, window resize, layout changes).
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(check);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [text]);

  return (
    <span
      className={`relative min-w-0 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <span ref={innerRef} className="block truncate">
        {text}
      </span>

      {isHovered && isTruncated && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 max-w-xs whitespace-normal rounded-xl border-2 border-[#2D2D2D] bg-white px-3 py-1.5 text-xs font-medium leading-relaxed text-[#2D2D2D] shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        >
          {text}
          {/* Small downward arrow */}
          <span
            className="absolute left-4 top-full h-2 w-2 -translate-y-1 rotate-45 border-b-2 border-r-2 border-[#2D2D2D] bg-white"
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  );
}

"use client";

import { useCallback } from "react";
import { ArrowRight } from "lucide-react";

export function ScrollToChallenges() {
  const handleClick = useCallback(() => {
    const section = document.getElementById("challenges");
    if (!section) return;

    // Smooth scroll to cards
    section.scrollIntoView({ behavior: "smooth", block: "center" });

    // Trigger shake on cards after scroll completes (~600ms)
    setTimeout(() => {
      const cards = section.querySelectorAll<HTMLElement>("a[href^='/challenges/']");
      cards.forEach((card) => {
        card.classList.add("animate-shake");
        card.addEventListener(
          "animationend",
          () => card.classList.remove("animate-shake"),
          { once: true }
        );
      });
    }, 600);
  }, []);

  return (
    <button
      onClick={handleClick}
      className="retro-btn-dark relative h-11 gap-2 px-6 text-sm font-extrabold uppercase tracking-wider"
    >
      Start Playing
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

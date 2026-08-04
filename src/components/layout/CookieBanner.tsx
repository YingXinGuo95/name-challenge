"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    const value = accepted ? "granted" : "denied";
    localStorage.setItem("cookieConsent", value);
    setIsVisible(false);

    // Update Google Analytics / AdSense consent if window.gtag exists
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        ad_storage: value,
        analytics_storage: value,
        ad_user_data: value,
        ad_personalization: value,
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-banner"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t-[2.5px] border-[#2D2D2D] bg-[#1E1E1E] p-4 text-white shadow-2xl transition-all duration-300"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-start gap-3 sm:items-center">
          <div className="retro-btn h-9 w-9 shrink-0 !rounded-lg text-lg text-[#2D2D2D]">
            <Cookie className="h-4 w-4 text-[#FF8FAB]" />
          </div>
          <p className="text-xs font-medium leading-relaxed text-[#E0E0E0]">
            We use cookies to personalize ads, analyze traffic, and enhance your game experience. Learn more in our{" "}
            <Link
              href="/privacy"
              className="font-bold text-[#60A5FA] underline underline-offset-2 hover:text-white"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => handleConsent(false)}
            className="w-1/2 sm:w-auto rounded-xl border-[2.5px] border-[#444] bg-transparent px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#CCC] transition-all hover:border-[#666] hover:text-white active:scale-95"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="w-1/2 sm:w-auto rounded-xl border-[2.5px] border-[#2D2D2D] bg-[#3B82F6] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white shadow-[2px_3px_0_rgba(0,0,0,0.3)] transition-all hover:bg-[#2563EB] active:scale-95"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

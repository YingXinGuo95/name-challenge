import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[2.5px] border-[#2D2D2D] bg-[#F5E6D3]/95 backdrop-blur supports-[backdrop-filter]:bg-[#F5E6D3]/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Name 100 Challenge — Home">
          <div className="relative">
            <div className="retro-btn h-9 w-9 !rounded-lg text-xs font-extrabold" aria-hidden="true">
              100
            </div>
            <Sparkles className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 text-[#FF8FAB]" aria-hidden="true" />
          </div>
          <span className="text-base font-extrabold uppercase tracking-tight text-[#2D2D2D]">
            Name 100 Challenge
          </span>
        </Link>
        <nav className="flex items-center gap-3" aria-label="Main navigation">
          <Link
            href="/"
            className="retro-btn h-8 gap-1 px-3 text-[11px] font-extrabold uppercase tracking-wider"
          >
            Play
          </Link>
        </nav>
      </div>
    </header>
  );
}

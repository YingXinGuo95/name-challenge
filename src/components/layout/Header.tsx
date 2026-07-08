"use client";

import Link from "next/link";
import { AuthHeaderSlot } from "@/components/auth/AuthHeaderSlot";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            T
          </div>
          <span className="text-lg font-bold tracking-tight">ToolShelf</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/#tools"
            className="hover:text-foreground transition-colors"
          >
            Tools
          </Link>
          <AuthHeaderSlot />
        </nav>
      </div>
    </header>
  );
}

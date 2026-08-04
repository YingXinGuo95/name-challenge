import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-[2.5px] border-[#2D2D2D] bg-[#F5E6D3]">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-8">
        {/* Navigation Links */}
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider text-[#2D2D2D]"
          aria-label="Footer Navigation"
        >
          <Link href="/about" className="hover:text-[#FF8FAB] transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-[#FF8FAB] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#FF8FAB] transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-[#FF8FAB] transition-colors">
            Contact
          </Link>
        </nav>

        <div className="text-center space-y-1">
          <p className="text-xs font-medium text-muted-foreground">
            Data sourced from{" "}
            <a
              href="https://www.wikidata.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold uppercase underline decoration-[#2D2D2D] underline-offset-2 hover:text-[#2D2D2D]"
              aria-label="Wikidata — free and open knowledge base"
            >
              Wikidata
            </a>
            . Licensed under CC0.
          </p>
          <p className="text-[11px] font-medium text-muted-foreground/70">
            © {new Date().getFullYear()} Name 100 Challenge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


export function Footer() {
  return (
    <footer className="border-t-[2.5px] border-[#2D2D2D] bg-[#F5E6D3]">
      <div className="container mx-auto flex flex-col items-center gap-5 px-4 py-8">
        {/* Icon row — matching the design brief's bottom bar aesthetic */}
        <div className="flex items-center gap-3">
          {[
            { label: "Home", href: "/" },
            { label: "GitHub", href: "https://github.com" },
            { label: "Share", href: "#" },
            { label: "About", href: "#" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="retro-btn h-10 w-10 !rounded-xl text-[10px] font-extrabold uppercase tracking-wider"
              aria-label={label}
            >
              {label.slice(0, 1)}
            </a>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs font-medium text-muted-foreground">
            Data sourced from{" "}
            <a
              href="https://www.wikidata.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-extrabold uppercase underline decoration-[#2D2D2D] underline-offset-2 hover:text-[#2D2D2D]"
            >
              Wikidata
            </a>
            . Licensed under CC0.
          </p>
          <p className="mt-1 text-[11px] font-medium text-muted-foreground/70">
            © {new Date().getFullYear()} Name 100 Women Challenge
          </p>
        </div>
      </div>
    </footer>
  );
}

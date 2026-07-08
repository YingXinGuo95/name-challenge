export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-semibold">Name 100 Women</h3>
            <p className="text-xs text-muted-foreground">
              A fun challenge — name 100 famous women verified by Wikidata.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">About</h3>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, Tailwind CSS, and the Wikidata SPARQL API.
              All names are verified against public Wikidata records.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>
            Data sourced from{" "}
            <a
              href="https://www.wikidata.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Wikidata
            </a>
            . Licensed under CC0.
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} Name 100 Women Challenge.
          </p>
        </div>
      </div>
    </footer>
  );
}

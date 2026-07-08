import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-semibold">ToolShelf</h3>
            <p className="text-xs text-muted-foreground">
              A starter template for shipping small, self-contained browser
              tools.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Links</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#tools" className="hover:text-foreground transition-colors">
                  Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">About</h3>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, shadcn/ui, and Tailwind CSS. Use it as a
              starting point for your own collection of utilities.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>
            Disclaimer: This is a starter template. The included tools are
            placeholders — replace them with your own implementations.
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} ToolShelf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

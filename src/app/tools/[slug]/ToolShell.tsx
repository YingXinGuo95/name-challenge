"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ToolShellProps {
  title: string;
  description: string;
  thumbnailHtml: string;
}

export function ToolShell({
  title,
  description,
  thumbnailHtml,
}: ToolShellProps) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{title}</span>
      </div>

      {/* Title */}
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mb-8 text-muted-foreground">{description}</p>

      {/* Interactive Area */}
      <div className="mb-8 overflow-hidden rounded-xl border bg-card">
        <div className="aspect-video w-full bg-muted flex items-center justify-center">
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: thumbnailHtml }}
          />
        </div>

        {/* Control Panel Placeholder */}
        <div className="border-t bg-muted/30 p-4">
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            Control Panel
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount((c) => c + 1)}
            >
              Click count: {count}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCount(0)}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Notes */}
      <Collapsible
        open={notesOpen}
        onOpenChange={setNotesOpen}
        className="rounded-xl border"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-sm font-medium hover:bg-muted/50 transition-colors cursor-pointer">
          <span>About this tool</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              notesOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t p-4 text-sm text-muted-foreground">
          <h4 className="mb-2 font-semibold text-foreground">Overview</h4>
          <p className="mb-4">
            This is a starter tool page. Replace the contents of{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              app/tools/[slug]/ToolShell.tsx
            </code>{" "}
            with the actual interactive implementation for this tool.
          </p>
          <h4 className="mb-2 font-semibold text-foreground">How to extend</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li>Add the tool entry to <code className="rounded bg-muted px-1 py-0.5 text-xs">data/tools.ts</code>.</li>
            <li>Add matching content in <code className="rounded bg-muted px-1 py-0.5 text-xs">app/tools/[slug]/page.tsx</code>.</li>
            <li>Implement the interactive UI inside <code className="rounded bg-muted px-1 py-0.5 text-xs">ToolShell</code>.</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

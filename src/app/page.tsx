import type { Metadata } from "next";
import Link from "next/link";
import challenges from "@/data/challenges";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center gap-12 px-4 py-12 sm:py-16">
      {/* Hero */}
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-[#2D2D2D] sm:text-5xl">
          Name 100<br className="sm:hidden" /> Challenge
        </h1>
        <p className="mx-auto max-w-lg text-sm font-medium text-muted-foreground">
          A series of naming challenges — how many famous names can you recall?
          Each challenge is verified against Wikidata so you know it counts.
        </p>
      </div>

      {/* Challenge Cards */}
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {challenges.map((challenge, i) => {
          const rotation = i % 2 === 0 ? "rotate-[0.6deg]" : "-rotate-[0.4deg]";

          return (
            <Link
              key={challenge.slug}
              href={`/challenges/${challenge.slug}`}
              className={`rounded-3xl border-[2.5px] border-[#2D2D2D] ${challenge.color} group flex flex-col gap-4 p-6 ${rotation} transition-all duration-200 hover:rotate-0 hover:scale-[1.02]`}
              style={{ boxShadow: "2px 4px 0 rgba(0,0,0,0.08)" }}
            >
              {/* Emoji badge */}
              <div className="retro-btn h-12 w-12 !rounded-2xl text-2xl">
                {challenge.emoji}
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <h2 className="text-lg font-extrabold uppercase tracking-tight text-[#2D2D2D]">
                  {challenge.title}
                </h2>
                <p className="text-xs font-medium leading-relaxed text-[#2D2D2D]/60">
                  {challenge.description}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-auto flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2D2D2D]">
                Play
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Coming soon teaser */}
      <div className="flex min-h-[80px] w-full max-w-2xl items-center justify-center rounded-full border-[2.5px] border-dashed border-[#2D2D2D]/25 px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
          More challenges coming soon
        </p>
      </div>
    </div>
  );
}

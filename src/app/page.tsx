import type { Metadata } from "next";
import Link from "next/link";
import challenges from "@/data/challenges";
import { ArrowRight, Database, Timer, Trophy, Sparkles } from "lucide-react";

const homeTitle = "Name 100 Challenge — Fun Naming Games Verified by Wikidata";
const homeDescription =
  "How many famous names can you recall? A fun naming challenge verified by Wikidata — type a name and see if it counts. Free to play, no sign-up required.";

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    type: "website",
    siteName: "Name 100 Challenge",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Name 100 Challenge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/og-image.png"],
  },
};

const features = [
  {
    icon: Database,
    label: "Wikidata Verified",
    text: "Every answer is checked against Wikidata — if it counts, it's real.",
  },
  {
    icon: Timer,
    label: "Race the Clock",
    text: "The timer starts with your first guess. Can you beat the best time?",
  },
  {
    icon: Trophy,
    label: "Leaderboard",
    text: "Complete a challenge to claim your spot. Come back and defend it.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative flex w-full flex-col items-center gap-8 overflow-hidden px-4 pb-12 pt-16 sm:pt-24">
        {/* Decorative background blobs */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#FF8FAB]/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-16 right-1/4 hidden h-48 w-48 rounded-full bg-[#FF8FAB]/8 blur-2xl sm:block"
          aria-hidden="true"
        />

        {/* Badge */}
        <div className="relative">
          <div
            className="retro-btn mx-auto h-16 w-16 !rounded-2xl text-2xl"
            aria-hidden="true"
          >
            100
          </div>
          <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-[#FF8FAB]" aria-hidden="true" />
        </div>

        {/* Title */}
        <div className="relative space-y-4 text-center">
          <h1 className="text-5xl font-extrabold uppercase tracking-tight text-[#2D2D2D] sm:text-6xl">
            Name 100<br className="sm:hidden" /> Challenge
          </h1>
          <p className="text-sm font-bold uppercase tracking-wider text-[#FF8FAB]">
            Fun Naming Games Verified by Wikidata
          </p>
          <p className="mx-auto max-w-lg text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
            How many famous names can you recall?{" "}
            <span className="whitespace-nowrap">A series of</span>{" "}
            <strong className="font-extrabold uppercase text-[#2D2D2D]">
              naming challenges
            </strong>{" "}
            verified against Wikidata — type a name and see if it counts.
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/challenges/${challenges[0]?.slug ?? ""}`}
          className="retro-btn-dark relative h-11 gap-2 px-6 text-sm font-extrabold uppercase tracking-wider"
        >
          Start Playing
          <ArrowRight className="h-4 w-4" />
        </Link>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 pt-2" aria-hidden="true">
          <div className="h-[2.5px] w-8 rounded-full bg-[#2D2D2D]/20" />
          <div className="h-2 w-2 rounded-full border-[2.5px] border-[#2D2D2D]/30" />
          <div className="h-[2.5px] w-16 rounded-full bg-[#2D2D2D]/20" />
          <div className="h-2 w-2 rounded-full border-[2.5px] border-[#2D2D2D]/30" />
          <div className="h-[2.5px] w-8 rounded-full bg-[#2D2D2D]/20" />
        </div>
      </section>

      {/* ── Challenge Cards ─────────────────────────────────────── */}
      <section className="w-full px-4 pb-16">
        <div className="mx-auto grid w-full max-w-4xl gap-5 sm:grid-cols-3">
          {challenges.map((challenge, i) => {
            const rotation =
              i % 2 === 0 ? "rotate-[0.8deg]" : "-rotate-[0.6deg]";

            return (
              <Link
                key={challenge.slug}
                href={`/challenges/${challenge.slug}`}
                className={`group relative flex flex-col gap-5 overflow-hidden rounded-3xl border-[2.5px] border-[#2D2D2D] p-6 ${rotation} transition-all duration-300 hover:rotate-0 hover:scale-[1.03] ${challenge.color}`}
                style={{ boxShadow: "3px 5px 0 rgba(0,0,0,0.1)" }}
              >
                {/* Card inner decoration */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/15"
                  aria-hidden="true"
                />

                {/* Emoji badge */}
                <div className="retro-btn relative h-12 w-12 !rounded-2xl text-2xl">
                  {challenge.emoji}
                </div>

                {/* Content */}
                <div className="relative space-y-1.5">
                  <h2 className="text-lg font-extrabold uppercase tracking-tight text-[#2D2D2D]">
                    {challenge.title}
                  </h2>
                  <p className="text-xs font-medium leading-relaxed text-[#2D2D2D]/60">
                    {challenge.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="relative mt-auto flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#2D2D2D]">
                  Play Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}

          {/* Coming soon placeholder card */}
          <div
            className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-3xl border-[2.5px] border-dashed border-[#2D2D2D]/25 bg-white/30 -rotate-[0.3deg] px-6 py-10 text-center"
            style={{ boxShadow: "2px 4px 0 rgba(0,0,0,0.04)" }}
          >
            <div className="retro-btn h-10 w-10 !rounded-xl text-lg opacity-40">
              ?
            </div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground/50">
              More Challenges
              <br />
              Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section className="w-full pb-20">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-1.5 px-4">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-4 rounded-2xl border-[2.5px] border-transparent px-4 py-3.5 transition-colors hover:border-[#2D2D2D]/10 hover:bg-white/40"
            >
              <div
                className="retro-btn h-10 w-10 shrink-0 !rounded-xl"
                aria-hidden="true"
              >
                <feature.icon className="h-4 w-4 text-[#2D2D2D]/70" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="block text-xs font-extrabold uppercase tracking-wider text-[#2D2D2D]">
                  {feature.label}
                </span>
                <p className="text-xs font-medium leading-relaxed text-muted-foreground">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ──────────────────────────────────────────── */}
      <section className="w-full pb-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4">
          {/* Divider */}
          <div
            className="h-[2.5px] w-full rounded-full bg-[#2D2D2D]/10"
            aria-hidden="true"
          />

          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
            Data sourced from{" "}
            <a
              href="https://www.wikidata.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#2D2D2D]/30 underline-offset-2 transition-colors hover:text-[#2D2D2D] hover:decoration-[#2D2D2D]"
            >
              Wikidata
            </a>
            {" "}· Licensed under CC0 · Free to Play
          </p>
        </div>
      </section>
    </div>
  );
}

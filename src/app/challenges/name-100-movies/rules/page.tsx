import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import challenges from "@/data/challenges";
import config from "../_lib/config";
import {
  Target,
  CheckCircle,
  Ban,
  Timer,
  Database,
  Lightbulb,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Film,
} from "lucide-react";

const challenge = challenges.find((c) => c.slug === "name-100-movies");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-movies/rules`;

const pageTitle = "Name 100 Movies Challenge Rules — How to Play & Tips";
const pageDescription =
  "Learn the rules of the Name 100 Movies Challenge. Discover how Wikidata movie validation works, get tips to recall more films, and find answers to common questions. Free to play.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-movies/rules",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: pageUrl,
    siteName: "Name 100 Challenge",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Name 100 Movies Challenge Rules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${siteUrl}/og-image.png`],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Name 100 Movies Challenge",
      item: `${siteUrl}/challenges/name-100-movies`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Rules",
      item: pageUrl,
    },
  ],
};

export default function RulesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#2D2D2D]/50"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#9333EA] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/challenges/name-100-movies" className="hover:text-[#9333EA] transition-colors">
            Name 100 Movies
          </Link>
          <span>/</span>
          <span className="text-[#2D2D2D]/70">Rules</span>
        </nav>

        {/* Hero Header */}
        <div className="mb-10 space-y-4 rounded-3xl border-[2.5px] border-[#2D2D2D] bg-white p-6 sm:p-10 shadow-[3px_5px_0_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-3">
            <div className="retro-btn h-12 w-12 !rounded-2xl text-2xl bg-[#9333EA]/10">
              🎬
            </div>
            <div>
              <h1 className="text-2xl font-extrabold uppercase tracking-tight text-[#2D2D2D] sm:text-3xl">
                Name 100 Movies Rules
              </h1>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9333EA]">
                Complete Guide & Verification Rules
              </p>
            </div>
          </div>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground">
            The goal is simple: name <strong>{config.targetCount} famous movies</strong> as fast as you can. Every submission is validated against Wikidata's film knowledge base in real time!
          </p>
        </div>

        <div className="space-y-8">
          {/* Objective */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <Target className="h-5 w-5 text-[#9333EA]" />
              Objective & Scoring
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm font-medium text-muted-foreground">
              <li>Name 100 valid movies to complete the challenge.</li>
              <li>Your total time is tracked from your first valid submission until you hit 100.</li>
              <li>Complete the challenge to submit your time to the global leaderboard!</li>
            </ul>
          </section>

          {/* Validation */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <Database className="h-5 w-5 text-[#5B9BD5]" />
              Wikidata Film Verification
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              We query Wikidata to ensure your answer corresponds to a recognized film (Q11424 or subclass):
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-xs font-medium pt-2">
              <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-3 text-emerald-900">
                <strong className="block uppercase font-black text-emerald-700 mb-1">
                  ✓ What Counts:
                </strong>
                Feature films, animated movies, television movies, short films, and blockbusters.
              </div>
              <div className="rounded-xl border border-red-300 bg-red-50/60 p-3 text-red-900">
                <strong className="block uppercase font-black text-red-700 mb-1">
                  ✗ What Fails:
                </strong>
                TV series, books, video games, actors, or unreleased draft titles.
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-2xl border-[2.5px] border-[#2D2D2D] bg-[#9333EA]/10 p-6 text-center space-y-3">
            <h3 className="text-lg font-extrabold uppercase text-[#2D2D2D]">
              Ready to test your film knowledge?
            </h3>
            <Link
              href="/challenges/name-100-movies"
              className="retro-btn-dark inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider text-white bg-[#9333EA]"
            >
              Start Movie Challenge
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

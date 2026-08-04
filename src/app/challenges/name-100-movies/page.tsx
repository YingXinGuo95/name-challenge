import type { Metadata } from "next";
import Link from "next/link";
import { ChallengeGame } from "./_components/ChallengeGame";
import { JsonLd } from "@/components/layout/JsonLd";
import challenges from "@/data/challenges";
import config from "./_lib/config";

const challenge = challenges.find((c) => c.slug === "name-100-movies");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-movies`;

// ── Metadata (OG / Twitter / Canonical) ────────────────────────────

const pageTitle = "Name 100 Movies Challenge — How Many Films Can You Recall?";
const pageDescription =
  "Can you name 100 famous movies? Test your knowledge with this free Wikidata-verified quiz. From Oscar winners to sci-fi classics — how many can you recall?";

export const metadata: Metadata = {
  title: challenge?.title ?? "Name 100 Movies Challenge",
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-movies",
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
        alt: "Name 100 Movies Challenge",
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

// ── Structured Data ─────────────────────────────────────────────────

const gameSchema = {
  "@context": "https://schema.org",
  "@type": "Game",
  name: "Name 100 Movies Challenge",
  description:
    "A trivia challenge to name 100 famous movies — verified by Wikidata film records.",
  url: pageUrl,
  playMode: "SinglePlayer",
  applicationCategory: "GameApplication",
  gamePlatform: "Web",
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: 10,
  },
  ...(challenge && {
    about: {
      "@type": "Thing",
      name: challenge.title,
      description: challenge.description,
    },
  }),
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
      item: pageUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I play Name 100 Movies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type a movie title and press Enter or click Add. Each valid movie counts toward your total of ${config.targetCount}. No duplicates allowed.`,
      },
    },
    {
      "@type": "Question",
      name: "What movies are accepted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All movie titles are verified against Wikidata. If the title matches a real film recorded in Wikidata — from blockbusters to cult classics — it counts.",
      },
    },
    {
      "@type": "Question",
      name: "Does the timer start automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the timer starts with your first submission. Try to finish as fast as you can!",
      },
    },
  ],
};

export default function ChallengePage() {
  return (
    <>
      <JsonLd data={gameSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <nav
        className="mx-auto flex w-full max-w-7xl items-center gap-1.5 px-4 pt-5 text-[11px] font-extrabold uppercase tracking-wider text-[#2D2D2D]/50"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-[#9333EA] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#2D2D2D]/70">Name 100 Movies</span>
      </nav>

      <ChallengeGame />
    </>
  );
}

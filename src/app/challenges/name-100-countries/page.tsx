import type { Metadata } from "next";
import Link from "next/link";
import { ChallengeGame } from "./_components/ChallengeGame";
import { JsonLd } from "@/components/layout/JsonLd";
import challenges from "@/data/challenges";
import config from "./_lib/config";

const challenge = challenges.find((c) => c.slug === "name-100-countries");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-countries`;

// ── Metadata (OG / Twitter / Canonical) ────────────────────────────

const pageTitle = "Name 100 Countries Challenge — How Many Can You Name?";
const pageDescription =
  "Can you name 100 countries? Test your geography knowledge with instant local validation. From every continent — how many countries can you recall?";

export const metadata: Metadata = {
  title: challenge?.title ?? "Name 100 Countries Challenge",
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-countries",
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
        alt: "Name 100 Countries Challenge",
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
  name: "Name 100 Countries Challenge",
  description:
    "A geography challenge to name 100 countries — verified against a local dataset of world nations and territories.",
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
      name: "Name 100 Countries Challenge",
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
      name: "How do I play Name 100 Countries?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type a country name and press Enter or click Add. Each valid country counts toward your total of ${config.targetCount}. No duplicates allowed. Validation is instant and local — no network requests needed.`,
      },
    },
    {
      "@type": "Question",
      name: "What countries are accepted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All 193 UN member states are included, plus observer states, widely-recognized territories, and dependencies. Common alternative names and abbreviations are also accepted (e.g., USA for United States, UK for United Kingdom).",
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
        <Link href="/" className="hover:text-[#4CAF50] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#2D2D2D]/70">Name 100 Countries</span>
      </nav>

      <ChallengeGame />
    </>
  );
}

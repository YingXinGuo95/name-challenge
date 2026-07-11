import type { Metadata } from "next";
import { ChallengeGame } from "./_components/ChallengeGame";
import { JsonLd } from "@/components/layout/JsonLd";
import challenges from "@/data/challenges";
import config from "./_lib/config";

const challenge = challenges.find((c) => c.slug === "name-100-men");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-men`;

// ── Metadata (OG / Twitter / Canonical) ────────────────────────────

const pageTitle = "Name 100 Men Challenge — How Many Can You Name?";
const pageDescription =
  "Can you name 100 famous men? Test your knowledge with this free Wikidata-verified quiz. Scientists, artists, leaders & athletes — how many can you recall?";

export const metadata: Metadata = {
  title: challenge?.title ?? "Name 100 Men Challenge",
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-men",
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
        alt: "Name 100 Men Challenge",
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
  name: "Name 100 Men Challenge",
  description:
    "A trivia challenge to name 100 famous men — real male public figures verified by Wikidata.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I play Name 100 Men?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type a name and press Enter or click Add. Each valid name counts toward your total of ${config.targetCount}. No duplicates allowed.`,
      },
    },
    {
      "@type": "Question",
      name: "What names are accepted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All names are verified against Wikidata. If the person is a real male public figure recorded in Wikidata, it counts.",
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
      <ChallengeGame />
    </>
  );
}

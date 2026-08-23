import type { Metadata } from "next";
import Link from "next/link";
import { ChallengeGame } from "./_components/ChallengeGame";
import { JsonLd } from "@/components/layout/JsonLd";
import challenges from "@/data/challenges";
import config from "./_lib/config";

const challenge = challenges.find((c) => c.slug === "name-100-food");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-food`;

// ── Metadata (OG / Twitter / Canonical) ────────────────────────────

const pageTitle = "Name 100 Food Challenge — How Many Foods Can You Name?";
const pageDescription =
  "Can you name 100 foods? Test your knowledge of everything edible — fruits, vegetables, meat, seafood, dishes, desserts & drinks. Free to play, no sign-up required.";

export const metadata: Metadata = {
  title: challenge?.title ?? "Name 100 Food Challenge",
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-food",
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
        alt: "Name 100 Food Challenge",
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
  name: "Name 100 Food Challenge",
  description:
    "A trivia challenge to name 100 foods — everything edible, verified by Wikidata and a curated food dataset.",
  url: pageUrl,
  playMode: "SinglePlayer",
  applicationCategory: "GameApplication",
  gamePlatform: "Web",
  audience: {
    "@type": "PeopleAudience",
    suggestedMinAge: 8,
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
      name: "Name 100 Food Challenge",
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
      name: "How do I play Name 100 Food?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type a food name and press Enter or click Add. Each valid food counts toward your total of ${config.targetCount}. No duplicates allowed — common synonyms like "eggplant" and "aubergine" count as the same food.`,
      },
    },
    {
      "@type": "Question",
      name: "What foods are accepted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anything edible counts — fruits, vegetables, meats, seafood, grains, dairy, baked goods, desserts, snacks, drinks, dishes, and condiments. Names are checked against a curated food dataset and Wikidata.",
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
        <Link href="/" className="hover:text-[#E63946] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#2D2D2D]/70">Name 100 Food</span>
      </nav>

      <ChallengeGame />
    </>
  );
}

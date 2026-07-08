import type { Metadata } from "next";
import { ChallengeGame } from "./_components/ChallengeGame";
import { JsonLd } from "@/components/layout/JsonLd";
import challenges from "@/data/challenges";

const challenge = challenges.find((c) => c.slug === "name-100-women");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://100-name-challenge.vercel.app";
const pageUrl = `${siteUrl}/challenges/name-100-women`;

export const metadata: Metadata = {
  title: challenge?.title ?? "Name 100 Women Challenge",
  description:
    challenge?.description ??
    "Name 100 famous women — real female public figures verified by Wikidata. From scientists to artists, activists to athletes.",
  alternates: {
    canonical: "/challenges/name-100-women",
  },
  openGraph: {
    title: challenge?.title ?? "Name 100 Women Challenge",
    description:
      challenge?.description ??
      "Can you name 100 famous women? A fun naming challenge verified by Wikidata.",
    type: "website",
    url: pageUrl,
    siteName: "Name 100 Challenge",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: challenge?.title ?? "Name 100 Women Challenge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: challenge?.title ?? "Name 100 Women Challenge",
    description:
      challenge?.description ??
      "Can you name 100 famous women? A fun naming challenge verified by Wikidata.",
    images: [`${siteUrl}/og-image.png`],
  },
};

const gameSchema = {
  "@context": "https://schema.org",
  "@type": "Game",
  name: "Name 100 Women Challenge",
  description:
    "A trivia challenge to name 100 famous women — real female public figures verified by Wikidata.",
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

export default function ChallengePage() {
  return (
    <>
      <JsonLd data={gameSchema} />
      <ChallengeGame />
    </>
  );
}

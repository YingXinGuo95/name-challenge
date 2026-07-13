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
} from "lucide-react";

const challenge = challenges.find((c) => c.slug === "name-100-pokemon");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-pokemon/rules`;

// ── Metadata ─────────────────────────────────────────────────────────

const pageTitle = "Name 100 Pokémon Challenge Rules — How to Play & Tips";
const pageDescription =
  "Learn the rules of the Name 100 Pokémon Challenge. Gotta name 'em all! Get tips to recall more Pokémon across all generations.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-pokemon/rules",
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
        alt: "Name 100 Pokémon Challenge Rules",
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

// ── Structured Data ───────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I play the Name 100 Pokémon Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type the name of a Pokémon and press Enter or click Add. Each valid Pokémon counts toward your total of ${config.targetCount}. The timer starts with your first submission. No duplicates are allowed. Validation is instant — no network requests needed.`,
      },
    },
    {
      "@type": "Question",
      name: "What Pokémon are accepted in the challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All Pokémon across all 9 generations are accepted, from Kanto (Gen 1) through Paldea (Gen 9). This includes starter Pokémon, legendary Pokémon, mythical Pokémon, regional variants, and all evolutionary forms. Common alternative names and abbreviations are also accepted.",
      },
    },
    {
      "@type": "Question",
      name: "How does Pokémon validation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Validation happens instantly on your device using a built-in dataset of 300+ Pokémon. There are no server requests, no network latency, and no rate limits. If the Pokémon name or a common alias is in the dataset, it counts immediately.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules of the Name 100 Pokémon Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The rules are simple: (1) Name ${config.targetCount} Pokémon — any species from the national Pokédex across all 9 generations. (2) Type a name and press Enter or click Add. (3) Each Pokémon can only be used once — duplicates will not count. (4) The timer starts with your first submission — try to finish as fast as you can.`,
      },
    },
    {
      "@type": "Question",
      name: "Are there tips for naming 100 Pokémon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Think generation by generation: start with Gen 1 (Kanto) classics like Pikachu, Charizard, and Mewtwo, then work through Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and Paldea. Remember starter Pokémon and their evolutions from each region, plus legendary and mythical Pokémon.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Name 100 Pokémon Challenge free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the challenge is completely free to play. No sign-up is required. Just visit the page and start naming!",
      },
    },
  ],
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
      name: "Name 100 Pokémon Challenge",
      item: `${siteUrl}/challenges/name-100-pokemon`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Rules",
      item: pageUrl,
    },
  ],
};

// ── Section Card ──────────────────────────────────────────────────────

function SectionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="overflow-hidden rounded-[20px] border-[2.5px] border-[#2D2D2D] bg-white"
      style={{ boxShadow: "3px 5px 0 rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center gap-2 border-b-[2.5px] border-[#2D2D2D]/10 bg-[#FFCB05]/5 px-5 py-3.5">
        <Icon className="h-5 w-5 text-[#FFCB05]" aria-hidden="true" />
        <h2 className="text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D]">
          {title}
        </h2>
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────

export default function RulesPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#2D2D2D]/50"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#FFCB05] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/challenges/name-100-pokemon"
            className="hover:text-[#FFCB05] transition-colors"
          >
            Name 100 Pokémon
          </Link>
          <span>/</span>
          <span className="text-[#2D2D2D]/70">Rules</span>
        </nav>

        {/* Hero */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#2D2D2D] bg-[#FFCB05]/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#FFCB05]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFCB05]">
              ⚡ Name 100 Pokémon Challenge
            </span>
          </div>
          <h1 className="font-extrabold text-3xl uppercase tracking-tight text-[#2D2D2D] sm:text-4xl">
            How to Play &amp; Rules
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-[#2D2D2D]/60 sm:text-base">
            Everything you need to know about the Name 100 Pokémon Challenge
            — from basic rules to expert strategies.
          </p>
          <Link
            href="/challenges/name-100-pokemon"
            className="retro-btn-dark mt-6 inline-flex items-center gap-2"
          >
            Start the Challenge
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        {/* Content Sections */}
        <div className="flex flex-col gap-5">
          {/* What Is the Challenge? */}
          <SectionCard icon={Target} title="What Is the Challenge?">
            <div className="space-y-3 text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
              <p>
                The <strong className="text-[#2D2D2D]">Name 100 Pokémon Challenge</strong>{" "}
                is a free online trivia game that tests your knowledge of the
                Pokémon universe. Your goal: name{" "}
                <strong className="text-[#2D2D2D]">{config.targetCount} Pokémon</strong>{" "}
                — species from the national Pokédex spanning all 9 generations
                from Kanto to Paldea.
              </p>
              <p>
                Unlike other challenges on this site, Pokémon validation is{" "}
                <strong className="text-[#2D2D2D]">instant and local</strong>.
                Every name you submit is checked against a built-in dataset of
                300+ Pokémon, including all evolutionary forms, regional
                variants, and common name variations. No server requests, no
                network latency — responses are immediate.
              </p>
              <p>
                No sign-up required. No downloads. Just open the page and start
                naming.
              </p>
            </div>
          </SectionCard>

          {/* Rules */}
          <SectionCard icon={CheckCircle} title="The Rules">
            <ol className="space-y-4">
              {[
                {
                  icon: Target,
                  label: "Goal",
                  text: `Name ${config.targetCount} Pokémon — any species from the national Pokédex across all 9 generations.`,
                },
                {
                  icon: CheckCircle,
                  label: "How to play",
                  text: "Type a Pokémon name and press Enter or click Add. Each valid Pokémon counts toward your total.",
                },
                {
                  icon: Ban,
                  label: "No duplicates",
                  text: "Each Pokémon can only be used once. Duplicates won't count toward your total.",
                },
                {
                  icon: Timer,
                  label: "Timer",
                  text: "The clock starts with your first submission. Try to finish as fast as you can!",
                },
              ].map((rule) => (
                <li key={rule.label} className="flex gap-3">
                  <rule.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#FFCB05]"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-[#2D2D2D]/50">
                      {rule.label}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-[#2D2D2D]/75">
                      {rule.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionCard>

          {/* Validation */}
          <SectionCard icon={Database} title="How Name Validation Works">
            <div className="space-y-3 text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
              <p>
                Unlike the name challenges that query Wikidata, the Pokémon
                Challenge uses a{" "}
                <strong className="text-[#2D2D2D]">
                  built-in local dataset
                </strong>{" "}
                for instant validation. There are no server requests — every
                name is checked on your device.
              </p>
              <p>
                The dataset includes:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong className="text-[#2D2D2D]">All 9 generations</strong>{" "}
                  — from Kanto (Gen 1) through Paldea (Gen 9).
                </li>
                <li>
                  <strong className="text-[#2D2D2D]">Starter Pokémon</strong>{" "}
                  — Bulbasaur, Charmander, Squirtle, and starters from every
                  generation plus their evolutions.
                </li>
                <li>
                  <strong className="text-[#2D2D2D]">Legendary &amp; Mythical</strong>{" "}
                  — Mewtwo, Lugia, Rayquaza, Arceus, and all legendary and
                  mythical Pokémon.
                </li>
                <li>
                  <strong className="text-[#2D2D2D]">Common aliases &amp; variants</strong>{" "}
                  — widely-recognized abbreviations, alternative spellings, and
                  regional form names.
                </li>
              </ul>
              <p>
                The result: type a name, get instant feedback. No waiting, no
                rate limits, no network errors.
              </p>
            </div>
          </SectionCard>

          {/* Tips */}
          <SectionCard icon={Lightbulb} title="Tips & Strategies">
            <div className="space-y-4">
              <p className="text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
                The key to reaching {config.targetCount} is to think generation
                by generation. Here are some examples from each region:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { cat: "Gen 1 (Kanto)", examples: "Pikachu, Charizard, Mewtwo, Bulbasaur, Squirtle" },
                  { cat: "Gen 2 (Johto)", examples: "Typhlosion, Lugia, Ho-Oh, Espeon, Umbreon" },
                  { cat: "Gen 3 (Hoenn)", examples: "Blaziken, Rayquaza, Kyogre, Groudon, Salamence" },
                  { cat: "Gen 4 (Sinnoh)", examples: "Lucario, Garchomp, Dialga, Palkia, Giratina" },
                  { cat: "Gen 5 (Unova)", examples: "Zekrom, Reshiram, Kyurem, Hydreigon, Volcarona" },
                  { cat: "Gen 6 (Kalos)", examples: "Greninja, Xerneas, Yveltal, Aegislash, Talonflame" },
                  { cat: "Gen 7 (Alola)", examples: "Decidueye, Solgaleo, Lunala, Mimikyu, Tapu Koko" },
                  { cat: "Gen 8 (Galar)", examples: "Cinderace, Zacian, Zamazenta, Dragapult, Corviknight" },
                  { cat: "Gen 9 (Paldea)", examples: "Meowscarada, Koraidon, Miraidon, Tinkaton, Annihilape" },
                  { cat: "Legendary Pokémon", examples: "Mew, Celebi, Jirachi, Darkrai, Arceus, Melmetal" },
                ].map(({ cat, examples }) => (
                  <div
                    key={cat}
                    className="rounded-xl border-[2.5px] border-[#2D2D2D]/10 bg-[#FFCB05]/[0.03] px-3.5 py-2.5"
                  >
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#FFCB05]">
                      {cat}
                    </span>
                    <span className="text-[11px] font-medium leading-relaxed text-[#2D2D2D]/55">
                      {examples}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] font-medium leading-relaxed text-[#2D2D2D]/50">
                💡 <strong className="text-[#2D2D2D]/60">Pro tip:</strong> Start
                with the most iconic Pokémon from Gen 1 (Kanto), then recall
                starters and their evolutions from each generation. Legendary
                Pokémon are easy to remember and cover many entries. Try
                thinking of Pokémon types — name all the Electric-types or
                Dragon-types you can recall.
              </p>
            </div>
          </SectionCard>

          {/* FAQ */}
          <SectionCard icon={HelpCircle} title="Frequently Asked Questions">
            <div className="divide-y-[2.5px] divide-[#2D2D2D]/10">
              {[
                {
                  q: "Do I need to create an account to play?",
                  a: "No! The challenge is completely free and requires no sign-up. Just visit the page and start naming.",
                },
                {
                  q: "Can I use nicknames or short forms for Pokémon?",
                  a: "Yes! The dataset includes common nicknames, abbreviations, and alternative spellings. Try different forms if the official name doesn't work.",
                },
                {
                  q: "What if a Pokémon name I submit is marked invalid?",
                  a: "Invalid names don't count against you — they simply don't add to your total. Keep trying with different names or alternative forms. The dataset covers 300+ entries including common variations.",
                },
                {
                  q: "Can I play on mobile?",
                  a: "Yes! The challenge works on desktop, tablet, and mobile devices. The interface adapts to your screen size.",
                },
                {
                  q: "How is the leaderboard ranked?",
                  a: "Players are ranked by completion time — the faster you name 100 Pokémon, the higher you rank. Only times in the top 100 appear on the leaderboard.",
                },
                {
                  q: "Can I replay the challenge?",
                  a: "Yes! You can replay as many times as you want. Each attempt is independent — try to beat your personal best time.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-3.5">
                  <summary className="cursor-pointer text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D] group-open:text-[#FFCB05] transition-colors list-none">
                    {q}
                  </summary>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div
            className="overflow-hidden rounded-[24px] border-[2.5px] border-[#2D2D2D] bg-[#FFCB05]/5 px-6 py-8 sm:px-10 sm:py-10"
            style={{ boxShadow: "3px 5px 0 rgba(0,0,0,0.08)" }}
          >
            <Sparkles className="mx-auto mb-3 h-6 w-6 text-[#FFCB05]" />
            <h2 className="font-extrabold text-xl uppercase tracking-tight text-[#2D2D2D] sm:text-2xl">
              Ready to Test Your Pokémon Knowledge?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-[#2D2D2D]/60">
              Think you can name {config.targetCount} Pokémon? Put your
              knowledge to the test and see how you rank on the
              leaderboard.
            </p>
            <Link
              href="/challenges/name-100-pokemon"
              className="retro-btn-dark mt-5 inline-flex items-center gap-2"
            >
              Start Naming {config.targetCount} Pokémon
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

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

const challenge = challenges.find((c) => c.slug === "name-100-countries");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-countries/rules`;

// ── Metadata ─────────────────────────────────────────────────────────

const pageTitle = "Name 100 Countries Challenge Rules — How to Play & Tips";
const pageDescription =
  "Learn the rules of the Name 100 Countries Challenge. Discover how instant local validation works, get tips to name more countries, and find answers to common questions. Free to play.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-countries/rules",
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
        alt: "Name 100 Countries Challenge Rules",
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
      name: "How do I play the Name 100 Countries Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type the name of a country and press Enter or click Add. Each valid country counts toward your total of ${config.targetCount}. The timer starts with your first submission. No duplicates are allowed. Validation is instant — no network requests needed.`,
      },
    },
    {
      "@type": "Question",
      name: "What countries are accepted in the challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All 193 UN member states are included, plus observer states (Vatican City, Palestine), widely-recognized territories, and dependencies. Common alternative names and abbreviations are also accepted — for example, USA, UK, Holland, Czechia, Ivory Coast, and many more.",
      },
    },
    {
      "@type": "Question",
      name: "How does country validation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Validation happens instantly on your device using a built-in dataset of 250+ countries and territories. There are no server requests, no network latency, and no rate limits. If the country name or a common alternative is in the dataset, it counts immediately.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules of the Name 100 Countries Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The rules are simple: (1) Name ${config.targetCount} countries — any sovereign state or widely-recognized territory. (2) Type a name and press Enter or click Add. (3) Each country can only be used once — duplicates will not count. (4) The timer starts with your first submission — try to finish as fast as you can.`,
      },
    },
    {
      "@type": "Question",
      name: "Are there tips for naming 100 countries?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Think continent by continent: Africa (Nigeria, Egypt, South Africa, Kenya), Asia (China, India, Japan, Indonesia), Europe (France, Germany, Italy, Spain), North America (United States, Canada, Mexico, Cuba), South America (Brazil, Argentina, Colombia, Peru), and Oceania (Australia, New Zealand, Fiji, Papua New Guinea). Use both official names and common short forms.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Name 100 Countries Challenge free?",
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
      name: "Name 100 Countries Challenge",
      item: `${siteUrl}/challenges/name-100-countries`,
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
      <div className="flex items-center gap-2 border-b-[2.5px] border-[#2D2D2D]/10 bg-[#4CAF50]/5 px-5 py-3.5">
        <Icon className="h-5 w-5 text-[#4CAF50]" aria-hidden="true" />
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
          <Link href="/" className="hover:text-[#4CAF50] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/challenges/name-100-countries"
            className="hover:text-[#4CAF50] transition-colors"
          >
            Name 100 Countries
          </Link>
          <span>/</span>
          <span className="text-[#2D2D2D]/70">Rules</span>
        </nav>

        {/* Hero */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#2D2D2D] bg-[#4CAF50]/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#4CAF50]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4CAF50]">
              {challenge?.emoji} Name 100 Countries Challenge
            </span>
          </div>
          <h1 className="font-extrabold text-3xl uppercase tracking-tight text-[#2D2D2D] sm:text-4xl">
            How to Play &amp; Rules
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-[#2D2D2D]/60 sm:text-base">
            Everything you need to know about the Name 100 Countries Challenge
            — from basic rules to expert strategies.
          </p>
          <Link
            href="/challenges/name-100-countries"
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
                The <strong className="text-[#2D2D2D]">Name 100 Countries Challenge</strong>{" "}
                is a free online geography quiz that tests your knowledge of the
                world. Your goal: name{" "}
                <strong className="text-[#2D2D2D]">{config.targetCount} countries</strong>{" "}
                — sovereign states and widely-recognized territories from every
                continent.
              </p>
              <p>
                Unlike other challenges on this site, country validation is{" "}
                <strong className="text-[#2D2D2D]">instant and local</strong>.
                Every name you submit is checked against a built-in dataset of
                250+ countries, territories, and common name variations. No
                server requests, no network latency — responses are immediate.
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
                  text: `Name ${config.targetCount} countries — sovereign states and widely-recognized territories from every continent.`,
                },
                {
                  icon: CheckCircle,
                  label: "How to play",
                  text: "Type a country name and press Enter or click Add. Each valid country counts toward your total.",
                },
                {
                  icon: Ban,
                  label: "No duplicates",
                  text: "Each country can only be used once. Duplicates won't count toward your total.",
                },
                {
                  icon: Timer,
                  label: "Timer",
                  text: "The clock starts with your first submission. Try to finish as fast as you can!",
                },
              ].map((rule) => (
                <li key={rule.label} className="flex gap-3">
                  <rule.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#4CAF50]"
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
                Unlike the name challenges that query Wikidata, the Countries
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
                  <strong className="text-[#2D2D2D]">All 193 UN member states</strong>{" "}
                  — from Afghanistan to Zimbabwe.
                </li>
                <li>
                  <strong className="text-[#2D2D2D]">Observer states</strong>{" "}
                  — Vatican City and Palestine.
                </li>
                <li>
                  <strong className="text-[#2D2D2D]">Territories &amp; dependencies</strong>{" "}
                  — Puerto Rico, Greenland, Hong Kong, Gibraltar, and more.
                </li>
                <li>
                  <strong className="text-[#2D2D2D]">Common alternative names</strong>{" "}
                  — USA for United States, UK for United Kingdom, Holland for
                  the Netherlands, Ivory Coast for Côte d&apos;Ivoire, and many
                  more.
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
                The key to reaching {config.targetCount} is to think continent
                by continent. Here are some examples from each region:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { cat: "Africa", examples: "Nigeria, Egypt, South Africa, Kenya, Ethiopia" },
                  { cat: "Asia", examples: "China, India, Japan, South Korea, Indonesia" },
                  { cat: "Europe", examples: "France, Germany, Italy, Spain, United Kingdom" },
                  { cat: "North America", examples: "United States, Canada, Mexico, Cuba, Jamaica" },
                  { cat: "South America", examples: "Brazil, Argentina, Colombia, Peru, Chile" },
                  { cat: "Oceania", examples: "Australia, New Zealand, Fiji, Papua New Guinea, Samoa" },
                  { cat: "Middle East", examples: "Saudi Arabia, Iran, Iraq, Israel, UAE" },
                  { cat: "Central Asia", examples: "Kazakhstan, Uzbekistan, Turkmenistan, Kyrgyzstan, Tajikistan" },
                  { cat: "Caribbean", examples: "Barbados, Trinidad and Tobago, Bahamas, Haiti, Grenada" },
                  { cat: "Small States", examples: "Monaco, San Marino, Liechtenstein, Malta, Andorra" },
                ].map(({ cat, examples }) => (
                  <div
                    key={cat}
                    className="rounded-xl border-[2.5px] border-[#2D2D2D]/10 bg-[#4CAF50]/[0.03] px-3.5 py-2.5"
                  >
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#4CAF50]">
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
                with the largest and most well-known countries from each
                continent, then work your way to smaller nations. Try alternate
                names if the first version doesn&apos;t work — for example, try
                both &quot;United States&quot; and &quot;USA&quot;.
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
                  q: "Why is country validation instant?",
                  a: "Unlike the name challenges that query Wikidata over the network, the Countries Challenge validates names against a dataset built directly into the page. This means instant feedback with zero network latency.",
                },
                {
                  q: "Can I use abbreviated names like UK or USA?",
                  a: "Yes! The dataset includes many common abbreviations and alternative names. Try UK, USA, UAE, or any widely-recognized short form.",
                },
                {
                  q: "What if a country name I submit is marked invalid?",
                  a: "Invalid names don't count against you — they simply don't add to your total. Keep trying with different names or alternative forms. The dataset covers 250+ entries including common variations.",
                },
                {
                  q: "Can I play on mobile?",
                  a: "Yes! The challenge works on desktop, tablet, and mobile devices. The interface adapts to your screen size.",
                },
                {
                  q: "How is the leaderboard ranked?",
                  a: "Players are ranked by completion time — the faster you name 100 countries, the higher you rank. Only times in the top 100 appear on the leaderboard.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-3.5">
                  <summary className="cursor-pointer text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D] group-open:text-[#4CAF50] transition-colors list-none">
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
            className="overflow-hidden rounded-[24px] border-[2.5px] border-[#2D2D2D] bg-[#4CAF50]/5 px-6 py-8 sm:px-10 sm:py-10"
            style={{ boxShadow: "3px 5px 0 rgba(0,0,0,0.08)" }}
          >
            <Sparkles className="mx-auto mb-3 h-6 w-6 text-[#4CAF50]" />
            <h2 className="font-extrabold text-xl uppercase tracking-tight text-[#2D2D2D] sm:text-2xl">
              Ready to Test Your Geography?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-[#2D2D2D]/60">
              Think you can name {config.targetCount} countries? Put your
              geography knowledge to the test and see how you rank on the
              leaderboard.
            </p>
            <Link
              href="/challenges/name-100-countries"
              className="retro-btn-dark mt-5 inline-flex items-center gap-2"
            >
              Start Naming {config.targetCount} Countries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

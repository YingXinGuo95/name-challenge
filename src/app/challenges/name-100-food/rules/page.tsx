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

const challenge = challenges.find((c) => c.slug === "name-100-food");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-food/rules`;

// ── Metadata ─────────────────────────────────────────────────────────

const pageTitle = "Name 100 Food Challenge Rules — How to Play & Tips";
const pageDescription =
  "Learn the rules of the Name 100 Food Challenge. Discover how food validation works, get tips to name more foods, and find answers to common questions. Free to play.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-food/rules",
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
        alt: "Name 100 Food Challenge Rules",
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
      name: "How do I play the Name 100 Food Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type the name of a food and press Enter or click Add. Each valid food counts toward your total of ${config.targetCount}. The timer starts with your first submission. Anything edible counts — no duplicates.`,
      },
    },
    {
      "@type": "Question",
      name: "What foods are accepted in the challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Everything edible is accepted — fruits, vegetables, meats, seafood, grains, dairy, baked goods, desserts, snacks, drinks, dishes, and condiments. Names are verified against a curated food dataset and Wikidata. Common synonyms count as the same food (e.g. eggplant/aubergine).",
      },
    },
    {
      "@type": "Question",
      name: "How does food validation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you submit a name, it is first checked against the game's curated local dataset of common foods. If it isn't there, the game checks Wikidata to see if the item is classified as a food, dish, fruit, vegetable, meat, beverage, or other edible category.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules of the Name 100 Food Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The rules are simple: (1) Name ${config.targetCount} foods. (2) Type a name and press Enter or click Add. (3) Only valid foods count. (4) Each food can only be used once — synonyms like "eggplant" and "aubergine" are the same food. (5) The timer starts with your first submission — try to finish as fast as you can.`,
      },
    },
    {
      "@type": "Question",
      name: "Are there tips for naming 100 foods?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Think across categories: fruits (apple, banana, mango), vegetables (carrot, broccoli, spinach), meats and seafood (chicken, beef, salmon, shrimp), grains and dairy (rice, bread, cheese, yogurt), baked goods and desserts (cake, cookie, pie, donut), snacks and drinks (chips, popcorn, coffee, cola), and dishes (pizza, sushi, burger, ramen).",
      },
    },
    {
      "@type": "Question",
      name: "Is the Name 100 Food Challenge free?",
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
      name: "Name 100 Food Challenge",
      item: `${siteUrl}/challenges/name-100-food`,
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
      <div className="flex items-center gap-2 border-b-[2.5px] border-[#2D2D2D]/10 bg-[#E63946]/5 px-5 py-3.5">
        <Icon className="h-5 w-5 text-[#E63946]" aria-hidden="true" />
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
          <Link href="/" className="hover:text-[#E63946] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/challenges/name-100-food"
            className="hover:text-[#E63946] transition-colors"
          >
            Name 100 Food
          </Link>
          <span>/</span>
          <span className="text-[#2D2D2D]/70">Rules</span>
        </nav>

        {/* Hero */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#2D2D2D] bg-[#E63946]/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#E63946]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E63946]">
              🍽️ Name 100 Food Challenge
            </span>
          </div>
          <h1 className="font-extrabold text-3xl uppercase tracking-tight text-[#2D2D2D] sm:text-4xl">
            How to Play &amp; Rules
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-[#2D2D2D]/60 sm:text-base">
            Everything you need to know about the Name 100 Food Challenge —
            from basic rules to expert strategies.
          </p>
          <Link
            href="/challenges/name-100-food"
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
                The <strong className="text-[#2D2D2D]">Name 100 Food Challenge</strong>{" "}
                is a free online quiz that tests your knowledge of food. Your
                goal: name{" "}
                <strong className="text-[#2D2D2D]">{config.targetCount} foods</strong>{" "}
                — anything edible, from fruits and vegetables to dishes,
                desserts and drinks.
              </p>
              <p>
                Every name you submit is instantly checked against the
                game&apos;s curated food dataset and Wikidata. If it&apos;s
                food, it counts. No sign-up required. No downloads. Just open
                the page and start naming.
              </p>
              <p>
                The clock tracks your time, and you can submit your score to
                the leaderboard when you finish. Think you can name 100 foods?
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
                  text: `Name ${config.targetCount} foods — anything edible, verified by the food dataset and Wikidata.`,
                },
                {
                  icon: CheckCircle,
                  label: "How to play",
                  text: "Type a food name and press Enter or click Add. Each valid food counts toward your total.",
                },
                {
                  icon: Ban,
                  label: "No duplicates",
                  text: 'Each food can only be used once. Synonyms count as the same food — "eggplant" and "aubergine" are the same entry.',
                },
                {
                  icon: Ban,
                  label: "Brands don't count",
                  text: "The challenge is about foods, not brands. Try the generic name — e.g. \"cola\" instead of a specific brand.",
                },
                {
                  icon: Timer,
                  label: "Timer",
                  text: "The clock starts with your first submission. Try to finish as fast as you can!",
                },
              ].map((rule) => (
                <li key={rule.label} className="flex gap-3">
                  <rule.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#E63946]"
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
          <SectionCard icon={Database} title="How Food Validation Works">
            <div className="space-y-3 text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
              <p>
                When you submit a name, the challenge checks it in two ways:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong className="text-[#2D2D2D]">Curated food dataset:</strong>{" "}
                  A built-in list of hundreds of common foods is checked first
                  — this makes validation instant for everyday foods and their
                  common names.
                </li>
                <li>
                  <strong className="text-[#2D2D2D]">Wikidata verification:</strong>{" "}
                  If the name isn&apos;t in the local list, the challenge asks{" "}
                  <strong className="text-[#2D2D2D]">Wikidata</strong> — the
                  free open knowledge base behind Wikipedia — whether the item
                  is classified as a food, dish, fruit, vegetable, meat,
                  beverage, dessert, or another edible category.
                </li>
              </ul>
              <p>
                If either check passes, the name is accepted. Brands, animals,
                and objects are rejected.
              </p>
            </div>
          </SectionCard>

          {/* Tips */}
          <SectionCard icon={Lightbulb} title="Tips & Strategies">
            <div className="space-y-4">
              <p className="text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
                The key to reaching {config.targetCount} is to think broadly
                across food categories. Here are some to get you started:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { cat: "Fruits", examples: "Apple, Banana, Mango, Pineapple, Grape, Watermelon" },
                  { cat: "Vegetables", examples: "Carrot, Broccoli, Spinach, Bell pepper, Onion, Potato" },
                  { cat: "Meats & Seafood", examples: "Chicken, Beef, Pork, Salmon, Shrimp, Lobster" },
                  { cat: "Grains & Dairy", examples: "Rice, Bread, Pasta, Cheese, Yogurt, Butter" },
                  { cat: "Baked & Desserts", examples: "Cake, Cookie, Pie, Donut, Brownie, Waffle" },
                  { cat: "Snacks & Drinks", examples: "Chips, Popcorn, Pretzel, Coffee, Cola, Tea" },
                  { cat: "Dishes", examples: "Pizza, Sushi, Burger, Ramen, Taco, Curry" },
                  { cat: "Condiments", examples: "Ketchup, Mustard, Honey, Soy sauce, Vinegar, Jam" },
                ].map(({ cat, examples }) => (
                  <div
                    key={cat}
                    className="rounded-xl border-[2.5px] border-[#2D2D2D]/10 bg-[#E63946]/[0.03] px-3.5 py-2.5"
                  >
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#E63946]">
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
                with foods from each category, then drill deeper — think about
                breakfast foods, picnic foods, holiday foods, and what&apos;s in
                your fridge right now!
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
                  q: 'Why is "eggplant" accepted but "aubergine" marked as a duplicate?',
                  a: 'The challenge treats synonyms as the same food. "Eggplant" and "aubergine" are the same vegetable under different names, so it only counts once.',
                },
                {
                  q: "Are drinks counted as food?",
                  a: "Yes! Anything edible is accepted, including beverages like coffee, tea, juice, and cola.",
                },
                {
                  q: "What if a food I submit is marked invalid?",
                  a: "Invalid names don't count against you — they simply don't add to your total. You can keep trying with different names. Brand names and non-food objects are rejected.",
                },
                {
                  q: "How is the leaderboard ranked?",
                  a: "Players are ranked by completion time — the faster you name 100 foods, the higher you rank. Only times in the top 100 appear on the leaderboard.",
                },
                {
                  q: "Can I replay the challenge?",
                  a: "Absolutely! Use the restart button to clear your progress and try again. Challenge yourself to beat your previous time.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-3.5">
                  <summary className="cursor-pointer text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D] group-open:text-[#E63946] transition-colors list-none">
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
            className="overflow-hidden rounded-[24px] border-[2.5px] border-[#2D2D2D] bg-[#E63946]/5 px-6 py-8 sm:px-10 sm:py-10"
            style={{ boxShadow: "3px 5px 0 rgba(0,0,0,0.08)" }}
          >
            <Sparkles className="mx-auto mb-3 h-6 w-6 text-[#E63946]" />
            <h2 className="font-extrabold text-xl uppercase tracking-tight text-[#2D2D2D] sm:text-2xl">
              Ready to Test Your Food Knowledge?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-[#2D2D2D]/60">
              Think you can name {config.targetCount} foods? Put your knowledge
              to the test and see how you rank on the leaderboard.
            </p>
            <Link
              href="/challenges/name-100-food"
              className="retro-btn-dark mt-5 inline-flex items-center gap-2"
            >
              Start Naming {config.targetCount} Foods
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

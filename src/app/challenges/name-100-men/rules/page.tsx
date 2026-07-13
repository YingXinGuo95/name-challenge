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

const challenge = challenges.find((c) => c.slug === "name-100-men");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-men/rules`;

// ── Metadata ─────────────────────────────────────────────────────────

const pageTitle = "Name 100 Men Challenge Rules — How to Play & Tips";
const pageDescription =
  "Learn the rules of the Name 100 Men Challenge. Discover how Wikidata validation works, get tips to name more famous men, and find answers to common questions. Free to play.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-men/rules",
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
        alt: "Name 100 Men Challenge Rules",
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
      name: "How do I play the Name 100 Men Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type the name of a famous man and press Enter or click Add. Each valid name verified by Wikidata counts toward your total of ${config.targetCount}. The timer starts with your first submission. No duplicates are allowed.`,
      },
    },
    {
      "@type": "Question",
      name: "What names are accepted in the challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All names are verified against Wikidata, the free knowledge base. If the person is a real male public figure recorded in Wikidata, it counts. This includes scientists, artists, leaders, athletes, writers, musicians, actors, and historical figures from around the world.",
      },
    },
    {
      "@type": "Question",
      name: "How does Wikidata validation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you submit a name, the challenge queries Wikidata's database to check if the person exists as a male human. Wikidata is a collaborative knowledge base maintained by volunteers, similar to Wikipedia. Only names that match a real male person in Wikidata are counted as valid.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules of the Name 100 Men Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The rules are simple: (1) Name ${config.targetCount} famous men — real male public figures verified by Wikidata. (2) Type a name and press Enter or click Add. (3) Each name can only be used once — duplicates will not count. (4) The timer starts with your first submission — try to finish as fast as you can.`,
      },
    },
    {
      "@type": "Question",
      name: "Are there tips for naming 100 men?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Think across categories: scientists (Albert Einstein, Isaac Newton), artists (Pablo Picasso, Leonardo da Vinci), leaders (Winston Churchill, Nelson Mandela), athletes (Michael Jordan, Usain Bolt), writers (William Shakespeare, Mark Twain), musicians (Elvis Presley, Freddie Mercury), actors (Marlon Brando, Robert De Niro), and historical figures (Alexander the Great, Julius Caesar).",
      },
    },
    {
      "@type": "Question",
      name: "Is the Name 100 Men Challenge free?",
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
      name: "Name 100 Men Challenge",
      item: `${siteUrl}/challenges/name-100-men`,
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
      <div className="flex items-center gap-2 border-b-[2.5px] border-[#2D2D2D]/10 bg-[#5B9BD5]/5 px-5 py-3.5">
        <Icon className="h-5 w-5 text-[#5B9BD5]" aria-hidden="true" />
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
          <Link href="/" className="hover:text-[#5B9BD5] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/challenges/name-100-men"
            className="hover:text-[#5B9BD5] transition-colors"
          >
            Name 100 Men
          </Link>
          <span>/</span>
          <span className="text-[#2D2D2D]/70">Rules</span>
        </nav>

        {/* Hero */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#2D2D2D] bg-[#5B9BD5]/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#5B9BD5]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5B9BD5]">
              {challenge?.emoji} Name 100 Men Challenge
            </span>
          </div>
          <h1 className="font-extrabold text-3xl uppercase tracking-tight text-[#2D2D2D] sm:text-4xl">
            How to Play &amp; Rules
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-[#2D2D2D]/60 sm:text-base">
            Everything you need to know about the Name 100 Men Challenge —
            from basic rules to expert strategies.
          </p>
          <Link
            href="/challenges/name-100-men"
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
                The <strong className="text-[#2D2D2D]">Name 100 Men Challenge</strong>{" "}
                is a free online quiz that tests your knowledge of famous men
                from history and today. Your goal: name{" "}
                <strong className="text-[#2D2D2D]">{config.targetCount} famous men</strong>{" "}
                — real male public figures verified by Wikidata, the free
                knowledge base behind Wikipedia.
              </p>
              <p>
                Every name you submit is instantly checked against Wikidata&apos;s
                database of millions of entries. If the person is a real male
                human recorded in Wikidata, it counts toward your total. The
                clock tracks your time, and you can submit your score to the
                leaderboard when you finish.
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
                  text: `Name ${config.targetCount} famous men — real male public figures verified by Wikidata.`,
                },
                {
                  icon: CheckCircle,
                  label: "How to play",
                  text: "Type a name and press Enter or click Add. Each valid name counts toward your total.",
                },
                {
                  icon: Ban,
                  label: "No duplicates",
                  text: "Each name can only be used once. Duplicates won't count toward your total.",
                },
                {
                  icon: Timer,
                  label: "Timer",
                  text: "The clock starts with your first submission. Try to finish as fast as you can!",
                },
              ].map((rule) => (
                <li key={rule.label} className="flex gap-3">
                  <rule.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#5B9BD5]"
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
                When you submit a name, the challenge sends a query to{" "}
                <strong className="text-[#2D2D2D]">Wikidata</strong>, a free
                and open knowledge base that powers Wikipedia. Wikidata contains
                structured data about millions of people, places, and things.
              </p>
              <p>
                The validation checks two things:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong className="text-[#2D2D2D]">Is this a real person?</strong>{" "}
                  The name must match a human (&quot;instance of human&quot;) in
                  Wikidata.
                </li>
                <li>
                  <strong className="text-[#2D2D2D]">Is this person male?</strong>{" "}
                  The entry must have a male gender classification in Wikidata.
                </li>
              </ul>
              <p>
                If both conditions are met, the name is accepted. Otherwise,
                it&apos;s marked as invalid. Case and spelling variations are
                handled automatically — as long as Wikidata recognizes the name,
                it counts.
              </p>
            </div>
          </SectionCard>

          {/* Tips */}
          <SectionCard icon={Lightbulb} title="Tips & Strategies">
            <div className="space-y-4">
              <p className="text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
                The key to reaching {config.targetCount} is to think broadly
                across categories. Here are some to get you started:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { cat: "Scientists", examples: "Albert Einstein, Isaac Newton, Charles Darwin" },
                  { cat: "Leaders & Politics", examples: "Winston Churchill, Nelson Mandela, Barack Obama" },
                  { cat: "Artists", examples: "Pablo Picasso, Leonardo da Vinci, Vincent van Gogh" },
                  { cat: "Athletes", examples: "Michael Jordan, Usain Bolt, Lionel Messi" },
                  { cat: "Writers", examples: "William Shakespeare, Mark Twain, Ernest Hemingway" },
                  { cat: "Musicians", examples: "Elvis Presley, Freddie Mercury, Bob Dylan" },
                  { cat: "Actors & Directors", examples: "Marlon Brando, Robert De Niro, Alfred Hitchcock" },
                  { cat: "Historical Figures", examples: "Alexander the Great, Julius Caesar, Napoleon" },
                  { cat: "Entrepreneurs", examples: "Steve Jobs, Bill Gates, Elon Musk" },
                  { cat: "Explorers", examples: "Christopher Columbus, Marco Polo, Neil Armstrong" },
                ].map(({ cat, examples }) => (
                  <div
                    key={cat}
                    className="rounded-xl border-[2.5px] border-[#2D2D2D]/10 bg-[#5B9BD5]/[0.03] px-3.5 py-2.5"
                  >
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5B9BD5]">
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
                with broad, well-known names from each category, then drill
                deeper into areas you know well. Mix first and last names, and
                try different name formats if one doesn&apos;t work.
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
                  q: "Can I use nicknames or partial names?",
                  a: "The challenge checks names against Wikidata's database. For best results, use the person's commonly-known full name (e.g., \"Tom Hanks\" rather than just \"Tom\"). Wikidata handles many name variations, but full names work most reliably.",
                },
                {
                  q: "What if a name I submit is marked invalid?",
                  a: "Invalid names don't count against you — they simply don't add to your total. You can keep trying with different names. The name might not exist in Wikidata, or the spelling might not match exactly.",
                },
                {
                  q: "Can I play on mobile?",
                  a: "Yes! The challenge works on desktop, tablet, and mobile devices. The interface adapts to your screen size.",
                },
                {
                  q: "How is the leaderboard ranked?",
                  a: "Players are ranked by completion time — the faster you name 100 men, the higher you rank. Only times in the top 100 appear on the leaderboard.",
                },
                {
                  q: "Can I replay the challenge?",
                  a: "Absolutely! Use the restart button to clear your progress and try again. Challenge yourself to beat your previous time.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-3.5">
                  <summary className="cursor-pointer text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D] group-open:text-[#5B9BD5] transition-colors list-none">
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
            className="overflow-hidden rounded-[24px] border-[2.5px] border-[#2D2D2D] bg-[#5B9BD5]/5 px-6 py-8 sm:px-10 sm:py-10"
            style={{ boxShadow: "3px 5px 0 rgba(0,0,0,0.08)" }}
          >
            <Sparkles className="mx-auto mb-3 h-6 w-6 text-[#5B9BD5]" />
            <h2 className="font-extrabold text-xl uppercase tracking-tight text-[#2D2D2D] sm:text-2xl">
              Ready to Test Your Knowledge?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-[#2D2D2D]/60">
              Think you can name {config.targetCount} famous men? Put your
              knowledge to the test and see how you rank on the leaderboard.
            </p>
            <Link
              href="/challenges/name-100-men"
              className="retro-btn-dark mt-5 inline-flex items-center gap-2"
            >
              Start Naming {config.targetCount} Men
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

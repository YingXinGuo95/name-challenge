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

// ── Metadata ─────────────────────────────────────────────────────────

const pageTitle = "Name 100 Movies Challenge Rules — How to Play & Tips";
const pageDescription =
  "Learn the rules of the Name 100 Movies Challenge. Discover how Wikidata film validation works, get tips to recall more movies, and find answers to common questions. Free to play.";

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

// ── Structured Data ───────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I play the Name 100 Movies Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type the title of a famous movie and press Enter or click Add. Each valid movie verified by Wikidata counts toward your total of ${config.targetCount}. The timer starts with your first submission. No duplicates are allowed.`,
      },
    },
    {
      "@type": "Question",
      name: "What movies are accepted in the challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All titles are verified against Wikidata, the free knowledge base. If the title matches a real film recorded in Wikidata, it counts. This includes feature films, animated movies, documentaries, and classics from every era and country.",
      },
    },
    {
      "@type": "Question",
      name: "How does Wikidata validation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you submit a title, the challenge queries Wikidata's database to check if the title is a real film. Wikidata is a collaborative knowledge base maintained by volunteers, similar to Wikipedia. Only titles that match a real film in Wikidata are counted as valid.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules of the Name 100 Movies Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The rules are simple: (1) Name ${config.targetCount} famous movies — real films verified by Wikidata. (2) Type a title and press Enter or click Add. (3) Each movie can only be used once — duplicates will not count. (4) The timer starts with your first submission — try to finish as fast as you can.`,
      },
    },
    {
      "@type": "Question",
      name: "Are there tips for naming 100 movies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Think across genres and eras: Oscar-winning classics (The Godfather, Casablanca), sci-fi (Inception, The Matrix), superhero blockbusters (The Dark Knight, Avengers), animated favorites (Spirited Away, Toy Story), horror (Psycho, The Shining), and foreign hits (Parasite, Spirited Away).",
      },
    },
    {
      "@type": "Question",
      name: "Is the Name 100 Movies Challenge free?",
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
      <div className="flex items-center gap-2 border-b-[2.5px] border-[#2D2D2D]/10 bg-[#9333EA]/5 px-5 py-3.5">
        <Icon className="h-5 w-5 text-[#9333EA]" aria-hidden="true" />
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
          <Link href="/" className="hover:text-[#9333EA] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/challenges/name-100-movies"
            className="hover:text-[#9333EA] transition-colors"
          >
            Name 100 Movies
          </Link>
          <span>/</span>
          <span className="text-[#2D2D2D]/70">Rules</span>
        </nav>

        {/* Hero */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#2D2D2D] bg-[#9333EA]/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#9333EA]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9333EA]">
              {challenge?.emoji} Name 100 Movies Challenge
            </span>
          </div>
          <h1 className="font-extrabold text-3xl uppercase tracking-tight text-[#2D2D2D] sm:text-4xl">
            How to Play &amp; Rules
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-[#2D2D2D]/60 sm:text-base">
            Everything you need to know about the Name 100 Movies Challenge —
            from basic rules to expert strategies.
          </p>
          <Link
            href="/challenges/name-100-movies"
            className="retro-btn-dark mt-6 inline-flex items-center gap-2"
          >
            Start the Challenge
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        {/* Content Sections */}
        <div className="flex flex-col gap-5">
          {/* What Is the Challenge? */}
          <SectionCard icon={Film} title="What Is the Challenge?">
            <div className="space-y-3 text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
              <p>
                The <strong className="text-[#2D2D2D]">Name 100 Movies Challenge</strong>{" "}
                is a free online quiz that tests your film knowledge — from
                timeless classics to modern blockbusters. Your goal: name{" "}
                <strong className="text-[#2D2D2D]">{config.targetCount} famous movies</strong>{" "}
                — real films verified by Wikidata, the free knowledge base
                behind Wikipedia.
              </p>
              <p>
                Every title you submit is instantly checked against Wikidata&apos;s
                database of millions of entities. If it matches a real film, it
                counts toward your total. The clock tracks your time, and you
                can submit your score to the leaderboard when you finish.
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
                  text: `Name ${config.targetCount} famous movies — real films verified by Wikidata.`,
                },
                {
                  icon: CheckCircle,
                  label: "How to play",
                  text: "Type a movie title and press Enter or click Add. Each valid title counts toward your total.",
                },
                {
                  icon: Ban,
                  label: "No duplicates",
                  text: "Each movie can only be used once. Duplicates won't count toward your total.",
                },
                {
                  icon: Timer,
                  label: "Timer",
                  text: "The clock starts with your first submission. Try to finish as fast as you can!",
                },
              ].map((rule) => (
                <li key={rule.label} className="flex gap-3">
                  <rule.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#9333EA]"
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
          <SectionCard icon={Database} title="How Title Validation Works">
            <div className="space-y-3 text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
              <p>
                When you submit a title, the challenge sends a query to{" "}
                <strong className="text-[#2D2D2D]">Wikidata</strong>, a free
                and open knowledge base that powers Wikipedia. Wikidata contains
                structured data about millions of films, people, and things.
              </p>
              <p>
                The validation checks one thing:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong className="text-[#2D2D2D]">Is this a real film?</strong>{" "}
                  The title must match a film (or a subclass such as animated
                  film or documentary) in Wikidata.
                </li>
              </ul>
              <p>
                If the title matches a film, it&apos;s accepted. Otherwise, it&apos;s
                marked as invalid. Case and spelling variations are handled
                automatically — as long as Wikidata recognizes the title, it
                counts.
              </p>
            </div>
          </SectionCard>

          {/* Tips */}
          <SectionCard icon={Lightbulb} title="Tips & Strategies">
            <div className="space-y-4">
              <p className="text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
                The key to reaching {config.targetCount} is to think broadly
                across genres and eras. Here are some to get you started:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { cat: "Oscar Classics", examples: "The Godfather, Casablanca, Citizen Kane" },
                  { cat: "Sci-Fi & Adventure", examples: "Inception, The Matrix, Blade Runner" },
                  { cat: "Superhero & Action", examples: "The Dark Knight, Avengers, Gladiator" },
                  { cat: "Drama & Romance", examples: "Titanic, Forrest Gump, La La Land" },
                  { cat: "Animation & Family", examples: "Spirited Away, Toy Story, The Lion King" },
                  { cat: "Fantasy & Mystery", examples: "Lord of the Rings, Harry Potter, Inception" },
                  { cat: "Horror & Thrillers", examples: "Psycho, The Shining, Get Out" },
                  { cat: "Foreign Hits", examples: "Parasite, Spirited Away, Life Is Beautiful" },
                ].map(({ cat, examples }) => (
                  <div
                    key={cat}
                    className="rounded-xl border-[2.5px] border-[#2D2D2D]/10 bg-[#9333EA]/[0.03] px-3.5 py-2.5"
                  >
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#9333EA]">
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
                with the most famous films you know — Oscars winners and box
                office hits — then work through genres and decades. If a title
                doesn&apos;t work, try the full title (e.g. &quot;The Empire Strikes
                Back&quot; rather than just &quot;Empire&quot;).
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
                  q: "Can I use short or partial titles?",
                  a: "The challenge checks titles against Wikidata's database. For best results, use the full, punctuation-correct title (e.g., \"Spider-Man\" with a hyphen, not \"spider man\"). Wikidata handles many variations, but full titles work most reliably.",
                },
                {
                  q: "What if a title I submit is marked invalid?",
                  a: "Invalid titles don't count against you — they simply don't add to your total. You can keep trying with different titles. The title might not exist in Wikidata, or the spelling might not match exactly.",
                },
                {
                  q: "Can I play on mobile?",
                  a: "Yes! The challenge works on desktop, tablet, and mobile devices. The interface adapts to your screen size.",
                },
                {
                  q: "How is the leaderboard ranked?",
                  a: "Players are ranked by completion time — the faster you name 100 movies, the higher you rank. Only times in the top 100 appear on the leaderboard.",
                },
                {
                  q: "Can I replay the challenge?",
                  a: "Absolutely! Use the restart button to clear your progress and try again. Challenge yourself to beat your previous time.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-3.5">
                  <summary className="cursor-pointer text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D] group-open:text-[#9333EA] transition-colors list-none">
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
            className="overflow-hidden rounded-[24px] border-[2.5px] border-[#2D2D2D] bg-[#9333EA]/5 px-6 py-8 sm:px-10 sm:py-10"
            style={{ boxShadow: "3px 5px 0 rgba(0,0,0,0.08)" }}
          >
            <Sparkles className="mx-auto mb-3 h-6 w-6 text-[#9333EA]" />
            <h2 className="font-extrabold text-xl uppercase tracking-tight text-[#2D2D2D] sm:text-2xl">
              Ready to Test Your Film Knowledge?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-[#2D2D2D]/60">
              Think you can name {config.targetCount} famous movies? Put your
              knowledge to the test and see how you rank on the leaderboard.
            </p>
            <Link
              href="/challenges/name-100-movies"
              className="retro-btn-dark mt-5 inline-flex items-center gap-2"
            >
              Start Naming {config.targetCount} Movies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

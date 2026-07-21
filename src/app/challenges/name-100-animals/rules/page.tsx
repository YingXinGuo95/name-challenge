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

const challenge = challenges.find((c) => c.slug === "name-100-animals");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/challenges/name-100-animals/rules`;

// ── Metadata ─────────────────────────────────────────────────────────

const pageTitle = "Name 100 Animals Challenge Rules — How to Play & Tips";
const pageDescription =
  "Learn the rules of the Name 100 Animals Challenge. Discover how Wikidata taxonomy validation works, get tips to name more animal species, and find answers to common questions. Free to play.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/challenges/name-100-animals/rules",
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
        alt: "Name 100 Animals Challenge Rules",
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
      name: "How do I play the Name 100 Animals Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Type the name of an animal species and press Enter or click Add. Each valid species verified by Wikidata taxonomy data counts toward your total of ${config.targetCount}. The timer starts with your first submission. Only species-level animals are accepted — no subspecies or breeds.`,
      },
    },
    {
      "@type": "Question",
      name: "What animal names are accepted in the challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All names are verified against Wikidata's taxonomy database. The animal must be classified as a species within kingdom Animalia. Both living and extinct animals are accepted. Subspecies (like Bengal tiger), breeds (like Persian cat), and varieties are not accepted.",
      },
    },
    {
      "@type": "Question",
      name: "How does Wikidata validation work for animals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you submit a name, the challenge queries Wikidata's database to check if the animal exists as a species-level taxon within kingdom Animalia. Wikidata uses standard biological taxonomy (taxon rank = species) to verify each entry. This ensures only true species count.",
      },
    },
    {
      "@type": "Question",
      name: "What are the rules of the Name 100 Animals Challenge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The rules are simple: (1) Name ${config.targetCount} animal species verified by Wikidata taxonomy. (2) Type a name and press Enter or click Add. (3) Only species-level animals count — subspecies and breeds are rejected. (4) Each name can only be used once — duplicates will not count. (5) The timer starts with your first submission — try to finish as fast as you can.`,
      },
    },
    {
      "@type": "Question",
      name: "Are there tips for naming 100 animals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Think across categories: mammals (lion, elephant, dolphin), birds (eagle, penguin, parrot), reptiles (crocodile, snake, turtle), amphibians (frog, salamander), fish (shark, salmon, clownfish), insects (butterfly, ant, bee), and extinct animals (dinosaur, mammoth, dodo).",
      },
    },
    {
      "@type": "Question",
      name: "Is the Name 100 Animals Challenge free?",
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
      name: "Name 100 Animals Challenge",
      item: `${siteUrl}/challenges/name-100-animals`,
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
      <div className="flex items-center gap-2 border-b-[2.5px] border-[#2D2D2D]/10 bg-[#FF6B35]/5 px-5 py-3.5">
        <Icon className="h-5 w-5 text-[#FF6B35]" aria-hidden="true" />
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
          <Link href="/" className="hover:text-[#FF6B35] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/challenges/name-100-animals"
            className="hover:text-[#FF6B35] transition-colors"
          >
            Name 100 Animals
          </Link>
          <span>/</span>
          <span className="text-[#2D2D2D]/70">Rules</span>
        </nav>

        {/* Hero */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#2D2D2D] bg-[#FF6B35]/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#FF6B35]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF6B35]">
              🦁 Name 100 Animals Challenge
            </span>
          </div>
          <h1 className="font-extrabold text-3xl uppercase tracking-tight text-[#2D2D2D] sm:text-4xl">
            How to Play &amp; Rules
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-[#2D2D2D]/60 sm:text-base">
            Everything you need to know about the Name 100 Animals Challenge —
            from basic rules to expert strategies.
          </p>
          <Link
            href="/challenges/name-100-animals"
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
                The <strong className="text-[#2D2D2D]">Name 100 Animals Challenge</strong>{" "}
                is a free online quiz that tests your knowledge of the animal
                kingdom. Your goal: name{" "}
                <strong className="text-[#2D2D2D]">{config.targetCount} animal species</strong>{" "}
                — real animals verified by Wikidata&apos;s taxonomy database.
              </p>
              <p>
                Every name you submit is instantly checked against Wikidata&apos;s
                database. The animal must be classified as a species-level taxon
                within kingdom Animalia. Subspecies (like "Bengal tiger"),
                breeds (like "Persian cat"), and varieties are not accepted —
                only true species count.
              </p>
              <p>
                Both living and extinct animals are accepted, from the mighty
                blue whale to the long-extinct Tyrannosaurus rex. The clock tracks
                your time, and you can submit your score to the leaderboard when
                you finish.
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
                  text: `Name ${config.targetCount} animal species — real animals verified by Wikidata taxonomy data.`,
                },
                {
                  icon: CheckCircle,
                  label: "How to play",
                  text: "Type an animal name and press Enter or click Add. Each valid species counts toward your total.",
                },
                {
                  icon: Ban,
                  label: "Species only — no subspecies or breeds",
                  text: 'Only species-level animals count. Subspecies (e.g., "Bengal tiger"), breeds (e.g., "Persian cat"), and varieties are rejected.',
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
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B35]"
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
          <SectionCard icon={Database} title="How Animal Validation Works">
            <div className="space-y-3 text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
              <p>
                When you submit a name, the challenge sends a query to{" "}
                <strong className="text-[#2D2D2D]">Wikidata</strong>, a free
                and open knowledge base that powers Wikipedia. Wikidata contains
                structured taxonomy data about millions of species.
              </p>
              <p>
                The validation checks two things:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong className="text-[#2D2D2D]">Is this an animal?</strong>{" "}
                  The name must match a taxon within kingdom Animalia in Wikidata.
                </li>
                <li>
                  <strong className="text-[#2D2D2D]">Is it a species?</strong>{" "}
                  The entry must have taxon rank = "species" in Wikidata&apos;s
                  biological classification. Subspecies, breeds, and varieties are
                  explicitly rejected.
                </li>
              </ul>
              <p>
                If both conditions are met, the name is accepted. Both living and
                extinct animals are included — dinosaurs count too!
              </p>
            </div>
          </SectionCard>

          {/* Tips */}
          <SectionCard icon={Lightbulb} title="Tips & Strategies">
            <div className="space-y-4">
              <p className="text-sm font-medium leading-relaxed text-[#2D2D2D]/70">
                The key to reaching {config.targetCount} is to think broadly
                across the animal kingdom. Here are some categories to get you started:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { cat: "Mammals", examples: "Lion, Tiger, Elephant, Dolphin, Bat, Kangaroo" },
                  { cat: "Birds", examples: "Eagle, Penguin, Owl, Parrot, Flamingo, Hummingbird" },
                  { cat: "Reptiles", examples: "Crocodile, Snake, Turtle, Chameleon, Iguana" },
                  { cat: "Amphibians", examples: "Frog, Toad, Salamander, Newt, Axolotl" },
                  { cat: "Fish", examples: "Shark, Salmon, Tuna, Clownfish, Seahorse, Eel" },
                  { cat: "Insects & Arachnids", examples: "Butterfly, Ant, Bee, Spider, Scorpion" },
                  { cat: "Marine Invertebrates", examples: "Octopus, Squid, Jellyfish, Starfish, Crab" },
                  { cat: "Extinct Animals", examples: "T-Rex, Dodo, Mammoth, Triceratops, Stegosaurus" },
                ].map(({ cat, examples }) => (
                  <div
                    key={cat}
                    className="rounded-xl border-[2.5px] border-[#2D2D2D]/10 bg-[#FF6B35]/[0.03] px-3.5 py-2.5"
                  >
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#FF6B35]">
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
                with well-known animals from each category, then drill deeper into
                groups you know well. Think about pets, farm animals, zoo animals,
                and wildlife you&apos;ve seen in documentaries!
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
                  q: 'Why is "dog" accepted but "German Shepherd" is not?',
                  a: "The challenge accepts species-level animals only. \"Dog\" (Canis lupus familiaris) is treated as a species in the game, while \"German Shepherd\" is a breed — a sub-category below the species level. Similarly, \"cat\" counts but \"Persian cat\" does not.",
                },
                {
                  q: "Are extinct animals accepted?",
                  a: "Yes! Dinosaurs, dodos, mammoths, and other extinct species are valid answers as long as they are classified as a species in Wikidata. The animal kingdom includes both living and extinct members.",
                },
                {
                  q: "What if an animal I submit is marked invalid?",
                  a: "Invalid names don't count against you — they simply don't add to your total. You can keep trying with different names. The animal might be classified as a subspecies in Wikidata, or it might not be recognized.",
                },
                {
                  q: "Can I use scientific names?",
                  a: "The challenge primarily uses common English names. Try the common name first (e.g., \"tiger\" not \"Panthera tigris\"). If the common name doesn't work, you can try the scientific name.",
                },
                {
                  q: "How is the leaderboard ranked?",
                  a: "Players are ranked by completion time — the faster you name 100 animals, the higher you rank. Only times in the top 100 appear on the leaderboard.",
                },
                {
                  q: "Can I replay the challenge?",
                  a: "Absolutely! Use the restart button to clear your progress and try again. Challenge yourself to beat your previous time.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-3.5">
                  <summary className="cursor-pointer text-sm font-extrabold uppercase tracking-tight text-[#2D2D2D] group-open:text-[#FF6B35] transition-colors list-none">
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
            className="overflow-hidden rounded-[24px] border-[2.5px] border-[#2D2D2D] bg-[#FF6B35]/5 px-6 py-8 sm:px-10 sm:py-10"
            style={{ boxShadow: "3px 5px 0 rgba(0,0,0,0.08)" }}
          >
            <Sparkles className="mx-auto mb-3 h-6 w-6 text-[#FF6B35]" />
            <h2 className="font-extrabold text-xl uppercase tracking-tight text-[#2D2D2D] sm:text-2xl">
              Ready to Test Your Animal Knowledge?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-[#2D2D2D]/60">
              Think you can name {config.targetCount} animal species? Put your
              knowledge to the test and see how you rank on the leaderboard.
            </p>
            <Link
              href="/challenges/name-100-animals"
              className="retro-btn-dark mt-5 inline-flex items-center gap-2"
            >
              Start Naming {config.targetCount} Animals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

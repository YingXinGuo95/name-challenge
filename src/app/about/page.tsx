import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { Sparkles, Database, Trophy, Heart, CheckCircle } from "lucide-react";
import challenges from "@/data/challenges";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/about`;
const pageTitle = "About Us — Name 100 Challenge";
const pageDescription =
  "Discover the story behind Name 100 Challenge: interactive memory & trivia games verified by Wikidata open-knowledge graphs. Free to play, fast, and educational.";

export const metadata: Metadata = {
  title: "About Us",
  description: pageDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: pageUrl,
    siteName: "Name 100 Challenge",
  },
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
      name: "About Us",
      item: pageUrl,
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav
          className="mb-6 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#2D2D2D]/50"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#FF8FAB] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#2D2D2D]/70">About Us</span>
        </nav>

        {/* Header Hero */}
        <div className="mb-10 space-y-4 rounded-3xl border-[2.5px] border-[#2D2D2D] bg-white p-6 sm:p-10 shadow-[3px_5px_0_rgba(0,0,0,0.1)] text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="retro-btn mx-auto sm:mx-0 h-16 w-16 !rounded-2xl text-3xl">
              🎯
            </div>
            <div>
              <h1 className="text-3xl font-extrabold uppercase tracking-tight text-[#2D2D2D] sm:text-4xl">
                About Name 100 Challenge
              </h1>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FF8FAB] mt-1">
                Fast-paced Memory & Knowledge Challenges
              </p>
            </div>
          </div>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground pt-2">
            Name 100 Challenge was created to answer a simple, engaging question:{" "}
            <em>"How many items can your brain recall under pressure?"</em> Whether it's naming 100 historical women, world countries, animal species, or Pokémon, our platform provides instant, reliable entity verification using open linked data.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="space-y-8">
          <section className="space-y-4 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase text-[#2D2D2D]">
              <Database className="h-5 w-5 text-[#5B9BD5]" />
              Powered by Wikidata Open Knowledge
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Unlike static quiz sites with fixed, outdated answer lists, Name 100 Challenge is connected to <strong>Wikidata</strong> — the free, multilingual knowledge graph operated by the Wikimedia Foundation. Every submission is dynamically queried or validated against verified entity records, ensuring fairness, inclusivity, and accuracy.
            </p>
          </section>

          {/* Game Challenges Overview */}
          <section className="space-y-4 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase text-[#2D2D2D]">
              <Sparkles className="h-5 w-5 text-[#FF8FAB]" />
              Our Challenges
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {challenges.map((c) => (
                <div
                  key={c.slug}
                  className="flex items-start gap-3 rounded-xl border-[2.5px] border-[#2D2D2D]/15 bg-white p-4"
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <h3 className="font-extrabold uppercase text-[#2D2D2D] text-sm">
                      {c.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why We Built This */}
          <section className="space-y-4 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-xl font-extrabold uppercase text-[#2D2D2D]">
              <Trophy className="h-5 w-5 text-[#FFCB05]" />
              Our Principles
            </h2>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center gap-2.5 rounded-xl border border-[#2D2D2D]/10 bg-white/80 p-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-[#4CAF50]" />
                <span><strong>100% Free:</strong> No paywalls or mandatory accounts needed to play.</span>
              </li>
              <li className="flex items-center gap-2.5 rounded-xl border border-[#2D2D2D]/10 bg-white/80 p-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-[#4CAF50]" />
                <span><strong>Privacy First:</strong> Minimal data collection with transparent policies.</span>
              </li>
              <li className="flex items-center gap-2.5 rounded-xl border border-[#2D2D2D]/10 bg-white/80 p-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-[#4CAF50]" />
                <span><strong>Speed & Performance:</strong> Built with Next.js for instant responsiveness.</span>
              </li>
              <li className="flex items-center gap-2.5 rounded-xl border border-[#2D2D2D]/10 bg-white/80 p-3">
                <CheckCircle className="h-4 w-4 shrink-0 text-[#4CAF50]" />
                <span><strong>Fair Competition:</strong> Real-time anti-cheat timing and leaderboard tracking.</span>
              </li>
            </ul>
          </section>

          {/* Contact link CTA */}
          <div className="rounded-2xl border-[2.5px] border-[#2D2D2D] bg-[#F5E6D3] p-6 text-center space-y-3">
            <h3 className="text-lg font-extrabold uppercase text-[#2D2D2D]">
              Have a suggestion or challenge idea?
            </h3>
            <p className="text-xs font-medium text-muted-foreground max-w-md mx-auto">
              We love feedback from trivia enthusiasts! Drop us a message on our contact page or Twitter.
            </p>
            <Link
              href="/contact"
              className="retro-btn-dark inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider text-white"
            >
              <Heart className="h-4 w-4 text-[#FF8FAB]" />
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

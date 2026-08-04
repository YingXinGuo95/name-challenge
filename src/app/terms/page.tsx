import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { FileText, CheckCircle2, AlertTriangle, Shield, Scale } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/terms`;
const pageTitle = "Terms of Service — Name 100 Challenge";
const pageDescription =
  "Read the Terms of Service for Name 100 Challenge. Rules of usage, fair play leaderboards, intellectual property statements, and disclaimers.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: pageDescription,
  alternates: {
    canonical: "/terms",
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
      name: "Terms of Service",
      item: pageUrl,
    },
  ],
};

export default function TermsPage() {
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
          <span className="text-[#2D2D2D]/70">Terms of Service</span>
        </nav>

        {/* Header */}
        <div className="mb-10 space-y-3 rounded-3xl border-[2.5px] border-[#2D2D2D] bg-white p-6 sm:p-8 shadow-[3px_5px_0_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-3">
            <div className="retro-btn h-12 w-12 !rounded-2xl text-xl">
              <FileText className="h-6 w-6 text-[#2D2D2D]" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold uppercase tracking-tight text-[#2D2D2D] sm:text-3xl">
                Terms of Service
              </h1>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FF8FAB]">
                Last Updated: August 4, 2026
              </p>
            </div>
          </div>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground">
            Welcome to <strong>Name 100 Challenge</strong>. These Terms of Service outline the rules and regulations for the use of our website located at{" "}
            <a href={siteUrl} className="underline text-[#2D2D2D]">
              {siteUrl}
            </a>
            . By accessing or playing games on this site, you accept these terms in full.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-sm font-medium leading-relaxed text-[#2D2D2D]/90">
          {/* Section 1 */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <CheckCircle2 className="h-5 w-5 text-[#4CAF50]" />
              1. Acceptable Use & Fair Play Policy
            </h2>
            <p>
              Name 100 Challenge provides web-based quiz and trivia games verified by Wikidata. When using our services, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Use the site for lawful, personal, non-commercial entertainment and educational purposes only.</li>
              <li>Not engage in automated scraping, bot submissions, or script injections to manipulate online leaderboards.</li>
              <li>Not attempt to disrupt or overwhelm our API servers or Wikidata query endpoints.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <Scale className="h-5 w-5 text-[#5B9BD5]" />
              2. Intellectual Property & Sourced Data
            </h2>
            <p>
              Knowledge verification data used on Name 100 Challenge is sourced directly from <strong>Wikidata</strong> and licensed under the <strong>Creative Commons CC0 1.0 Universal Public Domain Dedication</strong>.
            </p>
            <div className="rounded-xl border-[2.5px] border-[#2D2D2D]/15 bg-[#F5E6D3]/40 p-4 space-y-1.5 text-xs text-muted-foreground">
              <p>
                <strong>Trademarks & Fan Disclaimers:</strong>
              </p>
              <p>
                "Pokémon" and Pokémon character names are registered trademarks of Nintendo, Creatures Inc., and GAME FREAK Inc. Name 100 Challenge is an independent trivia site and is not affiliated with, endorsed by, or sponsored by Nintendo, Creatures Inc., or GAME FREAK. Pokémon trivia names are referenced under fair use principles for educational and entertainment purposes.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <AlertTriangle className="h-5 w-5 text-[#FFCB05]" />
              3. Limitation of Liability & Disclaimers
            </h2>
            <p>
              The games, content, and leaderboards on Name 100 Challenge are provided on an "as is" and "as available" basis without warranties of any kind.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>We do not warrant that the website will be uninterrupted, error-free, or entirely bug-free.</li>
              <li>Wikidata entity databases evolve over time; we do not guarantee 100% completeness or infallibility of third-party public databases.</li>
              <li>Under no circumstances shall Name 100 Challenge be liable for any direct, indirect, or incidental damages arising out of your use of the website.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <Shield className="h-5 w-5 text-[#FF6B35]" />
              4. External Links & Third-Party Advertising
            </h2>
            <p>
              Our site may display advertisements from third-party networks (such as Google AdSense) or links to external websites. We do not control or endorse the content or practices of third-party sites or advertisements and encourage users to review their respective terms and privacy policies.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

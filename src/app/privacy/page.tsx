import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { ShieldCheck, Cookie, Eye, Lock, RefreshCw, Mail } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/privacy`;
const pageTitle = "Privacy Policy — Name 100 Challenge";
const pageDescription =
  "Learn how Name 100 Challenge protects your privacy, uses cookies for analytics and advertising, and respects your data rights in compliance with GDPR and CCPA.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: pageDescription,
  alternates: {
    canonical: "/privacy",
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
      name: "Privacy Policy",
      item: pageUrl,
    },
  ],
};

export default function PrivacyPage() {
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
          <span className="text-[#2D2D2D]/70">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-10 space-y-3 rounded-3xl border-[2.5px] border-[#2D2D2D] bg-white p-6 sm:p-8 shadow-[3px_5px_0_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-3">
            <div className="retro-btn h-12 w-12 !rounded-2xl text-xl">
              <ShieldCheck className="h-6 w-6 text-[#2D2D2D]" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold uppercase tracking-tight text-[#2D2D2D] sm:text-3xl">
                Privacy Policy
              </h1>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FF8FAB]">
                Last Updated: August 4, 2026
              </p>
            </div>
          </div>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground">
            At <strong>Name 100 Challenge</strong> (accessible from{" "}
            <a href={siteUrl} className="underline text-[#2D2D2D]">
              {siteUrl}
            </a>
            ), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Name 100 Challenge and how we use it.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-sm font-medium leading-relaxed text-[#2D2D2D]/90">
          {/* Section 1 */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <Eye className="h-5 w-5 text-[#FF8FAB]" />
              1. Information We Collect
            </h2>
            <p>
              We prioritize user privacy. Name 100 Challenge is designed to be fully playable without requiring mandatory user registration or personal profile creation. However, to operate the site, ensure security, and deliver third-party services, we may collect the following data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>
                <strong>Log Files & Technical Data:</strong> Like most websites, we collect standard server log files. This includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and click count. This data is not linked to personally identifiable information.
              </li>
              <li>
                <strong>Gameplay & Performance Metrics:</strong> Anonymous data regarding quiz completion times, scores, and submitted answers to calculate global leaderboards and system analytics.
              </li>
              <li>
                <strong>Voluntary Contact Information:</strong> If you reach out to us via email or contact forms, we receive your email address and any content you voluntarily share.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <Cookie className="h-5 w-5 text-[#5B9BD5]" />
              2. Cookies & Third-Party Advertising (Google AdSense)
            </h2>
            <p>
              Name 100 Challenge uses cookies and local storage to store user preferences, store game high scores locally, and analyze website traffic.
            </p>
            <div className="rounded-xl border-[2.5px] border-[#2D2D2D]/15 bg-[#F5E6D3]/40 p-4 space-y-2">
              <h3 className="font-extrabold text-[#2D2D2D] uppercase text-xs tracking-wider">
                Google AdSense & DoubleClick DART Cookies
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <code>name100challenge.me</code> and other sites on the internet.
              </p>
              <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</li>
                <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#2D2D2D]">Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#2D2D2D]">aboutads.info</a>.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <Lock className="h-5 w-5 text-[#4CAF50]" />
              3. GDPR & CCPA Privacy Rights
            </h2>
            <p>
              Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), users have specific data protection rights:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li><strong>Right to Access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
              <li><strong>Right to Opt-Out / Object:</strong> You can opt out of the sale of personal information or personalized advertising via our Cookie Banner or browser settings.</li>
              <li><strong>Non-Discrimination:</strong> We will not discriminate against any user for exercising their privacy rights.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <RefreshCw className="h-5 w-5 text-[#FFCB05]" />
              4. Third-Party Service Providers
            </h2>
            <p>
              We collaborate with trusted infrastructure and analytics providers to deliver our games smoothly:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li><strong>Google Analytics:</strong> For aggregate website traffic metrics and demographic insights.</li>
              <li><strong>Wikidata (Wikimedia Foundation):</strong> Query source for verifying public figure entities and categories under CC0.</li>
              <li><strong>Supabase:</strong> For cloud backend database hosting score verification and global leaderboard rankings.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <Mail className="h-5 w-5 text-[#FF6B35]" />
              5. Contact Us Regarding Privacy
            </h2>
            <p>
              If you have additional questions, require more information about our Privacy Policy, or wish to exercise any of your data protection rights, do not hesitate to contact us:
            </p>
            <p className="font-extrabold text-[#2D2D2D]">
              Email: <a href="mailto:privacy@name100challenge.me" className="underline hover:text-[#FF8FAB]">privacy@name100challenge.me</a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/layout/JsonLd";
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://name100challenge.me";
const pageUrl = `${siteUrl}/contact`;
const pageTitle = "Contact Us — Name 100 Challenge";
const pageDescription =
  "Have feedback, bug reports, or questions? Contact the Name 100 Challenge team. We are happy to help and answer inquiries.";

export const metadata: Metadata = {
  title: "Contact Us",
  description: pageDescription,
  alternates: {
    canonical: "/contact",
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
      name: "Contact Us",
      item: pageUrl,
    },
  ],
};

export default function ContactPage() {
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
          <span className="text-[#2D2D2D]/70">Contact Us</span>
        </nav>

        {/* Header */}
        <div className="mb-10 space-y-3 rounded-3xl border-[2.5px] border-[#2D2D2D] bg-white p-6 sm:p-8 shadow-[3px_5px_0_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-3">
            <div className="retro-btn h-12 w-12 !rounded-2xl text-xl">
              <Mail className="h-6 w-6 text-[#2D2D2D]" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold uppercase tracking-tight text-[#2D2D2D] sm:text-3xl">
                Contact Us
              </h1>
              <p className="text-xs font-bold uppercase tracking-wider text-[#FF8FAB]">
                We'd love to hear from you!
              </p>
            </div>
          </div>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground">
            Whether you have suggestions for new naming challenges, found a missing entry in our Wikidata verification dictionary, or want to discuss business and advertising opportunities, feel free to get in touch.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Direct Email Card */}
          <div className="flex flex-col justify-between space-y-6 rounded-2xl border-[2.5px] border-[#2D2D2D] bg-white p-6 shadow-[3px_5px_0_rgba(0,0,0,0.06)]">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-lg font-extrabold uppercase text-[#2D2D2D]">
                <MessageSquare className="h-5 w-5 text-[#5B9BD5]" />
                Direct Email Inquiries
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                For general support, privacy inquiries, or feedback:
              </p>

              <div className="space-y-3 rounded-xl border-[2.5px] border-[#2D2D2D]/15 bg-[#F5E6D3]/40 p-4 text-xs font-medium">
                <div>
                  <span className="block font-extrabold text-[#2D2D2D] uppercase tracking-wider text-[10px]">
                    General & Support:
                  </span>
                  <a
                    href="mailto:contact@name100challenge.me"
                    className="font-bold text-[#2D2D2D] underline hover:text-[#FF8FAB]"
                  >
                    contact@name100challenge.me
                  </a>
                </div>
                <div>
                  <span className="block font-extrabold text-[#2D2D2D] uppercase tracking-wider text-[10px]">
                    Privacy & Legal:
                  </span>
                  <a
                    href="mailto:privacy@name100challenge.me"
                    className="font-bold text-[#2D2D2D] underline hover:text-[#FF8FAB]"
                  >
                    privacy@name100challenge.me
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t-[2.5px] border-[#2D2D2D]/10 pt-4">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-[#4CAF50]">
                <CheckCircle2 className="h-4 w-4" /> Response Time Guarantee
              </div>
              <p className="text-[11px] text-muted-foreground">
                We aim to respond to all inquiries within 24 to 48 business hours.
              </p>
            </div>
          </div>

          {/* Quick FAQ / Note */}
          <div className="space-y-6 rounded-2xl border-[2.5px] border-[#2D2D2D]/20 bg-white/60 p-6">
            <div className="flex items-center gap-2 text-lg font-extrabold uppercase text-[#2D2D2D]">
              <HelpCircle className="h-5 w-5 text-[#FF8FAB]" />
              Frequently Asked Support Topics
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
              <div>
                <h4 className="font-extrabold uppercase text-[#2D2D2D] text-xs">
                  Q: Why wasn't my valid name recognized?
                </h4>
                <p className="mt-1">
                  Our validation engine checks against official Wikidata entity labels and aliases. If a valid entity is missing, drop us an email with the name and person/place link, and we'll update our cache!
                </p>
              </div>

              <div>
                <h4 className="font-extrabold uppercase text-[#2D2D2D] text-xs">
                  Q: How can I submit a new challenge topic?
                </h4>
                <p className="mt-1">
                  We love community ideas! Send us your proposed topic (e.g., "100 Scientists", "100 Capitals") and we'll build a custom Wikidata query for it.
                </p>
              </div>

              <div>
                <h4 className="font-extrabold uppercase text-[#2D2D2D] text-xs">
                  Q: AdSense / Partnership opportunities?
                </h4>
                <p className="mt-1">
                  We are open to partnerships, sponsorship, and ad placement feedback. Please reach out via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

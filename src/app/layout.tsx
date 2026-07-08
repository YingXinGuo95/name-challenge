import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth/auth-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Name 100 Women Challenge",
    template: "%s | Name 100 Women",
  },
  description:
    "Can you name 100 famous women? A fun challenge verified by Wikidata — type a name and see if she's a real female public figure.",
  keywords: ["name 100 women", "challenge", "quiz", "wikidata", "trivia"],
  openGraph: {
    title: "Name 100 Women Challenge",
    description:
      "Can you name 100 famous women? A fun challenge verified by Wikidata.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={cn("font-sans", inter.variable)} lang="en">
      <body className="min-h-screen bg-background antialiased">
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

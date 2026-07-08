This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (dark mode, aurora BG, Header/Footer, DrawlyProvider)
│   ├── page.tsx              # Landing page (HeroSection, HowItWorks, FeaturesGrid, CTASection)
│   ├── globals.css           # Global styles, glassmorphism, animations, print styles
│   ├── robots.ts             # SEO robots config
│   ├── sitemap.ts            # SEO sitemap
│   └── tools/
│       └── world-cup-2026-sweepstake/  # The primary tool
│           ├── page.tsx                # Tool page (server component with metadata)
│           ├── results/page.tsx        # Results page (server component with metadata)
│           ├── _components/            # Client components for the tool
│           │   ├── drawly-context.tsx   # React Context + useReducer state management
│           │   ├── ParticipantInput.tsx # Step 1: enter participants
│           │   ├── ModeSelector.tsx     # Step 2: pick assignment mode
│           │   ├── PrizeSetup.tsx       # Step 3: configure prizes
│           │   ├── GeneratePanel.tsx    # Step 4: generate & redirect to results
│           │   ├── ResultsPage.tsx      # Results page (client wrapper, handles share links)
│           │   ├── ResultsView.tsx      # Table/card views with sorting
│           │   ├── ShareActions.tsx     # Share/export results
│           │   ├── PrintView.tsx        # Print-optimized view
│           │   ├── FAQSection.tsx       # SEO FAQ content
│           │   └── SeoContent.tsx       # SEO content sections
│           └── _lib/                   # Pure logic modules
│               ├── types.ts            # Shared TypeScript types
│               ├── shuffle.ts          # Fisher-Yates shuffle + secure random + participant parser
│               ├── teams.ts            # 48 WC 2026 teams data
│               ├── prizes.ts           # Prize templates & helpers
│               └── share.ts            # Base64 URL encoding/decoding for sharing
├── components/
│   ├── ui/                   # shadcn/ui components (button, card, avatar, input, etc.)
│   ├── layout/               # Header, Footer
│   └── landing/              # Landing page sections (HeroSection, HowItWorks, FeaturesGrid, CTASection)
└── lib/
    ├── utils.ts              # cn() utility
    └── logger.ts             # pino logger instance
```
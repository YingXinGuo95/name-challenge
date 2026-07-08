export interface Challenge {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  color: string; // tailwind bg class for card
}

const challenges: Challenge[] = [
  {
    slug: "name-100-women",
    title: "Name 100 Women",
    emoji: "♀",
    description:
      "Name 100 famous women — real female public figures verified by Wikidata. From scientists to artists, activists to athletes.",
    color: "bg-[#FF8FAB]",
  },
];

export default challenges;

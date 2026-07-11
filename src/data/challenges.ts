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
  {
    slug: "name-100-men",
    title: "Name 100 Men",
    emoji: "♂",
    description:
      "Name 100 famous men — real male public figures verified by Wikidata. From scientists to artists, leaders to athletes.",
    color: "bg-[#5B9BD5]",
  },
];

export default challenges;

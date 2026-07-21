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
  {
    slug: "name-100-countries",
    title: "Name 100 Countries",
    emoji: "🌍",
    description:
      "Name 100 countries from every continent — instant local validation against a dataset of 250+ nations and territories.",
    color: "bg-[#4CAF50]",
  },
  {
    slug: "name-100-pokemon",
    title: "Name 100 Pokémon",
    emoji: "⚡",
    description:
      "Gotta name 'em all! Name 100 Pokémon across all 9 generations — instant local validation against 300+ Pokémon.",
    color: "bg-[#FFCB05]",
  },
  {
    slug: "name-100-animals",
    title: "Name 100 Animals",
    emoji: "🦁",
    description:
      "Name 100 animal species from across the animal kingdom — Wikidata-verified taxonomy ensures only true species count. Mammals, birds, reptiles, fish, insects & extinct animals!",
    color: "bg-[#FF6B35]",
  },
];

export default challenges;

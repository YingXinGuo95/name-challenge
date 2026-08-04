/**
 * Local dataset of famous movies used for instant local lookup and fallback.
 *
 * Each entry maps a display title → Wikidata Q-ID.
 * Every Q-ID below was programmatically verified against the Wikidata
 * search/entity APIs (wbsearchentities + wbgetentities P31 check) — do not
 * guess when adding new entries.
 *
 * To extend: add entries in the format `"Display Title": "Q-ID"`.
 * The dataset is intentionally large (140+) to support 100-name challenges.
 */
const FAMOUS_MOVIES: Record<string, string> = {
  // --- All-Time Classics & Oscars ---
  "The Godfather": "Q47703",
  "The Godfather Part II": "Q184768",
  "The Shawshank Redemption": "Q172241",
  "Pulp Fiction": "Q104123",
  "Schindler's List": "Q483941",
  "Casablanca": "Q132689",
  "Citizen Kane": "Q24815",
  "12 Angry Men": "Q2345",
  "Forrest Gump": "Q134773",
  "One Flew Over the Cuckoo's Nest": "Q171669",
  "Goodfellas": "Q42047",
  "The Silence of the Lambs": "Q133654",
  "It's a Wonderful Life": "Q204191",
  "Life Is Beautiful": "Q19355",
  "Saving Private Ryan": "Q165817",
  "The Green Mile": "Q208263",
  "Rear Window": "Q34414",
  "Psycho": "Q163038",
  "Gone with the Wind": "Q2875",
  "The Wizard of Oz": "Q193695",
  "Singin' in the Rain": "Q309153",
  "The Sound of Music": "Q60072",
  "Lawrence of Arabia": "Q228186",
  "The Good, the Bad and the Ugly": "Q41483",
  "Doctor Zhivago": "Q323827",

  // --- Sci-Fi & Adventure ---
  "Inception": "Q25188",
  "Interstellar": "Q13417189",
  "The Matrix": "Q83495",
  "Star Wars": "Q17738",
  "The Empire Strikes Back": "Q181795",
  "Return of the Jedi": "Q181803",
  "Star Wars: The Force Awakens": "Q6074",
  "Blade Runner": "Q184843",
  "Blade Runner 2049": "Q21500755",
  "2001: A Space Odyssey": "Q103474",
  "Alien": "Q103569",
  "Aliens": "Q104814",
  "The Terminator": "Q162255",
  "Terminator 2: Judgment Day": "Q170564",
  "Jurassic Park": "Q167726",
  "Avatar": "Q24871",
  "Avatar: The Way of Water": "Q3604746",
  "Back to the Future": "Q91540",
  "E.T. the Extra-Terrestrial": "Q11621",
  "Dune": "Q60834962",
  "Dune: Part Two": "Q109228991",

  // --- Action, Superhero & Thrillers ---
  "The Dark Knight": "Q163872",
  "The Dark Knight Rises": "Q189330",
  "Batman Begins": "Q166262",
  "The Avengers": "Q182218",
  "Avengers: Endgame": "Q23781155",
  "Avengers: Infinity War": "Q23780914",
  "Spider-Man": "Q484442",
  "Spider-Man: Into the Spider-Verse": "Q29588607",
  "Iron Man": "Q192724",
  "Black Panther": "Q23780734",
  "Wonder Woman": "Q20502242",
  "Deadpool": "Q19347291",
  "Fight Club": "Q190050",
  "Gladiator": "Q128518",
  "Die Hard": "Q105598",
  "Mad Max: Fury Road": "Q1757288",
  "Top Gun": "Q110138",
  "Top Gun: Maverick": "Q31202708",
  "Raiders of the Lost Ark": "Q174284",
  "Mission: Impossible": "Q1741232",
  "John Wick": "Q15732802",

  // --- Drama, Romance & Crime ---
  "Titanic": "Q44578",
  "The Departed": "Q172975",
  "The Prestige": "Q46551",
  "Whiplash": "Q15648198",
  "La La Land": "Q20856802",
  "The Wolf of Wall Street": "Q1392744",
  "Good Will Hunting": "Q193835",
  "Catch Me If You Can": "Q208108",
  "Parasite": "Q61448040",
  "Oppenheimer": "Q108839994",
  "Barbie": "Q55436290",
  "There Will Be Blood": "Q244315",
  "No Country for Old Men": "Q183081",
  "The Social Network": "Q185888",
  "American Beauty": "Q25139",
  "Se7en": "Q190908",
  "The Usual Suspects": "Q132351",
  "Braveheart": "Q162729",
  "The Pianist": "Q150804",
  "Taxi Driver": "Q47221",
  "Joker": "Q42759035",
  "Django Unchained": "Q571032",
  "Inglourious Basterds": "Q153723",
  "Once Upon a Time in Hollywood": "Q47300912",
  "A Beautiful Mind": "Q164103",
  "The King's Speech": "Q160060",
  "Rocky": "Q188652",
  "1917": "Q62721520",
  "The Graduate": "Q217627",
  "Pretty Woman": "Q207954",
  "The Breakfast Club": "Q499152",

  // --- Animation & Family ---
  "Spirited Away": "Q155653",
  "My Neighbor Totoro": "Q39571",
  "Princess Mononoke": "Q186572",
  "Toy Story": "Q171048",
  "Toy Story 3": "Q187278",
  "The Lion King": "Q36479",
  "Finding Nemo": "Q132863",
  "WALL-E": "Q104905",
  "Up": "Q174811",
  //"Coco": "Q5815826",
  "Inside Out": "Q6144664",
  "Ratatouille": "Q170035",
  "Monsters, Inc.": "Q187726",
  "Shrek": "Q483815",
  "Frozen": "Q246283",
  "Moana": "Q18647981",
  "Zootopia": "Q15270647",
  "Beauty and the Beast": "Q179673",
  "Aladdin": "Q215518",
  "The Incredibles": "Q213326",
  "Encanto": "Q103372692",

  // --- Fantasy & Mystery ---
  "The Lord of the Rings: The Fellowship of the Ring": "Q127367",
  "The Lord of the Rings: The Two Towers": "Q164963",
  "The Lord of the Rings: The Return of the King": "Q131074",
  "Harry Potter and the Sorcerer's Stone": "Q102438",
  "Harry Potter and the Chamber of Secrets": "Q102244",
  "Harry Potter and the Prisoner of Azkaban": "Q102448",
  "Harry Potter and the Goblet of Fire": "Q102225",
  "Harry Potter and the Deathly Hallows – Part 2": "Q232009",
  "The Hobbit: An Unexpected Journey": "Q80379",
  "Pirates of the Caribbean: The Curse of the Black Pearl": "Q46717",
  "Everything Everywhere All at Once": "Q83808444",
  "The Truman Show": "Q214801",
  "Eternal Sunshine of the Spotless Mind": "Q208269",
  "Groundhog Day": "Q488655",
  "The Sixth Sense": "Q183063",
  "Shutter Island": "Q210364",
  "Donnie Darko": "Q426828",
  "The Grand Budapest Hotel": "Q3521099",
  "The Big Lebowski": "Q337078",
  "Fargo": "Q222720",
  "Knives Out": "Q57982486",

  // --- Horror & Sci-Fi Thrillers ---
  "The Shining": "Q186341",
  "Jaws": "Q189505",
  "The Exorcist": "Q274167",
  "Halloween": "Q221103",
  "A Nightmare on Elm Street": "Q329434",
  "Get Out": "Q25136235",
  "A Quiet Place": "Q39070473",
  "The Thing": "Q210756",
  "Scream": "Q27411",
};

/** Normalize a movie title for lookup: lowercase, trimmed, remove extra spaces. */
function normalize(title: string): string {
  return title.toLowerCase().trim().replace(/\s+/g, " ");
}

/** All known display titles keyed by their normalized form. */
const LOOKUP_MAP: Record<string, { display: string; qid: string }> = {};
for (const [display, qid] of Object.entries(FAMOUS_MOVIES)) {
  LOOKUP_MAP[normalize(display)] = { display, qid };
}

export interface LocalLookupResult {
  valid: true;
  qid: string;
  display: string;
}

/**
 * Look up a movie title in the local dataset.
 * Returns `null` if the movie is not found.
 */
export function localLookup(name: string): LocalLookupResult | null {
  const key = normalize(name);
  const entry = LOOKUP_MAP[key];
  if (!entry) return null;
  return { valid: true, qid: entry.qid, display: entry.display };
}

/** Total number of entries in the dataset. */
export const DATASET_SIZE = Object.keys(FAMOUS_MOVIES).length;

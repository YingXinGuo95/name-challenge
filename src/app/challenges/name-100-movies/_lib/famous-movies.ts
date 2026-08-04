/**
 * Local dataset of famous movies used for instant local lookup and fallback.
 *
 * Each entry maps display title -> Wikidata Q-ID.
 */
const FAMOUS_MOVIES: Record<string, string> = {
  // --- All-Time Classics & Oscars ---
  "The Godfather": "Q47703",
  "The Godfather Part II": "Q184768",
  "The Shawshank Redemption": "Q172241",
  "Pulp Fiction": "Q104123",
  "Schindler's List": "Q483941",
  "Casablanca": "Q132689",
  "Citizen Kane": "Q77821",
  "12 Angry Men": "Q177405",
  "Forrest Gump": "Q134773",
  "One Flew Over the Cuckoo's Nest": "Q171669",
  "Goodfellas": "Q190281",
  "The Silence of the Lambs": "Q133058",
  "It's a Wonderful Life": "Q204191",
  "Life Is Beautiful": "Q19355",
  "Saving Private Ryan": "Q165817",
  "The Green Mile": "Q172241",
  "Rear Window": "Q57144",
  "Psycho": "Q157436",
  "Modern Times": "Q70600",
  "City Lights": "Q50923",

  // --- Sci-Fi & Adventure ---
  "Inception": "Q25188",
  "Interstellar": "Q13417189",
  "The Matrix": "Q83495",
  "Star Wars": "Q17738",
  "The Empire Strikes Back": "Q181787",
  "Return of the Jedi": "Q181803",
  "Blade Runner": "Q184843",
  "Blade Runner 2049": "Q21500755",
  "2001: A Space Odyssey": "Q103474",
  "Alien": "Q103569",
  "Aliens": "Q104814",
  "Terminator": "Q10000",
  "Terminator 2: Judgment Day": "Q170297",
  "Jurassic Park": "Q192724",
  "Avatar": "Q24871",
  "Avatar: The Way of Water": "Q3604746",
  "Back to the Future": "Q91540",
  "E.T. the Extra-Terrestrial": "Q11621",
  "Dune": "Q60834967",
  "Dune: Part Two": "Q109228948",

  // --- Action, Superhero & Thrillers ---
  "The Dark Knight": "Q163872",
  "The Dark Knight Rises": "Q189330",
  "Batman Begins": "Q166262",
  "The Avengers": "Q182218",
  "Avengers: Endgame": "Q23781155",
  "Avengers: Infinity War": "Q23780914",
  "Spider-Man": "Q484442",
  "Spider-Man: Into the Spider-Verse": "Q43259441",
  "Iron Man": "Q192724",
  "Black Panther": "Q23780734",
  "Fight Club": "Q190050",
  "Gladiator": "Q24871",
  "Die Hard": "Q26838",
  "Speed": "Q219250",
  "Mad Max: Fury Road": "Q1757288",
  "Top Gun": "Q110138",
  "Top Gun: Maverick": "Q312569",
  "Indiana Jones and the Raiders of the Lost Ark": "Q174280",
  "Mission: Impossible": "Q135621",
  "John Wick": "Q15732802",

  // --- Drama, Romance & Crime ---
  "Titanic": "Q44578",
  "The Departed": "Q172973",
  "The Prestige": "Q46551",
  "Whiplash": "Q14829697",
  "La La Land": "Q20856802",
  "The Wolf of Wall Street": "Q1392744",
  "Good Will Hunting": "Q193835",
  "Catch Me If You Can": "Q208108",
  "Parasite": "Q61988019",
  "Oppenheimer": "Q108839994",
  "Barbie": "Q55436290",
  "There Will Be Blood": "Q244357",
  "No Country for Old Men": "Q183081",
  "The Social Network": "Q185888",
  "American Beauty": "Q25139",
  "Se7en": "Q190908",
  "Usual Suspects": "Q132321",
  "Braveheart": "Q162729",
  "The Pianist": "Q150804",
  "Taxi Driver": "Q190145",

  // --- Animation & Family ---
  "Spirited Away": "Q155653",
  "My Neighbor Totoro": "Q191970",
  "Princess Mononoke": "Q186572",
  "Toy Story": "Q171048",
  "Toy Story 3": "Q187999",
  "The Lion King": "Q82342",
  "Finding Nemo": "Q132863",
  "WALL-E": "Q104905",
  "Up": "Q174811",
  "Coco": "Q21500755",
  "Inside Out": "Q6144664",
  "Ratatouille": "Q170075",
  "Monsters, Inc.": "Q187743",
  "Shrek": "Q483815",
  "Frozen": "Q246320",
  "Moana": "Q18644490",
  "Zootopia": "Q15270647",
  "Beauty and the Beast": "Q179673",
  "Aladdin": "Q215518",
  "The Incredibles": "Q213326",

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

  // --- Horror & Sci-Fi Thrillers ---
  "The Shining": "Q186341",
  "Jaws": "Q189505",
  "The Exorcist": "Q274167",
  "Halloween": "Q221103",
  "A Nightmare on Elm Street": "Q329434",
  "Get Out": "Q25136235",
  "A Quiet Place": "Q39070420",
  "The Thing": "Q210756",
  "Scream": "Q27411",
  "Silence": "Q18816882",
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

/**
 * Local dataset of famous men used as a fallback when Wikidata is unreachable.
 *
 * Each entry: input name → lowercase key for lookups.
 * Sourced from Wikidata; Q-IDs provided for consistency.
 *
 * To extend: add entries in the format `"Display Name": "Q-ID"`.
 * The dataset is intentionally large (~200+) to support 100-name challenges.
 */
const FAMOUS_MEN: Record<string, string> = {
  // --- Activists & Nobel Laureates ---
  "Martin Luther King Jr.": "Q8027",
  "Mahatma Gandhi": "Q1001",
  "Nelson Mandela": "Q8023",
  "Albert Schweitzer": "Q49325",
  "Desmond Tutu": "Q54680",
  "Malcolm X": "Q43379",
  "Cesar Chavez": "Q355425",
  "Frederick Douglass": "Q215562",
  "Dalai Lama": "Q17293",
  "Kofi Annan": "Q1254",
  "Mikhail Gorbachev": "Q30487",
  "Lech Wałęsa": "Q444",

  // --- Writers ---
  "William Shakespeare": "Q692",
  "Charles Dickens": "Q5686",
  "Mark Twain": "Q7245",
  "Ernest Hemingway": "Q23434",
  "Fyodor Dostoevsky": "Q991",
  "Leo Tolstoy": "Q7243",
  "George Orwell": "Q3335",
  "James Joyce": "Q6882",
  "Franz Kafka": "Q905",
  "Gabriel García Márquez": "Q5878",
  "J.R.R. Tolkien": "Q892",
  "Homer": "Q6691",
  "Victor Hugo": "Q535",
  "Oscar Wilde": "Q30875",
  "Edgar Allan Poe": "Q16867",
  "Herman Melville": "Q4985",
  "F. Scott Fitzgerald": "Q93354",
  "John Steinbeck": "Q39212",
  "Kurt Vonnegut": "Q49074",
  "Albert Camus": "Q51747",

  // --- Scientists ---
  "Albert Einstein": "Q937",
  "Isaac Newton": "Q935",
  "Charles Darwin": "Q1035",
  "Galileo Galilei": "Q307",
  "Nikola Tesla": "Q9036",
  "Louis Pasteur": "Q965",
  "Stephen Hawking": "Q17714",
  "Richard Feynman": "Q39246",
  "Niels Bohr": "Q7085",
  "Max Planck": "Q9021",
  "Michael Faraday": "Q8750",
  "James Clerk Maxwell": "Q9095",
  "Gregor Mendel": "Q37970",
  "Alan Turing": "Q7251",
  "Carl Sagan": "Q410",
  "Alexander Fleming": "Q37064",
  "Robert Hooke": "Q166301",
  "Jonas Salk": "Q275656",
  "Werner Heisenberg": "Q57204",
  "Enrico Fermi": "Q8753",

  // --- Politics & World Leaders ---
  "Barack Obama": "Q76",
  "Winston Churchill": "Q8016",
  "Abraham Lincoln": "Q91",
  "George Washington": "Q23",
  "Franklin D. Roosevelt": "Q8007",
  "John F. Kennedy": "Q9696",
  "Theodore Roosevelt": "Q338",
  "Thomas Jefferson": "Q11812",
  "Ronald Reagan": "Q9960",
  "Dwight D. Eisenhower": "Q9916",
  "Mao Zedong": "Q5816",
  "Julius Caesar": "Q1048",
  "Alexander the Great": "Q8409",
  "Napoleon Bonaparte": "Q517",
  "Genghis Khan": "Q720",
  "Vladimir Lenin": "Q1394",
  "Joseph Stalin": "Q855",
  "Martin Luther": "Q9554",
  "Charles de Gaulle": "Q2046",
  "Woodrow Wilson": "Q34296",

  // --- Artists ---
  "Leonardo da Vinci": "Q762",
  "Vincent van Gogh": "Q5582",
  "Pablo Picasso": "Q5593",
  "Michelangelo": "Q5592",
  "Rembrandt": "Q5598",
  "Claude Monet": "Q296",
  "Salvador Dalí": "Q5577",
  "Andy Warhol": "Q5603",
  "Raphael": "Q5004",
  "Donatello": "Q37562",
  "Jackson Pollock": "Q37571",
  "Henri Matisse": "Q5589",
  "Paul Cézanne": "Q35548",
  "Edvard Munch": "Q41406",
  "Gustav Klimt": "Q34661",
  "Caravaggio": "Q42207",
  "Sandro Botticelli": "Q5669",
  "Johannes Vermeer": "Q41264",
  "Francisco Goya": "Q5432",
  "Titian": "Q47551",

  // --- Musicians & Singers ---
  "Elvis Presley": "Q303",
  "Michael Jackson": "Q2831",
  "Bob Dylan": "Q392",
  "John Lennon": "Q1203",
  "Paul McCartney": "Q2599",
  "Freddie Mercury": "Q15869",
  "David Bowie": "Q5383",
  "Elton John": "Q2808",
  "Frank Sinatra": "Q40912",
  "Johnny Cash": "Q42775",
  "Bob Marley": "Q409",
  "Jimi Hendrix": "Q5928",
  "Prince": "Q7542",
  "Stevie Wonder": "Q714",
  "Ray Charles": "Q544387",
  "Louis Armstrong": "Q1779",
  "Miles Davis": "Q93341",
  "Chuck Berry": "Q20363",
  "Bruce Springsteen": "Q1225",
  "B.B. King": "Q188969",

  // --- Actors & Performers ---
  "Marlon Brando": "Q34012",
  "Robert De Niro": "Q36949",
  "Al Pacino": "Q41163",
  "Tom Hanks": "Q2263",
  "Leonardo DiCaprio": "Q38111",
  "Denzel Washington": "Q42101",
  "Morgan Freeman": "Q48337",
  "Jack Nicholson": "Q39792",
  "Anthony Hopkins": "Q65932",
  "Robert Downey Jr.": "Q165219",
  "Brad Pitt": "Q35332",
  "Harrison Ford": "Q213282",
  "Clint Eastwood": "Q43203",
  "Charlie Chaplin": "Q882",
  "Humphrey Bogart": "Q16390",
  "Heath Ledger": "Q15343",
  "Robin Williams": "Q83338",
  "Sidney Poitier": "Q104165",
  "Sean Connery": "Q199575",
  "Will Smith": "Q40096",

  // --- Athletes ---
  "Michael Jordan": "Q41421",
  "Muhammad Ali": "Q36107",
  "Pelé": "Q13926",
  "Usain Bolt": "Q1189",
  "Tiger Woods": "Q10993",
  "Cristiano Ronaldo": "Q11571",
  "Lionel Messi": "Q615",
  "Wayne Gretzky": "Q209518",
  "Babe Ruth": "Q213812",
  "LeBron James": "Q36159",
  "Roger Federer": "Q1426",
  "Michael Phelps": "Q39562",
  "Tom Brady": "Q313381",
  "Kobe Bryant": "Q25369",
  "Diego Maradona": "Q17515",
  "Jackie Robinson": "Q221048",
  "Jesse Owens": "Q52651",
  "Carl Lewis": "Q214549",
  "Sachin Tendulkar": "Q9488",
  "Novak Djokovic": "Q5812",

  // --- Entrepreneurs & Business ---
  "Steve Jobs": "Q19837",
  "Bill Gates": "Q5284",
  "Elon Musk": "Q317521",
  "Jeff Bezos": "Q312556",
  "Warren Buffett": "Q47213",
  "Mark Zuckerberg": "Q36215",
  "Walt Disney": "Q8704",
  "Henry Ford": "Q8768",
  "John D. Rockefeller": "Q160278",
  "Andrew Carnegie": "Q484265",
  "Thomas Edison": "Q8743",
  "Richard Branson": "Q194419",
  "Larry Page": "Q4934",
  "Sergey Brin": "Q92764",
  "Howard Hughes": "Q18981",

  // --- Explorers & Aviators ---
  "Christopher Columbus": "Q7322",
  "Neil Armstrong": "Q1615",
  "Buzz Aldrin": "Q2252",
  "Marco Polo": "Q6101",
  "Ferdinand Magellan": "Q1496",
  "Roald Amundsen": "Q926",
  "Edmund Hillary": "Q33817",
  "Charles Lindbergh": "Q16106",
  "Yuri Gagarin": "Q7327",
  "Vasco da Gama": "Q7328",
  "Ernest Shackleton": "Q207957",
  "Jacques Cousteau": "Q83233",

  // --- Mathematicians & Engineers ---
  "Archimedes": "Q8739",
  "Leonhard Euler": "Q7604",
  "Carl Friedrich Gauss": "Q6722",
  "Pythagoras": "Q10261",
  "Euclid": "Q8747",
  "John von Neumann": "Q17424",
  "Blaise Pascal": "Q1290",
  "Gottfried Wilhelm Leibniz": "Q9047",
  "Nikolaus Otto": "Q60544",
  "Rudolf Diesel": "Q12674",
  "Wright Brothers": "Q35960",
  "Tim Berners-Lee": "Q80",
  "Linus Torvalds": "Q34253",
  "Dennis Ritchie": "Q45575",

  // --- Philosophers & Thinkers ---
  "Aristotle": "Q868",
  "Plato": "Q859",
  "Socrates": "Q913",
  "Confucius": "Q4604",
  "René Descartes": "Q9191",
  "Immanuel Kant": "Q9312",
  "Friedrich Nietzsche": "Q9358",
  "Jean-Jacques Rousseau": "Q6527",
  "John Locke": "Q9353",
  "Karl Marx": "Q9061",
  "Voltaire": "Q9068",
  "Jean-Paul Sartre": "Q9364",
  "Sigmund Freud": "Q9215",
  "Carl Jung": "Q41532",
  "Adam Smith": "Q9381",
};

/** Normalize a name for lookup: lowercase, trimmed, remove extra spaces. */
function normalize(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, " ");
}

/** All known display names keyed by their normalized form. */
const LOOKUP_MAP: Record<string, { display: string; qid: string }> = {};
for (const [display, qid] of Object.entries(FAMOUS_MEN)) {
  LOOKUP_MAP[normalize(display)] = { display, qid };
}

export interface LocalLookupResult {
  valid: true;
  qid: string;
  display: string;
}

/**
 * Look up a name in the local dataset.
 * Returns `null` if the name is not found.
 */
export function localLookup(name: string): LocalLookupResult | null {
  const key = normalize(name);
  const entry = LOOKUP_MAP[key];
  if (!entry) return null;
  return { valid: true, qid: entry.qid, display: entry.display };
}

/** Total number of entries in the dataset. */
export const DATASET_SIZE = Object.keys(FAMOUS_MEN).length;

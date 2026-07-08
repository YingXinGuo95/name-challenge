/**
 * Local dataset of famous women used as a fallback when Wikidata is unreachable.
 *
 * Each entry: input name → lowercase key for lookups.
 * Sourced from Wikidata; Q-IDs provided for consistency.
 *
 * To extend: add entries in the format `"Display Name": "Q-ID"`.
 * The dataset is intentionally large (~200+) to support 100-name challenges.
 */
const FAMOUS_WOMEN: Record<string, string> = {
  // --- Activists & Nobel Laureates ---
  "Malala Yousafzai": "Q32732",
  "Rosa Parks": "Q41921",
  "Greta Thunberg": "Q56434717",
  "Mother Teresa": "Q30547",
  "Harriet Tubman": "Q102870",
  "Susan B. Anthony": "Q192245",
  "Emmeline Pankhurst": "Q211519",
  "Sojourner Truth": "Q105180",
  "Wangari Maathai": "Q46795",
  "Aung San Suu Kyi": "Q36740",
  "Nadia Murad": "Q26266129",
  "Gloria Steinem": "Q231178",
  "Florence Nightingale": "Q37103",
  "Jane Addams": "Q180989",
  "Eleanor Roosevelt": "Q83396",

  // --- Writers ---
  "Jane Austen": "Q36322",
  "Virginia Woolf": "Q40909",
  "Toni Morrison": "Q72334",
  "Maya Angelou": "Q19526",
  "Agatha Christie": "Q35064",
  "Emily Dickinson": "Q4441",
  "Mary Shelley": "Q47152",
  "Sylvia Plath": "Q133054",
  "Charlotte Brontë": "Q127332",
  "Emily Brontë": "Q80137",
  "George Eliot": "Q131333",
  "Louisa May Alcott": "Q185696",
  "Harper Lee": "Q182658",
  "Margaret Atwood": "Q183492",
  "J.K. Rowling": "Q34660",
  "Ursula K. Le Guin": "Q181659",
  "Simone de Beauvoir": "Q7197",
  "Doris Lessing": "Q40831",
  "Alice Walker": "Q215868",
  "Zora Neale Hurston": "Q220480",

  // --- Scientists ---
  "Marie Curie": "Q7186",
  "Ada Lovelace": "Q7259",
  "Rosalind Franklin": "Q4574",
  "Jane Goodall": "Q184746",
  "Rachel Carson": "Q100948",
  "Dorothy Hodgkin": "Q7487",
  "Barbara McClintock": "Q199654",
  "Rita Levi-Montalcini": "Q169007",
  "Katherine Johnson": "Q11752",
  "Mary Anning": "Q230491",
  "Lise Meitner": "Q56189",
  "Emmy Noether": "Q7099",
  "Grace Hopper": "Q11641",
  "Mae Jemison": "Q34091",
  "Sally Ride": "Q49285",
  "Hedy Lamarr": "Q49094",
  "Chien-Shiung Wu": "Q450317",
  "Vera Rubin": "Q234713",
  "Donna Strickland": "Q56809234",
  "Tu Youyou": "Q462843",
  "Jennifer Doudna": "Q56068",

  // --- Politics & World Leaders ---
  "Angela Merkel": "Q567",
  "Margaret Thatcher": "Q7416",
  "Indira Gandhi": "Q1149",
  "Benazir Bhutto": "Q34413",
  "Kamala Harris": "Q10853588",
  "Hillary Clinton": "Q6294",
  "Michelle Obama": "Q13133",
  "Queen Elizabeth II": "Q9682",
  "Cleopatra": "Q635",
  "Joan of Arc": "Q7226",
  "Golda Meir": "Q42992",
  "Jacinda Ardern": "Q3606816",
  "Ellen Johnson Sirleaf": "Q43179",
  "Shirley Chisholm": "Q239657",
  "Ruth Bader Ginsburg": "Q11134",
  "Sonia Sotomayor": "Q11107",
  "Madeleine Albright": "Q174438",
  "Condoleezza Rice": "Q47216",
  "Nancy Pelosi": "Q170581",
  "Alexandria Ocasio-Cortez": "Q55223040",
  "Eva Perón": "Q40933",

  // --- Artists ---
  "Frida Kahlo": "Q5588",
  "Georgia O'Keeffe": "Q46418",
  "Artemisia Gentileschi": "Q212657",
  "Yayoi Kusama": "Q231121",
  "Mary Cassatt": "Q173223",
  "Berthe Morisot": "Q105320",
  "Louise Bourgeois": "Q159652",
  "Bridget Riley": "Q235748",
  "Grandma Moses": "Q260683",
  "Tamara de Lempicka": "Q229351",

  // --- Musicians & Singers ---
  "Taylor Swift": "Q26876",
  "Beyoncé": "Q36153",
  "Adele": "Q23215",
  "Lady Gaga": "Q19848",
  "Billie Eilish": "Q29564107",
  "Whitney Houston": "Q34389",
  "Aretha Franklin": "Q125121",
  "Ella Fitzgerald": "Q1768",
  "Billie Holiday": "Q104358",
  "Nina Simone": "Q174957",
  "Madonna": "Q1744",
  "Celine Dion": "Q5105",
  "Mariah Carey": "Q41076",
  "Dolly Parton": "Q180453",
  "Tina Turner": "Q131814",
  "Joni Mitchell": "Q205721",
  "Janis Joplin": "Q1514",
  "Amy Winehouse": "Q15897",
  "Diana Ross": "Q229218",
  "Stevie Nicks": "Q234553",

  // --- Actresses & Performers ---
  "Marilyn Monroe": "Q19163",
  "Audrey Hepburn": "Q42786",
  "Meryl Streep": "Q873",
  "Katharine Hepburn": "Q56017",
  "Viola Davis": "Q229195",
  "Cate Blanchett": "Q80966",
  "Julia Roberts": "Q40523",
  "Angelina Jolie": "Q13909",
  "Jennifer Lawrence": "Q189490",
  "Scarlett Johansson": "Q34491",
  "Natalie Portman": "Q37876",
  "Emma Watson": "Q25397",
  "Zendaya": "Q189489",
  "Saoirse Ronan": "Q228603",
  "Jodie Foster": "Q41351",
  "Sigourney Weaver": "Q102124",
  "Judi Dench": "Q28054",
  "Helen Mirren": "Q349391",
  "Maggie Smith": "Q17516",
  "Emma Thompson": "Q168724",

  // --- Athletes ---
  "Serena Williams": "Q11459",
  "Venus Williams": "Q11578",
  "Simone Biles": "Q22271367",
  "Megan Rapinoe": "Q3308690",
  "Billie Jean King": "Q54527",
  "Mia Hamm": "Q222086",
  "Jackie Joyner-Kersee": "Q241217",
  "Florence Griffith Joyner": "Q31082",
  "Nadia Comăneci": "Q33228",
  "Wilma Rudolph": "Q31083",
  "Danica Patrick": "Q233773",
  "Ronda Rousey": "Q242654",
  "Martina Navratilova": "Q184505",
  "Steffi Graf": "Q20289",
  "Katie Ledecky": "Q14946087",

  // --- Entrepreneurs & Business ---
  "Oprah Winfrey": "Q55832",
  "Sheryl Sandberg": "Q234653",
  "Sara Blakely": "Q518746",
  "Coco Chanel": "Q45661",
  "Estée Lauder": "Q71240",
  "Madam C.J. Walker": "Q1768539",
  "Arianna Huffington": "Q233690",
  "Melinda Gates": "Q463879",
  "Whitney Wolfe Herd": "Q28971250",
  "Safra Catz": "Q2211702",
  "Mary Barra": "Q6778877",
  "Ginni Rometty": "Q5563289",
  "Indra Nooyi": "Q265275",
  "Susan Wojcicki": "Q23683",
  "Marissa Mayer": "Q23077",

  // --- Explorers & Aviators ---
  "Amelia Earhart": "Q3355",
  "Bessie Coleman": "Q254516",
  "Valentina Tereshkova": "Q44353",
  "Sally Kristen Ride": "Q49285",
  "Junko Tabei": "Q236209",
  "Ann Bancroft": "Q123941",
  "Diana Nyad": "Q1208975",

  // --- Mathematicians & Engineers ---
  "Hypatia": "Q11903",
  "Sophie Germain": "Q7049",
  "Maria Goeppert Mayer": "Q57119",
  "Mary Jackson": "Q22021153",
  "Dorothy Vaughan": "Q22021153",
  "Margaret Hamilton": "Q11628",
  "Edith Clarke": "Q1285073",

  // --- Fashion & Design ---
  "Vivienne Westwood": "Q232283",
  "Donatella Versace": "Q229437",
  "Miuccia Prada": "Q242006",
  "Diane von Fürstenberg": "Q438938",
  "Vera Wang": "Q230728",
  "Stella McCartney": "Q232812",
  "Rei Kawakubo": "Q268053",

  // --- Philosophers & Theorists ---
  "Hannah Arendt": "Q60025",
  "Mary Wollstonecraft": "Q101638",
  "Judith Butler": "Q219368",
  "Martha Nussbaum": "Q235133",
  "Susan Sontag": "Q152824",
  "Iris Murdoch": "Q217495",
  "Simone Weil": "Q157309",
};

/** Normalize a name for lookup: lowercase, trimmed, remove extra spaces. */
function normalize(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, " ");
}

/** All known display names keyed by their normalized form. */
const LOOKUP_MAP: Record<string, { display: string; qid: string }> = {};
for (const [display, qid] of Object.entries(FAMOUS_WOMEN)) {
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
export const DATASET_SIZE = Object.keys(FAMOUS_WOMEN).length;

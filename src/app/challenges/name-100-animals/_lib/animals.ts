/**
 * Local animal species dataset — used as a fallback when Wikidata is unreachable
 * and for edge cases where common names don't map cleanly to Wikidata taxonomy.
 *
 * Each entry maps one or more common English names to a Wikidata Q-ID.
 * Only includes species-level animals (no subspecies, breeds, or varieties).
 */

interface AnimalEntry {
  /** Wikidata Q-ID. */
  qid: string;
  /** Primary common name (lowercase). */
  label: string;
  /** Alternative names / spellings (lowercase). */
  aliases?: string[];
}

const animals: AnimalEntry[] = [
  // ── Mammals ──────────────────────────────────────────────────────
  { qid: "Q140", label: "lion", aliases: ["african lion"] },
  { qid: "Q36557", label: "tiger" },
  { qid: "Q18498", label: "leopard" },
  { qid: "Q36106", label: "jaguar" },
  { qid: "Q35227", label: "cheetah" },
  { qid: "Q29999", label: "wolf", aliases: ["gray wolf", "grey wolf"] },
  { qid: "Q8331", label: "coyote" },
  { qid: "Q8335", label: "jackal" },
  { qid: "Q184294", label: "hyena" },
  { qid: "Q269", label: "fox", aliases: ["red fox"] },
  { qid: "Q7378", label: "elephant", aliases: ["african elephant"] },
  { qid: "Q7200", label: "giraffe" },
  { qid: "Q32724", label: "zebra" },
  { qid: "Q726", label: "horse" },
  { qid: "Q3706", label: "donkey" },
  { qid: "Q830", label: "cow", aliases: ["cattle"] },
  { qid: "Q787", label: "pig" },
  { qid: "Q7368", label: "sheep" },
  { qid: "Q2934", label: "goat" },
  { qid: "Q20980872", label: "cat", aliases: ["domestic cat", "house cat"] },
  { qid: "Q144", label: "dog", aliases: ["domestic dog"] },
  { qid: "Q27210", label: "bear", aliases: ["brown bear"] },
  { qid: "Q33602", label: "panda", aliases: ["giant panda"] },
  { qid: "Q36101", label: "koala" },
  { qid: "Q50702", label: "kangaroo", aliases: ["red kangaroo"] },
  { qid: "Q22965", label: "wallaby" },
  { qid: "Q272", label: "whale", aliases: ["blue whale"] },
  { qid: "Q212353", label: "dolphin", aliases: ["bottlenose dolphin"] },
  { qid: "Q186341", label: "orca", aliases: ["killer whale"] },
  { qid: "Q153984", label: "seal", aliases: ["harbor seal", "common seal"] },
  { qid: "Q18418", label: "walrus" },
  { qid: "Q7365", label: "bat" },
  { qid: "Q9394", label: "rabbit", aliases: ["european rabbit"] },
  { qid: "Q213403", label: "hare" },
  { qid: "Q5760", label: "deer", aliases: ["red deer"] },
  { qid: "Q215900", label: "moose" },
  { qid: "Q199257", label: "elk" },
  { qid: "Q23390", label: "antelope" },
  { qid: "Q34505", label: "hippopotamus", aliases: ["hippo"] },
  { qid: "Q34793", label: "rhinoceros", aliases: ["rhino"] },
  { qid: "Q36611", label: "gorilla" },
  { qid: "Q41237", label: "chimpanzee", aliases: ["chimp"] },
  { qid: "Q59993", label: "orangutan" },
  { qid: "Q501", label: "monkey" },
  { qid: "Q4937", label: "baboon" },
  { qid: "Q25364", label: "lemur" },
  { qid: "Q47253", label: "sloth" },
  { qid: "Q47542", label: "armadillo" },
  { qid: "Q130229", label: "hedgehog" },
  { qid: "Q180949", label: "porcupine" },
  { qid: "Q9482", label: "squirrel" },
  { qid: "Q181191", label: "beaver" },
  { qid: "Q200184", label: "otter", aliases: ["river otter"] },
  { qid: "Q29596", label: "meerkat" },
  { qid: "Q20008", label: "platypus" },
  { qid: "Q19033", label: "echidna" },
  { qid: "Q23391", label: "wildebeest", aliases: ["gnu"] },
  { qid: "Q41497", label: "bison", aliases: ["buffalo"] },
  { qid: "Q19099", label: "yak" },
  { qid: "Q20310", label: "camel" },
  { qid: "Q21629", label: "llama" },
  { qid: "Q25432", label: "alpaca" },
  { qid: "Q134029", label: "raccoon" },
  { qid: "Q32132", label: "skunk" },
  { qid: "Q26568", label: "badger" },
  { qid: "Q27057", label: "weasel" },
  { qid: "Q27129", label: "mink" },
  { qid: "Q27159", label: "ferret" },
  { qid: "Q28165", label: "mongoose" },
  { qid: "Q134181", label: "wolverine" },
  { qid: "Q185194", label: "capybara" },
  { qid: "Q131592", label: "guinea pig" },

  // ── Birds ────────────────────────────────────────────────────────
  { qid: "Q2092297", label: "eagle", aliases: ["bald eagle"] },
  { qid: "Q43444", label: "hawk" },
  { qid: "Q33186", label: "falcon", aliases: ["peregrine falcon"] },
  { qid: "Q25215", label: "owl", aliases: ["barn owl"] },
  { qid: "Q209682", label: "sparrow", aliases: ["house sparrow"] },
  { qid: "Q25334", label: "robin", aliases: ["american robin"] },
  { qid: "Q43365", label: "crow" },
  { qid: "Q25357", label: "raven" },
  { qid: "Q204808", label: "pigeon", aliases: ["rock dove"] },
  { qid: "Q37320", label: "duck", aliases: ["mallard"] },
  { qid: "Q25280", label: "goose", aliases: ["canada goose"] },
  { qid: "Q17297", label: "swan" },
  { qid: "Q9147", label: "penguin", aliases: ["emperor penguin"] },
  { qid: "Q25627", label: "ostrich" },
  { qid: "Q26607", label: "peacock", aliases: ["peafowl"] },
  { qid: "Q51435", label: "turkey", aliases: ["wild turkey"] },
  { qid: "Q129289", label: "chicken", aliases: ["red junglefowl"] },
  { qid: "Q25984", label: "flamingo" },
  { qid: "Q19372", label: "pelican" },
  { qid: "Q26407", label: "seagull", aliases: ["gull"] },
  { qid: "Q25439", label: "woodpecker" },
  { qid: "Q25608", label: "hummingbird" },
  { qid: "Q34187", label: "parrot", aliases: ["african grey parrot"] },
  { qid: "Q25899", label: "toucan" },
  { qid: "Q25414", label: "kingfisher" },
  { qid: "Q25431", label: "albatross" },
  { qid: "Q26737", label: "vulture" },
  { qid: "Q131932", label: "emu" },
  { qid: "Q26416", label: "puffin" },
  { qid: "Q25951", label: "stork" },
  { qid: "Q131684", label: "heron" },
  { qid: "Q25905", label: "crane" },
  { qid: "Q18660", label: "kiwi" },

  // ── Reptiles ─────────────────────────────────────────────────────
  { qid: "Q25705", label: "crocodile", aliases: ["nile crocodile"] },
  { qid: "Q530397", label: "alligator", aliases: ["american alligator"] },
  { qid: "Q25555", label: "snake" },
  { qid: "Q83064", label: "python" },
  { qid: "Q38998", label: "cobra", aliases: ["king cobra"] },
  { qid: "Q188656", label: "viper" },
  { qid: "Q21134", label: "rattlesnake" },
  { qid: "Q31881", label: "anaconda" },
  { qid: "Q37875", label: "lizard" },
  { qid: "Q503164", label: "iguana", aliases: ["green iguana"] },
  { qid: "Q28301", label: "chameleon" },
  { qid: "Q135118", label: "gecko" },
  { qid: "Q133904", label: "komodo dragon" },
  { qid: "Q11918", label: "turtle", aliases: ["sea turtle"] },
  { qid: "Q46360", label: "tortoise", aliases: ["galapagos tortoise"] },
  { qid: "Q85102", label: "monitor lizard" },
  { qid: "Q19032", label: "gila monster" },

  // ── Amphibians ───────────────────────────────────────────────────
  { qid: "Q10908", label: "frog", aliases: ["common frog"] },
  { qid: "Q20252", label: "toad", aliases: ["common toad"] },
  { qid: "Q16381", label: "salamander" },
  { qid: "Q18529", label: "newt" },
  { qid: "Q53664", label: "axolotl" },
  { qid: "Q10910", label: "tree frog" },
  { qid: "Q20575", label: "poison dart frog" },

  // ── Fish ─────────────────────────────────────────────────────────
  { qid: "Q130589", label: "salmon", aliases: ["atlantic salmon"] },
  { qid: "Q21137", label: "tuna", aliases: ["bluefin tuna"] },
  { qid: "Q7372", label: "shark", aliases: ["great white shark"] },
  { qid: "Q23368", label: "goldfish" },
  { qid: "Q33228", label: "clownfish" },
  { qid: "Q131177", label: "seahorse" },
  { qid: "Q128685", label: "eel" },
  { qid: "Q185164", label: "piranha" },
  { qid: "Q123535", label: "catfish" },
  { qid: "Q26912", label: "trout", aliases: ["rainbow trout"] },
  { qid: "Q228053", label: "cod", aliases: ["atlantic cod"] },
  { qid: "Q13461", label: "carp", aliases: ["common carp"] },
  { qid: "Q301052", label: "swordfish" },
  { qid: "Q185154", label: "stingray" },
  { qid: "Q194621", label: "manta ray" },
  { qid: "Q27167", label: "pike" },
  { qid: "Q192758", label: "bass", aliases: ["largemouth bass"] },
  { qid: "Q201349", label: "anglerfish" },
  { qid: "Q28001", label: "barracuda" },
  { qid: "Q52866", label: "guppy" },

  // ── Invertebrates ────────────────────────────────────────────────
  { qid: "Q28319", label: "butterfly", aliases: ["monarch butterfly"] },
  { qid: "Q102857", label: "bee", aliases: ["honey bee", "honeybee"] },
  { qid: "Q7386", label: "ant" },
  { qid: "Q1357", label: "spider" },
  { qid: "Q19125", label: "scorpion" },
  { qid: "Q40152", label: "octopus" },
  { qid: "Q81900", label: "squid" },
  { qid: "Q30258", label: "jellyfish" },
  { qid: "Q25349", label: "starfish" },
  { qid: "Q4610", label: "crab" },
  { qid: "Q122991", label: "lobster" },
  { qid: "Q19586", label: "shrimp" },
  { qid: "Q308841", label: "snail" },
  { qid: "Q41145", label: "slug" },
  { qid: "Q144550", label: "earthworm", aliases: ["worm"] },
  { qid: "Q170924", label: "centipede" },
  { qid: "Q25848", label: "millipede" },
  { qid: "Q11227", label: "ladybug", aliases: ["ladybird"] },
  { qid: "Q25325", label: "beetle" },
  { qid: "Q39884", label: "dragonfly" },
  { qid: "Q30144", label: "mosquito" },
  { qid: "Q859312", label: "fly", aliases: ["housefly"] },
  { qid: "Q26745", label: "cockroach" },
  { qid: "Q83976", label: "grasshopper" },
  { qid: "Q47328", label: "cricket" },
  { qid: "Q30126", label: "praying mantis", aliases: ["mantis"] },
  { qid: "Q174795", label: "stick insect", aliases: ["walking stick"] },
  { qid: "Q19088", label: "termite" },
  { qid: "Q27318", label: "flea" },
  { qid: "Q8441", label: "tick" },
  { qid: "Q131820", label: "moth" },
  { qid: "Q33976", label: "caterpillar" },
  { qid: "Q20985", label: "cicada" },
  { qid: "Q132731", label: "firefly", aliases: ["lightning bug"] },
  { qid: "Q26863", label: "leech" },
  { qid: "Q133337", label: "sea urchin" },
  { qid: "Q192814", label: "coral" },
  { qid: "Q190720", label: "sea anemone" },
  { qid: "Q187034", label: "sponge" },

  // ── Extinct Animals ──────────────────────────────────────────────
  { qid: "Q430", label: "dinosaur" },
  { qid: "Q26904", label: "mammoth", aliases: ["woolly mammoth"] },
  { qid: "Q130966", label: "dodo" },
  { qid: "Q131320", label: "pterodactyl", aliases: ["pterosaur"] },
  { qid: "Q130982", label: "tyrannosaurus", aliases: ["t-rex", "t rex"] },
  { qid: "Q131630", label: "triceratops" },
  { qid: "Q131148", label: "stegosaurus" },
  { qid: "Q131115", label: "brachiosaurus" },
  { qid: "Q18510997", label: "velociraptor" },
  { qid: "Q18573", label: "saber-toothed tiger", aliases: ["saber toothed tiger", "smilodon"] },
  { qid: "Q131138", label: "diplodocus" },
  { qid: "Q19627", label: "archaeopteryx" },
  { qid: "Q48072", label: "passenger pigeon" },
  { qid: "Q21371", label: "tasmanian tiger", aliases: ["thylacine"] },
  { qid: "Q14338", label: "quagga" },
];

// ── Lookup Index ─────────────────────────────────────────────────────

/** Fast lookup map built from the animals array. Key = lowercase name. */
const lookupMap = new Map<string, AnimalEntry>();

function buildLookup(): void {
  if (lookupMap.size > 0) return;
  for (const entry of animals) {
    lookupMap.set(entry.label.toLowerCase(), entry);
    if (entry.aliases) {
      for (const alias of entry.aliases) {
        lookupMap.set(alias.toLowerCase(), entry);
      }
    }
  }
}

/**
 * Look up an animal name in the local dataset.
 * Returns the AnimalEntry if found (case-insensitive), otherwise undefined.
 */
export function localLookup(
  name: string
): { qid: string } | undefined {
  buildLookup();
  const entry = lookupMap.get(name.toLowerCase().trim());
  if (!entry) return undefined;
  return { qid: entry.qid };
}

/** Return the total number of entries in the local dataset. */
export function datasetSize(): number {
  return animals.length;
}

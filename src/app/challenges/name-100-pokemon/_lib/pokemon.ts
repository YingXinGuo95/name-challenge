/**
 * Local dataset of Pokémon names.
 *
 * Sourced from PokeAPI (https://pokeapi.co/) — all 1351 Pokémon
 * across all generations. Includes aliases for common variations.
 */

const POKEMON_ENTRIES: string[] = [
  // ── Generation 1 (Kanto) ──
  "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran F", "Nidorina", "Nidoqueen", "Nidoran M", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew",
  // ── Generation 2 (Johto) ──
  "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho Oh", "Celebi",
  // ── Generation 3 (Hoenn) ──
  "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys Normal",
  // ── Generation 4 (Sinnoh) ──
  "Turtwig", "Grotle", "Torterra", "Chimchar", "Monferno", "Infernape", "Piplup", "Prinplup", "Empoleon", "Starly", "Staravia", "Staraptor", "Bidoof", "Bibarel", "Kricketot", "Kricketune", "Shinx", "Luxio", "Luxray", "Budew", "Roserade", "Cranidos", "Rampardos", "Shieldon", "Bastiodon", "Burmy", "Wormadam Plant", "Mothim", "Combee", "Vespiquen", "Pachirisu", "Buizel", "Floatzel", "Cherubi", "Cherrim", "Shellos", "Gastrodon", "Ambipom", "Drifloon", "Drifblim", "Buneary", "Lopunny", "Mismagius", "Honchkrow", "Glameow", "Purugly", "Chingling", "Stunky", "Skuntank", "Bronzor", "Bronzong", "Bonsly", "Mime Jr", "Happiny", "Chatot", "Spiritomb", "Gible", "Gabite", "Garchomp", "Munchlax", "Riolu", "Lucario", "Hippopotas", "Hippowdon", "Skorupi", "Drapion", "Croagunk", "Toxicroak", "Carnivine", "Finneon", "Lumineon", "Mantyke", "Snover", "Abomasnow", "Weavile", "Magnezone", "Lickilicky", "Rhyperior", "Tangrowth", "Electivire", "Magmortar", "Togekiss", "Yanmega", "Leafeon", "Glaceon", "Gliscor", "Mamoswine", "Porygon Z", "Gallade", "Probopass", "Dusknoir", "Froslass", "Rotom", "Uxie", "Mesprit", "Azelf", "Dialga", "Palkia", "Heatran", "Regigigas", "Giratina Altered", "Cresselia", "Phione", "Manaphy", "Darkrai", "Shaymin Land", "Arceus",
  // ── Generation 5 (Unova) ──
  "Victini", "Snivy", "Servine", "Serperior", "Tepig", "Pignite", "Emboar", "Oshawott", "Dewott", "Samurott", "Patrat", "Watchog", "Lillipup", "Herdier", "Stoutland", "Purrloin", "Liepard", "Pansage", "Simisage", "Pansear", "Simisear", "Panpour", "Simipour", "Munna", "Musharna", "Pidove", "Tranquill", "Unfezant", "Blitzle", "Zebstrika", "Roggenrola", "Boldore", "Gigalith", "Woobat", "Swoobat", "Drilbur", "Excadrill", "Audino", "Timburr", "Gurdurr", "Conkeldurr", "Tympole", "Palpitoad", "Seismitoad", "Throh", "Sawk", "Sewaddle", "Swadloon", "Leavanny", "Venipede", "Whirlipede", "Scolipede", "Cottonee", "Whimsicott", "Petilil", "Lilligant", "Basculin Red Striped", "Sandile", "Krokorok", "Krookodile", "Darumaka", "Darmanitan Standard", "Maractus", "Dwebble", "Crustle", "Scraggy", "Scrafty", "Sigilyph", "Yamask", "Cofagrigus", "Tirtouga", "Carracosta", "Archen", "Archeops", "Trubbish", "Garbodor", "Zorua", "Zoroark", "Minccino", "Cinccino", "Gothita", "Gothorita", "Gothitelle", "Solosis", "Duosion", "Reuniclus", "Ducklett", "Swanna", "Vanillite", "Vanillish", "Vanilluxe", "Deerling", "Sawsbuck", "Emolga", "Karrablast", "Escavalier", "Foongus", "Amoonguss", "Frillish Male", "Jellicent Male", "Alomomola", "Joltik", "Galvantula", "Ferroseed", "Ferrothorn", "Klink", "Klang", "Klinklang", "Tynamo", "Eelektrik", "Eelektross", "Elgyem", "Beheeyem", "Litwick", "Lampent", "Chandelure", "Axew", "Fraxure", "Haxorus", "Cubchoo", "Beartic", "Cryogonal", "Shelmet", "Accelgor", "Stunfisk", "Mienfoo", "Mienshao", "Druddigon", "Golett", "Golurk", "Pawniard", "Bisharp", "Bouffalant", "Rufflet", "Braviary", "Vullaby", "Mandibuzz", "Heatmor", "Durant", "Deino", "Zweilous", "Hydreigon", "Larvesta", "Volcarona", "Cobalion", "Terrakion", "Virizion", "Tornadus Incarnate", "Thundurus Incarnate", "Reshiram", "Zekrom", "Landorus Incarnate", "Kyurem", "Keldeo Ordinary", "Meloetta Aria", "Genesect",
  // ── Generation 6 (Kalos) ──
  "Chespin", "Quilladin", "Chesnaught", "Fennekin", "Braixen", "Delphox", "Froakie", "Frogadier", "Greninja", "Bunnelby", "Diggersby", "Fletchling", "Fletchinder", "Talonflame", "Scatterbug", "Spewpa", "Vivillon", "Litleo", "Pyroar Male", "Flabebe", "Floette", "Florges", "Skiddo", "Gogoat", "Pancham", "Pangoro", "Furfrou", "Espurr", "Meowstic Male", "Honedge", "Doublade", "Aegislash Shield", "Spritzee", "Aromatisse", "Swirlix", "Slurpuff", "Inkay", "Malamar", "Binacle", "Barbaracle", "Skrelp", "Dragalge", "Clauncher", "Clawitzer", "Helioptile", "Heliolisk", "Tyrunt", "Tyrantrum", "Amaura", "Aurorus", "Sylveon", "Hawlucha", "Dedenne", "Carbink", "Goomy", "Sliggoo", "Goodra", "Klefki", "Phantump", "Trevenant", "Pumpkaboo Average", "Gourgeist Average", "Bergmite", "Avalugg", "Noibat", "Noivern", "Xerneas", "Yveltal", "Zygarde 50", "Diancie", "Hoopa", "Volcanion",
  // ── Generation 7 (Alola) ──
  "Rowlet", "Dartrix", "Decidueye", "Litten", "Torracat", "Incineroar", "Popplio", "Brionne", "Primarina", "Pikipek", "Trumbeak", "Toucannon", "Yungoos", "Gumshoos", "Grubbin", "Charjabug", "Vikavolt", "Crabrawler", "Crabominable", "Oricorio Baile", "Cutiefly", "Ribombee", "Rockruff", "Lycanroc Midday", "Wishiwashi Solo", "Mareanie", "Toxapex", "Mudbray", "Mudsdale", "Dewpider", "Araquanid", "Fomantis", "Lurantis", "Morelull", "Shiinotic", "Salandit", "Salazzle", "Stufful", "Bewear", "Bounsweet", "Steenee", "Tsareena", "Comfey", "Oranguru", "Passimian", "Wimpod", "Golisopod", "Sandygast", "Palossand", "Pyukumuku", "Type Null", "Silvally", "Minior Red Meteor", "Komala", "Turtonator", "Togedemaru", "Mimikyu Disguised", "Bruxish", "Drampa", "Dhelmise", "Jangmo O", "Hakamo O", "Kommo O", "Tapu Koko", "Tapu Lele", "Tapu Bulu", "Tapu Fini", "Cosmog", "Cosmoem", "Solgaleo", "Lunala", "Nihilego", "Buzzwole", "Pheromosa", "Xurkitree", "Celesteela", "Kartana", "Guzzlord", "Necrozma", "Magearna", "Marshadow", "Poipole", "Naganadel", "Stakataka", "Blacephalon", "Zeraora", "Meltan", "Melmetal",
  // ── Generation 8 (Galar) ──
  "Grookey", "Thwackey", "Rillaboom", "Scorbunny", "Raboot", "Cinderace", "Sobble", "Drizzile", "Inteleon", "Skwovet", "Greedent", "Rookidee", "Corvisquire", "Corviknight", "Blipbug", "Dottler", "Orbeetle", "Nickit", "Thievul", "Gossifleur", "Eldegoss", "Wooloo", "Dubwool", "Chewtle", "Drednaw", "Yamper", "Boltund", "Rolycoly", "Carkol", "Coalossal", "Applin", "Flapple", "Appletun", "Silicobra", "Sandaconda", "Cramorant", "Arrokuda", "Barraskewda", "Toxel", "Toxtricity Amped", "Sizzlipede", "Centiskorch", "Clobbopus", "Grapploct", "Sinistea", "Polteageist", "Hatenna", "Hattrem", "Hatterene", "Impidimp", "Morgrem", "Grimmsnarl", "Obstagoon", "Perrserker", "Cursola", "Sirfetchd", "Mr Rime", "Runerigus", "Milcery", "Alcremie", "Falinks", "Pincurchin", "Snom", "Frosmoth", "Stonjourner", "Eiscue Ice", "Indeedee Male", "Morpeko Full Belly", "Cufant", "Copperajah", "Dracozolt", "Arctozolt", "Dracovish", "Arctovish", "Duraludon", "Dreepy", "Drakloak", "Dragapult", "Zacian", "Zamazenta", "Eternatus", "Kubfu",
  "Urshifu Single Strike",
  "Zarude", "Regieleki", "Regidrago", "Glastrier", "Spectrier", "Calyrex", "Wyrdeer", "Kleavor", "Ursaluna", "Basculegion Male", "Sneasler", "Overqwil", "Enamorus Incarnate",
  // ── Generation 9 (Paldea) ──
  "Sprigatito", "Floragato", "Meowscarada", "Fuecoco", "Crocalor", "Skeledirge", "Quaxly", "Quaxwell", "Quaquaval", "Lechonk", "Oinkologne Male", "Tarountula", "Spidops", "Nymble", "Lokix", "Pawmi", "Pawmo", "Pawmot", "Tandemaus",
  "Maushold Family Of Four",
  "Fidough", "Dachsbun", "Smoliv", "Dolliv", "Arboliva",
  "Squawkabilly Green Plumage",
  "Nacli", "Naclstack", "Garganacl", "Charcadet", "Armarouge", "Ceruledge", "Tadbulb", "Bellibolt", "Wattrel", "Kilowattrel", "Maschiff", "Mabosstiff", "Shroodle", "Grafaiai", "Bramblin", "Brambleghast", "Toedscool", "Toedscruel", "Klawf", "Capsakid", "Scovillain", "Rellor", "Rabsca", "Flittle", "Espathra", "Tinkatink", "Tinkatuff", "Tinkaton", "Wiglett", "Wugtrio", "Bombirdier", "Finizen", "Palafin Zero", "Varoom", "Revavroom", "Cyclizar", "Orthworm", "Glimmet", "Glimmora", "Greavard", "Houndstone", "Flamigo", "Cetoddle", "Cetitan", "Veluza", "Dondozo", "Tatsugiri Curly", "Annihilape", "Clodsire", "Farigiraf",
  "Dudunsparce Two Segment",
  "Kingambit", "Great Tusk", "Scream Tail", "Brute Bonnet", "Flutter Mane", "Slither Wing", "Sandy Shocks", "Iron Treads", "Iron Bundle", "Iron Hands", "Iron Jugulis", "Iron Moth", "Iron Thorns", "Frigibax", "Arctibax", "Baxcalibur", "Gimmighoul", "Gholdengo", "Wo Chien", "Chien Pao", "Ting Lu", "Chi Yu", "Roaring Moon", "Iron Valiant", "Koraidon", "Miraidon", "Walking Wake", "Iron Leaves", "Dipplin", "Poltchageist", "Sinistcha", "Okidogi", "Munkidori", "Fezandipiti", "Ogerpon", "Archaludon", "Hydrapple", "Gouging Fire", "Raging Bolt", "Iron Boulder", "Iron Crown", "Terapagos", "Pecharunt",
  // ── Generation 9+ (Forms/Variants) ──
  "Deoxys Attack", "Deoxys Defense", "Deoxys Speed", "Wormadam Sandy", "Wormadam Trash", "Shaymin Sky", "Giratina Origin", "Rotom Heat", "Rotom Wash", "Rotom Frost", "Rotom Fan", "Rotom Mow", "Castform Sunny", "Castform Rainy", "Castform Snowy",
  "Basculin Blue Striped",
  "Darmanitan Zen", "Meloetta Pirouette", "Tornadus Therian", "Thundurus Therian", "Landorus Therian", "Kyurem Black", "Kyurem White", "Keldeo Resolute", "Meowstic Female", "Aegislash Blade", "Pumpkaboo Small", "Pumpkaboo Large", "Pumpkaboo Super", "Gourgeist Small", "Gourgeist Large", "Gourgeist Super", "Venusaur Mega", "Charizard Mega X", "Charizard Mega Y", "Blastoise Mega", "Alakazam Mega", "Gengar Mega", "Kangaskhan Mega", "Pinsir Mega", "Gyarados Mega", "Aerodactyl Mega", "Mewtwo Mega X", "Mewtwo Mega Y", "Ampharos Mega", "Scizor Mega", "Heracross Mega", "Houndoom Mega", "Tyranitar Mega", "Blaziken Mega", "Gardevoir Mega", "Mawile Mega", "Aggron Mega", "Medicham Mega", "Manectric Mega", "Banette Mega", "Absol Mega", "Garchomp Mega", "Lucario Mega", "Abomasnow Mega", "Floette Eternal", "Latias Mega", "Latios Mega", "Swampert Mega", "Sceptile Mega", "Sableye Mega", "Altaria Mega", "Gallade Mega", "Audino Mega", "Sharpedo Mega", "Slowbro Mega", "Steelix Mega", "Pidgeot Mega", "Glalie Mega", "Diancie Mega", "Metagross Mega", "Kyogre Primal", "Groudon Primal", "Rayquaza Mega", "Pikachu Rock Star", "Pikachu Belle", "Pikachu Pop Star", "Pikachu Phd", "Pikachu Libre", "Pikachu Cosplay", "Hoopa Unbound", "Camerupt Mega", "Lopunny Mega", "Salamence Mega", "Beedrill Mega", "Rattata Alola", "Raticate Alola", "Raticate Totem Alola", "Pikachu Original Cap", "Pikachu Hoenn Cap", "Pikachu Sinnoh Cap", "Pikachu Unova Cap", "Pikachu Kalos Cap", "Pikachu Alola Cap", "Raichu Alola", "Sandshrew Alola", "Sandslash Alola", "Vulpix Alola", "Ninetales Alola", "Diglett Alola", "Dugtrio Alola", "Meowth Alola", "Persian Alola", "Geodude Alola", "Graveler Alola", "Golem Alola", "Grimer Alola", "Muk Alola", "Exeggutor Alola", "Marowak Alola", "Greninja Battle Bond", "Greninja Ash",
  "Zygarde 10 Power Construct",
  "Zygarde 50 Power Construct",
  "Zygarde Complete", "Gumshoos Totem", "Vikavolt Totem", "Oricorio Pom Pom", "Oricorio Pau", "Oricorio Sensu", "Lycanroc Midnight", "Wishiwashi School", "Lurantis Totem", "Salazzle Totem", "Minior Orange Meteor", "Minior Yellow Meteor", "Minior Green Meteor", "Minior Blue Meteor", "Minior Indigo Meteor", "Minior Violet Meteor", "Minior Red", "Minior Orange", "Minior Yellow", "Minior Green", "Minior Blue", "Minior Indigo", "Minior Violet", "Mimikyu Busted",
  "Mimikyu Totem Disguised",
  "Mimikyu Totem Busted", "Kommo O Totem", "Magearna Original", "Pikachu Partner Cap", "Marowak Totem", "Ribombee Totem", "Rockruff Own Tempo", "Lycanroc Dusk", "Araquanid Totem", "Togedemaru Totem", "Necrozma Dusk", "Necrozma Dawn", "Necrozma Ultra", "Pikachu Starter", "Eevee Starter", "Pikachu World Cap", "Meowth Galar", "Ponyta Galar", "Rapidash Galar", "Slowpoke Galar", "Slowbro Galar", "Farfetchd Galar", "Weezing Galar", "Mr Mime Galar", "Articuno Galar", "Zapdos Galar", "Moltres Galar", "Slowking Galar", "Corsola Galar", "Zigzagoon Galar", "Linoone Galar", "Darumaka Galar",
  "Darmanitan Galar Standard",
  "Darmanitan Galar Zen", "Yamask Galar", "Stunfisk Galar", "Zygarde 10", "Cramorant Gulping", "Cramorant Gorging", "Toxtricity Low Key", "Eiscue Noice", "Indeedee Female", "Morpeko Hangry", "Zacian Crowned", "Zamazenta Crowned", "Eternatus Eternamax", "Urshifu Rapid Strike", "Zarude Dada", "Calyrex Ice", "Calyrex Shadow", "Venusaur Gmax", "Charizard Gmax", "Blastoise Gmax", "Butterfree Gmax", "Pikachu Gmax", "Meowth Gmax", "Machamp Gmax", "Gengar Gmax", "Kingler Gmax", "Lapras Gmax", "Eevee Gmax", "Snorlax Gmax", "Garbodor Gmax", "Melmetal Gmax", "Rillaboom Gmax", "Cinderace Gmax", "Inteleon Gmax", "Corviknight Gmax", "Orbeetle Gmax", "Drednaw Gmax", "Coalossal Gmax", "Flapple Gmax", "Appletun Gmax", "Sandaconda Gmax",
  "Toxtricity Amped Gmax",
  "Centiskorch Gmax", "Hatterene Gmax", "Grimmsnarl Gmax", "Alcremie Gmax", "Copperajah Gmax", "Duraludon Gmax",
  "Urshifu Single Strike Gmax",
  "Urshifu Rapid Strike Gmax",
  "Toxtricity Low Key Gmax",
  "Growlithe Hisui", "Arcanine Hisui", "Voltorb Hisui", "Electrode Hisui", "Typhlosion Hisui", "Qwilfish Hisui", "Sneasel Hisui", "Samurott Hisui", "Lilligant Hisui", "Zorua Hisui", "Zoroark Hisui", "Braviary Hisui", "Sliggoo Hisui", "Goodra Hisui", "Avalugg Hisui", "Decidueye Hisui", "Dialga Origin", "Palkia Origin",
  "Basculin White Striped",
  "Basculegion Female", "Enamorus Therian",
  "Tauros Paldea Combat Breed",
  "Tauros Paldea Blaze Breed",
  "Tauros Paldea Aqua Breed",
  "Wooper Paldea", "Oinkologne Female",
  "Dudunsparce Three Segment",
  "Palafin Hero",
  "Maushold Family Of Three",
  "Tatsugiri Droopy", "Tatsugiri Stretchy",
  "Squawkabilly Blue Plumage",
  "Squawkabilly Yellow Plumage",
  "Squawkabilly White Plumage",
  "Gimmighoul Roaming",
  "Koraidon Limited Build",
  "Koraidon Sprinting Build",
  "Koraidon Swimming Build",
  "Koraidon Gliding Build",
  "Miraidon Low Power Mode",
  "Miraidon Drive Mode",
  "Miraidon Aquatic Mode",
  "Miraidon Glide Mode", "Ursaluna Bloodmoon",
  "Ogerpon Wellspring Mask",
  "Ogerpon Hearthflame Mask",
  "Ogerpon Cornerstone Mask",
  "Terapagos Terastal", "Terapagos Stellar", "Clefable Mega", "Victreebel Mega", "Starmie Mega", "Dragonite Mega", "Meganium Mega", "Feraligatr Mega", "Skarmory Mega", "Froslass Mega", "Emboar Mega", "Excadrill Mega", "Scolipede Mega", "Scrafty Mega", "Eelektross Mega", "Chandelure Mega", "Chesnaught Mega", "Delphox Mega", "Greninja Mega", "Pyroar Mega", "Floette Mega", "Malamar Mega", "Barbaracle Mega", "Dragalge Mega", "Hawlucha Mega", "Zygarde Mega", "Drampa Mega", "Falinks Mega", "Raichu Mega X", "Raichu Mega Y", "Chimecho Mega", "Absol Mega Z", "Staraptor Mega", "Garchomp Mega Z", "Lucario Mega Z", "Heatran Mega", "Darkrai Mega", "Golurk Mega", "Meowstic Male Mega", "Crabominable Mega", "Golisopod Mega", "Magearna Mega",
  "Magearna Original Mega",
  "Zeraora Mega", "Scovillain Mega", "Glimmora Mega", "Tatsugiri Curly Mega",
  "Tatsugiri Droopy Mega",
  "Tatsugiri Stretchy Mega",
  "Baxcalibur Mega", "Meowstic Female Mega",
];

// ── Aliases (handle hyphenated / special-form inputs) ──────

const ALIASES: Record<string, string> = {
  "brute bonnet": "Brute Bonnet",
  "chi yu": "Chi Yu",
  "chien pao": "Chien Pao",
  "farfetchd": "Farfetch D",
  "flutter mane": "Flutter Mane",
  "gouging fire": "Gouging Fire",
  "great tusk": "Great Tusk",
  "hakamo o": "Hakamo O",
  "hakamoo": "Hakamo O",
  "ho oh": "Ho Oh",
  "hooh": "Ho Oh",
  "iron boulder": "Iron Boulder",
  "iron bundle": "Iron Bundle",
  "iron crown": "Iron Crown",
  "iron hands": "Iron Hands",
  "iron jugulis": "Iron Jugulis",
  "iron leaves": "Iron Leaves",
  "iron moth": "Iron Moth",
  "iron thorns": "Iron Thorns",
  "iron treads": "Iron Treads",
  "iron valiant": "Iron Valiant",
  "jangmo o": "Jangmo O",
  "jangmoo": "Jangmo O",
  "kommo o": "Kommo O",
  "kommoo": "Kommo O",
  "mime jr": "Mime Jr",
  "mimejr": "Mime Jr",
  "mr mime": "Mr Mime",
  "mrmime": "Mr Mime",
  "nidoran f": "Nidoran F",
  "nidoran female": "Nidoran F",
  "nidoran m": "Nidoran M",
  "nidoran male": "Nidoran M",
  "porygon 2": "Porygon 2",
  "porygon z": "Porygon Z",
  "porygon2": "Porygon 2",
  "porygonz": "Porygon Z",
  "raging bolt": "Raging Bolt",
  "roaring moon": "Roaring Moon",
  "sandy shocks": "Sandy Shocks",
  "scream tail": "Scream Tail",
  "sirfetchd": "Sirfetch D",
  "slither wing": "Slither Wing",
  "tapu bulu": "Tapu Bulu",
  "tapu fini": "Tapu Fini",
  "tapu koko": "Tapu Koko",
  "tapu lele": "Tapu Lele",
  "ting lu": "Ting Lu",
  "type null": "Type Null",
  "typenull": "Type Null",
  "walking wake": "Walking Wake",
  "wo chien": "Wo Chien",
};

// ── Lookup ──────────────────────────────────────────────────────────

function normalize(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, " ");
}

const LOOKUP_MAP: Map<string, string> = new Map();

for (const entry of POKEMON_ENTRIES) {
  LOOKUP_MAP.set(normalize(entry), entry);
}
// Also add hyphen-free key for hyphenated names
for (const entry of POKEMON_ENTRIES) {
  const noHyphenKey = normalize(entry).replace(/-/g, "");
  if (!LOOKUP_MAP.has(noHyphenKey)) {
    LOOKUP_MAP.set(noHyphenKey, entry);
  }
}
for (const [alias, target] of Object.entries(ALIASES)) {
  const key = normalize(alias);
  if (!LOOKUP_MAP.has(key)) {
    LOOKUP_MAP.set(key, target);
  }
}

export interface LocalLookupResult {
  valid: true;
  display: string;
}

export function localLookup(name: string): LocalLookupResult | null {
  let key = normalize(name);
  let display = LOOKUP_MAP.get(key);
  // Try without hyphens
  if (!display) {
    key = key.replace(/-/g, "");
    display = LOOKUP_MAP.get(key);
  }
  if (!display) return null;
  return { valid: true, display };
}

export const DATASET_SIZE = POKEMON_ENTRIES.length;
/**
 * Escape a string for safe use inside a SPARQL query string literal.
 * Escapes: backslash (\) → \\, double-quote (") → \"
 */
export function escapeSparqlString(input: string): string {
  return input.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/** Supported gender values for Wikidata validation. */
export type Gender = "female" | "male";

/** Map gender to the corresponding Wikidata Q-ID for property P21 (sex or gender). */
const GENDER_QID: Record<Gender, string> = {
  female: "wd:Q6581072",
  male: "wd:Q6581097",
};

/**
 * Build a SPARQL query to validate whether a name corresponds to a
 * human of the given gender in Wikidata.
 *
 * - Q5 = human
 * - Q6581072 = female
 * - Q6581097 = male
 *
 * @param name  The display name to search for (English label).
 * @param gender  "female" (default) or "male".
 * @returns The full SPARQL query string ready for the Wikidata endpoint.
 */
export function buildValidationQuery(name: string, gender: Gender = "female"): string {
  const lower = escapeSparqlString(name.toLowerCase());
  const genderQid = GENDER_QID[gender];
  return `
SELECT ?item WHERE {
  ?item wdt:P31 wd:Q5 .
  ?item wdt:P21 ${genderQid} .
  ?item rdfs:label ?label .
  FILTER(LANG(?label) = "en" && LCASE(STR(?label)) = "${lower}")
}
LIMIT 1`.trim();
}

/** Wikidata SPARQL endpoint URL. */
export const WIKIDATA_SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

/** User-Agent header required by Wikidata policy. */
export const USER_AGENT = "Name100Challenge/1.0 (https://name100challenge.me; yingxinguo.cn@gmail.com)";

/**
 * Escape a string for safe use inside a SPARQL query string literal.
 * Escapes: backslash (\) → \\, double-quote (") → \"
 */
export function escapeSparqlString(input: string): string {
  return input.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/**
 * Build a SPARQL query to validate whether a name corresponds to a
 * female human (Q5 = human, Q6581072 = female) in Wikidata.
 *
 * Returns the full SPARQL query string ready for the Wikidata endpoint.
 */
export function buildValidationQuery(name: string): string {
  const escaped = escapeSparqlString(name);
  return `
SELECT ?item WHERE {
  ?item wdt:P31 wd:Q5 .
  ?item wdt:P21 wd:Q6581072 .
  ?item rdfs:label "${escaped}"@en .
}
LIMIT 1`.trim();
}

/** Wikidata SPARQL endpoint URL. */
export const WIKIDATA_SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";

/** User-Agent header required by Wikidata policy. */
export const USER_AGENT = "Name100Women/0.1 (contact@example.com)";

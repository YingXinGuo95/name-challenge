/**
 * Per-challenge configuration.
 * Tweak these values to adjust difficulty, data sources, and behaviour.
 */
const config = {
  /** Number of correct names required to complete the challenge. */
  targetCount: 100,

  /**
   * Data source for name validation.
   *
   * - "wikidata"  → try Wikidata SPARQL first, fall back to local dataset on network error
   * - "local"     → use only the built-in local dataset (instant, no network)
   */
  dataSource: "wikidata",
};

export default config;

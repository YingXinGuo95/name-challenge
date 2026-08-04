/**
 * Per-challenge configuration.
 * Tweak these values to adjust difficulty, data sources, and behaviour.
 */
const config = {
  /** Number of correct movie titles required to complete the challenge. */
  targetCount: 100,
  //targetCount: 3,

  /**
   * Data source for movie validation.
   *
   * - "wikidata"  → try Wikidata first, fall back to local dataset on network error
   * - "local"     → use only the built-in local dataset (instant, no network)
   */
  dataSource: "wikidata",
  //dataSource: "local",
};

export default config;

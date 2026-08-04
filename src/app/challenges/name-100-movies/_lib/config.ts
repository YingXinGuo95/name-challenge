/**
 * Per-challenge configuration for Name 100 Movies.
 */
const config = {
  /** Number of correct names required to complete the challenge. */
  targetCount: 100,

  /**
   * Data source for movie validation.
   * - "wikidata" → try Wikidata first, fall back to local dataset on error
   * - "local" → use only the built-in local dataset
   */
  dataSource: "wikidata" as "wikidata" | "local",
};

export default config;

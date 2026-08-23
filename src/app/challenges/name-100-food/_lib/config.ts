/**
 * Per-challenge configuration for Name 100 Food.
 */
const config = {
  /** Number of correct names required to complete the challenge. */
  targetCount: 100,
  //targetCount: 3, // for quick end-to-end testing

  /**
   * Data source for name validation.
   *
   * - "wikidata" → try Wikidata first, fall back to local dataset on network error
   * - "local"    → use only the built-in local dataset (instant, no network)
   */
  dataSource: "wikidata",
};

export default config;

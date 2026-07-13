/**
 * Per-challenge configuration for Name 100 Countries.
 */
const config = {
  /** Number of correct names required to complete the challenge. */
  targetCount: 100,
  //targetCount: 3,

  /**
   * Data source for name validation.
   *
   * - "local" → use only the built-in local dataset (instant, no network)
   */
  dataSource: "local" as const,
};

export default config;

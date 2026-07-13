/**
 * Re-exports from the shared (gender-aware) SPARQL module with
 * male as the default gender for this challenge.
 */
export {
  searchEntities,
  verifyHumanGender,
  validateWikidata,
  WIKIDATA_SPARQL_ENDPOINT,
  USER_AGENT,
  type Gender,
  type ValidationResult,
} from "@/app/challenges/name-100-women/_lib/sparql";

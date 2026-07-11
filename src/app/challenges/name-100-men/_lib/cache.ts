/**
 * Re-exports from the shared (gender-aware) cache module.
 * The underlying Map is shared across all challenges.
 */
export {
  cacheGet,
  cacheSet,
  cacheClear,
  cacheSize,
} from "@/app/challenges/name-100-women/_lib/cache";

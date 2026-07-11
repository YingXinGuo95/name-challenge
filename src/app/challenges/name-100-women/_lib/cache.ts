import { CacheEntry } from "@/app/challenges/name-100-women/_lib/types";

const cache: Map<string, CacheEntry> = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

/** Build a cache key, optionally scoped by gender. */
function buildCacheKey(name: string, gender?: string): string {
  const base = name.toLowerCase();
  return gender ? `${base}::${gender}` : base;
}

/** Evict expired entries from the cache. */
function evictExpired(): void {
  const now = Date.now();
  cache.forEach((entry, key) => {
    if (entry.expiresAt <= now) {
      cache.delete(key);
    }
  });
}

/**
 * Look up a name in the cache.
 * Returns the CacheEntry if found and not expired, otherwise undefined.
 */
export function cacheGet(key: string, gender?: string): CacheEntry | undefined {
  evictExpired();
  const cacheKey = buildCacheKey(key, gender);
  const entry = cache.get(cacheKey);
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    cache.delete(cacheKey);
    return undefined;
  }
  return entry;
}

/**
 * Store a result in the cache.
 * Only `valid: true` results are cached per PRD requirements.
 */
export function cacheSet(key: string, entry: Omit<CacheEntry, "expiresAt">, gender?: string): void {
  const cacheKey = buildCacheKey(key, gender);
  cache.set(cacheKey, {
    ...entry,
    expiresAt: Date.now() + CACHE_TTL,
  });
}

/** Clear all cache entries (useful for testing / restarts). */
export function cacheClear(): void {
  cache.clear();
}

/** Return the current cache size (useful for debugging). */
export function cacheSize(): number {
  evictExpired();
  return cache.size;
}

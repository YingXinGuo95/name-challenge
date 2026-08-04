import { CacheEntry } from "./types";

const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function cacheGet(key: string): CacheEntry | null {
  const entry = cache.get(key.toLowerCase());
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key.toLowerCase());
    return null;
  }
  return entry;
}

export function cacheSet(
  key: string,
  data: { valid: boolean; qid?: string }
): void {
  cache.set(key.toLowerCase(), {
    valid: data.valid,
    qid: data.qid,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

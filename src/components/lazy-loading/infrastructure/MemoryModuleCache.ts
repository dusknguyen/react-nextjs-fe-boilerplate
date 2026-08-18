import type {
  CacheInvalidator,
  CacheReader,
  CacheWriter,
} from '../ports/cache';

/** Configuration for the in-memory module cache adapter. */
export type MemoryModuleCacheOptions = {
  clock?: () => number;
  maxEntries?: number;
  ttlMs?: number;
};

type CacheEntry = {
  expiresAt: number;
  value: Promise<unknown>;
};

/**
 * In-memory cache adapter for pending or fulfilled asynchronous module loads.
 * The adapter supports bounded storage and optional TTL expiration.
 */
export class MemoryModuleCache<Key>
  implements CacheReader<Key>, CacheWriter<Key>, CacheInvalidator<Key>
{
  readonly #clock: () => number;
  readonly #entries = new Map<Key, CacheEntry>();
  readonly #maxEntries: number;
  readonly #ttlMs: number;

  constructor({
    clock = Date.now,
    maxEntries = 64,
    ttlMs = Number.POSITIVE_INFINITY,
  }: MemoryModuleCacheOptions = {}) {
    this.#clock = clock;
    this.#maxEntries = Math.max(1, Math.floor(maxEntries));
    this.#ttlMs = ttlMs >= 0 ? ttlMs : Number.POSITIVE_INFINITY;
  }

  read<Value>(key: Key) {
    const entry = this.#entries.get(key);
    if (!entry) return undefined;

    if (entry.expiresAt <= this.#clock()) {
      this.#entries.delete(key);
      return undefined;
    }

    return entry.value as Promise<Value>;
  }

  remove(key: Key) {
    this.#entries.delete(key);
  }

  write<Value>(key: Key, value: Promise<Value>) {
    // Refresh insertion order so the oldest entry can be evicted deterministically.
    this.#entries.delete(key);
    this.#entries.set(key, {
      expiresAt: Number.isFinite(this.#ttlMs)
        ? this.#clock() + this.#ttlMs
        : Number.POSITIVE_INFINITY,
      value,
    });

    while (this.#entries.size > this.#maxEntries) {
      const oldestKey = this.#entries.keys().next().value as Key | undefined;
      if (oldestKey === undefined) break;
      this.#entries.delete(oldestKey);
    }
  }
}

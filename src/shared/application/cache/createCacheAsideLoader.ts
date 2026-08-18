import type { AsyncCachePort } from '../../ports/asyncCache';

/** Minimal synchronous cache inspection capability. */
export interface CacheInspector<Key> {
  has(key: Key): boolean;
}

/** Async value loading capability used by consumers that need the result. */
export interface AsyncValueLoader<Key, Value> {
  load(key: Key): Promise<Value>;
}

/** Fire-and-forget read-ahead capability used by navigation and hover intents. */
export interface AsyncValuePreloader<Key> {
  preload(key: Key): void;
}

export type CacheAsideLoader<Key, Value> = CacheInspector<Key>
  & AsyncValueLoader<Key, Value>
  & AsyncValuePreloader<Key>;

export function createCacheAsideLoader<Key, Value>(
  {
    cache,
    loadFromSource,
  }: {
    cache: AsyncCachePort<Key, Value>;
    loadFromSource: (key: Key) => Promise<Value>;
  },
): CacheAsideLoader<Key, Value> {
  function load(key: Key): Promise<Value> {
    const cached = cache.read(key);
    if (cached) return cached;

    const pending = loadFromSource(key).catch((error: unknown) => {
      cache.remove(key);
      throw error;
    });
    cache.write(key, pending);
    return pending;
  }

  return {
    has: (key) => cache.read(key) !== undefined,
    load,
    preload: (key) => {
      // A speculative failure must not become an unhandled rejection. `load`
      // already evicts failed entries, so a later navigation can retry.
      void load(key).catch(() => undefined);
    },
  };
}

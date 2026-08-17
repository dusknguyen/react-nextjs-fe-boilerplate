import type { AsyncCachePort } from '../../ports/asyncCache';

export interface CacheAsideLoader<Key, Value> {
  has(key: Key): boolean;
  load(key: Key): Promise<Value>;
  preload(key: Key): void;
}

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

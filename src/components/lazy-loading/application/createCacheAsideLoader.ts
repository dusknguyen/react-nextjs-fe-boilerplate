import type { CacheAsidePorts } from '../ports/cache';

/** Loads values by key while deduplicating concurrent source requests. */
export type CacheAsideLoader<Key> = <Value>(
  key: Key,
  source: () => Promise<Value>,
) => Promise<Value>;

/**
 * Creates a framework-independent cache-aside use case from segregated cache ports.
 * Rejected values are invalidated so the next call can retry the source.
 */
export function createCacheAsideLoader<Key>({
  invalidator,
  reader,
  writer,
}: CacheAsidePorts<Key>): CacheAsideLoader<Key> {
  return function load<Value>(key: Key, source: () => Promise<Value>) {
    const cached = reader.read<Value>(key);
    if (cached !== undefined) return cached;

    const pending = Promise.resolve()
      .then(source)
      .catch((error: unknown) => {
        // Only remove the promise that actually failed. A newer write may have
        // replaced it after TTL expiry while this request was still pending.
        if (reader.read<Value>(key) === pending) {
          invalidator.remove(key);
        }
        throw error;
      });

    writer.write(key, pending);
    return pending;
  };
}

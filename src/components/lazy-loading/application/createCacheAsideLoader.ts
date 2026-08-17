import type { CacheAsidePorts } from '../ports/cache'; /** Loads values by key while deduplicating concurrent source requests. */ export type CacheAsideLoader<Key> = <Value>(key: Key, source: () => Promise<Value>) => Promise<Value>;
/** Creates a framework-independent cache-aside use case from segregated cache ports. */
export function createCacheAsideLoader<Key>({ invalidator, reader, writer }: CacheAsidePorts<Key>): CacheAsideLoader<Key> {
  return function load<Value>(key: Key, source: () => Promise<Value>) {
    const cached = reader.read<Value>(key);
    if (cached) return cached;
    const pending = source();
    writer.write(key, pending);
    return pending.catch((error) => { invalidator.remove(key); throw error; });
  };
}

import type { CacheInvalidator, CacheReader, CacheWriter } from '../ports/cache';
/** In-memory adapter that stores pending or fulfilled asynchronous module loads. */ export class MemoryModuleCache<Key> implements CacheReader<Key>, CacheWriter<Key>, CacheInvalidator<Key> {
  readonly #entries = new Map<Key, Promise<unknown>>();
  read<Value>(key: Key) { return this.#entries.get(key) as Promise<Value> | undefined; }
  remove(key: Key) { this.#entries.delete(key); }
  write<Value>(key: Key, value: Promise<Value>) { this.#entries.set(key, value); }
}

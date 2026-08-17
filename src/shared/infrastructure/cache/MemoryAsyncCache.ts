import type { AsyncCachePort } from '../../ports/asyncCache';

/** Process-local adapter for pending and resolved asynchronous values. */
export class MemoryAsyncCache<Key, Value> implements AsyncCachePort<Key, Value> {
  readonly #entries = new Map<Key, Promise<Value>>();

  read(key: Key): Promise<Value> | undefined {
    return this.#entries.get(key);
  }

  remove(key: Key): void {
    this.#entries.delete(key);
  }

  write(key: Key, value: Promise<Value>): void {
    this.#entries.set(key, value);
  }
}

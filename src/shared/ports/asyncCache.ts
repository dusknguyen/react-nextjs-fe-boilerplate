/** Read capability required by cache-aside consumers. */
export interface AsyncCacheReader<Key, Value> {
  read(key: Key): Promise<Value> | undefined;
}

/** Write capability required after a cache miss. */
export interface AsyncCacheWriter<Key, Value> {
  write(key: Key, value: Promise<Value>): void;
}

/** Invalidation capability required when a source load fails. */
export interface AsyncCacheInvalidator<Key> {
  remove(key: Key): void;
}

export type AsyncCachePort<Key, Value> = AsyncCacheReader<Key, Value>
  & AsyncCacheWriter<Key, Value>
  & AsyncCacheInvalidator<Key>;

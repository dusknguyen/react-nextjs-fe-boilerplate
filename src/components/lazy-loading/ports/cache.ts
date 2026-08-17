/** Read-only cache port required by the cache-aside use case. */ export interface CacheReader<Key> { read<Value>(key: Key): Promise<Value> | undefined }
/** Write-only cache port required by the cache-aside use case. */ export interface CacheWriter<Key> { write<Value>(key: Key, value: Promise<Value>): void }
/** Minimal invalidation port used after a failed source load. */ export interface CacheInvalidator<Key> { remove(key: Key): void }
/** Segregated cache capabilities consumed by a cache-aside loader. */ export type CacheAsidePorts<Key> = {
  invalidator: CacheInvalidator<Key>;
  reader: CacheReader<Key>;
  writer: CacheWriter<Key>;
};

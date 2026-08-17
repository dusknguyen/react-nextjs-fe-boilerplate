# Component code flow

This package is the UI module of a modular monolith. `index.ts` is its only
public barrel; folders below it are implementation boundaries, not additional
packages or facades.

## Lazy-loading flow

```text
Lazy component
  -> presentation/createLoadableComponent
  -> composition/moduleLoaders
  -> application/createCacheAsideLoader
  -> ports/CacheReader + CacheWriter + CacheInvalidator
  -> infrastructure/MemoryModuleCache
  -> literal dynamic import on a cache miss
```

`lazyComponents.ts` only maps module exports to React lazy components.
`moduleLoaders.ts` owns module keys, literal imports, and dependency wiring.
The cache-aside use case knows only its three small ports. Rejected promises
are removed so a later call can retry.

## Foundation action flow

`Button.tsx` renders interaction and accessibility. `buttonStyles.ts` owns
variant, size, and shape decisions. Pagination, Link, and FileInput are
separate consumers rather than unrelated declarations in one file.

## Change rules

1. Keep every TS/TSX file at or below 10 physical lines.
2. Add exports only to the root `index.ts`; do not add nested barrels.
3. Inner model/application/port layers must not import adapters or React.
4. Extend behavior through maps, ports, adapters, and composition roots.
5. Keep a component, use case, adapter, or registry focused on one flow step.

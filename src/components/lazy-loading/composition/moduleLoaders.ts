import { createCacheAsideLoader } from '../application/createCacheAsideLoader';
import { MemoryModuleCache } from '../infrastructure/MemoryModuleCache';

const cache = new MemoryModuleCache<string>({ maxEntries: 16 });
const loadCached = createCacheAsideLoader({
  invalidator: cache,
  reader: cache,
  writer: cache,
});

/** Wraps a dynamic import with cache-aside promise de-duplication. */
function cached<Module>(key: string, source: () => Promise<Module>) {
  return () => loadCached(key, source);
}

/** Lazily imports the advanced-data feature module and caches its promise. */
export const loadAdvancedData = cached(
  'components/data-display/advanced',
  () => import('../../data-display/AdvancedData'),
);

/** Lazily imports the visualization feature module and caches its promise. */
export const loadVisualizations = cached(
  'components/data-display/visualizations',
  () => import('../../data-display/Visualizations'),
);

/** Lazily imports the choice-input feature module and caches its promise. */
export const loadChoiceInputs = cached(
  'components/forms/choice-inputs',
  () => import('../../forms/ChoiceInputs'),
);

/** Lazily imports the overlay feature module and caches its promise. */
export const loadOverlays = cached(
  'components/overlays',
  () => import('../../overlays/Overlays'),
);

/** Lazily imports the media feature module and caches its promise. */
export const loadMedia = cached(
  'components/media',
  () => import('../../media/Media'),
);

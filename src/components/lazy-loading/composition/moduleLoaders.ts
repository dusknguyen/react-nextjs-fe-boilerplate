import { createCacheAsideLoader } from '../application/createCacheAsideLoader';
import { MemoryModuleCache } from '../infrastructure/MemoryModuleCache';
const cache = new MemoryModuleCache<string>();
const loadCached = createCacheAsideLoader({ invalidator: cache, reader: cache, writer: cache });
function cached<Module>(key: string, source: () => Promise<Module>) { return () => loadCached(key, source); }
/** Lazily imports the advanced-data feature module and caches its promise. */ export const loadAdvancedData = cached('components/data-display', () => import('../../data-display/AdvancedData'));
/** Lazily imports the choice-input feature module and caches its promise. */ export const loadChoiceInputs = cached('components/forms/choice-inputs', () => import('../../forms/ChoiceInputs'));
/** Lazily imports the overlay feature module and caches its promise. */ export const loadOverlays = cached('components/overlays', () => import('../../overlays/Overlays'));

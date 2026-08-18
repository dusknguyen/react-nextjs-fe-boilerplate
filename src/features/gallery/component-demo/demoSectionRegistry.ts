'use client';

import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

import { createCacheAsideLoader } from '@/src/shared/application/cache/createCacheAsideLoader';
import { MemoryAsyncCache } from '@/src/shared/infrastructure/cache/MemoryAsyncCache';

import type { DemoSectionId } from './catalog';

type DemoModule = { default: ComponentType };
type DemoImporter = () => Promise<DemoModule>;

export type LoadableDemoSection = LazyExoticComponent<ComponentType> & {
  preload: () => Promise<void>;
};

const importers = {
  actions: () => import('./sections/ActionsDemo'),
  data: () => import('./sections/DataDisplayDemo'),
  navigation: () => import('./sections/NavigationDemo'),
  feedback: () => import('./sections/FeedbackDemo'),
  input: () => import('./sections/DataInputDemo'),
  layout: () => import('./sections/LayoutDemo'),
  mockups: () => import('./sections/MockupsDemo'),
  universal: () => import('./sections/UniversalToolkitDemo'),
} satisfies Record<DemoSectionId, DemoImporter>;

const modules = createCacheAsideLoader({
  cache: new MemoryAsyncCache<DemoSectionId, DemoModule>(),
  loadFromSource: (section: DemoSectionId) => importers[section](),
});

function createLoadableDemoSection(section: DemoSectionId): LoadableDemoSection {
  return Object.assign(lazy(() => modules.load(section)), {
    preload: async () => { await modules.load(section); },
  });
}

export const demoSectionRegistry = Object.fromEntries(
  Object.keys(importers).map((id) => [id, createLoadableDemoSection(id as DemoSectionId)]),
) as Record<DemoSectionId, LoadableDemoSection>;

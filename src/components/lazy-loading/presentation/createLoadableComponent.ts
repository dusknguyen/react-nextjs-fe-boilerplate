'use client';
import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy } from 'react';
/** A React lazy component with an imperative preload hook. */ export type LoadableComponent<Props> = LazyExoticComponent<ComponentType<Props>> & { preload: () => Promise<void>; };
/** Adapts an asynchronous component source to React lazy loading with preload support. */
export function createLoadableComponent<Props>(load: () => Promise<ComponentType<Props>>): LoadableComponent<Props> {
  const Component = lazy(async () => ({ default: await load() }));
  const preload = async () => { await load(); };
  return Object.assign(Component, { preload });
}

'use client';

import { createLoadableComponent } from '../presentation/createLoadableComponent';
import {
  loadAdvancedData,
  loadChoiceInputs,
  loadMedia,
  loadOverlays,
  loadVisualizations,
} from './moduleLoaders';

/** Data grid loaded on first render or explicit preload. */
export const LazyDataGrid = createLoadableComponent(
  async () => (await loadAdvancedData()).DataGrid,
);

/** Transfer list loaded on first render or explicit preload. */
export const LazyTransferList = createLoadableComponent(
  async () => (await loadAdvancedData()).TransferList,
);

/** Autocomplete input loaded on first render or explicit preload. */
export const LazyAutoComplete = createLoadableComponent(
  async () => (await loadChoiceInputs()).AutoComplete,
);

/** Action sheet loaded on first render or explicit preload. */
export const LazyActionSheet = createLoadableComponent(
  async () => (await loadOverlays()).ActionSheet,
);

/** Bar chart loaded only when visualization UI is requested. */
export const LazyBarChart = createLoadableComponent(
  async () => (await loadVisualizations()).BarChart,
);

/** Media gallery loaded only when media UI is requested. */
export const LazyMediaGallery = createLoadableComponent(
  async () => (await loadMedia()).MediaGallery,
);

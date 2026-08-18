/** Display and sorting metadata for one data-grid column. */
export type DataGridColumn = {
  key: string;
  label: string;
  numeric?: boolean;
  sortable?: boolean;
};

/** Record shape accepted by the data-grid model. */
export type DataGridRow = {
  id: string;
} & Record<string, string | number>;

/** Active data-grid sort key and direction. */
export type DataGridSort = {
  direction: 'asc' | 'desc';
  key: string;
};

/**
 * Filters every cell and returns a sorted copy without mutating source rows.
 * Empty queries intentionally preserve every row.
 */
export function filterAndSortRows(
  rows: readonly DataGridRow[],
  query: string,
  sort: DataGridSort | null,
): DataGridRow[] {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? rows.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(normalizedQuery),
        ),
      )
    : [...rows];

  if (!sort) return filtered;

  return [...filtered].sort((left, right) => {
    const comparison = String(left[sort.key] ?? '').localeCompare(
      String(right[sort.key] ?? ''),
      undefined,
      { numeric: true },
    );
    return sort.direction === 'asc' ? comparison : -comparison;
  });
}

/** Page result returned by the data-grid pagination model. */
export type DataGridPage = {
  page: number;
  rows: DataGridRow[];
  totalPages: number;
};

/**
 * Selects one valid page and reports its clamped index and total page count.
 * Invalid page and page-size values are normalized to 1 to prevent negative
 * slicing, division by zero, and Infinity page counts.
 */
export function pageRows(
  rows: readonly DataGridRow[],
  page: number,
  pageSize: number,
): DataGridPage {
  const safePageSize = Number.isFinite(pageSize)
    ? Math.max(1, Math.floor(pageSize))
    : 1;
  const totalPages = Math.max(1, Math.ceil(rows.length / safePageSize));
  const requestedPage = Number.isFinite(page) ? Math.floor(page) : 1;
  const safePage = Math.min(totalPages, Math.max(1, requestedPage));
  const start = (safePage - 1) * safePageSize;

  return {
    page: safePage,
    rows: rows.slice(start, start + safePageSize),
    totalPages,
  };
}

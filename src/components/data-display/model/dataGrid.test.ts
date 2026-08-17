import { filterAndSortRows, pageRows, type DataGridRow } from './dataGrid';
const rows: DataGridRow[] = [{ id: '1', name: 'Beta', score: 2 }, { id: '2', name: 'Alpha', score: 10 }];
describe('data grid model', () => {
  it('filters and sorts without mutating the source', () => { const result = filterAndSortRows(rows, 'a', { direction: 'asc', key: 'score' }); expect(result.map(({ id }) => id)).toEqual(['1', '2']); expect(rows.map(({ id }) => id)).toEqual(['1', '2']); });
  it('clamps pages to the available range', () => { expect(pageRows(rows, 8, 1)).toEqual({ page: 2, rows: [rows[1]], totalPages: 2 }); });
});

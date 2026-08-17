import { MemoryModuleCache } from '../infrastructure/MemoryModuleCache'; import { createCacheAsideLoader } from './createCacheAsideLoader';
function createLoader() { const cache = new MemoryModuleCache<string>(); return createCacheAsideLoader({ invalidator: cache, reader: cache, writer: cache }); }
describe('cache-aside loader', () => {
  it('deduplicates concurrent calls', async () => { const load = createLoader(); const source = jest.fn(async () => 'module'); const values = await Promise.all([load('key', source), load('key', source)]); expect(values).toEqual(['module', 'module']); expect(source).toHaveBeenCalledTimes(1); });
  it('evicts rejected promises', async () => { const load = createLoader(); const source = jest.fn<Promise<string>, []>().mockRejectedValueOnce(new Error('temporary')).mockResolvedValueOnce('recovered'); await expect(load('key', source)).rejects.toThrow('temporary'); await expect(load('key', source)).resolves.toBe('recovered'); expect(source).toHaveBeenCalledTimes(2); });
});

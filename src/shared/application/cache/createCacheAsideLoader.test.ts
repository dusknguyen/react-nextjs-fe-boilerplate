import { createCacheAsideLoader } from './createCacheAsideLoader';

function createLoader(source: (key: string) => Promise<string>) {
  const entries = new Map<string, Promise<string>>();
  return createCacheAsideLoader({
    cache: {
      read: (key) => entries.get(key),
      remove: (key) => { entries.delete(key); },
      write: (key, value) => { entries.set(key, value); },
    },
    loadFromSource: source,
  });
}

describe('shared cache-aside loader', () => {
  it('deduplicates concurrent source requests', async () => {
    const source = jest.fn(async (key: string) => key);
    const loader = createLoader(source);

    await expect(Promise.all([loader.load('route'), loader.load('route')])).resolves.toEqual(['route', 'route']);
    expect(source).toHaveBeenCalledTimes(1);
    expect(loader.has('route')).toBe(true);
  });

  it('evicts a rejected load so navigation can retry', async () => {
    const source = jest.fn<Promise<string>, [string]>()
      .mockRejectedValueOnce(new Error('temporary'))
      .mockResolvedValueOnce('recovered');
    const loader = createLoader(source);

    await expect(loader.load('route')).rejects.toThrow('temporary');
    await expect(loader.load('route')).resolves.toBe('recovered');
    expect(source).toHaveBeenCalledTimes(2);
  });
});

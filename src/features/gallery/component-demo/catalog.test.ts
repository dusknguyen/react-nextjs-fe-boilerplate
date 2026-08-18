import { demoComponentCount, demoSectionIds, demoSections, isDemoSectionId } from './catalog';

describe('component demo catalog', () => {
  it('keeps section metadata aligned with the public filter ids', () => {
    expect(demoSections.map((section) => section.id)).toEqual(demoSectionIds);
  });

  it('derives the total from unique demonstrated component names', () => {
    const names = demoSections.flatMap((section) => section.names);

    expect(new Set(names).size).toBe(names.length);
    expect(demoComponentCount).toBe(names.length);
  });

  it('validates section ids without unsafe casts at external boundaries', () => {
    expect(isDemoSectionId('universal')).toBe(true);
    expect(isDemoSectionId('unknown')).toBe(false);
  });
});

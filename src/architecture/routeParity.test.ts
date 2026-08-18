import fs from 'node:fs';
import path from 'node:path';
import {
  appRouteAliases,
  appRoutes,
  sharedPagePaths,
  type AppRouteAliasId,
} from '../modules/navigation/domain/appRoute';

type PageEntry = {
  file: string;
  routePath: string;
};

const nextRoutesRoot = path.resolve(__dirname, '../../app');
const expoRoutesRoot = path.resolve(__dirname, '../app');

function filesBelow(root: string): string[] {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(root, entry.name);
    return entry.isDirectory() ? filesBelow(file) : [file];
  });
}

function routePath(segments: string[]): string {
  return segments.length === 0 ? '/' : `/${segments.join('/')}`;
}

function nextPageEntries(): PageEntry[] {
  return filesBelow(nextRoutesRoot)
    .filter((file) => path.basename(file) === 'page.tsx')
    .map((file) => {
      const segments = path.relative(nextRoutesRoot, file)
        .split(path.sep)
        .slice(0, -1)
        .filter((segment) => !/^\(.+\)$/.test(segment));
      return { file, routePath: routePath(segments) };
    });
}

function expoPageEntries(): PageEntry[] {
  return filesBelow(expoRoutesRoot)
    .filter((file) => {
      const basename = path.basename(file);
      return file.endsWith('.tsx') && !basename.startsWith('_') && !basename.startsWith('+');
    })
    .map((file) => {
      const relativeSegments = path.relative(expoRoutesRoot, file).split(path.sep);
      const basename = path.parse(relativeSegments.at(-1) ?? '').name;
      const directorySegments = relativeSegments.slice(0, -1);
      const segments = basename === 'index'
        ? directorySegments
        : [...directorySegments, basename];
      return { file, routePath: routePath(segments) };
    });
}

function expectCanonicalAdapters(entries: PageEntry[], controller: string): void {
  for (const route of appRoutes) {
    const entry = entries.find((candidate) => candidate.routePath === route.path);
    expect(entry).toBeDefined();
    expect(fs.readFileSync(entry?.file ?? '', 'utf8')).toContain(
      `<${controller} route="${route.id}" />`,
    );
  }
}

function expectAliasAdapters(entries: PageEntry[]): void {
  for (const aliasId of Object.keys(appRouteAliases) as AppRouteAliasId[]) {
    const alias = appRouteAliases[aliasId];
    const entry = entries.find((candidate) => candidate.routePath === alias.path);
    expect(entry).toBeDefined();
    expect(fs.readFileSync(entry?.file ?? '', 'utf8')).toContain(
      `getAppRouteAliasTarget('${aliasId}')`,
    );
  }
}

describe('Next.js and Expo route parity', () => {
  const expectedPaths = [...sharedPagePaths].sort();
  const nextEntries = nextPageEntries();
  const expoEntries = expoPageEntries();

  it('exposes exactly the same shared page URLs', () => {
    expect(nextEntries.map((entry) => entry.routePath).sort()).toEqual(expectedPaths);
    expect(expoEntries.map((entry) => entry.routePath).sort()).toEqual(expectedPaths);
  });

  it('maps every canonical URL to the same shared screen', () => {
    expectCanonicalAdapters(nextEntries, 'NextRouteController');
    expectCanonicalAdapters(expoEntries, 'ExpoRouteController');
  });

  it('keeps aliases backed by the shared redirect contract', () => {
    expectAliasAdapters(nextEntries);
    expectAliasAdapters(expoEntries);
  });
});

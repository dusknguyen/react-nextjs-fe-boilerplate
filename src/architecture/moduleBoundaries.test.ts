import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const modulesRoot = path.resolve(__dirname, '../modules');
const featuresRoot = path.resolve(__dirname, '../features');

const outerLayers = ['adapters', 'composition', 'infrastructure', 'presentation'] as const;
const frameworkImports = [
  'expo',
  'next',
  'react',
  'react-native',
  'zustand',
] as const;

function sourceFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(file);
    return /\.[cm]?tsx?$/.test(entry.name) && !entry.name.includes('.test.') ? [file] : [];
  });
}

type ImportReference = {
  specifier: string;
  typeOnly: boolean;
};

function imports(file: string): ImportReference[] {
  const tree = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  return tree.statements
    .filter(ts.isImportDeclaration)
    .map((declaration) => ({
      specifier: (declaration.moduleSpecifier as ts.StringLiteral).text,
      typeOnly: declaration.importClause?.isTypeOnly ?? false,
    }));
}

function targetsLayer(specifier: string, layers: readonly string[]): boolean {
  return layers.some((layer) => specifier.includes(`/${layer}/`));
}

function isFramework(specifier: string): boolean {
  return frameworkImports.some((name) => specifier === name || specifier.startsWith(`${name}/`));
}

function moduleViolations(): string[] {
  return sourceFiles(modulesRoot).flatMap((file) => {
    const normalized = file.replaceAll('\\', '/');
    const layer = normalized.split('/').at(-2);

    return imports(file).flatMap(({ specifier, typeOnly }) => {
      if (specifier.startsWith('@/src/modules/')) return [`cross-module: ${normalized} -> ${specifier}`];
      if (layer === 'domain' && (isFramework(specifier) || specifier.startsWith('..'))) {
        return [`domain: ${normalized} -> ${specifier}`];
      }
      if (layer === 'ports' && (
        (isFramework(specifier) && !typeOnly)
        || targetsLayer(specifier, outerLayers)
      )) {
        return [`ports: ${normalized} -> ${specifier}`];
      }
      if (layer === 'application' && (
        isFramework(specifier)
        || targetsLayer(specifier, ['adapters', 'composition', 'infrastructure', 'presentation'])
      )) {
        return [`application: ${normalized} -> ${specifier}`];
      }
      if (layer === 'infrastructure' && targetsLayer(specifier, ['adapters', 'composition', 'presentation'])) {
        return [`infrastructure: ${normalized} -> ${specifier}`];
      }
      return [];
    });
  });
}

describe('modular monolith boundaries', () => {
  it('keeps Clean Architecture dependencies pointing inward', () => {
    expect(moduleViolations()).toEqual([]);
  });

  it('keeps feature presentation independent from composition singletons', () => {
    const violations = sourceFiles(featuresRoot)
      .filter((file) => file.replaceAll('\\', '/').includes('/presentation/'))
      .flatMap((file) => imports(file)
        .map(({ specifier }) => specifier)
        .filter((specifier) => specifier.includes('/composition/'))
        .map((specifier) => `${file} -> ${specifier}`));

    expect(violations).toEqual([]);
  });
});

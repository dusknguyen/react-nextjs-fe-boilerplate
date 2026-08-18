import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(__dirname, '..');

const policies = [
  {
    dir: 'data-display/model',
    forbidden: [
      'react',
      'react-native',
      '/presentation/',
      '/infrastructure/',
      '/composition/',
    ],
  },
] as const;

/**
 * Recursively returns production TypeScript files in a directory.
 *
 * @param dir - Absolute directory path.
 * @returns TypeScript source file paths excluding tests.
 */
function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return files(file);
    }

    return /\.tsx?$/.test(entry.name) && !entry.name.includes('.test.') ? [file] : [];
  });
}

/**
 * Extracts static import specifiers from a TypeScript source file.
 *
 * @param file - Source file path.
 * @returns Imported module specifiers.
 */
function imports(file: string): string[] {
  const tree = ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );

  return tree.statements
    .filter(ts.isImportDeclaration)
    .map((node) => (node.moduleSpecifier as ts.StringLiteral).text);
}

/**
 * Finds dependency-direction violations for component-domain policies.
 *
 * @returns Human-readable violation descriptions.
 */
function violations(): string[] {
  return policies.flatMap(({ dir, forbidden }) =>
    files(path.join(root, dir)).flatMap((file) =>
      imports(file).flatMap((specifier) =>
        forbidden.some((term) => specifier === term || specifier.includes(term))
          ? [`${dir} -> ${specifier}`]
          : [],
      ),
    ),
  );
}

describe('Clean Architecture dependency direction', () => {
  it('keeps inner layers independent from outer adapters', () => {
    expect(violations()).toEqual([]);
  });
});

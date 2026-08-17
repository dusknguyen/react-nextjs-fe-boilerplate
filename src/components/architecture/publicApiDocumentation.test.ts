import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(__dirname, '..');

function sourceFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(file);
    return /\.tsx?$/.test(entry.name) && !entry.name.includes('.test.') ? [file] : [];
  });
}

function exportedName(node: ts.Statement, source: ts.SourceFile) {
  if ('name' in node && node.name && ts.isIdentifier(node.name)) return node.name.text;
  if (ts.isVariableStatement(node)) {
    return node.declarationList.declarations.map((declaration) => declaration.name.getText(source)).join(', ');
  }
  return ts.SyntaxKind[node.kind];
}

function undocumentedExports(file: string) {
  const contents = fs.readFileSync(file, 'utf8');
  const source = ts.createSourceFile(file, contents, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  return source.statements.flatMap((node) => {
    const exported = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
    if (!exported || ts.isExportDeclaration(node) || ts.getJSDocCommentsAndTags(node).length > 0) return [];
    return [`${path.relative(root, file)}:${exportedName(node, source)}`];
  });
}

describe('public API documentation', () => {
  it('documents every public declaration with JSDoc', () => {
    expect(sourceFiles(root).flatMap(undocumentedExports)).toEqual([]);
  });
});

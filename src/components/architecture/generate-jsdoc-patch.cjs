const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const relativeFile = process.argv[2];
if (!relativeFile) throw new Error('Expected a source file path.');

const file = path.resolve(process.cwd(), relativeFile);
const sourceText = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const source = ts.createSourceFile(
  file,
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
);

function declarationName(node) {
  if ('name' in node && node.name && ts.isIdentifier(node.name)) return node.name.text;
  if (ts.isVariableStatement(node)) {
    return node.declarationList.declarations.map((declaration) => declaration.name.getText(source)).join(' and ');
  }
  return 'public API';
}

function words(name) {
  return name.replace(/Props$/, '').replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
}

function description(node) {
  const name = declarationName(node);
  const readable = words(name);
  if (name.endsWith('Props')) return `Props accepted by the ${readable} component.`;
  if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) return `Public contract for ${readable}.`;
  if (ts.isClassDeclaration(node)) return `Implements the ${readable} adapter.`;
  if (name.startsWith('use')) return `Coordinates ${readable.slice(4)} state for presentation components.`;
  if (ts.isFunctionDeclaration(node)) return /^[A-Z]/.test(name) ? `Renders the ${readable} component.` : `Creates or computes ${readable}.`;
  return `Public ${readable} component or design-system primitive.`;
}

const insertions = [];
let previousEnd = 0;
for (const node of source.statements) {
  const exported = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
  if (exported && !ts.isExportDeclaration(node) && ts.getJSDocCommentsAndTags(node).length === 0) {
    const start = node.getStart(source);
    const gap = sourceText.slice(previousEnd, start);
    const existing = gap.match(/\/\*\*[\s\S]*?\*\/\s*$/);
    if (existing && existing.index !== undefined) {
      const commentStart = previousEnd + existing.index;
      const commentEnd = commentStart + existing[0].trimEnd().length;
      insertions.push({ offset: commentStart, text: '\n' });
      insertions.push({ offset: commentEnd, text: '\n' });
    } else {
      insertions.push({ offset: start, text: `\n/** ${description(node)} */\n` });
    }
  }
  previousEnd = node.end;
}

let updated = sourceText;
for (const insertion of insertions.sort((left, right) => right.offset - left.offset)) {
  updated = updated.slice(0, insertion.offset) + insertion.text + updated.slice(insertion.offset);
}

const absolute = file.replace(/\\/g, '/');
const oldLines = sourceText.split('\n');
const newLines = updated.split('\n');
process.stdout.write(`*** Begin Patch\n*** Update File: ${absolute}\n@@\n`);
for (const line of oldLines) process.stdout.write(`-${line}\n`);
for (const line of newLines) process.stdout.write(`+${line}\n`);
process.stdout.write('*** End Patch\n');

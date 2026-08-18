import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = path.resolve(__dirname, '..');

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory()
      ? sourceFiles(file)
      : entry.name.endsWith('.tsx')
        ? [file]
        : [];
  });
}

function violations(file: string): string[] {
  const source = fs.readFileSync(file, 'utf8');
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const aliases = new Map<string, ts.TypeAliasDeclaration>();
  const components: ts.FunctionDeclaration[] = [];

  function collect(node: ts.Node) {
    if (ts.isTypeAliasDeclaration(node)) aliases.set(node.name.text, node);
    if (ts.isFunctionDeclaration(node) && node.name && /^[A-Z]/.test(node.name.text)) {
      components.push(node);
    }
    ts.forEachChild(node, collect);
  }
  collect(tree);

  function inheritsBase(aliasName: string, visited = new Set<string>()): boolean {
    if (visited.has(aliasName)) return false;
    visited.add(aliasName);
    const alias = aliases.get(aliasName);
    if (!alias) return false;
    if (alias.type.getText(tree).startsWith('InheritedComponentProps<')) return true;

    let inherited = false;
    function inspect(node: ts.Node) {
      if (ts.isTypeReferenceNode(node)) {
        const referenced = node.typeName.getText(tree);
        if (referenced !== aliasName && inheritsBase(referenced, visited)) inherited = true;
      }
      if (!inherited) ts.forEachChild(node, inspect);
    }
    inspect(alias.type);
    return inherited;
  }

  return components.flatMap((component) => {
    const parameterType = component.parameters[0]?.type;
    if (!parameterType) return [];
    const type = parameterType.getText(tree);
    if (type.startsWith('InheritedComponentProps<')) return [];
    if (type === 'UniversalProps') return [];

    const reference = ts.isTypeReferenceNode(parameterType)
      ? parameterType.typeName.getText(tree)
      : undefined;
    if (reference?.endsWith('Props') && (inheritsBase(reference) || !aliases.has(reference))) return [];

    return [`${file}:${component.name?.text ?? 'Anonymous'}`];
  });
}

describe('component inheritance contract', () => {
  it('covers declared and factory-created components', () => {
    expect(sourceFiles(root).flatMap(violations)).toEqual([]);
    expect(fs.readFileSync(path.join(root, 'foundation/contracts.ts'), 'utf8'))
      .toContain('UniversalProps = InheritedComponentProps<');
  });
});

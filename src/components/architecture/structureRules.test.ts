import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(__dirname, '..');
function files(dir: string): string[] { return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => { const file = path.join(dir, entry.name); return entry.isDirectory() ? files(file) : /\.tsx?$/.test(entry.name) ? [file] : []; }); }
const sources = files(root);
describe('modular monolith structure', () => {
  it('uses one public barrel', () => { expect(sources.filter((file) => path.basename(file).startsWith('index.'))).toEqual([path.join(root, 'index.ts')]); });
});

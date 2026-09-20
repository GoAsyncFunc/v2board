import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');
const result = await build({
  absWorkingDir: appRoot,
  entryPoints: ['src/main.ts'],
  bundle: true,
  write: false,
  metafile: true,
  loader: { '.js': 'jsx' },
  format: 'iife',
  platform: 'browser',
  target: 'es2018',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'silent',
});

const escapedInputs = Object.keys(result.metafile.inputs).filter(input => path.isAbsolute(input) || input.startsWith('../'));
if (escapedInputs.length) throw new Error(`Dependency map used files outside admin: ${escapedInputs.slice(0, 5).join(', ')}`);

const edges = new Map();
for (const [inputPath, input] of Object.entries(result.metafile.inputs)) {
  if (!inputPath.startsWith('src/')) continue;
  for (const dependency of input.imports) {
    if (!dependency.path.startsWith('src/')) continue;
    const edge = { from: inputPath.slice(4), to: dependency.path.slice(4) };
    edges.set(`${edge.from}\0${edge.to}`, edge);
  }
}
const dependencyMap = [...edges.values()].sort((left, right) => {
  if (left.from !== right.from) return left.from < right.from ? -1 : 1;
  if (left.to !== right.to) return left.to < right.to ? -1 : 1;
  return 0;
});
const output = `${JSON.stringify(dependencyMap, null, 2)}\n`;
const outputPath = path.join(appRoot, 'dependency-map.json');

if (checkOnly) {
  if (await fs.readFile(outputPath, 'utf8') !== output) throw new Error('dependency-map.json is stale');
  console.log(`admin: dependency map is current (${dependencyMap.length} edges)`);
} else {
  await fs.writeFile(outputPath, output);
  console.log(`admin: wrote ${dependencyMap.length} reachable source edges`);
}

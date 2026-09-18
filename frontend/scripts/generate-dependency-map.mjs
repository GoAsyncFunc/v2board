import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targets = ['admin', 'user'];
const checkOnly = process.argv.includes('--check');

async function collectDependencyMap(target) {
  const sourcePrefix = `${target}/src/`;
  const result = await build({
    absWorkingDir: frontendRoot,
    entryPoints: [`${target}/src/main.js`],
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
    logLevel: 'silent'
  });

  const edges = new Map();
  for (const [inputPath, input] of Object.entries(result.metafile.inputs)) {
    if (!inputPath.startsWith(sourcePrefix)) continue;
    const from = inputPath.slice(sourcePrefix.length);

    for (const dependency of input.imports) {
      if (!dependency.path.startsWith(sourcePrefix)) continue;
      const to = dependency.path.slice(sourcePrefix.length);
      edges.set(`${from}\0${to}`, { from, to });
    }
  }

  return [...edges.values()].sort((left, right) => {
    if (left.from !== right.from) return left.from < right.from ? -1 : 1;
    if (left.to !== right.to) return left.to < right.to ? -1 : 1;
    return 0;
  });
}

for (const target of targets) {
  const dependencyMap = await collectDependencyMap(target);
  const outputPath = path.join(frontendRoot, target, 'dependency-map.json');
  const output = `${JSON.stringify(dependencyMap, null, 2)}\n`;

  if (checkOnly) {
    const current = await fs.readFile(outputPath, 'utf8');
    if (current !== output) {
      throw new Error(`${target}/dependency-map.json is stale; run generate-dependency-map.mjs`);
    }
    console.log(`${target}: dependency map is current (${dependencyMap.length} edges)`);
  } else {
    await fs.writeFile(outputPath, output);
    console.log(`${target}: wrote ${dependencyMap.length} reachable source edges`);
  }
}

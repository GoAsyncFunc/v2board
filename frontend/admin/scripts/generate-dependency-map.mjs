// Computes the reachable source graph of the admin umi project.
//
// umi 3 owns the build, so instead of bundling with esbuild we walk the graph
// ourselves: the entry set is src/app.ts (runtime config), every route
// component referenced by config/config.ts and every src/models file (umi's
// dva plugin registers each of them). Every business source file must be
// reachable from that entry set.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkOnly = process.argv.includes('--check');

const compilerOptions = {
    allowJs: false,
    baseUrl: appRoot,
    paths: { '@/*': ['src/*'], '@@/*': ['src/.umi/*'] },
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ES2018,
};

function resolveSourceImport(fromPath, specifier) {
    const resolved = ts.resolveModuleName(
        specifier,
        path.join(appRoot, fromPath),
        compilerOptions,
        ts.sys,
    ).resolvedModule;
    if (!resolved?.resolvedFileName) return null;
    const relativePath = path
        .relative(appRoot, resolved.resolvedFileName)
        .split(path.sep)
        .join('/');
    if (!relativePath.startsWith('src/')) return null;
    if (!/\.(?:ts|tsx|d\.ts)$/.test(relativePath)) return null;
    return relativePath;
}

async function routeEntrySources() {
    const configSource = await fs.readFile(path.join(appRoot, 'config/config.ts'), 'utf8');
    const entries = [];
    for (const match of configSource.matchAll(/component:\s*'@\/([^']+)'/g)) {
        const resolved = resolveSourceImport('config/config.ts', `@/${match[1]}`);
        if (!resolved) throw new Error(`Route component could not be resolved: ${match[1]}`);
        entries.push(resolved);
    }
    if (entries.length < 19) {
        throw new Error(`Expected 19 route components, found ${entries.length}`);
    }
    return entries;
}

async function modelEntrySources() {
    const modelDirectory = path.join(appRoot, 'src/models');
    const entries = (await fs.readdir(modelDirectory))
        .filter((name) => /\.tsx?$/.test(name))
        .map((name) => `src/models/${name}`);
    if (!entries.length) throw new Error('No models found for the entry set');
    return entries;
}

const reachableInputs = new Set(['src/app.ts']);
for (const entry of [...(await routeEntrySources()), ...(await modelEntrySources())]) {
    reachableInputs.add(entry);
}
const pendingInputs = [...reachableInputs];

const edges = new Map();
while (pendingInputs.length) {
    const inputPath = pendingInputs.pop();
    const source = await fs.readFile(path.join(appRoot, inputPath), 'utf8');
    for (const importedFile of ts.preProcessFile(source, true, true).importedFiles) {
        const dependencyPath = resolveSourceImport(inputPath, importedFile.fileName);
        if (!dependencyPath) continue;
        const edge = { from: inputPath.slice(4), to: dependencyPath.slice(4) };
        edges.set(`${edge.from}\0${edge.to}`, edge);
        if (!reachableInputs.has(dependencyPath)) {
            reachableInputs.add(dependencyPath);
            pendingInputs.push(dependencyPath);
        }
    }
}

const sourceFiles = ts.sys
    .readDirectory(path.join(appRoot, 'src'), ['.ts', '.tsx', '.d.ts'])
    .map((filePath) => path.relative(appRoot, filePath).split(path.sep).join('/'));
const unreachableBusinessSources = sourceFiles.filter(
    (sourcePath) =>
        sourcePath.startsWith('src/') &&
        !sourcePath.includes('/.umi') &&
        !sourcePath.endsWith('.d.ts') &&
        !reachableInputs.has(sourcePath),
);
if (unreachableBusinessSources.length)
    throw new Error(
        `Unreachable Admin business sources: ${unreachableBusinessSources.slice(0, 5).join(', ')}`,
    );
const dependencyMap = [...edges.values()].sort((left, right) => {
    if (left.from !== right.from) return left.from < right.from ? -1 : 1;
    if (left.to !== right.to) return left.to < right.to ? -1 : 1;
    return 0;
});
const output = `${JSON.stringify(dependencyMap, null, 2)}\n`;
const outputPath = path.join(appRoot, 'dependency-map.json');

if (checkOnly) {
    if ((await fs.readFile(outputPath, 'utf8')) !== output)
        throw new Error('dependency-map.json is stale');
    console.log(`admin: dependency map is current (${dependencyMap.length} edges)`);
} else {
    await fs.writeFile(outputPath, output);
    console.log(`admin: wrote ${dependencyMap.length} reachable source edges`);
}

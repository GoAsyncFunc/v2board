import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import * as ts from 'typescript';

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

const escapedInputs = Object.keys(result.metafile.inputs).filter(
    (input) => path.isAbsolute(input) || input.startsWith('../'),
);
if (escapedInputs.length)
    throw new Error(
        `Dependency map used files outside user: ${escapedInputs.slice(0, 5).join(', ')}`,
    );

const compilerOptions = {
    allowJs: false,
    baseUrl: appRoot,
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ES2018,
};
const edges = new Map();
const reachableInputs = new Set(
    Object.keys(result.metafile.inputs).filter((input) => input.startsWith('src/')),
);
const pendingInputs = [...reachableInputs];

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
    console.log(`user: dependency map is current (${dependencyMap.length} edges)`);
} else {
    await fs.writeFile(outputPath, output);
    console.log(`user: wrote ${dependencyMap.length} reachable source edges`);
}

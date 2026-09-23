import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import {
    markdownEditorStylesheetOutput,
    markdownEditorStylesheetPath,
    prefixMarkdownEditorStyles,
    removeMarkdownEditorStyles,
} from './build-styles.mjs';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.join(appRoot, 'dist');
const stylesheetBuildEntries = [
    ['src/styles/global.css', 'assets/admin/umi.css'],
    ['src/styles/themes/black.css', 'assets/admin/theme/black.css'],
    ['src/styles/themes/darkblue.css', 'assets/admin/theme/darkblue.css'],
    ['src/styles/themes/default.css', 'assets/admin/theme/default.css'],
    ['src/styles/themes/green.css', 'assets/admin/theme/green.css'],
];

export function createUiVersion(date = new Date()) {
    const timestamp = date.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    return `admin-source-${timestamp.slice(0, 8)}.${timestamp.slice(8)}`;
}

const uiVersion = process.env.UI_VERSION || createUiVersion();

export async function buildApp() {
    await fs.rm(destination, { recursive: true, force: true });
    await fs.mkdir(destination, { recursive: true });
    await fs.cp(path.join(appRoot, 'public'), destination, { recursive: true });
    const componentStylesheet = path.join(destination, 'assets/admin/components.chunk.css');
    const originalComponentStyles = await fs.readFile(componentStylesheet, 'utf8');
    const {
        css: componentStyles,
        removedRules,
        removedFontFaces,
    } = await removeMarkdownEditorStyles(originalComponentStyles, componentStylesheet);
    if (removedRules === 0 || removedFontFaces !== 1) {
        throw new Error(
            `Expected Markdown editor CSS and one icon font; removed ${removedRules} rules and ${removedFontFaces} fonts`,
        );
    }
    await fs.writeFile(componentStylesheet, componentStyles);

    const editorStylesheetSource = path.join(appRoot, markdownEditorStylesheetPath);
    const editorStylesheet = await fs.readFile(editorStylesheetSource, 'utf8');
    const prefixedEditorStylesheet = await prefixMarkdownEditorStyles(
        editorStylesheet,
        editorStylesheetSource,
    );
    const editorStylesheetOutput = path.join(destination, markdownEditorStylesheetOutput);
    await fs.mkdir(path.dirname(editorStylesheetOutput), { recursive: true });
    await fs.writeFile(editorStylesheetOutput, prefixedEditorStylesheet);

    for (const [sourcePath, outputPath] of stylesheetBuildEntries) {
        const outputFile = path.join(destination, outputPath);
        await fs.mkdir(path.dirname(outputFile), { recursive: true });
        await fs.copyFile(path.join(appRoot, sourcePath), outputFile);
    }
    await fs.copyFile(path.join(appRoot, 'index.html'), path.join(destination, 'index.html'));
    const settingsPath = path.join(destination, 'settings.js');
    const settings = await fs.readFile(settingsPath, 'utf8');
    await fs.writeFile(
        settingsPath,
        settings.replace(/("version":\s*")[^"]*(")/, `$1${uiVersion}$2`),
    );

    const result = await build({
        absWorkingDir: appRoot,
        entryPoints: ['src/main.ts'],
        outfile: path.join(destination, 'app.js'),
        bundle: true,
        sourcemap: true,
        metafile: true,
        loader: { '.js': 'jsx' },
        format: 'iife',
        platform: 'browser',
        target: 'es2018',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        define: { 'process.env.NODE_ENV': '"production"' },
        logLevel: 'warning',
    });

    const inputs = [
        ...Object.keys(result.metafile.inputs),
        ...stylesheetBuildEntries.map(([sourcePath]) => sourcePath),
        markdownEditorStylesheetPath,
    ];
    const escapedInputs = inputs.filter(
        (input) => path.isAbsolute(input) || input.startsWith('../'),
    );
    if (escapedInputs.length) {
        throw new Error(
            `Admin build used files outside its package: ${escapedInputs.slice(0, 5).join(', ')}`,
        );
    }

    await fs.writeFile(
        path.join(destination, 'source-build.json'),
        `${JSON.stringify(
            {
                application: 'admin',
                inputs,
                standaloneBuild: true,
                stylesheets: [
                    'assets/admin/components.chunk.css',
                    markdownEditorStylesheetOutput,
                    'assets/admin/umi.css',
                ],
                uiVersion,
            },
            null,
            2,
        )}\n`,
    );
    console.log(`admin: ${inputs.length} source/dependency files -> dist/app.js`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    buildApp().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}

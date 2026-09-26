// Copies the admin stylesheet boundary into public/assets/admin so both
// `umi dev` and `umi build` (which copies public/ into dist) serve the same
// asset URLs the blade template references. The generated files are
// gitignored; src/styles stays the editable source of truth.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    markdownEditorStylesheetOutput,
    markdownEditorStylesheetPath,
    prefixMarkdownEditorStyles,
} from './build-styles.mjs';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(appRoot, 'public');

export const antdStylesheetPath = 'node_modules/antd/dist/antd.css';
export const antdStylesheetOutput = 'assets/admin/antd.css';

export const stylesheetBuildEntries = [
    ['src/styles/pages/ticket-detail.css', 'assets/admin/pages/ticket-detail.css'],
    ['src/styles/framework/core.css', 'assets/admin/framework/core.css'],
    ['src/styles/framework/layout.css', 'assets/admin/framework/layout.css'],
    ['src/styles/framework/components.css', 'assets/admin/framework/components.css'],
    ['src/styles/framework/utilities.css', 'assets/admin/framework/utilities.css'],
    ['src/styles/framework/accessibility.css', 'assets/admin/framework/accessibility.css'],
    ['src/styles/framework/scrollbars.css', 'assets/admin/framework/scrollbars.css'],
    ['src/styles/framework/rtl.css', 'assets/admin/framework/rtl.css'],
    ['src/styles/project-overrides.css', 'assets/admin/umi.css'],
    ['src/styles/third-party/fontawesome.css', 'assets/admin/vendor/fontawesome.css'],
    ['src/styles/third-party/simple-line-icons.css', 'assets/admin/vendor/simple-line-icons.css'],
    ['src/styles/third-party/animate.css', 'assets/admin/vendor/animate.css'],
    ['src/styles/third-party/simplebar.css', 'assets/admin/vendor/simplebar.css'],
    ['src/styles/third-party/bootstrap.css', 'assets/admin/vendor/bootstrap.css'],
    ['src/styles/third-party/plugin-adapters.css', 'assets/admin/vendor/plugin-adapters.css'],
    ['src/styles/themes/black.css', 'assets/admin/theme/black.css'],
    ['src/styles/themes/darkblue.css', 'assets/admin/theme/darkblue.css'],
    ['src/styles/themes/default.css', 'assets/admin/theme/default.css'],
    ['src/styles/themes/green.css', 'assets/admin/theme/green.css'],
];

export const generatedAssetOutputs = [
    ...stylesheetBuildEntries.map(([, outputPath]) => outputPath),
    antdStylesheetOutput,
    markdownEditorStylesheetOutput,
];

async function copyInto(root) {
    const antdStylesheet = path.join(root, antdStylesheetOutput);
    await fs.mkdir(path.dirname(antdStylesheet), { recursive: true });
    await fs.copyFile(path.join(appRoot, antdStylesheetPath), antdStylesheet);

    const editorStylesheetSource = path.join(appRoot, markdownEditorStylesheetPath);
    const editorStylesheet = await fs.readFile(editorStylesheetSource, 'utf8');
    const prefixedEditorStylesheet = await prefixMarkdownEditorStyles(
        editorStylesheet,
        editorStylesheetSource,
    );
    const editorStylesheetOutput = path.join(root, markdownEditorStylesheetOutput);
    await fs.mkdir(path.dirname(editorStylesheetOutput), { recursive: true });
    await fs.writeFile(editorStylesheetOutput, prefixedEditorStylesheet);

    for (const [sourcePath, outputPath] of stylesheetBuildEntries) {
        const outputFile = path.join(root, outputPath);
        await fs.mkdir(path.dirname(outputFile), { recursive: true });
        await fs.copyFile(path.join(appRoot, sourcePath), outputFile);
    }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    await copyInto(publicRoot);
    console.log(
        `admin: copied ${generatedAssetOutputs.length} static assets -> public/assets/admin`,
    );
}

// Runs after `umi build`: stamps the ui version into dist/settings.js and
// writes the source-build manifest (schema unchanged from scripts/build.mjs).
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createUiVersion } from './version.mjs';
import { generatedAssetOutputs, stylesheetBuildEntries } from './copy-static-assets.mjs';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.join(appRoot, 'dist');
const uiVersion = process.env.UI_VERSION || createUiVersion();

const settingsPath = path.join(destination, 'settings.js');
const settings = await fs.readFile(settingsPath, 'utf8');
await fs.writeFile(settingsPath, settings.replace(/("version":\s*")[^"]*(")/, `$1${uiVersion}$2`));

const inputs = [
    ...stylesheetBuildEntries.map(([sourcePath]) => sourcePath),
    'node_modules/antd/dist/antd.css',
    'node_modules/react-markdown-editor-lite/lib/index.css',
];

await fs.writeFile(
    path.join(destination, 'source-build.json'),
    `${JSON.stringify(
        {
            application: 'admin',
            inputs,
            standaloneBuild: true,
            stylesheets: [...generatedAssetOutputs],
            uiVersion,
        },
        null,
        2,
    )}\n`,
);
console.log(`admin: postbuild stamped uiVersion ${uiVersion}`);

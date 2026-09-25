import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.join(appRoot, 'dist');
export const antdStylesheetPath = 'node_modules/antd/dist/antd.css';
export const antdStylesheetOutput = 'theme/default/assets/antd.css';

export async function buildApp() {
    await fs.rm(destination, { recursive: true, force: true });
    await fs.mkdir(destination, { recursive: true });
    await fs.cp(path.join(appRoot, 'public'), destination, { recursive: true });
    await fs.rm(path.join(destination, 'theme/default/assets/components.chunk.css'), {
        force: true,
    });
    await fs.copyFile(
        path.join(appRoot, antdStylesheetPath),
        path.join(destination, antdStylesheetOutput),
    );
    await fs.copyFile(path.join(appRoot, 'index.html'), path.join(destination, 'index.html'));

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

    const inputs = [...Object.keys(result.metafile.inputs), antdStylesheetPath];
    const escapedInputs = inputs.filter(
        (input) => path.isAbsolute(input) || input.startsWith('../'),
    );
    if (escapedInputs.length) {
        throw new Error(
            `User build used files outside its package: ${escapedInputs.slice(0, 5).join(', ')}`,
        );
    }

    await fs.writeFile(
        path.join(destination, 'source-build.json'),
        `${JSON.stringify({ application: 'user', inputs, standaloneBuild: true }, null, 2)}\n`,
    );
    console.log(`user: ${inputs.length} source/dependency files -> dist/app.js`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    buildApp().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}

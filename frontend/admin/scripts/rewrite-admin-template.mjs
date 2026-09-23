import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const adminBuildReference = /\/admin-build\/|\/assets\/restored-[^/]+\/admin\//g;

export function rewriteAdminTemplate(source, releaseBasePath) {
    const normalizedBasePath = `/${releaseBasePath.replace(/^\/+|\/+$/g, '')}/`;
    const references = source.match(adminBuildReference) || [];
    if (references.length !== 10) {
        throw new Error(`Expected 10 source-build asset references, found ${references.length}`);
    }
    return source.replace(adminBuildReference, normalizedBasePath);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const [templatePath, releaseBasePath] = process.argv.slice(2);
    if (!templatePath || !releaseBasePath) {
        throw new Error(
            'Usage: node rewrite-admin-template.mjs <template-path> <release-base-path>',
        );
    }
    const template = await fs.readFile(templatePath, 'utf8');
    await fs.writeFile(templatePath, rewriteAdminTemplate(template, releaseBasePath));
}

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
import postcssPlugin from 'prettier/plugins/postcss';
import { rewriteAdminTemplate } from '../scripts/rewrite-admin-template.mjs';

const repoRoot = new URL('../../../', import.meta.url);

test('Admin runtime configuration uses the single package-owned settings entry point', async () => {
    const settings = await fs.readFile(new URL('../public/settings.js', import.meta.url), 'utf8');

    assert.match(settings, /window\.settings\s*=/);
    await assert.rejects(
        fs.access(new URL('../public/assets/admin/env.example.js', import.meta.url)),
        { code: 'ENOENT' },
    );
});

test('versioned Admin release rewrites every source-build asset reference', async () => {
    const template = await fs.readFile(
        new URL('resources/views/admin.blade.php', repoRoot),
        'utf8',
    );
    const release = '/assets/restored-20260923-120000/admin/';
    const rewritten = rewriteAdminTemplate(template, release);

    assert.equal((rewritten.match(/\/assets\/restored-20260923-120000\/admin\//g) || []).length, 9);
    for (const resource of [
        'assets/admin/antd.css',
        'assets/admin/vendor/fontawesome.css',
        'assets/admin/vendor/simple-line-icons.css',
        'assets/admin/vendor/animate.css',
        'assets/admin/vendor/simplebar.css',
        'assets/admin/markdown-editor.css',
        'assets/admin/umi.css',
        'settings.js',
        'app.js',
    ]) {
        assert.ok(rewritten.includes(`/assets/restored-20260923-120000/admin/${resource}`));
    }
    assert.doesNotMatch(rewritten, /href="\/admin-build\//);
    assert.doesNotMatch(rewritten, /src="\/admin-build\//);
    assert.match(rewritten, /\/assets\/admin\/umi\.js\?v=/);
});

test('Admin release template can be advanced without changing the legacy fallback', async () => {
    const template = await fs.readFile(
        new URL('resources/views/admin.blade.php', repoRoot),
        'utf8',
    );
    const firstRelease = rewriteAdminTemplate(template, '/assets/restored-first/admin/');
    const secondRelease = rewriteAdminTemplate(firstRelease, '/assets/restored-second/admin/');

    assert.equal((secondRelease.match(/\/assets\/restored-second\/admin\//g) || []).length, 9);
    assert.doesNotMatch(secondRelease, /restored-first/);
    assert.match(secondRelease, /href="\/assets\/admin\/components\.chunk\.css\?v=/);
    assert.match(secondRelease, /src="\/assets\/admin\/umi\.js\?v=/);
});

test('Admin build publishes semantic ticket CSS with its matching React class names', async () => {
    const css = await fs.readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
    const page = await fs.readFile(
        new URL('../src/pages/ticket/[id].tsx', import.meta.url),
        'utf8',
    );
    const styles = await fs.readFile(
        new URL('../src/styles/ticketDetail.ts', import.meta.url),
        'utf8',
    );

    for (const className of [
        'ticket-detail-content',
        'ticket-detail-input',
        'ticket-detail-tag',
        'ticket-detail-bubble',
        'ticket-detail-time',
        'ticket-detail-controls',
    ]) {
        assert.ok(styles.includes(className), `Ticket detail styles should define ${className}`);
        assert.ok(css.includes(`.${className}`), `Admin CSS should define ${className}`);
    }
    assert.doesNotMatch(
        css,
        /(?:content___DW5w1|input___1j_ND|tag___12_9H|bubble___3NP2-|time___1yWOE|ctrl___UqDJ7)/,
    );
    const staticAssets = [...css.matchAll(/url\((?:['"])?([^)'"\s]+)/g)]
        .map(([, assetPath]) => assetPath.split(/[?#]/, 1)[0])
        .filter((assetPath) => assetPath.startsWith('./'));
    for (const assetPath of new Set(staticAssets)) {
        await fs.access(new URL(`../public/assets/admin/${assetPath.slice(2)}`, import.meta.url));
    }
    assert.match(page, /ticketDetailClassNames as styles/);
});

test('Admin global stylesheet keeps icon libraries in dedicated vendor sources', async () => {
    const globalStyles = await fs.readFile(
        new URL('../src/styles/global.css', import.meta.url),
        'utf8',
    );
    const fontAwesomeStyles = await fs.readFile(
        new URL('../src/styles/vendor/fontawesome.css', import.meta.url),
        'utf8',
    );
    const simpleLineIconStyles = await fs.readFile(
        new URL('../src/styles/vendor/simple-line-icons.css', import.meta.url),
        'utf8',
    );
    const animationStyles = await fs.readFile(
        new URL('../src/styles/vendor/animate.css', import.meta.url),
        'utf8',
    );
    const simplebarStyles = await fs.readFile(
        new URL('../src/styles/vendor/simplebar.css', import.meta.url),
        'utf8',
    );

    assert.doesNotMatch(globalStyles, /^\.fa-[\w-]+:before/m);
    assert.doesNotMatch(globalStyles, /^\.si-[\w-]+:before/m);
    assert.doesNotMatch(globalStyles, /@font-face\s*\{[^}]*Font Awesome/is);
    assert.doesNotMatch(globalStyles, /@font-face\s*\{[^}]*simple-line-icons/is);
    assert.match(fontAwesomeStyles, /^\.fa-bars:before/m);
    assert.match(fontAwesomeStyles, /@font-face\s*\{[^}]*Font Awesome/is);
    assert.match(simpleLineIconStyles, /^\.si-login:before/m);
    assert.match(simpleLineIconStyles, /@font-face\s*\{[^}]*simple-line-icons/is);
    assert.doesNotMatch(globalStyles, /^\.animated\s*\{/m);
    assert.doesNotMatch(globalStyles, /^\[data-simplebar\]\s*\{/m);
    assert.match(globalStyles, /^\.simplebar-scrollbar\s*\{/m);
    assert.match(animationStyles, /^\.animated\s*\{/m);
    assert.match(animationStyles, /^@keyframes bounce\s*\{/m);
    assert.match(simplebarStyles, /^\[data-simplebar\]\s*\{/m);
    assert.match(simplebarStyles, /^\.simplebar-wrapper\s*\{/m);
});

test('Admin-owned CSS assets are readable and contain no generated CSS-module hashes', async () => {
    const publicDirectory = new URL('../public/', import.meta.url);
    const cssFiles = [
        {
            source: new URL('../public/assets/admin/components.chunk.css', import.meta.url),
            publishedPath: 'assets/admin/components.chunk.css',
        },
        {
            source: new URL('../src/styles/global.css', import.meta.url),
            publishedPath: 'assets/admin/umi.css',
        },
        {
            source: new URL('../src/styles/vendor/fontawesome.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/fontawesome.css',
        },
        {
            source: new URL('../src/styles/vendor/simple-line-icons.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/simple-line-icons.css',
        },
        {
            source: new URL('../src/styles/vendor/animate.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/animate.css',
        },
        {
            source: new URL('../src/styles/vendor/simplebar.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/simplebar.css',
        },
        {
            source: new URL('../src/styles/themes/black.css', import.meta.url),
            publishedPath: 'assets/admin/theme/black.css',
        },
        {
            source: new URL('../src/styles/themes/darkblue.css', import.meta.url),
            publishedPath: 'assets/admin/theme/darkblue.css',
        },
        {
            source: new URL('../src/styles/themes/default.css', import.meta.url),
            publishedPath: 'assets/admin/theme/default.css',
        },
        {
            source: new URL('../src/styles/themes/green.css', import.meta.url),
            publishedPath: 'assets/admin/theme/green.css',
        },
    ];

    for (const { source, publishedPath } of cssFiles) {
        const assetUrl = source;
        const filePath = fileURLToPath(assetUrl);
        const css = await fs.readFile(assetUrl, 'utf8');
        const prettierOptions = await prettier.resolveConfig(filePath, { editorconfig: true });
        assert.equal(
            await prettier.check(css, {
                ...prettierOptions,
                filepath: filePath,
                plugins: [postcssPlugin],
            }),
            true,
            `${publishedPath} should be formatted`,
        );
        assert.doesNotMatch(
            css,
            /\.[A-Za-z_-][\w-]*___[A-Za-z0-9_-]{4,}/,
            `${publishedPath} has generated CSS-module names`,
        );
        for (const [, referencedAsset] of css.matchAll(/url\((?:['"])?([^)'"\s]+)/g)) {
            const assetPath = referencedAsset.split(/[?#]/, 1)[0];
            if (!assetPath.startsWith('.')) continue;

            assert.doesNotMatch(
                assetPath,
                /\.[a-f0-9]{8}\./,
                `${publishedPath} has a hashed asset name`,
            );
            await fs.access(new URL(assetPath, new URL(publishedPath, publicDirectory)));
        }
    }
});

test('Admin deploy archive and release copy include the full static build', async () => {
    const script = await fs.readFile(new URL('../scripts/deploy-test.sh', import.meta.url), 'utf8');

    assert.match(script, /tar -czf "\$archive" -C "\$local_stage" dist admin\.blade\.php/);
    assert.match(script, /cp -R "\$stage\/dist\/\." "\$release\/"/);
    assert.match(
        script,
        /assets\/admin\/antd\.css \\\s+assets\/admin\/vendor\/fontawesome\.css \\\s+assets\/admin\/vendor\/simple-line-icons\.css \\\s+assets\/admin\/vendor\/animate\.css \\\s+assets\/admin\/vendor\/simplebar\.css \\\s+assets\/admin\/markdown-editor\.css \\\s+assets\/admin\/umi\.css/,
    );
    assert.match(script, /admin HTML does not reference \$resource/);
    assert.match(script, /unexpected content type \$content_type/);
    assert.match(script, /rollback_release\(\)/);
    assert.match(script, /trap rollback_on_error ERR/);
    assert.match(script, /\.source-build-\$stamp\.tmp/);
    assert.match(script, /mv "\$staged_template" "\$site\/\$template"/);
});

test('unexpected Admin Blade asset layouts fail instead of deploying partial paths', () => {
    assert.throws(
        () =>
            rewriteAdminTemplate('<link href="/admin-build/app.css">', '/assets/restored-x/admin/'),
        /Expected 9 source-build asset references/,
    );
});

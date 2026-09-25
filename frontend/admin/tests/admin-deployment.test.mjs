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

    assert.equal(
        (rewritten.match(/\/assets\/restored-20260923-120000\/admin\//g) || []).length,
        19,
    );
    for (const resource of [
        'assets/admin/antd.css',
        'assets/admin/vendor/fontawesome.css',
        'assets/admin/vendor/simple-line-icons.css',
        'assets/admin/vendor/animate.css',
        'assets/admin/vendor/simplebar.css',
        'assets/admin/vendor/bootstrap.css',
        'assets/admin/vendor/plugin-adapters.css',
        'assets/admin/markdown-editor.css',
        'assets/admin/pages/ticket-detail.css',
        'assets/admin/framework/core.css',
        'assets/admin/framework/layout.css',
        'assets/admin/framework/components.css',
        'assets/admin/framework/utilities.css',
        'assets/admin/framework/accessibility.css',
        'assets/admin/framework/scrollbars.css',
        'assets/admin/framework/rtl.css',
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

test('Admin rollback removes only the versioned release before restoring the template', async () => {
    const script = await fs.readFile(new URL('../scripts/deploy-test.sh', import.meta.url), 'utf8');

    assert.match(script, /rm -rf '\$release'/);
    assert.match(script, /tar -xzf '\$backup\/template\.tar\.gz' -C '\$site'/);
});

test('Admin release template can be advanced without changing the legacy fallback', async () => {
    const template = await fs.readFile(
        new URL('resources/views/admin.blade.php', repoRoot),
        'utf8',
    );
    const firstRelease = rewriteAdminTemplate(template, '/assets/restored-first/admin/');
    const secondRelease = rewriteAdminTemplate(firstRelease, '/assets/restored-second/admin/');

    assert.equal((secondRelease.match(/\/assets\/restored-second\/admin\//g) || []).length, 19);
    assert.doesNotMatch(secondRelease, /restored-first/);
    assert.match(secondRelease, /href="\/assets\/admin\/components\.chunk\.css\?v=/);
    assert.match(secondRelease, /src="\/assets\/admin\/umi\.js\?v=/);
});

test('Admin build publishes semantic ticket CSS with its matching React class names', async () => {
    const css = await fs.readFile(
        new URL('../src/styles/pages/ticket-detail.css', import.meta.url),
        'utf8',
    );
    const page = await fs.readFile(
        new URL('../src/pages/ticket/TicketDetailPage.tsx', import.meta.url),
        'utf8',
    );
    const chat = await fs.readFile(
        new URL('../src/pages/ticket/components/TicketDetailChat.tsx', import.meta.url),
        'utf8',
    );
    const styles = await fs.readFile(
        new URL('../src/styles/ticketDetailStyles.ts', import.meta.url),
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
    assert.match(page, /import TicketDetailChat from ['"]\.\/components\/TicketDetailChat['"]/);
    assert.match(chat, /ticketDetailClassNames as styles/);
});

test('Admin project stylesheet keeps third-party libraries in dedicated vendor sources', async () => {
    const projectStyles = await fs.readFile(
        new URL('../src/styles/project-overrides.css', import.meta.url),
        'utf8',
    );
    const fontAwesomeStyles = await fs.readFile(
        new URL('../src/styles/third-party/fontawesome.css', import.meta.url),
        'utf8',
    );
    const simpleLineIconStyles = await fs.readFile(
        new URL('../src/styles/third-party/simple-line-icons.css', import.meta.url),
        'utf8',
    );
    const animationStyles = await fs.readFile(
        new URL('../src/styles/third-party/animate.css', import.meta.url),
        'utf8',
    );
    const simplebarStyles = await fs.readFile(
        new URL('../src/styles/third-party/simplebar.css', import.meta.url),
        'utf8',
    );
    const bootstrapStyles = await fs.readFile(
        new URL('../src/styles/third-party/bootstrap.css', import.meta.url),
        'utf8',
    );
    const pluginAdapterStyles = await fs.readFile(
        new URL('../src/styles/third-party/plugin-adapters.css', import.meta.url),
        'utf8',
    );

    assert.doesNotMatch(projectStyles, /^\.fa-[\w-]+:before/m);
    assert.doesNotMatch(projectStyles, /^\.si-[\w-]+:before/m);
    assert.doesNotMatch(projectStyles, /@font-face\s*\{[^}]*Font Awesome/is);
    assert.doesNotMatch(projectStyles, /@font-face\s*\{[^}]*simple-line-icons/is);
    assert.match(fontAwesomeStyles, /^\.fa-bars:before/m);
    assert.match(fontAwesomeStyles, /@font-face\s*\{[^}]*Font Awesome/is);
    assert.match(simpleLineIconStyles, /^\.si-login:before/m);
    assert.match(simpleLineIconStyles, /@font-face\s*\{[^}]*simple-line-icons/is);
    assert.doesNotMatch(projectStyles, /^\.animated\s*\{/m);
    assert.doesNotMatch(projectStyles, /^\[data-simplebar\]\s*\{/m);
    assert.match(animationStyles, /^\.animated\s*\{/m);
    assert.match(animationStyles, /^@keyframes bounce\s*\{/m);
    assert.match(simplebarStyles, /^\[data-simplebar\]\s*\{/m);
    assert.match(simplebarStyles, /^\.simplebar-wrapper\s*\{/m);
    assert.doesNotMatch(projectStyles, /^\.container-xl\s*\{/m);
    assert.doesNotMatch(projectStyles, /^\.btn-primary\s*\{/m);
    assert.match(bootstrapStyles, /^\.container-xl\s*\{/m);
    assert.match(bootstrapStyles, /^\.btn-primary\s*\{/m);
    assert.match(bootstrapStyles, /^@media print\s*\{/m);
    assert.doesNotMatch(projectStyles, /^\.datepicker\s*\{/m);
    assert.doesNotMatch(projectStyles, /^\.select2-container\b/m);
    assert.doesNotMatch(projectStyles, /^\.slick-slider\s*\{/m);
    assert.match(pluginAdapterStyles, /^\.datepicker\s*\{/m);
    assert.match(pluginAdapterStyles, /\.select2-container\b/);
    assert.match(pluginAdapterStyles, /\.slick-slider\b/);
    assert.match(pluginAdapterStyles, /\.flatpickr-weekdays\s*\{/);
});

test('Admin framework styles keep foundations and shell layout out of the component stylesheet', async () => {
    const projectStyles = await fs.readFile(
        new URL('../src/styles/project-overrides.css', import.meta.url),
        'utf8',
    );
    const coreStyles = await fs.readFile(
        new URL('../src/styles/framework/core.css', import.meta.url),
        'utf8',
    );
    const layoutStyles = await fs.readFile(
        new URL('../src/styles/framework/layout.css', import.meta.url),
        'utf8',
    );
    const componentStyles = await fs.readFile(
        new URL('../src/styles/framework/components.css', import.meta.url),
        'utf8',
    );
    const utilityStyles = await fs.readFile(
        new URL('../src/styles/framework/utilities.css', import.meta.url),
        'utf8',
    );
    const accessibilityStyles = await fs.readFile(
        new URL('../src/styles/framework/accessibility.css', import.meta.url),
        'utf8',
    );
    const scrollbarStyles = await fs.readFile(
        new URL('../src/styles/framework/scrollbars.css', import.meta.url),
        'utf8',
    );
    const rtlStyles = await fs.readFile(
        new URL('../src/styles/framework/rtl.css', import.meta.url),
        'utf8',
    );

    assert.doesNotMatch(projectStyles, /^#root,/m);
    assert.doesNotMatch(projectStyles, /^#page-container\s*\{/m);
    assert.doesNotMatch(projectStyles, /#sidebar\s*\{[^}]*position:\s*fixed/s);
    assert.match(coreStyles, /^#root,/m);
    assert.match(coreStyles, /^\.btn-hero-primary\s*\{/m);
    assert.match(coreStyles, /^\.nav-tabs-alt\s*\{/m);
    assert.match(layoutStyles, /^#page-container\s*\{/m);
    assert.match(layoutStyles, /#sidebar\s*\{[^}]*position:\s*fixed/s);
    assert.match(layoutStyles, /^#side-overlay\s*\{/m);
    assert.doesNotMatch(projectStyles, /^\.hero\s*\{/m);
    assert.doesNotMatch(projectStyles, /^\.block\s*\{/m);
    assert.doesNotMatch(projectStyles, /^\.bg-black-5\s*\{/m);
    assert.doesNotMatch(projectStyles, /^\.text-primary-dark\s*\{/m);
    assert.match(componentStyles, /^\.hero\s*\{/m);
    assert.match(componentStyles, /^\.block\s*\{/m);
    assert.match(componentStyles, /^\.nav-main\s*\{/m);
    assert.match(componentStyles, /^\.timeline\s*\{/m);
    assert.match(utilityStyles, /^\.bg-black-5\s*\{/m);
    assert.match(utilityStyles, /^\.font-w600\s*\{/m);
    assert.match(utilityStyles, /^\.text-primary-dark\s*\{/m);
    assert.match(accessibilityStyles, /^\.sr-only\s*\{/m);
    assert.match(scrollbarStyles, /^\.simplebar-scrollbar\s*\{/m);
    assert.match(rtlStyles, /^#page-container\.rtl-support\s*\{/m);
    assert.match(projectStyles, /^\.v2board-background\s*\{/m);
});

test('Admin-owned CSS assets are readable and contain no generated CSS-module hashes', async () => {
    const publicDirectory = new URL('../public/', import.meta.url);
    const cssFiles = [
        {
            source: new URL('../public/assets/admin/components.chunk.css', import.meta.url),
            publishedPath: 'assets/admin/components.chunk.css',
        },
        {
            source: new URL('../src/styles/pages/ticket-detail.css', import.meta.url),
            publishedPath: 'assets/admin/pages/ticket-detail.css',
        },
        {
            source: new URL('../src/styles/framework/core.css', import.meta.url),
            publishedPath: 'assets/admin/framework/core.css',
        },
        {
            source: new URL('../src/styles/framework/layout.css', import.meta.url),
            publishedPath: 'assets/admin/framework/layout.css',
        },
        {
            source: new URL('../src/styles/framework/components.css', import.meta.url),
            publishedPath: 'assets/admin/framework/components.css',
        },
        {
            source: new URL('../src/styles/framework/utilities.css', import.meta.url),
            publishedPath: 'assets/admin/framework/utilities.css',
        },
        {
            source: new URL('../src/styles/framework/accessibility.css', import.meta.url),
            publishedPath: 'assets/admin/framework/accessibility.css',
        },
        {
            source: new URL('../src/styles/framework/scrollbars.css', import.meta.url),
            publishedPath: 'assets/admin/framework/scrollbars.css',
        },
        {
            source: new URL('../src/styles/framework/rtl.css', import.meta.url),
            publishedPath: 'assets/admin/framework/rtl.css',
        },
        {
            source: new URL('../src/styles/project-overrides.css', import.meta.url),
            publishedPath: 'assets/admin/umi.css',
        },
        {
            source: new URL('../src/styles/third-party/fontawesome.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/fontawesome.css',
        },
        {
            source: new URL('../src/styles/third-party/simple-line-icons.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/simple-line-icons.css',
        },
        {
            source: new URL('../src/styles/third-party/animate.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/animate.css',
        },
        {
            source: new URL('../src/styles/third-party/simplebar.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/simplebar.css',
        },
        {
            source: new URL('../src/styles/third-party/bootstrap.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/bootstrap.css',
        },
        {
            source: new URL('../src/styles/third-party/plugin-adapters.css', import.meta.url),
            publishedPath: 'assets/admin/vendor/plugin-adapters.css',
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
        /assets\/admin\/antd\.css \\\s+assets\/admin\/vendor\/fontawesome\.css \\\s+assets\/admin\/vendor\/simple-line-icons\.css \\\s+assets\/admin\/vendor\/animate\.css \\\s+assets\/admin\/vendor\/simplebar\.css \\\s+assets\/admin\/markdown-editor\.css \\\s+assets\/admin\/vendor\/bootstrap\.css \\\s+assets\/admin\/vendor\/plugin-adapters\.css \\\s+assets\/admin\/pages\/ticket-detail\.css \\\s+assets\/admin\/framework\/core\.css \\\s+assets\/admin\/framework\/layout\.css \\\s+assets\/admin\/framework\/components\.css \\\s+assets\/admin\/framework\/utilities\.css \\\s+assets\/admin\/framework\/accessibility\.css \\\s+assets\/admin\/framework\/scrollbars\.css \\\s+assets\/admin\/framework\/rtl\.css \\\s+assets\/admin\/umi\.css/,
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
        /Expected 19 source-build asset references/,
    );
});

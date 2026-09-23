import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import postcss from 'postcss';
import {
    markdownEditorStylesheetOutput,
    markdownEditorStylesheetPath,
    markdownEditorBrowserTargets,
    prefixMarkdownEditorStyles,
    removeMarkdownEditorStyles,
} from '../scripts/build-styles.mjs';

const packageJson = JSON.parse(
    await fs.readFile(new URL('../package.json', import.meta.url), 'utf8'),
);
const componentSource = await fs.readFile(
    new URL('../src/components/common/MarkdownEditor.tsx', import.meta.url),
    'utf8',
);
const legacyComponentStyles = await fs.readFile(
    new URL('../public/assets/admin/components.chunk.css', import.meta.url),
    'utf8',
);
const officialEditorStyles = await fs.readFile(
    new URL(`../${markdownEditorStylesheetPath}`, import.meta.url),
    'utf8',
);

test('Markdown editor uses the pinned official package', () => {
    assert.equal(packageJson.dependencies['react-markdown-editor-lite'], '1.3.4');
    assert.deepEqual(packageJson.browserslist, markdownEditorBrowserTargets);
    assert.match(componentSource, /import MarkdownEditor from 'react-markdown-editor-lite';/);
    assert.match(componentSource, /export default MarkdownEditor;/);
});

test('legacy Admin component stylesheet retains its Markdown editor styles', () => {
    assert.match(legacyComponentStyles, /\.rc-md-editor\s*\{/);
    assert.match(legacyComponentStyles, /\.rmel-iconfont\s*\{/);
    assert.match(legacyComponentStyles, /\.rmel-icon-tab:before\s*\{/);
    assert.match(legacyComponentStyles, /font-family:\s*rmel-iconfont !important;/);
    assert.match(legacyComponentStyles, /content:\s*'\\E76D';/);
});

test('source build separates the official Markdown editor stylesheet with legacy browser prefixes', async () => {
    const {
        css: componentStyles,
        removedRules,
        removedFontFaces,
    } = await removeMarkdownEditorStyles(legacyComponentStyles, 'components.chunk.css');
    const prefixedEditorStyles = await prefixMarkdownEditorStyles(
        officialEditorStyles,
        markdownEditorStylesheetPath,
    );
    const parsedComponentStyles = postcss.parse(componentStyles);
    const parsedEditorStyles = postcss.parse(prefixedEditorStyles);
    const indexHtml = await fs.readFile(new URL('../index.html', import.meta.url), 'utf8');

    assert.ok(removedRules > 0);
    assert.equal(removedFontFaces, 1);
    parsedComponentStyles.walkRules((rule) => {
        assert.doesNotMatch(
            rule.selector,
            /\.rc-md-editor\b|\.rmel-[\w-]*\b|\.custom-html-style\b/,
        );
    });
    assert.match(prefixedEditorStyles, /\.rc-md-editor\s*\{/);
    assert.match(prefixedEditorStyles, /\.rmel-iconfont\s*\{/);
    assert.match(prefixedEditorStyles, /\.rmel-icon-tab:before\s*\{/);
    assert.equal(markdownEditorStylesheetOutput, 'assets/admin/markdown-editor.css');
    assert.ok(indexHtml.indexOf('components.chunk.css') < indexHtml.indexOf('markdown-editor.css'));
    assert.ok(indexHtml.indexOf('markdown-editor.css') < indexHtml.indexOf('umi.css'));

    const markdownEditorLayout = parsedEditorStyles.nodes.find(
        (node) => node.type === 'rule' && node.selector === '.rc-md-editor .editor-container',
    );
    assert.ok(markdownEditorLayout);
    assert.ok(
        markdownEditorLayout.nodes.some(
            (node) =>
                node.type === 'decl' && node.prop === 'display' && node.value === '-ms-flexbox',
        ),
    );
});

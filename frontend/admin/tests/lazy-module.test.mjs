import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('knowledge page lazy loader resolves the typed Markdown editor default export', async () => {
    const source = await fs.readFile(
        new URL('../src/pages/knowledge/components/KnowledgeForm.tsx', import.meta.url),
        'utf8',
    );
    assert.match(source, /import Loadable from 'react-loadable';/);
    assert.match(
        source,
        /import\('\.\.\/\.\.\/\.\.\/components\/common\/MarkdownEditor'\)\.then\(\(?module\)?\s*=>\s*module\.default\)/,
    );
    assert.doesNotMatch(source, /vendor\/utilities/);
});

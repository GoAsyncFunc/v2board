import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

test('lazy module resolver unwraps bundled default exports and preserves direct components', async () => {
  const source = await fs.readFile(new URL('../src/vendor/utilities.js', import.meta.url), 'utf8');
  const code = (await transform(source, { format: 'cjs', loader: 'js' })).code;
  const module = { exports: {} };
  const Loadable = () => null;
  const MarkdownIt = () => null;

  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'react-loadable') return { __esModule: true, default: Loadable };
      if (id === 'markdown-it') return { __esModule: true, default: MarkdownIt };
      throw new Error(`Unexpected dependency ${id}`);
    },
  });

  function MarkdownEditor() {}
  assert.equal(module.exports.resolveDefaultExport({ default: MarkdownEditor }), MarkdownEditor);
  assert.equal(module.exports.resolveDefaultExport(MarkdownEditor), MarkdownEditor);
});

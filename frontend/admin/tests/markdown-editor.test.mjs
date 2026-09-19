import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse(
  await fs.readFile(new URL('../package.json', import.meta.url), 'utf8'),
);
const componentSource = await fs.readFile(
  new URL('../src/components/MarkdownEditor.jsx', import.meta.url),
  'utf8',
);
const componentStyles = await fs.readFile(
  new URL('../public/assets/admin/components.chunk.css', import.meta.url),
  'utf8',
);

test('Markdown editor uses the pinned official package', () => {
  assert.equal(packageJson.dependencies['react-markdown-editor-lite'], '1.3.4');
  assert.match(componentSource, /import MarkdownEditor from 'react-markdown-editor-lite';/);
  assert.match(componentSource, /export default MarkdownEditor;/);
});

test('existing Admin assets retain the Markdown editor styles', () => {
  assert.match(componentStyles, /\.rc-md-editor\{/);
  assert.match(componentStyles, /\.rmel-iconfont\{/);
  assert.match(componentStyles, /\.rmel-icon-tab:before\{/);
});

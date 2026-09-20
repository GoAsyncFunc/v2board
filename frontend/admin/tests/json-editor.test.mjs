import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse(
  await fs.readFile(new URL('../package.json', import.meta.url), 'utf8'),
);
const editorSource = await fs.readFile(
  new URL('../src/components/common/JsonEditor.tsx', import.meta.url),
  'utf8',
);

test('JSON editor uses the pinned official React Ace packages', () => {
  assert.equal(packageJson.dependencies['react-ace'], '7.0.5');
  assert.equal(packageJson.dependencies.brace, '0.11.1');
  assert.match(editorSource, /import AceEditor from 'react-ace';/);
});

test('JSON editor registers the original mode and theme', () => {
  assert.match(editorSource, /import 'brace\/mode\/json';/);
  assert.match(editorSource, /import 'brace\/theme\/github';/);
  assert.match(editorSource, /export default AceEditor;/);
});

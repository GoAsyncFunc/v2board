import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default;

test('Markdown editor lazy loader provides the required loading component', async () => {
  const source = await fs.readFile(new URL('../src/pages/knowledge/components/KnowledgeEditor.tsx', import.meta.url), 'utf8');
  const ast = parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
  let options;

  traverse(ast, {
    CallExpression(path) {
      if (path.node.callee.type !== 'Identifier' || path.node.callee.name !== 'Loadable') return;
      const [argument] = path.node.arguments;
      if (argument?.type === 'ObjectExpression') options = argument.properties;
    },
  });

  assert.ok(options, 'Expected the Markdown editor to use loadable options');
  const loader = options.find(property => property.type === 'ObjectProperty'
    && property.key.type === 'Identifier'
    && property.key.name === 'loader');
  assert.equal(loader?.value.type, 'ArrowFunctionExpression');
  assert.equal(loader?.value.body.type, 'CallExpression');
  assert.equal(loader?.value.body.callee.type, 'MemberExpression');
  assert.equal(loader?.value.body.callee.property.type, 'Identifier');
  assert.equal(loader?.value.body.callee.property.name, 'then');

  const [unwrapCallback] = loader.value.body.arguments;
  assert.equal(unwrapCallback.type, 'ArrowFunctionExpression');
  assert.equal(unwrapCallback.body.type, 'MemberExpression');
  assert.equal(unwrapCallback.body.object.type, 'Identifier');
  assert.equal(unwrapCallback.body.object.name, unwrapCallback.params[0].name);
  assert.equal(unwrapCallback.body.property.type, 'Identifier');
  assert.equal(unwrapCallback.body.property.name, 'default');
  assert.ok(options.some(property => property.type === 'ObjectProperty'
    && property.key.type === 'Identifier'
    && property.key.name === 'loading'
    && property.value.type === 'ArrowFunctionExpression'));
});

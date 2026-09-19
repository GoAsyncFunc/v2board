import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default;

test('Markdown editor lazy loader provides the required loading component', async () => {
  const source = await fs.readFile(new URL('../src/pages/Knowledge.jsx', import.meta.url), 'utf8');
  const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] });
  let options;

  traverse(ast, {
    CallExpression(path) {
      if (path.node.callee.type !== 'Identifier' || path.node.callee.name !== 'loadable') return;
      const [argument] = path.node.arguments;
      if (argument?.type === 'ObjectExpression') options = argument.properties;
    },
  });

  assert.ok(options, 'Expected the Markdown editor to use loadable options');
  assert.ok(options.some(property => property.type === 'ObjectProperty'
    && property.key.type === 'Identifier'
    && property.key.name === 'loader'
    && property.value.type === 'ArrowFunctionExpression'
    && property.value.body.type === 'CallExpression'
    && property.value.body.callee.type === 'MemberExpression'
    && property.value.body.callee.property.type === 'Identifier'
    && property.value.body.callee.property.name === 'then'));
  assert.ok(options.some(property => property.type === 'ObjectProperty'
    && property.key.type === 'Identifier'
    && property.key.name === 'loading'
    && property.value.type === 'ArrowFunctionExpression'));
});

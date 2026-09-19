import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default;

test('Stripe payment lazy loader provides the required loading component', async () => {
  const source = await fs.readFile(new URL('../src/pages/OrderDetail.jsx', import.meta.url), 'utf8');
  const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] });
  let options;

  traverse(ast, {
    CallExpression(path) {
      if (path.node.callee.type !== 'Identifier' || path.node.callee.name !== 'loadable') return;
      const [argument] = path.node.arguments;
      if (argument?.type === 'ObjectExpression') options = argument.properties;
    },
  });

  assert.ok(options, 'Expected the Stripe form to use loadable options');
  assert.ok(options.some(property => property.type === 'ObjectProperty'
    && property.key.type === 'Identifier'
    && property.key.name === 'loader'));
  assert.ok(options.some(property => property.type === 'ObjectProperty'
    && property.key.type === 'Identifier'
    && property.key.name === 'loading'
    && property.value.type === 'ArrowFunctionExpression'));
});

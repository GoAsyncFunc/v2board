import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
const traverse = traverseModule.default || traverseModule;
const globals = new Set(['module', 'exports', 'require', 'Object', 'Array', 'Math', 'undefined', 'console']);
for (const file of [
  'admin/src/components/Recovered_48394c55.jsx',
  'admin/src/components/Recovered_68566c61.jsx',
  'admin/src/components/Recovered_796b4332.jsx',
  'admin/src/components/Recovered_43674f62.jsx',
  'admin/src/components/Recovered_33585647.jsx',
  'admin/src/pages/ConfigPayment.jsx',
  'admin/src/pages/Giftcard.jsx',
  'admin/src/pages/Knowledge.jsx',
  'admin/src/pages/ServerRoute.jsx',
]) {
  test(`${file}: references resolve in their lexical scope`, () => {
    const source = readFileSync(new URL('../' + file, import.meta.url), 'utf8');
    const ast = parse(source, {sourceType: 'module', plugins: ['jsx']});
    const missing = [];
    traverse(ast, {
      ReferencedIdentifier(path) {
        if (!globals.has(path.node.name) && !path.scope.hasBinding(path.node.name)) {
          missing.push(`${path.node.name}:${path.node.loc.start.line}`);
        }
      },
      AssignmentExpression(path) {
        const left = path.node.left;
        if (left.type === 'Identifier' && !path.scope.hasBinding(left.name) && !globals.has(left.name)) missing.push(left.name);
      },
    });
    assert.deepEqual(missing, []);
    if (file.includes('68566c61')) {
      assert.match(source, /\badd\(\)\s*\{/);
      assert.match(source, /this\.add\(\)/);
      assert.doesNotMatch(source, /adobjectAssign/);
    }
  });
}

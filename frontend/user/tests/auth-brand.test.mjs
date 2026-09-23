import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadAuthBrand() {
    const source = await fs.readFile(
        new URL('../src/components/auth/AuthBrand.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const React = {
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    };
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            throw new Error(id);
        },
    });
    return module.exports.default;
}

function nodes(tree, predicate) {
    if (Array.isArray(tree)) return tree.flatMap((node) => nodes(node, predicate));
    if (!tree || typeof tree !== 'object') return [];
    return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate)];
}

test('AuthBrand preserves logo fallback and optional description rendering', async () => {
    const AuthBrand = await loadAuthBrand();

    const logoTree = AuthBrand({ logo: '/logo.png', title: 'Demo', description: 'Description' });
    assert.equal(nodes(logoTree, (node) => node.type === 'img')[0].props.src, '/logo.png');
    assert.equal(nodes(logoTree, (node) => node.type === 'p')[0].children[0], 'Description');

    const fallbackTree = AuthBrand({ logo: '', title: 'Demo', description: '' });
    assert.equal(nodes(fallbackTree, (node) => node.type === 'span')[0].children[0], 'Demo');
    assert.equal(nodes(fallbackTree, (node) => node.type === 'p').length, 0);
});

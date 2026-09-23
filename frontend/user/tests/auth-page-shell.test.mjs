import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadAuthPageShell() {
    const source = await fs.readFile(
        new URL('../src/components/auth/AuthPageShell.tsx', import.meta.url),
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
        require(id) {
            if (id === 'react') return React;
            if (id.endsWith('/AuthBrand')) return 'AuthBrand';
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

test('AuthPageShell owns the shared authentication layout and content slots', async () => {
    const AuthPageShell = await loadAuthPageShell();
    const child = { type: 'FormContent', props: {}, children: [] };
    const footer = { type: 'FooterContent', props: {}, children: [] };
    const tree = AuthPageShell({
        backgroundUrl: '/background.png',
        logo: '/logo.png',
        title: 'Demo',
        description: 'Description',
        children: child,
        footer,
    });

    assert.equal(nodes(tree, (node) => node.props.id === 'page-container').length, 1);
    assert.equal(nodes(tree, (node) => node.props.id === 'main-container').length, 1);
    assert.equal(
        nodes(tree, (node) => node.props.className === 'v2board-background')[0].props.style
            .backgroundImage,
        'url(/background.png)',
    );
    const brand = nodes(tree, (node) => node.type === 'AuthBrand')[0];
    assert.equal(brand.props.logo, '/logo.png');
    assert.equal(brand.props.title, 'Demo');
    assert.equal(brand.props.description, 'Description');
    assert.equal(nodes(tree, (node) => node === child).length, 1);
    assert.equal(nodes(tree, (node) => node === footer).length, 1);
});

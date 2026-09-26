import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};
const FilterDrawer = function FilterDrawer() {};

async function loadOriginalKeys() {
    const source = await fs.readFile(
        new URL('./fixtures/pages/admin-order-filter-keys.cjs', import.meta.url),
        'utf8',
    );
    const module = { exports: {} };
    vm.runInNewContext(source, { module, exports: module.exports });
    return module.exports();
}

async function loadRecovered() {
    const source = await fs.readFile(
        new URL('../src/pages/order/components/OrderFilterDrawer.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id.endsWith('/FilterDrawer')) return FilterDrawer;
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports;
}

test('order filter keys match the bundle-extracted keys verbatim', async () => {
    const original = await loadOriginalKeys();
    const { orderFilterFields } = await loadRecovered();
    // Both modules evaluate in a separate vm realm; compare as plain JSON data
    // so deepStrictEqual does not trip over cross-realm prototypes.
    assert.deepEqual(
        JSON.parse(JSON.stringify(orderFilterFields)),
        JSON.parse(JSON.stringify(original)),
    );
});

test('order filter drawer forwards value/onOk and the shared keys', async () => {
    const { default: OrderFilterDrawer, orderFilterFields } = await loadRecovered();
    const onOk = () => {};
    const value = [{ key: 'trade_no', condition: '=', value: '1' }];
    const tree = OrderFilterDrawer({
        children: { type: 'trigger', props: {} },
        value,
        onOk,
    });
    assert.equal(tree.type, FilterDrawer);
    assert.equal(tree.props.value, value);
    assert.equal(tree.props.onOk, onOk);
    assert.equal(tree.props.keys, orderFilterFields);
    assert.equal(tree.children[0].type, 'trigger');
});

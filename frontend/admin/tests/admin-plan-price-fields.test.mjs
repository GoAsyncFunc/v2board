import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    Fragment: 'Fragment',
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};
const ui = {
    Col: 'Col',
    Divider: 'Divider',
    Icon: 'Icon',
    Input: 'Input',
    Row: 'Row',
    Tooltip: 'Tooltip',
};

function normalize(value) {
    return JSON.parse(
        JSON.stringify(value, (_key, child) =>
            typeof child === 'function' ? '[function]' : child,
        ),
    );
}

function findNodes(tree, type) {
    if (Array.isArray(tree)) return tree.flatMap((child) => findNodes(child, type));
    if (!tree || typeof tree !== 'object') return [];
    return [
        ...(tree.type === type ? [tree] : []),
        ...findNodes(tree.children, type),
        ...findNodes(tree.props?.children, type),
    ];
}

async function loadRecovered() {
    const source = await fs.readFile(
        new URL('../src/pages/plan/components/PriceFields.tsx', import.meta.url),
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
            const components = {
                'antd/lib/col': ui.Col,
                'antd/lib/divider': ui.Divider,
                'antd/lib/icon': ui.Icon,
                'antd/lib/input': ui.Input,
                'antd/lib/row': ui.Row,
                'antd/lib/tooltip': ui.Tooltip,
            };
            if (id in components) return components[id];
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports.default;
}

async function loadBaseline() {
    const source = await fs.readFile(
        new URL('./fixtures/pages/admin-plan-price-fields.cjs', import.meta.url),
        'utf8',
    );
    const module = { exports: {} };
    vm.runInNewContext(source, { module, exports: module.exports });
    return module.exports;
}

const record = {
    month_price: '10',
    quarter_price: null,
    half_year_price: 20,
    year_price: '',
    two_year_price: 40,
    three_year_price: null,
    onetime_price: '99',
    reset_price: null,
};

test('plan price fields render matches the reconstructed bundle branch', async () => {
    const changes = [];
    const props = {
        record,
        currencySymbol: '¥',
        onPriceChange: (field, value) => changes.push([field, value]),
    };
    const [baseline, recovered] = [
        (await loadBaseline())(React, ui, props),
        (await loadRecovered())(props),
    ];

    assert.deepEqual(normalize(recovered), normalize(baseline));

    const baselineInputs = findNodes(baseline, 'Input');
    const recoveredInputs = findNodes(recovered, 'Input');
    assert.deepEqual(
        recoveredInputs.map((input) => ({
            value: input.props.value,
            addonAfter: input.props.addonAfter,
        })),
        baselineInputs.map((input) => ({
            value: input.props.value,
            addonAfter: input.props.addonAfter,
        })),
    );

    recoveredInputs[0].props.onChange({ target: { value: '11' } });
    recoveredInputs[6].props.onChange({ target: { value: '100' } });
    assert.deepEqual(changes, [
        ['month_price', '11'],
        ['onetime_price', '100'],
    ]);
});

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    // Like the real React, nested array children are flattened one level.
    createElement: (type, props, ...children) => ({
        type,
        props: props || {},
        children: children.flatMap((child) => (Array.isArray(child) ? child : [child])),
    }),
};
const Input = 'Input';
const Select = Object.assign(function Select() {}, { Option: 'Select.Option' });
const settings = { periodText: { month: '月付', quarter: '季付', year: '年付' } };

async function load(relativePath) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/input') return Input;
            if (id === 'antd/lib/select') return Select;
            if (id.endsWith('/adminSettings')) return { settings };
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports;
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

test('coupon basic fields hide the custom code input once a batch count is set', async () => {
    const { CouponBasicFields } = await load(
        '../src/pages/coupon/components/CouponBasicFields.tsx',
    );
    const changes = [];
    const hidden = CouponBasicFields({
        coupon: { name: 'A', code: '', generate_count: 5 },
        onChange: (patch) => changes.push(patch),
    });
    assert.equal(findNodes(hidden, 'Input').length, 1);

    const visible = CouponBasicFields({
        coupon: { name: 'A', code: 'VIP', generate_count: undefined },
        onChange: (patch) => changes.push(patch),
    });
    const inputs = findNodes(visible, 'Input');
    assert.equal(inputs.length, 2);
    inputs[0].props.onChange({ target: { value: 'Renamed' } });
    inputs[1].props.onChange({ target: { value: 'CUSTOM' } });
    // Patches originate inside the vm realm; compare as plain JSON.
    const plain = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain(changes), [{ name: 'Renamed' }, { code: 'CUSTOM' }]);
});

test('coupon generation field only renders for brand-new batch coupons', async () => {
    const { CouponGenerationField } = await load(
        '../src/pages/coupon/components/CouponGenerationField.tsx',
    );
    const changes = [];
    const visible = CouponGenerationField({
        coupon: { code: undefined, id: undefined, generate_count: undefined },
        onChange: (patch) => changes.push(patch),
    });
    assert.ok(visible, 'renders for a new coupon without a code');
    findNodes(visible, 'Input')[0].props.onChange({ target: { value: '10' } });
    const plain2 = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain2(changes), [{ generate_count: '10' }]);
    assert.equal(CouponGenerationField({ coupon: { code: 'X' }, onChange: () => {} }), null);
    assert.equal(CouponGenerationField({ coupon: { id: 3 }, onChange: () => {} }), null);
});

test('coupon value fields switch the addon with the discount type', async () => {
    const { CouponValueFields } = await load(
        '../src/pages/coupon/components/CouponValueFields.tsx',
    );
    const changes = [];
    const amount = CouponValueFields({
        coupon: { type: 1, value: '10' },
        onChange: (patch) => changes.push(patch),
    });
    const amountInput = findNodes(amount, 'Input')[0];
    assert.equal(amountInput.props.addonAfter, '¥');
    const typeSelect = findNodes(amountInput.props.addonBefore, Select)[0];
    assert.equal(typeSelect.props.value, 1);
    typeSelect.props.onChange(2);
    const plain3 = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain3(changes), [{ type: 2 }]);

    const percent = CouponValueFields({
        coupon: { type: 2, value: '30' },
        onChange: (patch) => changes.push(patch),
    });
    assert.equal(findNodes(percent, 'Input')[0].props.addonAfter, '%');
    findNodes(percent, 'Input')[0].props.onChange({ target: { value: '50' } });
    const plain4 = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain4(changes), [{ type: 2 }, { value: '50' }]);
});

test('coupon usage fields forward both limits', async () => {
    const { CouponUsageFields } = await load(
        '../src/pages/coupon/components/CouponUsageFields.tsx',
    );
    const changes = [];
    const tree = CouponUsageFields({ coupon: { limit_use: 5 }, onChange: (p) => changes.push(p) });
    const inputs = findNodes(tree, 'Input');
    assert.deepEqual(
        inputs.map((input) => input.props.value),
        [5, undefined],
    );
    inputs[0].props.onChange({ target: { value: '9' } });
    inputs[1].props.onChange({ target: { value: '1' } });
    const plain5 = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain5(changes), [{ limit_use: '9' }, { limit_use_with_user: '1' }]);
});

test('coupon restrictions fields map plan and period options and clear empty sets', async () => {
    const { CouponRestrictionsFields } = await load(
        '../src/pages/coupon/components/CouponRestrictionsFields.tsx',
    );
    const changes = [];
    const plans = [
        { id: 1, name: 'Basic' },
        { id: 2, name: 'Pro' },
    ];
    const tree = CouponRestrictionsFields({
        coupon: { limit_plan_ids: null, limit_period: null },
        plans,
        onChange: (patch) => changes.push(patch),
    });
    const selects = findNodes(tree, Select);
    assert.deepEqual(
        selects[0].children.map((option) => [option.props.value, option.children[0]]),
        [
            ['1', 'Basic'],
            ['2', 'Pro'],
        ],
    );
    assert.deepEqual(
        selects[1].children.map((option) => [option.props.value, option.children[0]]),
        [
            ['month', '月付'],
            ['quarter', '季付'],
            ['year', '年付'],
        ],
    );
    selects[0].props.onChange(['1']);
    selects[0].props.onChange([]);
    selects[1].props.onChange(['month', 'year']);
    selects[1].props.onChange([]);
    const plain6 = (value) => JSON.parse(JSON.stringify(value));
    assert.deepEqual(plain6(changes), [
        { limit_plan_ids: ['1'] },
        { limit_plan_ids: null },
        { limit_period: ['month', 'year'] },
        { limit_period: null },
    ]);
});

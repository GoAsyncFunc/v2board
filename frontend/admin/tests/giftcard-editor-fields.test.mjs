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

const plain = (value) => JSON.parse(JSON.stringify(value));

test('gift card basic fields hide the custom code input once a batch count is set', async () => {
    const { GiftCardBasicFields } = await load(
        '../src/pages/giftcard/components/GiftCardBasicFields.tsx',
    );
    const changes = [];
    const hidden = GiftCardBasicFields({
        giftCard: { name: 'Card', generate_count: 9 },
        onChange: (patch) => changes.push(patch),
    });
    assert.equal(findNodes(hidden, 'Input').length, 1);

    const visible = GiftCardBasicFields({
        giftCard: { name: 'Card', code: 'GOLD' },
        onChange: (patch) => changes.push(patch),
    });
    const inputs = findNodes(visible, 'Input');
    assert.equal(inputs.length, 2);
    inputs[0].props.onChange({ target: { value: 'Renamed' } });
    inputs[1].props.onChange({ target: { value: 'CUSTOM' } });
    assert.deepEqual(plain(changes), [{ name: 'Renamed' }, { code: 'CUSTOM' }]);
});

test('gift card generation field only renders for brand-new batch cards', async () => {
    const { GiftCardGenerationField } = await load(
        '../src/pages/giftcard/components/GiftCardGenerationField.tsx',
    );
    const changes = [];
    const visible = GiftCardGenerationField({
        giftCard: {},
        onChange: (patch) => changes.push(patch),
    });
    assert.ok(visible);
    findNodes(visible, 'Input')[0].props.onChange({ target: { value: '20' } });
    assert.deepEqual(plain(changes), [{ generate_count: '20' }]);
    assert.equal(GiftCardGenerationField({ giftCard: { code: 'X' }, onChange: () => {} }), null);
    assert.equal(GiftCardGenerationField({ giftCard: { id: 5 }, onChange: () => {} }), null);
});

test('gift card value fields switch modes and lock the value for resets', async () => {
    const { GiftCardValueFields } = await load(
        '../src/pages/giftcard/components/GiftCardValueFields.tsx',
    );
    const changes = [];
    const balance = GiftCardValueFields({
        giftCard: { type: 1, value: '10' },
        valueSuffix: '¥',
        onChange: (patch) => changes.push(patch),
    });
    const input = findNodes(balance, 'Input')[0];
    assert.equal(input.props.addonAfter, '¥');
    assert.equal(input.props.disabled, false);
    const typeSelect = input.props.addonBefore;
    assert.equal(typeSelect.props.value, 1);
    assert.deepEqual(
        typeSelect.children.map((option) => [option.props.value, option.children[0]]),
        [
            [1, '增加账户余额'],
            [2, '增加订阅时长'],
            [3, '增加套餐流量'],
            [4, '重置套餐流量'],
            [5, '兑换订阅套餐'],
        ],
    );
    typeSelect.props.onChange(5);
    assert.deepEqual(plain(changes), [{ type: 5 }]);

    const reset = GiftCardValueFields({
        giftCard: { type: 4, value: null },
        valueSuffix: 'GB',
        onChange: (patch) => changes.push(patch),
    });
    const resetInput = findNodes(reset, 'Input')[0];
    assert.equal(resetInput.props.disabled, true);
    assert.equal(resetInput.props.value, 0);
    assert.equal(resetInput.props.placeholder, '请输入值');

    const plan = GiftCardValueFields({
        giftCard: { type: 5, value: '0' },
        valueSuffix: '¥',
        onChange: (patch) => changes.push(patch),
    });
    assert.equal(findNodes(plan, 'Input')[0].props.placeholder, '一次性套餐输入0');
});

test('gift card usage fields forward the usage limit', async () => {
    const { GiftCardUsageFields } = await load(
        '../src/pages/giftcard/components/GiftCardUsageFields.tsx',
    );
    const changes = [];
    const tree = GiftCardUsageFields({
        giftCard: { limit_use: 3 },
        onChange: (p) => changes.push(p),
    });
    findNodes(tree, 'Input')[0].props.onChange({ target: { value: '8' } });
    assert.deepEqual(plain(changes), [{ limit_use: '8' }]);
});

test('gift card plan field renders only for redemption cards and stringifies ids', async () => {
    const { GiftCardPlanField } = await load(
        '../src/pages/giftcard/components/GiftCardPlanField.tsx',
    );
    const changes = [];
    const plans = [
        { id: 1, name: 'Basic' },
        { id: 22, name: 'Pro' },
    ];
    assert.equal(GiftCardPlanField({ giftCard: { type: 1 }, plans, onChange: () => {} }), null);

    const tree = GiftCardPlanField({
        giftCard: { type: 5, plan_id: null },
        plans,
        onChange: (patch) => changes.push(patch),
    });
    const select = findNodes(tree, Select)[0];
    assert.equal(select.props.value, undefined);
    assert.deepEqual(
        select.children.map((option) => [option.props.value, option.children[0]]),
        [
            ['1', 'Basic'],
            ['22', 'Pro'],
        ],
    );
    select.props.onChange('22');
    select.props.onChange('');
    assert.deepEqual(plain(changes), [{ plan_id: '22' }, { plan_id: null }]);
});

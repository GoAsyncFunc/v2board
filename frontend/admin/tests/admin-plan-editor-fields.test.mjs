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
    // Mock components must stay reference-identical through esbuild's interop
    // wrapper, so they are functions rather than String objects.
    Input: Object.assign(function Input() {}, { TextArea: 'Input.TextArea' }),
    Select: Object.assign(function Select() {}, { Option: 'Select.Option' }),
    Option: 'Select.Option',
    PermissionGroupEditor: 'PermissionGroupEditor',
    Button: 'Button',
    Checkbox: 'Checkbox',
    Tooltip: 'Tooltip',
};

function normalize(value) {
    return JSON.parse(
        JSON.stringify(value, (key, child) => {
            if (typeof child === 'function') return '[function]';
            // React consumes the key and never passes it to the element props,
            // so keys are dropped on both sides of the comparison.
            if (key === 'key') return undefined;
            // antd Input/Select treat a null value like an uncontrolled empty one,
            // which the recovered sources express with `?? undefined` for TS.
            if (key === 'value' && child === null) return undefined;
            return child;
        }),
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

const CHANGES = [];

async function loadRecovered(relativePath, requires) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        require(id) {
            if (id === 'react') return React;
            if (id in requires) return requires[id];
            throw new Error(`Unexpected dependency: ${id}`);
        },
    });
    return module.exports;
}

async function loadBaseline() {
    const source = await fs.readFile(
        new URL('./fixtures/pages/admin-plan-editor-fields.cjs', import.meta.url),
        'utf8',
    );
    const module = { exports: {} };
    vm.runInNewContext(source, { module, exports: module.exports });
    return module.exports;
}

const RECOVERED_EXPORTS = {
    renderBasicFields: 'PlanBasicFields',
    renderResourceFields: 'PlanResourceFields',
    renderAccessFields: 'PlanAccessFields',
    renderLimitFields: 'PlanLimitFields',
    renderActions: 'PlanEditorActions',
};

async function compare(recoveredPath, branch, requires, props) {
    const baseline = await loadBaseline();
    const recovered = await loadRecovered(recoveredPath, requires);
    const recoveredExport = recovered[RECOVERED_EXPORTS[branch]];
    const baselineTree = baseline[branch](React, ui, props);
    const recoveredTree = recoveredExport(props);
    assert.deepEqual(normalize(recoveredTree), normalize(baselineTree));
    return { baselineTree, recoveredTree };
}

test('plan basic fields match the bundle branch', async () => {
    const changes = [];
    const record = { name: 'Starter', content: null };
    const { baselineTree, recoveredTree } = await compare(
        '../src/pages/plan/components/PlanBasicFields.tsx',
        'renderBasicFields',
        { 'antd/lib/input': ui.Input },
        { record, onChange: (field, value) => changes.push([field, value]) },
    );
    for (const tree of [baselineTree, recoveredTree]) {
        const inputs = [...findNodes(tree, ui.Input), ...findNodes(tree, ui.Input.TextArea)];
        inputs[0].props.onChange({ target: { value: 'Pro' } });
        inputs[1].props.onChange({ target: { value: '<p>x</p>' } });
    }
    assert.deepEqual(changes, [
        ['name', 'Pro'],
        ['content', '<p>x</p>'],
        ['name', 'Pro'],
        ['content', '<p>x</p>'],
    ]);
});

test('plan resource fields match the bundle branch', async () => {
    const changes = [];
    const record = { transfer_enable: '10', device_limit: null };
    await compare(
        '../src/pages/plan/components/PlanResourceFields.tsx',
        'renderResourceFields',
        { 'antd/lib/input': ui.Input },
        { record, onChange: (field, value) => changes.push([field, value]) },
    );
    assert.deepEqual(changes, []);
});

test('plan access fields match the bundle branch', async () => {
    const changes = [];
    const record = { group_id: 3, reset_traffic_method: 1 };
    const { baselineTree, recoveredTree } = await compare(
        '../src/pages/plan/components/PlanAccessFields.tsx',
        'renderAccessFields',
        {
            'antd/lib/select': ui.Select,
            '@/components/common/PermissionGroupEditor': {
                __esModule: true,
                default: ui.PermissionGroupEditor,
            },
            '@/components/common/NullableSelectOption': {
                __esModule: true,
                default: ui.Option,
            },
        },
        {
            record,
            groups: [
                { id: 1, name: 'Default' },
                { id: 'vip', name: 'VIP' },
            ],
            onChange: (field, value) => changes.push([field, value]),
        },
    );
    for (const tree of [baselineTree, recoveredTree]) {
        const selects = findNodes(tree, ui.Select);
        selects[0].props.onChange(7);
        selects[1].props.onChange(4);
        const resetOptions = findNodes(selects[1], 'Select.Option');
        assert.deepEqual(
            resetOptions.map((option) => [option.props.value, option.children[0]]),
            [
                [null, '跟随系统设置'],
                [0, '每月1号'],
                [1, '按月重置'],
                [2, '不重置'],
                [3, '每年1月1日'],
                [4, '按年重置'],
            ],
        );
        assert.equal(resetOptions[0].props.value, null);
    }
    assert.deepEqual(changes, [
        ['group_id', 7],
        ['reset_traffic_method', 4],
        ['group_id', 7],
        ['reset_traffic_method', 4],
    ]);
});

test('plan limit fields match the bundle branch', async () => {
    const changes = [];
    const record = { capacity_limit: null, speed_limit: '50' };
    await compare(
        '../src/pages/plan/components/PlanLimitFields.tsx',
        'renderLimitFields',
        { 'antd/lib/input': ui.Input },
        { record, onChange: (field, value) => changes.push([field, value]) },
    );
    assert.deepEqual(changes, []);
});

test('plan editor actions match the bundle branch', async () => {
    const calls = [];
    const props = {
        saveLoading: false,
        onForceUpdateChange: (value) => calls.push(['force', value]),
        onCancel: () => calls.push(['cancel']),
        onSubmit: () => calls.push(['submit']),
    };
    const { baselineTree, recoveredTree } = await compare(
        '../src/pages/plan/components/PlanEditorActions.tsx',
        'renderActions',
        {
            'antd/lib/button': 'Button',
            'antd/lib/checkbox': 'Checkbox',
            'antd/lib/tooltip': 'Tooltip',
        },
        props,
    );
    for (const tree of [baselineTree, recoveredTree]) {
        const buttons = findNodes(tree, 'Button');
        buttons[0].props.onClick();
        buttons[1].props.onClick();
        const checkbox = findNodes(tree, 'Checkbox')[0];
        checkbox.props.onChange({ target: { checked: true } });
    }
    assert.deepEqual(calls, [
        ['cancel'],
        ['submit'],
        ['force', true],
        ['cancel'],
        ['submit'],
        ['force', true],
    ]);
});

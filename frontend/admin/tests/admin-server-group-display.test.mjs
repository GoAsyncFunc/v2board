import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
const React = {
    Fragment: 'Fragment',
    createElement: (type, props, ...children) => ({ type, props, children }),
};
async function load(original) {
    const module = { exports: {} };
    const file = new URL(
        original
            ? './fixtures/pages/admin-server-group-display.cjs'
            : '../src/pages/server/group/components/ServerGroupColumns.tsx',
        import.meta.url,
    );
    const source = await fs.readFile(file, 'utf8');
    vm.runInNewContext(
        original ? source : (await transform(source, { format: 'cjs', loader: 'tsx' })).code,
        {
            module,
            exports: module.exports,
            require(id) {
                if (id === 'react') return React;
                if (id === 'antd/lib/icon') return 'Icon';
                if (id.includes('Icon')) return { a: 'Icon', Icon: 'Icon' };
                throw Error(id);
            },
        },
    );
    return original
        ? module.exports({ a: React }, { a: 'Icon' })
        : Object.values(module.exports.createServerGroupColumns());
}
function normalize(value) {
    if (Array.isArray(value)) return Array.from(value, normalize);
    if (typeof value === 'function') return '[render]';
    if (value && typeof value === 'object')
        return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalize(v)]));
    return value;
}
for (const field of ['user_count', 'server_count'])
    test(`group count preserves opaque child identity: ${field}`, async () => {
        const child = {
            toString() {
                throw Error('Must not coerce');
            },
        };
        for (const original of [true, false]) {
            const column = (await load(original)).find((column) => column.key === field);
            const element = column.render(child);
            assert.equal(element.type, 'Fragment');
            assert.equal(element.children[2], child);
            assert.equal(
                element.children[0].props.type,
                field === 'user_count' ? 'user' : 'database',
            );
            assert.equal(element.children[0].props.style.cursor, 'move');
            assert.equal(element.children[1], ' ');
            assert.ok(!('onClick' in element.children[0].props));
        }
    });
const values = [
    0,
    1,
    -1,
    null,
    undefined,
    '12',
    '',
    NaN,
    Infinity,
    Number.MAX_SAFE_INTEGER,
    false,
    [],
    { unexpected: true },
];
for (const [index, value] of values.entries())
    test(`group readonly count ${index + 1}`, async () => {
        const results = [];
        for (const original of [true, false]) {
            const columns = await load(original);
            results.push(
                normalize({
                    columns,
                    values: columns.map((c) => (c.render ? c.render(value) : value)),
                }),
            );
        }
        assert.deepEqual(results[1], results[0]);
    });

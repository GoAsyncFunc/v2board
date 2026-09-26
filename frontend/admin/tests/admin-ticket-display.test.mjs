import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
import { loadDateTimeFormatter } from './helpers/load-date-time.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
async function load(original) {
    const module = { exports: {} };
    const file = new URL(
        original
            ? './fixtures/pages/admin-ticket-display.cjs'
            : '../src/pages/ticket/components/TicketColumns.ts',
        import.meta.url,
    );
    const text = await fs.readFile(file, 'utf8');
    const moment = (value) => ({ format: (pattern) => `${value}:${pattern}` });
    const dateTime = original ? null : await loadDateTimeFormatter(moment);
    vm.runInNewContext(
        original ? text : (await transform(text, { format: 'cjs', loader: 'ts' })).code,
        {
            module,
            exports: module.exports,
            require(id) {
                if (id.includes('utils/dateTimeFormatter')) return dateTime;
                if (id === 'moment' || id.includes('77642f52')) return moment;
                throw Error(id);
            },
        },
    );
    return original
        ? module.exports(['低', '中', '高'], () => moment)
        : Object.values(module.exports.createTicketColumns(['低', '中', '高']));
}
for (const level of [0, 1, 99, '1', Symbol('level')])
    test(`ticket level coercion ${String(level)}`, async () => {
        const results = [];
        for (const original of [true, false]) {
            const column = (await load(original)).find((c) => c.key === 'level');
            let value, error;
            try {
                value = column.render(level);
            } catch (e) {
                error = e.name;
            }
            results.push({ value, error });
        }
        assert.deepEqual(results[1], results[0]);
    });
for (const field of ['created_at', 'updated_at'])
    test(`ticket date coercion ${field}`, async () => {
        const results = [];
        for (const original of [true, false]) {
            const trace = [];
            const value = {
                [Symbol.toPrimitive](hint) {
                    trace.push(hint);
                    return 1700000000;
                },
            };
            let rendered, error;
            try {
                rendered = (await load(original)).find((c) => c.key === field).render(value);
            } catch (e) {
                error = e.name;
            }
            results.push({ trace, rendered, error });
        }
        assert.deepEqual(results[1], results[0]);
        assert.deepEqual(results[1].trace, ['number']);
    });
const normalize = (x) =>
    JSON.parse(JSON.stringify(x, (k, v) => (typeof v === 'function' ? '[render]' : v)));
for (const level of [0, 1, 2, 99, '1', null, undefined])
    for (const time of [0, null, undefined, 1700000000, -999999999])
        test(`ticket display ${level}/${time}`, async () => {
            const record = {
                id: 7,
                subject: 'Fixture 工单',
                level,
                created_at: time,
                updated_at: time,
            };
            const results = [];
            for (const original of [true, false]) {
                const columns = await load(original);
                results.push(
                    normalize({
                        columns,
                        values: columns.map((c) =>
                            c.render ? c.render(record[c.dataIndex]) : record[c.dataIndex],
                        ),
                    }),
                );
            }
            assert.deepEqual(results[1], results[0]);
        });

test('ticket list composes status filters and delegates row actions', async () => {
    const source = await fs.readFile(
        new URL('../src/pages/ticket/components/TicketList.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    const React = {
        Component: class {
            constructor(props) {
                this.props = props;
            }
        },
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        Date,
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Component) => Component };
            if (id === 'antd/lib/table') return 'Table';
            if (id === 'antd/lib/badge') return 'Badge';
            if (id === 'antd/lib/divider') return 'Divider';
            if (id.includes('TicketColumns'))
                return {
                    createTicketColumns: () => ({
                        id: { key: 'id' },
                        subject: { key: 'subject' },
                        level: { key: 'level' },
                        created_at: { key: 'created_at' },
                        updated_at: { key: 'updated_at' },
                    }),
                };
            throw Error(id);
        },
    });
    const open = [];
    const close = [];
    const change = [];
    const List = module.exports.TicketList;
    const list = new List({
        ticket: { tickets: [], pagination: { current: 1, pageSize: 10 }, filter: { status: 0 } },
        onOpenTicket: (id) => open.push(id),
        onCloseTicket: (id) => close.push(id),
        onTableChange: (...args) => change.push(args),
    });
    const tree = list.render();
    assert.equal(tree.type, 'Table');
    assert.equal(tree.props.columns.length, 7);
    assert.deepEqual(JSON.parse(JSON.stringify(tree.props.columns[3].filters)), [
        { text: '已回复', value: 1 },
        { text: '待回复', value: 0 },
    ]);
    tree.props.onChange({ current: 2 }, { reply_status: [1] });
    assert.deepEqual(change, [[{ current: 2 }, { reply_status: [1] }]]);
    const actionColumn = tree.props.columns[6];
    const action = actionColumn.render(undefined, { id: 9, status: 0 });
    const links = action.children;
    links[0].props.onClick();
    links[2].props.onClick();
    assert.deepEqual(open, [9]);
    assert.deepEqual(close, [9]);
});

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};
const history = {
    push(url) {
        history.calls.push(url);
    },
};
history.calls = [];
const money = {
    formatIncome: (value) => `INCOME(${value})`,
    formatLiveCount: (value) => `LIVE(${value})`,
};

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
            if (id.endsWith('/navigationService')) return history;
            if (id.endsWith('/MoneyDisplay')) return money;
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

test('dashboard navigation renders four quick links that route on click', async () => {
    const { default: DashboardNavigation } = await load(
        '../src/pages/dashboard/components/DashboardNavigation.tsx',
    );
    const tree = DashboardNavigation();
    const anchors = findNodes(tree, 'a');
    assert.equal(anchors.length, 4);
    const expected = [
        ['系统设置', '/config/system'],
        ['订单管理', '/order'],
        ['订阅管理', '/plan'],
        ['用户管理', '/user'],
    ];
    for (const [index, [label, path]] of expected.entries()) {
        assert.equal(anchors[index].children[0].children[1].children[0], label);
        anchors[index].props.onClick();
        assert.equal(history.calls.at(-1), path);
    }
    assert.deepEqual(history.calls, ['/config/system', '/order', '/plan', '/user']);
});

test('dashboard overview formats stat blocks and binds the chart ref', async () => {
    history.calls.length = 0;
    const { default: DashboardOverview } = await load(
        '../src/pages/dashboard/components/DashboardOverview.tsx',
    );
    const chartRef = { current: null };
    const stat = {
        online_user: 12,
        day_income: 12500,
        day_register_total: 3,
        month_income: 90000,
        last_month_income: 80000,
        commission_last_month_payout: 1500,
        month_register_total: 0,
    };
    const tree = DashboardOverview({ stat, currency: '¥', orderChart: chartRef });
    assert.ok(JSON.stringify(plain(tree)).length > 100);
    assert.deepEqual(history.calls, []);

    // The live counters and income cells render through the MoneyDisplay helpers.
    const text = JSON.stringify(plain(tree));
    assert.match(text, /INCOME\(12500\)/);
    assert.match(text, /LIVE\(3\)/);
    assert.match(text, /INCOME\(90000\)/);
    assert.match(text, /INCOME\(80000\)/);
    assert.match(text, /INCOME\(1500\)/);
    assert.match(text, /上月佣金支出/);
    assert.match(text, /本月新增用户/);

    // The empty month register total falls back to the dash; online falls back to 0.
    const empty = DashboardOverview({ stat: {}, currency: '¥', orderChart: chartRef });
    const emptyText = JSON.stringify(plain(empty));
    assert.match(emptyText, /"0"/);
    assert.match(emptyText, /"-"/);
});

test('rank chart option reverses records and formats the GB tooltip', async () => {
    const { createRankChartOption } = await load(
        '../src/pages/dashboard/components/DashboardServerRank.tsx',
    );
    const data = [
        { name: 'A', total: 30 },
        { name: 'B', total: 10 },
        { name: undefined, total: 5 },
    ];
    // Keep the raw option for the formatter function; JSON round trips the rest.
    const raw = createRankChartOption(data, (item) => item.name);
    const option = plain(raw);
    assert.deepEqual(option.yAxis.data, ['', 'B', 'A'], 'records render bottom-up');
    assert.deepEqual(option.series[0].data, [5, 10, 30]);
    assert.deepEqual(option.series[0].type, 'bar');
    assert.equal(raw.tooltip.formatter([{ value: 12 }]), '12 GB');
    assert.deepEqual(option.grid, {
        top: '1%',
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true,
    });
});

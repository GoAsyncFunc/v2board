import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPage() {
    const source = await fs.readFile(
        new URL('../src/pages/account/Invite.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const trace = [];
    const React = {
        Fragment: 'Fragment',
        Component: class {
            constructor(props) {
                this.props = props;
            }
        },
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    };
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        window: { location: { origin: 'https://example.test', pathname: '/' } },
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Page) => Page };
            if (id.includes('/components/account/invite/'))
                return {
                    __esModule: true,
                    default: id.split('/').at(-1),
                };
            if (id.includes('InviteDisplayColumns'))
                return {
                    createInviteCodeDateColumn: () => ({ key: 'created_at' }),
                    createCommissionColumns: () => [{ key: 'commission' }],
                };
            if (id.includes('MoneyDisplay'))
                return { formatMoney: (value) => (value / 100).toFixed(2) };
            if (id.includes('ui.js'))
                return {
                    Table: 'Table',
                    Button: 'Button',
                    Tooltip: 'Tooltip',
                    message: { success: (text) => trace.push(['success', text]) },
                };
            if (id === 'antd/lib/button') return { __esModule: true, default: 'Button' };
            if (id === 'antd/lib/table') return { __esModule: true, default: 'Table' };
            if (id === 'antd/lib/tooltip') return { __esModule: true, default: 'Tooltip' };
            if (id === 'antd/lib/message')
                return {
                    __esModule: true,
                    default: { success: (text) => trace.push(['success', text]) },
                };
            if (id.includes('Icon.js') || id === 'antd/lib/icon')
                return { __esModule: true, default: 'Icon', Icon: 'Icon' };
            if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
            if (id.includes('clipboard') || id === 'copy-to-clipboard')
                return (value) => trace.push(['copy', value]);
            if (/iconStyles|localeSettings|dateTime/.test(id)) return {};
            if (/MainLayout|TransferCommissionModal|WithdrawModal/.test(id)) return id;
            throw new Error(`Unexpected import: ${id}`);
        },
    });
    return { Page: module.exports.default, trace };
}

function findNodes(tree, predicate) {
    if (Array.isArray(tree)) return tree.flatMap((node) => findNodes(node, predicate));
    if (!tree || typeof tree !== 'object') return [];
    return [...(predicate(tree) ? [tree] : []), ...findNodes(tree.children, predicate)];
}

for (const loading of [true, false])
    for (const distributionEnabled of [true, false]) {
        test(`Invite page renders state and actions with loading=${loading}, distribution=${distributionEnabled}`, async () => {
            const { Page, trace } = await loadPage();
            const codes = loading ? [] : [{ code: 'demo-code', created_at: 1700000000 }];
            const invites = loading ? [] : [{ id: 1, commission_balance: 500 }];
            const props = {
                invite: {
                    stat: loading ? [] : [2, 1000, 500, 10],
                    codes,
                    invites,
                    fetchLoading: loading,
                    detailsLoading: loading,
                    saveLoading: loading,
                    detailsPagination: { total: 1, current: 1, page_size: 10 },
                },
                comm: {
                    config: {
                        currency: 'CNY',
                        currency_symbol: '¥',
                        commission_distribution_enable: distributionEnabled,
                        commission_distribution_l1: 80,
                        commission_distribution_l2: 15,
                        commission_distribution_l3: 5,
                        withdraw_close: distributionEnabled,
                    },
                },
                user: { userInfo: { commission_balance: 500 } },
                dispatch: (action) => trace.push(['dispatch', action]),
            };
            const page = new Page(props);
            page.componentDidMount();
            assert.deepEqual(
                trace.map((entry) => entry[1].type),
                ['user/getUserInfo', 'invite/details', 'invite/fetch', 'comm/config'],
            );
            const tree = page.render();
            assert.equal(tree.props.title, '我的邀请');
            const sections = findNodes(
                tree,
                (node) => typeof node.type === 'string' && node.type.startsWith('Invite'),
            );
            assert.deepEqual(
                sections.map((section) => section.type),
                [
                    'InviteCommissionWallet',
                    'InviteStatistics',
                    'InviteCodeManager',
                    'InviteCommissionHistory',
                ],
            );
            assert.equal(sections[0].props.commissionBalance, 500);
            assert.equal(
                sections[1].props.config.commission_distribution_enable,
                distributionEnabled,
            );
            assert.equal(sections[2].props.codes, codes);
            assert.equal(sections[2].props.saveLoading, loading);
            assert.equal(sections[3].props.records, invites);
            assert.equal(sections[3].props.detailsLoading, loading);
            if (!loading) {
                const beforeSave = trace.length;
                sections[2].props.onGenerate();
                assert.equal(trace.length, beforeSave + 1);
                assert.equal(trace.at(-1)[1].type, 'invite/save');
                trace.at(-1)[1].complete();
                assert.deepEqual(trace.at(-1), ['success', '已生成']);
            }
            sections[3].props.onPageChange(2, 50);
            assert.deepEqual(JSON.parse(JSON.stringify(trace.at(-1))), [
                'dispatch',
                { type: 'invite/details', current: 2, pageSize: 50 },
            ]);
        });
    }

async function loadInviteComponent(fileName) {
    const source = await fs.readFile(
        new URL(`../src/components/account/invite/${fileName}.tsx`, import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const trace = [];
    const React = {
        Fragment: 'Fragment',
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    };
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/button') return { __esModule: true, default: 'Button' };
            if (id === 'antd/lib/icon') return { __esModule: true, default: 'Icon' };
            if (id === 'antd/lib/table') return { __esModule: true, default: 'Table' };
            if (id === 'antd/lib/tooltip') return { __esModule: true, default: 'Tooltip' };
            if (id.includes('InviteDisplayColumns'))
                return {
                    createInviteCodeDateColumn: () => ({ key: 'created_at' }),
                    createCommissionColumns: () => [{ key: 'commission' }],
                };
            if (id.includes('MoneyDisplay'))
                return { formatMoney: (value) => (value / 100).toFixed(2) };
            if (id.includes('TransferCommissionModal')) return 'TransferCommissionModal';
            if (id.includes('WithdrawModal')) return 'WithdrawModal';
            if (id.includes('i18n')) return { formatMessage: ({ id: messageId }) => messageId };
            throw new Error(`Unexpected invite component import: ${id}`);
        },
    });
    return { ...module.exports, trace };
}

test('Invite statistics preserves distribution and currency display branches', async () => {
    const runtime = await loadInviteComponent('InviteStatistics');
    const tree = runtime.default({
        blockClassName: 'loading',
        config: {
            currency_symbol: '¥',
            commission_distribution_enable: true,
            commission_distribution_l1: 80,
            commission_distribution_l2: 15,
            commission_distribution_l3: 5,
        },
        stat: [2, 1000, 500, 10],
    });
    assert.equal(findNodes(tree, (node) => node.props.className === 'loading').length, 1);
    assert.match(JSON.stringify(tree), /三级分销比例/);
    assert.match(JSON.stringify(tree), /8%,1.5%,0.5%/);
    assert.match(JSON.stringify(tree), /¥ 5/);
    assert.match(JSON.stringify(tree), /¥ 10/);
    assert.equal(
        runtime.formatCommissionDistribution(
            {
                commission_distribution_l1: 80,
                commission_distribution_l2: 15,
                commission_distribution_l3: 5,
            },
            10,
        ),
        '8%,1.5%,0.5%',
    );
});

test('Invite code manager keeps generation, copy and table behavior', async () => {
    const runtime = await loadInviteComponent('InviteCodeManager');
    const copied = [];
    const generated = [];
    const tree = runtime.default({
        blockClassName: 'block',
        codes: [{ code: 'demo-code' }],
        saveLoading: false,
        onCopyLink: (code) => copied.push(code),
        onGenerate: () => generated.push(true),
    });
    const button = findNodes(tree, (node) => node.type === 'button')[0];
    button.props.onClick();
    assert.deepEqual(generated, [true]);
    const table = findNodes(tree, (node) => node.type === 'Table')[0];
    assert.equal(table.props.dataSource[0].code, 'demo-code');
    const codeCell = table.props.columns[0].render('demo-code');
    findNodes(codeCell, (node) => node.type === 'a')[0].props.onClick();
    assert.deepEqual(copied, ['demo-code']);

    const loadingTree = runtime.default({
        blockClassName: 'block',
        codes: [],
        saveLoading: true,
        onCopyLink() {},
        onGenerate: () => generated.push('unexpected'),
    });
    findNodes(loadingTree, (node) => node.type === 'button')[0].props.onClick();
    assert.deepEqual(generated, [true]);
});

test('Invite commission history forwards pagination and loading state', async () => {
    const runtime = await loadInviteComponent('InviteCommissionHistory');
    const pages = [];
    const tree = runtime.default({
        blockClassName: 'block',
        detailsLoading: true,
        pagination: { current: 1, page_size: 10, total: 1 },
        records: [{ id: 1 }],
        onPageChange: (...values) => pages.push(values),
    });
    const table = findNodes(tree, (node) => node.type === 'Table')[0];
    assert.equal(table.props.loading, true);
    assert.equal(table.props.pagination.pageSize, 10);
    assert.deepEqual(
        Array.from(table.props.pagination.pageSizeOptions, Number),
        [10, 50, 100, 150],
    );
    table.props.onChange({ current: 2, pageSize: 50 });
    assert.deepEqual(pages, [[2, 50]]);
});

test('Invite commission wallet exposes transfer and withdrawal controls', async () => {
    const runtime = await loadInviteComponent('InviteCommissionWallet');
    const tree = runtime.default({
        blockClassName: 'block',
        commissionBalance: 500,
        config: { currency: 'CNY', withdraw_close: false },
    });
    assert.match(JSON.stringify(tree), /5\.00/);
    assert.equal(findNodes(tree, (node) => node.type === 'TransferCommissionModal').length, 1);
    assert.equal(findNodes(tree, (node) => node.type === 'WithdrawModal').length, 1);
});

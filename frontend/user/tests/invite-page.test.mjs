import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/account/Invite.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const trace = [];
  const React = {
    Fragment: 'Fragment',
    Component: class { constructor(props) { this.props = props; } },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    window: { location: { origin: 'https://example.test', pathname: '/' } },
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Page => Page };
      if (id.includes('InviteDisplayColumns')) return {
        createInviteCodeDateColumn: () => ({ key: 'created_at' }),
        createReadonlyCommissionColumns: () => [{ key: 'commission' }],
      };
      if (id.includes('MoneyDisplay')) return { formatMoney: value => (value / 100).toFixed(2) };
      if (id.includes('ui.js')) return {
        Table: 'Table', Button: 'Button', Tooltip: 'Tooltip',
        message: { success: text => trace.push(['success', text]) },
      };
      if (id === 'antd/lib/button') return { __esModule: true, default: 'Button' };
      if (id === 'antd/lib/table') return { __esModule: true, default: 'Table' };
      if (id === 'antd/lib/tooltip') return { __esModule: true, default: 'Tooltip' };
      if (id === 'antd/lib/message') return { __esModule: true, default: { success: text => trace.push(['success', text]) } };
      if (id.includes('Icon.js') || id === 'antd/lib/icon') return { __esModule: true, default: 'Icon', Icon: 'Icon' };
      if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
      if (id.includes('clipboard') || id === 'copy-to-clipboard') return value => trace.push(['copy', value]);
      if (/iconStyles|localeSettings|dateTime/.test(id)) return {};
      if (/MainLayout|TransferCommissionModal|WithdrawModal/.test(id)) return id;
      throw new Error(`Unexpected import: ${id}`);
    },
  });
  return { Page: module.exports.default, trace };
}

function findNodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => findNodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...findNodes(tree.children, predicate)];
}

for (const loading of [true, false]) for (const distributionEnabled of [true, false]) {
  test(`Invite page renders state and actions with loading=${loading}, distribution=${distributionEnabled}`, async () => {
    const { Page, trace } = await loadPage();
    const codes = loading ? [] : [{ code: 'demo-code', created_at: 1700000000 }];
    const invites = loading ? [] : [{ id: 1, commission_balance: 500 }];
    const props = {
      invite: {
        stat: loading ? [] : [2, 1000, 500, 10], codes, invites,
        fetchLoading: loading, detailsLoading: loading, saveLoading: loading,
        detailsPagination: { total: 1, current: 1, page_size: 10 },
      },
      comm: { config: {
        currency: 'CNY', currency_symbol: '¥',
        commission_distribution_enable: distributionEnabled,
        commission_distribution_l1: 80,
        commission_distribution_l2: 15,
        commission_distribution_l3: 5,
        withdraw_close: distributionEnabled,
      } },
      user: { userInfo: { commission_balance: 500 } },
      dispatch: action => trace.push(['dispatch', action]),
    };
    const page = new Page(props);
    page.componentDidMount();
    assert.deepEqual(trace.map(entry => entry[1].type), [
      'user/getUserInfo', 'invite/details', 'invite/fetch', 'comm/config',
    ]);
    const tree = page.render();
    assert.equal(tree.props.title, '我的邀请');
    const rendered = JSON.stringify(tree);
    assert.equal(rendered.includes('三级分销比例'), distributionEnabled);
    assert.equal(rendered.includes('推广佣金提现'), !distributionEnabled);
    if (!loading) {
      assert.ok(rendered.includes(distributionEnabled ? '8%,1.5%,0.5%' : '10%'));
      assert.ok(rendered.includes('¥ 5'));
      assert.ok(rendered.includes('¥ 10'));
    }
    const generateButton = findNodes(tree, node => node.type === 'button')[0];
    const beforeSave = trace.length;
    generateButton.props.onClick();
    assert.equal(trace.length, beforeSave + (loading ? 0 : 1));
    if (!loading) {
      assert.equal(trace.at(-1)[1].type, 'invite/save');
      trace.at(-1)[1].complete();
      assert.deepEqual(trace.at(-1), ['success', '已生成']);
    }
    const tables = findNodes(tree, node => node.type === 'Table');
    assert.equal(tables.length, 2);
    assert.equal(tables[0].props.dataSource, codes);
    assert.equal(tables[1].props.dataSource, invites);
    assert.equal(tables[1].props.loading, loading);
    assert.equal(tables[1].props.pagination.pageSize, 10);
    assert.deepEqual(Array.from(tables[1].props.pagination.pageSizeOptions, Number), [10, 50, 100, 150]);
    const transferButton = findNodes(tree, node => node.type === 'Button' && node.props.type === 'primary')[0];
    assert.equal(transferButton.props.className, 'mr-2');
    tables[1].props.onChange({ current: 2, pageSize: 50 });
    assert.deepEqual(JSON.parse(JSON.stringify(trace.at(-1))), [
      'dispatch', { type: 'invite/details', current: 2, pageSize: 50 },
    ]);
    const codeCell = tables[0].props.columns[0].render('demo-code');
    findNodes(codeCell, node => node.type === 'a')[0].props.onClick();
    assert.deepEqual(trace.slice(-2), [
      ['copy', 'https://example.test/#/register?code=demo-code'],
      ['success', '复制成功'],
    ]);
  });
}

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/Invite.jsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'jsx' });
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
      if (id.includes('reactRedux')) return { connect: () => Page => Page };
      if (id.includes('InviteDisplayColumns')) return {
        createInviteCodeDateColumn: () => ({ key: 'created_at' }),
        createReadonlyCommissionColumns: () => [{ key: 'commission' }],
      };
      if (id.includes('MoneyDisplay')) return { formatMoney: value => (value / 100).toFixed(2) };
      if (id.includes('ui.js')) return {
        Table: 'Table', Button: 'Button', Tooltip: 'Tooltip',
        message: { success: text => trace.push(['success', text]) },
      };
      if (id.includes('Icon.js')) return { Icon: 'Icon' };
      if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
      if (id.includes('clipboard')) return value => trace.push(['copy', value]);
      if (id.includes('utilities')) return { objectSpread: Object.assign };
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

for (const loading of [true, false]) {
  test(`Invite page renders API state and actions with loading=${loading}`, async () => {
    const { Page, trace } = await loadPage();
    const codes = loading ? [] : [{ code: 'demo-code', created_at: 1700000000 }];
    const invites = loading ? [] : [{ id: 1, commission_balance: 500 }];
    const props = {
      invite: {
        stat: loading ? [] : [2, 1000, 500, 10], codes, invites,
        fetchLoading: loading, detailsLoading: loading, saveLoading: false,
        detailsPagination: { total: 1, current: 1, page_size: 10 },
      },
      comm: { config: { currency: 'CNY', currency_symbol: '¥' } },
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
    const tables = findNodes(tree, node => node.type === 'Table');
    assert.equal(tables.length, 2);
    assert.equal(tables[0].props.dataSource, codes);
    assert.equal(tables[1].props.dataSource, invites);
    assert.equal(tables[1].props.loading, loading);
    assert.equal(tables[1].props.pagination.pageSize, 10);
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

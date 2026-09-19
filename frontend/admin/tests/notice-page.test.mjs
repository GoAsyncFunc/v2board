import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadPage() {
  const source = await fs.readFile(new URL('../src/pages/Notice.jsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'jsx' });
  const actions = [];
  const React = {
    Component: class {
      constructor(props) { this.props = props; }
      setState(update, callback) {
        const next = typeof update === 'function' ? update(this.state) : update;
        this.state = { ...this.state, ...next };
        if (callback) callback();
      }
    },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require(id) {
      if (id === 'react') return React;
      if (id.includes('reactRedux')) return { connect: () => Page => Page };
      if (id.includes('MainLayout')) return 'Layout';
      if (id.includes('Modal')) return { Modal: 'Modal' };
      if (id.includes('ui.js')) return {
        Select: 'Select',
        Input: Object.assign('Input', { TextArea: 'TextArea' }),
        Table: 'Table',
        Button: 'Button',
        Switch: 'Switch',
        LoadingContainer: 'LoadingContainer',
      };
      if (id.includes('Divider.js')) return { Divider: 'Divider' };
      if (id.includes('Icon.js')) return { Icon: 'Icon' };
      if (id.includes('NoticeDisplayColumns')) return {
        createReadonlyNoticeColumns: () => ({
          id: { key: 'id' }, title: { key: 'title' }, created_at: { key: 'created_at' },
        }),
      };
      if (/iconStyles|dateTime/.test(id)) return {};
      throw new Error(id);
    },
  });
  return {
    Page: module.exports.NoticePage,
    actions,
    dispatch: action => actions.push(JSON.parse(JSON.stringify(action))),
  };
}

function nodes(tree, predicate) {
  if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate), ...nodes(tree.props?.children, predicate)];
}

test('Notice page fetches, renders rows, opens editor, and preserves save fields', async () => {
  const runtime = await loadPage();
  const notices = [{ id: 1, title: 'Hello', content: 'Body', tags: ['news'], img_url: '/image.png', show: true }];
  const page = new runtime.Page({
    notice: { notices, fetchLoading: false },
    dispatch: runtime.dispatch,
  });
  page.componentDidMount();
  assert.deepEqual(runtime.actions, [{ type: 'notice/fetch' }]);
  const tree = page.render();
  const table = nodes(tree, node => node.type === 'Table')[0];
  assert.equal(table.props.dataSource, notices);
  const editLink = nodes(table.props.columns[4].render(null, notices[0], 0), node => node.type === 'a')[0];
  editLink.props.onClick();
  assert.equal(page.state.visible, true);
  assert.equal(page.state.submit.title, 'Hello');
  page.updateField('title', 'Updated');
  page.updateField('tags', null);
  page.save();
  assert.deepEqual(runtime.actions.at(-1), {
    type: 'notice/save',
    params: { ...notices[0], title: 'Updated', tags: null },
  });
});

test('Notice page dispatches show and drop actions and clears the editor on cancel', async () => {
  const runtime = await loadPage();
  const notices = [{ id: 9, title: 'Notice' }];
  const page = new runtime.Page({ notice: { notices, fetchLoading: true }, dispatch: runtime.dispatch });
  const tree = page.render();
  const table = nodes(tree, node => node.type === 'Table')[0];
  table.props.columns[1].render(true, notices[0]).props.onChange();
  table.props.columns[4].render(null, notices[0], 0).children[2].props.onClick();
  assert.deepEqual(runtime.actions, [
    { type: 'notice/show', id: 9 },
    { type: 'notice/drop', id: 9 },
  ]);
  page.state = { visible: true, submit: { id: 9 } };
  page.toggleModal();
  assert.equal(page.state.visible, false);
  assert.deepEqual(JSON.parse(JSON.stringify(page.state.submit)), {});
  assert.equal(nodes(tree, node => node.type === 'LoadingContainer')[0].props.loading, true);
});

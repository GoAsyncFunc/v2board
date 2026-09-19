import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadComponents() {
  const source = await fs.readFile(new URL('../src/components/MobileList.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const React = {
    Component: class { constructor(props) { this.props = props; } setState(update) { this.state = { ...this.state, ...update }; } },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    Children: { only: children => children },
    cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require(id) {
      if (id === 'react') return React;
      if (id === 'classnames') return (...values) => values.filter(Boolean).map(value => typeof value === 'object' ? Object.keys(value).filter(key => value[key]) : value).flat().join(' ');
      throw new Error(id);
    },
  });
  return module.exports;
}

test('MobileList renders header, body and footer through semantic class names', async () => {
  const { default: MobileList } = await loadComponents();
  const list = new MobileList({
    prefixCls: 'am-list',
    renderHeader: 'Header',
    renderFooter: () => 'Footer',
    children: 'Body',
    className: 'custom-list',
  });
  const tree = list.render();
  assert.equal(tree.type, 'div');
  assert.equal(tree.props.className, 'am-list custom-list');
  assert.deepEqual(tree.children.map(child => child.props.className), [
    'am-list-header', 'am-list-body', 'am-list-footer',
  ]);
});

test('MobileListItem builds content, extra, thumb and arrow classes', async () => {
  const { MobileListItem } = await loadComponents();
  const item = new MobileListItem({
    prefixCls: 'am-list',
    align: 'top',
    multipleLine: true,
    thumb: '/thumb.png',
    extra: 'Extra',
    arrow: 'horizontal',
    onClick() {},
    children: 'Title',
  });
  const wrapper = item.render();
  const row = wrapper.children[0];
  assert.equal(row.props.className, 'am-list-item am-list-item-top');
  assert.equal(row.children[0].props.className, 'am-list-thumb');
  assert.equal(row.children[1].props.className, 'am-list-line am-list-line-multiple');
  assert.equal(row.children[1].children[2].props.className, 'am-list-arrow am-list-arrow-horizontal');
  assert.equal(row.children[2].props.className, 'am-list-ripple');
});

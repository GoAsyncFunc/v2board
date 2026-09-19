import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadSortable() {
  const source = await fs.readFile(new URL('../src/components/Sortable.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const React = {
    Component: class {
      constructor(props) { this.props = props; this.state = {}; }
      setState(update) {
        const next = typeof update === 'function' ? update(this.state, this.props) : update;
        this.state = { ...this.state, ...next };
      }
    },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require: id => {
      if (id === 'react') return React;
      throw new Error(id);
    },
    Element: undefined,
    Node: class {},
    HTMLElement: class {},
    window: { clearInterval() {}, setInterval: () => 1 },
    document: { body: {} },
  });
  return module.exports;
}

test('Sortable emits changed indexes and clears native drag handlers', async () => {
  const { Sortable } = await loadSortable();
  const changes = [];
  const sortable = new Sortable({ onDragEnd: (from, to) => changes.push([from, to]) });
  const parent = { ondragenter: () => {}, ondragover: () => {} };
  const dragNode = {
    parentElement: parent,
    removeAttribute(name) { this.removed = name; },
    ondragstart: () => {},
    ondragend: () => {},
  };
  sortable.state = { fromIndex: 1, toIndex: 4 };
  sortable.getDragNode = () => dragNode;
  sortable.stopAutoScroll = () => {};
  sortable.hideDragLine = () => {};

  sortable.onDragEnd({ target: dragNode });

  assert.deepEqual(changes, [[1, 4]]);
  assert.equal(dragNode.removed, 'draggable');
  assert.equal(dragNode.ondragstart, null);
  assert.equal(dragNode.ondragend, null);
  assert.equal(parent.ondragenter, null);
  assert.equal(parent.ondragover, null);
  assert.deepEqual(sortable.state, { fromIndex: -1, toIndex: -1 });
});

test('Sortable removes its drag line and exposes the horizontal variant', async () => {
  const { Sortable, DragColumn } = await loadSortable();
  let removed;
  const parentNode = { removeChild: node => { removed = node; } };
  const dragLine = { parentNode };
  const sortable = new Sortable({});
  sortable.dragLine = dragLine;
  sortable.cacheDragTarget = {};
  sortable.componentWillUnmount();

  assert.equal(removed, dragLine);
  assert.equal(sortable.dragLine, null);
  assert.equal(sortable.cacheDragTarget, null);
  assert.equal(Sortable.DragColumn, DragColumn);
});

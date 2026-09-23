import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadSortableTable() {
    const source = await fs.readFile(
        new URL('../src/components/common/SortableTable.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const React = {
        cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    };
    const wrapSortable = (kind) => (Component) => {
        function WrappedSortable(props) {
            return { kind, Component, props };
        }
        WrappedSortable.sortableKind = kind;
        return WrappedSortable;
    };
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        require(id) {
            if (id === 'react') return React;
            if (id === 'antd/lib/icon') return 'Icon';
            if (id === 'react-sortable-hoc') {
                return {
                    SortableContainer: wrapSortable('container'),
                    SortableElement: wrapSortable('element'),
                    SortableHandle: wrapSortable('handle'),
                };
            }
            throw new Error(id);
        },
    });
    return module.exports;
}

test('SortableTable injects official sortable body components and maps row keys to indexes', async () => {
    const { SortableTable } = await loadSortableTable();
    const changes = [];
    const table = { type: 'Table', props: { components: { header: { cell: 'HeaderCell' } } } };
    const rendered = SortableTable({
        children: table,
        records: [
            { id: 10, name: 'first' },
            { id: 20, name: 'second' },
        ],
        getRowKey: (record) => record.id,
        onSortEnd: (fromIndex, toIndex) => changes.push([fromIndex, toIndex]),
    });

    assert.equal(rendered.props.components.header.cell, 'HeaderCell');
    const row = rendered.props.components.body.row({ 'data-row-key': '20' });
    assert.equal(row.type.sortableKind, 'element');
    assert.equal(row.props.index, 1);

    const body = rendered.props.components.body.wrapper({ className: 'ant-table-tbody' });
    assert.equal(body.type.sortableKind, 'container');
    assert.equal(body.props.useDragHandle, true);
    assert.equal(body.props.helperClass, 'sortable-table-row-dragging');
    body.props.onSortEnd({ oldIndex: 0, newIndex: 1 });
    body.props.onSortEnd({ oldIndex: 1, newIndex: 1 });
    assert.deepEqual(changes, [[0, 1]]);
});

test('SortableTable exports a dedicated drag handle backed by react-sortable-hoc', async () => {
    const { TableDragHandle } = await loadSortableTable();

    assert.equal(TableDragHandle.sortableKind, 'handle');
    const handle = TableDragHandle({ title: '拖动排序' });
    assert.equal(handle.props.title, '拖动排序');
});

test('the recovered custom sortable runtime is no longer part of Admin source', async () => {
    await assert.rejects(
        fs.access(new URL('../src/components/common/Sortable.tsx', import.meta.url)),
        { code: 'ENOENT' },
    );
});

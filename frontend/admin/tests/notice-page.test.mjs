import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    Component: class {
        constructor(props) {
            this.props = props;
        }
        setState(update, callback) {
            const next = typeof update === 'function' ? update(this.state, this.props) : update;
            this.state = { ...this.state, ...next };
            if (callback) callback();
        }
    },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};

const Select = Object.assign('Select', { Option: 'Select.Option' });
const Modal = Object.assign('Modal', { confirm: (options) => options });
const readonlyColumns = {
    id: { key: 'id' },
    title: { key: 'title' },
    created_at: { key: 'created_at' },
};

async function loadModule(relativePath, localModules = {}) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Component) => Component };
            if (id === './_Modal') return localModules.modal;
            if (id === './NoticeContentFields')
                return { NoticeContentFields: 'NoticeContentFields' };
            if (id === './NoticeMetadataFields')
                return { NoticeMetadataFields: 'NoticeMetadataFields' };
            if (id === './_List') return localModules.list;
            if (id === './columns') return localModules.columns;
            if (id.includes('MainLayout')) return 'Layout';
            if (id.includes('LoadingContainer')) return 'LoadingContainer';
            if (id === 'antd/lib/button') return 'Button';
            if (id === 'antd/lib/divider') return 'Divider';
            if (id === 'antd/lib/drawer') return 'Drawer';
            if (id === 'antd/lib/icon') return 'Icon';
            if (id === 'antd/lib/input') return Object.assign('Input', { TextArea: 'TextArea' });
            if (id === 'antd/lib/modal') return Modal;
            if (id === 'antd/lib/select') return Select;
            if (id === 'antd/lib/switch') return 'Switch';
            if (id === 'antd/lib/table') return 'Table';
            throw new Error(id);
        },
    });
    return module.exports;
}

async function loadPage() {
    return loadModule('../src/pages/notice/index.tsx', {
        modal: { __esModule: true, default: 'NoticeEditor', NoticeEditor: 'NoticeEditor' },
        list: { __esModule: true, default: 'NoticeList', NoticeList: 'NoticeList' },
    });
}

async function loadList() {
    return loadModule('../src/pages/notice/_List/index.tsx', {
        columns: { __esModule: true, createReadonlyNoticeColumns: () => readonlyColumns },
    });
}

async function loadEditor() {
    return loadModule('../src/pages/notice/_Modal/index.tsx');
}

function nodes(tree, predicate) {
    if (Array.isArray(tree)) return tree.flatMap((node) => nodes(node, predicate));
    if (!tree || typeof tree !== 'object') return [];
    return [
        ...(predicate(tree) ? [tree] : []),
        ...nodes(tree.children, predicate),
        ...nodes(tree.props?.children, predicate),
    ];
}

const normalize = (value) => JSON.parse(JSON.stringify(value));

test('Notice page composes the typed list and editor modules', async () => {
    const { NoticePage } = await loadPage();
    const actions = [];
    const notices = [{ id: 1, title: 'Hello' }];
    const page = new NoticePage({
        notice: { notices, fetchLoading: false, saveLoading: false },
        dispatch: (action) => actions.push(action),
    });

    page.componentDidMount();
    assert.deepEqual(normalize(actions), [{ type: 'notice/fetch' }]);
    const tree = page.render();
    const list = nodes(tree, (node) => node.type === 'NoticeList')[0];
    const editor = nodes(tree, (node) => node.type === 'NoticeEditor')[0];
    assert.equal(list.props.notices, notices);
    assert.equal(editor.props.visible, false);

    list.props.onEdit(notices[0]);
    assert.equal(page.state.editorVisible, true);
    assert.equal(page.state.editingNotice, notices[0]);
    page.closeEditor();
    assert.equal(page.state.editorVisible, false);
    assert.equal(page.state.editingNotice, undefined);
});

test('Notice list preserves show, edit, delete, and table presentation behavior', async () => {
    const { NoticeList } = await loadList();
    const actions = [];
    const edited = [];
    const notices = [{ id: 9, title: 'Notice', show: true }];
    const list = new NoticeList({
        notices,
        dispatch: (action) => actions.push(action),
        onEdit: (record) => edited.push(record),
    });

    const table = nodes(list.render(), (node) => node.type === 'Table')[0];
    table.props.columns[1].render(true, notices[0]).props.onChange();
    const actionCell = table.props.columns[4].render(null, notices[0]);
    const links = nodes(actionCell, (node) => node.type === 'a');
    links[0].props.onClick();
    links[1].props.onClick();
    const confirmation = Modal.confirm({
        onOk: () => list.drop(notices[0]),
    });
    confirmation.onOk();

    assert.deepEqual(normalize(actions), [
        { type: 'notice/show', id: 9 },
        { type: 'notice/drop', id: 9 },
    ]);
    assert.deepEqual(edited, [notices[0]]);
    assert.equal(table.props.dataSource, notices);
});

test('Notice editor preserves field updates, save payload, and close callback', async () => {
    const { NoticeEditor } = await loadEditor();
    const actions = [];
    let closed = 0;
    const editor = new NoticeEditor({
        dispatch: (action) => actions.push(action),
        notice: { notices: [], fetchLoading: false, saveLoading: false },
        record: { id: 3, title: 'Old', content: 'Body', tags: ['news'] },
        visible: true,
        onClose: () => {
            closed += 1;
        },
    });

    editor.updateField('title', 'Updated');
    editor.updateField('tags', null);
    editor.save();
    assert.equal(actions[0].type, 'notice/save');
    assert.deepEqual(normalize(actions[0].params), {
        id: 3,
        title: 'Updated',
        content: 'Body',
        tags: null,
    });
    actions[0].callback();
    assert.equal(closed, 1);
});

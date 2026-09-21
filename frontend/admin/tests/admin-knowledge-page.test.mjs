import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const successMessages = [];
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
    Fragment: 'Fragment',
    cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
};

const Select = Object.assign('Select', { Option: 'Select.Option' });
const Modal = Object.assign('Modal', { confirm: (options) => options });
const readonlyColumn = (key) => ({ title: key, dataIndex: key, key });

async function loadModule(relativePath, localComponents = {}) {
    const source = await fs.readFile(new URL(relativePath, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Component) => Component };
            if (id.endsWith('/_Drawer')) return localComponents.drawer;
            if (id.endsWith('/_List')) return localComponents.list;
            if (id === 'antd/lib/button') return 'Button';
            if (id === 'antd/lib/divider') return 'Divider';
            if (id === 'antd/lib/drawer') return 'Drawer';
            if (id === 'antd/lib/icon') return 'Icon';
            if (id === 'antd/lib/input') return 'Input';
            if (id === 'antd/lib/message')
                return { success: (value) => successMessages.push(value) };
            if (id === 'antd/lib/modal') return Modal;
            if (id === 'antd/lib/select') return Select;
            if (id === 'antd/lib/switch') return 'Switch';
            if (id === 'antd/lib/table') return 'Table';
            if (id === 'markdown-it')
                return class {
                    render(value) {
                        return `<p>${value}</p>`;
                    }
                };
            if (id === 'react-loadable') return () => 'MarkdownEditor';
            if (id.includes('KnowledgeDisplayColumns') || id === './columns') {
                return {
                    createReadonlyKnowledgeColumns: () =>
                        Object.fromEntries(
                            ['id', 'title', 'category', 'updated_at'].map((key) => [
                                key,
                                readonlyColumn(key),
                            ]),
                        ),
                };
            }
            if (id.includes('LoadingContainer')) return 'LoadingContainer';
            if (id.includes('Sortable')) return 'Sortable';
            if (id.includes('MainLayout')) return 'MainLayout';
            if (id.includes('adminSettings'))
                return { settings: { i18nText: { 'zh-CN': '简体中文', 'en-US': 'English' } } };
            if (id.includes('iconStyles')) return {};
            throw new Error(id);
        },
    });
    return module.exports;
}

async function loadPage() {
    return loadModule('../src/pages/knowledge/index.tsx', {
        drawer: { __esModule: true, default: 'KnowledgeEditor' },
        list: { __esModule: true, default: 'KnowledgeList', KnowledgeList: 'KnowledgeList' },
    });
}

async function loadEditor() {
    return loadModule('../src/pages/knowledge/_Drawer/index.tsx');
}

async function loadList() {
    return loadModule('../src/pages/knowledge/_List/index.tsx', {
        drawer: { __esModule: true, default: 'KnowledgeEditor' },
    });
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

test('KnowledgeEditor preserves fetch, form, save, and reset behavior', async () => {
    const { KnowledgeEditor } = await loadEditor();
    const actions = [];
    const editor = new KnowledgeEditor({
        id: 7,
        children: { type: 'a', props: {} },
        dispatch: (action) => actions.push(action),
        knowledge: {
            knowledges: [],
            fetchLoading: false,
            categorys: [],
            knowledge: { id: 7, title: 'Start', category: 'Guide' },
            fetchByIdLoading: false,
            saveLoading: false,
        },
    });

    const originalKey = editor.editorKey;
    editor.show();
    assert.equal(editor.state.visible, true);
    assert.notEqual(editor.editorKey, originalKey);
    assert.deepEqual(normalize(actions[0]), { type: 'knowledge/fetchById', id: 7 });

    editor.formChange('title', 'Updated');
    assert.deepEqual(normalize(actions[1]), {
        type: 'knowledge/setState',
        payload: { knowledge: { id: 7, title: 'Updated', category: 'Guide' } },
    });

    editor.save();
    assert.equal(actions[2].type, 'knowledge/save');
    actions[2].callback();
    assert.equal(successMessages.at(-1), '保存成功');

    editor.hide();
    assert.equal(editor.state.visible, false);
    assert.deepEqual(normalize(actions[3]), {
        type: 'knowledge/setState',
        payload: { knowledge: {} },
    });
});

test('KnowledgeList preserves visibility, delete, and sort actions', async () => {
    const { KnowledgeList } = await loadList();
    const actions = [];
    const records = [{ id: 9, title: 'Article', category: 'Help', show: true }];
    const page = new KnowledgeList({
        dispatch: (action) => actions.push(action),
        knowledge: {
            knowledges: records,
            fetchLoading: false,
            categorys: [],
            knowledge: {},
            fetchByIdLoading: false,
            saveLoading: false,
        },
    });

    const tree = page.render();
    const table = nodes(tree, (node) => node.type === 'Table')[0];
    const sortable = nodes(tree, (node) => node.type === 'Sortable')[0];
    assert.equal(table.props.dataSource, records);

    table.props.columns[2].render(true, records[0]).props.onChange();
    const actionCell = table.props.columns[6].render(null, records[0]);
    const deleteLink = nodes(
        actionCell,
        (node) => node.type === 'a' && node.children.includes('删除'),
    )[0];
    const confirmation = deleteLink.props.onClick();
    confirmation.onOk();
    sortable.props.onDragEnd(0, 3);

    assert.deepEqual(normalize(actions), [
        { type: 'knowledge/show', id: 9 },
        { type: 'knowledge/drop', id: 9 },
        { type: 'knowledge/sort', fromIndex: 0, toIndex: 3 },
    ]);
});

test('KnowledgePage composes the nested list and editor modules', async () => {
    const { KnowledgePage } = await loadPage();
    const actions = [];
    const page = new KnowledgePage({
        dispatch: (action) => actions.push(action),
        knowledge: {
            knowledges: [],
            fetchLoading: false,
            categorys: [],
            knowledge: {},
            fetchByIdLoading: false,
            saveLoading: false,
        },
    });

    page.componentDidMount();
    assert.deepEqual(
        actions.map((action) => action.type),
        ['knowledge/fetch', 'knowledge/getCategory'],
    );
    const tree = page.render();
    assert.equal(nodes(tree, (node) => node.type === 'KnowledgeEditor').length, 1);
    assert.equal(nodes(tree, (node) => node.type === 'KnowledgeList').length, 1);
});

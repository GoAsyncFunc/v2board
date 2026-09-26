import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const React = {
    createElement: (type, props, ...children) => ({
        type,
        props: props || {},
        children: children.flatMap((child) => (Array.isArray(child) ? child : [child])),
    }),
};
const Input = Object.assign(function Input() {}, { TextArea: function TextArea() {} });
const Select = Object.assign('Select', { Option: 'Select.Option' });
const Table = function Table() {};
const Radio = Object.assign('Radio', { Group: 'Radio.Group', Button: 'Radio.Button' });
const Divider = 'Divider';
const Icon = function Icon() {};
const Loadable = () => 'MarkdownEditor';
const MarkdownIt = class {
    constructor() {}
    render(text) {
        return `RENDERED(${text})`;
    }
};
const settings = {
    i18nText: { 'zh-CN': '简体中文', en: 'English' },
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
            if (id === 'markdown-it') return MarkdownIt;
            if (id === 'react-loadable') return Loadable;
            if (id === 'react-markdown-editor-lite') return 'MarkdownEditor';
            if (id.endsWith('/QueueWorkloadColumns'))
                return { createQueueWorkloadColumns: () => [] };
            if (id.endsWith('/FilterValueInput')) return function FilterValueInput() {};
            for (const [key, value] of Object.entries({
                'antd/lib/input': Input,
                'antd/lib/select': Select,
                'antd/lib/table': Table,
                'antd/lib/radio': Radio,
                'antd/lib/radio/interface': {},
                'antd/lib/divider': Divider,
                'antd/lib/icon': Icon,
            })) {
                if (id === key || id.endsWith(key)) return value;
            }
            if (id.endsWith('/adminSettings')) return { settings };
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

test('knowledge form binds title, category, sorted languages and the editor', async () => {
    const { default: KnowledgeForm } = await load(
        '../src/pages/knowledge/components/KnowledgeForm.tsx',
    );
    const changes = [];
    const tree = KnowledgeForm({
        article: { title: 'Guide', category: 'Basics', language: 2, body: 'hello' },
        editorKey: 3,
        onChange: (field, value) => changes.push([field, value]),
    });
    const inputs = findNodes(tree, Input);
    assert.deepEqual(
        inputs.map((input) => [input.props.id, input.props.value]),
        [
            ['knowledge-title', 'Guide'],
            ['knowledge-category', 'Basics'],
        ],
    );
    inputs[0].props.onChange({ target: { value: 'New title' } });
    inputs[1].props.onChange({ target: { value: 'Advanced' } });

    const select = findNodes(tree, Select)[0];
    assert.equal(select.props.value, '2');
    assert.deepEqual(
        select.children.map((option) => [option.props.value, option.children[0]]),
        [
            ['en', 'English'],
            ['zh-CN', '简体中文'],
        ],
    );
    select.props.onChange('1');

    const editor = findNodes(tree, 'MarkdownEditor')[0];
    assert.equal(editor.props.key, 3);
    assert.equal(editor.props.value, 'hello');
    editor.props.onChange({ text: 'updated', html: '<p>x</p>' });
    assert.deepEqual(plain(changes), [
        ['title', 'New title'],
        ['category', 'Advanced'],
        ['language', '1'],
        ['body', 'updated'],
    ]);
});

test('knowledge markdown editor forwards every prop to the markdown component', async () => {
    const { default: KnowledgeMarkdownEditor } = await load(
        '../src/pages/knowledge/components/KnowledgeMarkdownEditor.tsx',
    );
    const props = { value: 'body', renderHTML: () => '' };
    const tree = KnowledgeMarkdownEditor(props);
    assert.equal(tree.type, 'MarkdownEditor');
    assert.deepEqual(plain(tree.props), plain(props));
});

test('notice content fields bind the title and the twelve-row textarea', async () => {
    const { NoticeContentFields } = await load(
        '../src/pages/notice/components/NoticeContentFields.tsx',
    );
    const changes = [];
    const tree = NoticeContentFields({
        notice: { title: 'Maintenance', content: 'old' },
        onChange: (field, value) => changes.push([field, value]),
    });
    const [input, textarea] = [...findNodes(tree, Input), ...findNodes(tree, Input.TextArea)];
    assert.equal(input.props.value, 'Maintenance');
    assert.equal(textarea.props.rows, 12);
    assert.equal(textarea.props.value, 'old');
    input.props.onChange({ target: { value: 'New' } });
    textarea.props.onChange({ target: { value: 'new body' } });
    assert.deepEqual(plain(changes), [
        ['title', 'New'],
        ['content', 'new body'],
    ]);
});

test('notice metadata fields clear the tag list to null and bind the image url', async () => {
    const { NoticeMetadataFields } = await load(
        '../src/pages/notice/components/NoticeMetadataFields.tsx',
    );
    const changes = [];
    const tree = NoticeMetadataFields({
        notice: { tags: ['a', 'b'], img_url: 'https://x.com/a.png' },
        onChange: (field, value) => changes.push([field, value]),
    });
    const select = findNodes(tree, Select)[0];
    assert.deepEqual(select.props.value, ['a', 'b']);
    select.props.onChange([]);
    const input = findNodes(tree, Input)[0];
    input.props.onChange({ target: { value: 'https://x.com/b.png' } });
    assert.deepEqual(plain(changes), [
        ['tags', null],
        ['img_url', 'https://x.com/b.png'],
    ]);
});

test('queue overview renders counters and the running state icon', async () => {
    const { default: QueueOverview } = await load(
        '../src/pages/queue/components/QueueOverview.tsx',
    );
    const text = (tree) => JSON.stringify(plain(tree));
    const empty = QueueOverview({ queueStats: null });
    assert.match(text(empty), /"children":\["0"\]/, 'missing stats fall back to zero');
    assert.doesNotMatch(text(empty), /运行中/);

    const stopped = QueueOverview({ queueStats: { jobsPerMinute: 0, status: 0 } });
    assert.match(text(stopped), /未启动/);
    assert.match(text(stopped), /si-close text-danger/);

    const running = QueueOverview({
        queueStats: { jobsPerMinute: 7, recentJobs: 41, failedJobs: 2, status: 1 },
    });
    const rendered = text(running);
    assert.match(rendered, /"children":\[7\]/);
    assert.match(rendered, /"children":\[41\]/);
    assert.match(rendered, /"children":\[2\]/);
    assert.match(rendered, /运行中/);
    assert.match(rendered, /si-check text-success/);
});

test('queue workload table hides the default queue and reuses the shared columns', async () => {
    const { default: QueueWorkloadTable } = await load(
        '../src/pages/queue/components/QueueWorkloadTable.tsx',
    );
    const workload = [
        { name: 'default', jobs: 1 },
        { name: 'mail', jobs: 3 },
    ];
    const tree = QueueWorkloadTable({ workload });
    const table = findNodes(tree, Table)[0];
    assert.deepEqual(plain(table.props.dataSource), [{ name: 'mail', jobs: 3 }]);
    assert.equal(table.props.pagination, false);
    const empty = QueueWorkloadTable({ workload: null });
    assert.equal(findNodes(empty, Table)[0].props.dataSource, undefined);
});

test('ticket toolbar binds the status radio group and the email search input', async () => {
    const { default: TicketToolbar } = await load(
        '../src/pages/ticket/components/TicketToolbar.tsx',
    );
    const changes = [];
    const tree = TicketToolbar({
        filter: { status: 0, email: '' },
        onStatusChange: (status) => changes.push(['status', status]),
        onEmailSearch: (email) => changes.push(['email', email]),
    });
    const group = findNodes(tree, 'Radio.Group')[0];
    assert.equal(group.props.value, 0);
    assert.deepEqual(
        group.children.map((button) => [button.props.value, button.children[0]]),
        [
            [0, '已开启'],
            [1, '已关闭'],
        ],
    );
    group.props.onChange({ target: { value: 1 } });
    const input = findNodes(tree, Input)[0];
    input.props.onChange({ target: { value: 'user@x.com' } });
    assert.deepEqual(plain(changes), [
        ['status', 1],
        ['email', 'user@x.com'],
    ]);
});

test('filter condition wires the field, condition and delete controls', async () => {
    const { FilterCondition } = await load('../src/components/common/FilterCondition.tsx');
    const changes = [];
    const fields = [
        { key: 'email', title: '邮箱', condition: ['模糊', '='] },
        { key: 'id', title: 'ID', condition: ['='] },
    ];
    const tree = FilterCondition({
        filterItem: { key: 'email', condition: '模糊', value: 'a' },
        index: 1,
        fields,
        field: fields[0],
        onChange: (index, field, value) => changes.push([index, field, value]),
        onRemove: (index) => changes.push(['remove', index]),
    });
    const deleteIcon = findNodes(tree, Icon)[0];
    deleteIcon.props.onClick();
    assert.deepEqual(plain(changes).at(-1), ['remove', 1]);

    const selects = findNodes(tree, Select);
    assert.equal(selects[0].props.value, 'email');
    assert.deepEqual(
        selects[0].children.map((option) => [option.props.value, option.children[0]]),
        [
            ['email', '邮箱'],
            ['id', 'ID'],
        ],
    );
    assert.deepEqual(
        selects[1].children.map((option) => option.props.value),
        ['模糊', '='],
    );
    selects[0].props.onChange('id');
    selects[1].props.onChange('=');
    assert.deepEqual(plain(changes), [
        ['remove', 1],
        [1, 'key', 'id'],
        [1, 'condition', '='],
    ]);
});

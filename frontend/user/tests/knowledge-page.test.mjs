import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';
import MarkdownIt from 'markdown-it';

async function loadPage() {
    const source = await fs.readFile(
        new URL('../src/pages/support/Knowledge.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const actions = [],
        copied = [],
        notices = [],
        timers = new Map(),
        window = {};
    let nextTimer = 0;
    const React = {
        Fragment: 'Fragment',
        Component: class {
            constructor(props) {
                this.props = props;
            }
            setState(update) {
                this.state = { ...this.state, ...update };
            }
        },
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
        cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    };
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        window,
        setTimeout(callback, delay) {
            timers.set(++nextTimer, { callback, delay });
            return nextTimer;
        },
        clearTimeout(id) {
            timers.delete(id);
        },
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (component) => component };
            if (id.includes('/components/support/'))
                return {
                    __esModule: true,
                    default: id.split('/').at(-1),
                };
            if (id === 'antd/lib/input') return { Search: 'Search' };
            if (id === 'antd/lib/drawer') return 'Drawer';
            if (id === 'antd/lib/message') return { success: (value) => notices.push(value) };
            if (id === 'markdown-it') return MarkdownIt;
            if (id.includes('DateTimeDisplay')) return { formatDate: (value) => `date:${value}` };
            if (id.includes('MainLayout')) return 'Layout';
            if (id.includes('i18n'))
                return {
                    getLocale: () => 'zh-CN',
                    formatMessage: ({ id }, values) =>
                        values ? id.replace('{date}', values.date) : id,
                };
            if (id.includes('Icon.js') || id === 'antd/lib/icon')
                return { __esModule: true, default: 'Icon', Icon: 'Icon' };
            if (id.includes('siteHelpers'))
                return { copyToClipboard: (value) => copied.push(value) };
            if (id.includes('dateTime')) return {};
            throw new Error(id);
        },
    });
    return {
        ...module.exports,
        actions,
        copied,
        notices,
        timers,
        window,
        dispatch: (action) => actions.push(JSON.parse(JSON.stringify(action))),
    };
}

async function loadComponent(fileName) {
    const source = await fs.readFile(
        new URL(`../src/components/support/${fileName}.tsx`, import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const actions = [],
        copied = [],
        notices = [],
        window = {};
    const React = {
        Fragment: 'Fragment',
        Component: class {
            constructor(props) {
                this.props = props;
            }
            setState(update) {
                this.state = { ...this.state, ...update };
            }
        },
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
        cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    };
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        window,
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (component) => component };
            if (id === 'antd/lib/input') return { Search: 'Search' };
            if (id === 'antd/lib/drawer') return 'Drawer';
            if (id === 'antd/lib/message') return { success: (value) => notices.push(value) };
            if (id === 'markdown-it') return MarkdownIt;
            if (id.includes('DateTimeDisplay')) return { formatDate: (value) => `date:${value}` };
            if (id.includes('KnowledgeDetailDrawer'))
                return { __esModule: true, default: 'KnowledgeDetailDrawer' };
            if (id.includes('i18n'))
                return {
                    getLocale: () => 'zh-CN',
                    formatMessage: ({ id: messageId }, values) =>
                        values ? messageId.replace('{date}', values.date) : messageId,
                };
            if (id.includes('Icon.js') || id === 'antd/lib/icon')
                return { __esModule: true, default: 'Icon', Icon: 'Icon' };
            if (id.includes('siteHelpers'))
                return { copyToClipboard: (value) => copied.push(value) };
            throw new Error(`Unexpected knowledge component import: ${id}`);
        },
    });
    return {
        ...module.exports,
        actions,
        copied,
        notices,
        window,
        dispatch: (action) => actions.push(JSON.parse(JSON.stringify(action))),
    };
}

function nodes(tree, predicate) {
    if (Array.isArray(tree)) return tree.flatMap((node) => nodes(node, predicate));
    if (!tree || typeof tree !== 'object') return [];
    return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate)];
}

test('Knowledge list renders categories, dates, loading and query-driven details', async () => {
    const runtime = await loadPage();
    const props = {
        dispatch: runtime.dispatch,
        location: { query: { id: '2' } },
        knowledge: {
            fetchLoading: true,
            knowledges: {
                Guides: [
                    { id: 1, title: 'First', updated_at: 100 },
                    { id: 2, title: 'Second', updated_at: 200 },
                ],
                Empty: [],
            },
        },
    };
    const page = new runtime.KnowledgePage(props);
    page.componentDidMount();
    assert.deepEqual(runtime.actions, [{ type: 'knowledge/fetch', language: 'zh-CN' }]);
    assert.equal(nodes(page.render(), (node) => node.props.role === 'status').length, 1);
    props.knowledge.fetchLoading = false;
    const tree = page.render();
    const sections = nodes(
        tree,
        (node) => typeof node.type === 'string' && node.type.startsWith('Knowledge'),
    );
    assert.deepEqual(
        sections.map((section) => section.type),
        ['KnowledgeSearchBar', 'KnowledgeArticleList'],
    );
    assert.equal(sections[1].props.articlesByCategory, props.knowledge.knowledges);
    assert.equal(sections[1].props.queryId, '2');
});

test('Knowledge search debounces changes and clears the keyword for empty input', async () => {
    const runtime = await loadPage();
    const page = new runtime.KnowledgePage({
        dispatch: runtime.dispatch,
        knowledge: { knowledges: {}, fetchLoading: false },
        location: { query: {} },
    });
    page.componentDidMount();
    page.onSearch('old');
    page.onSearch('new');
    assert.equal(runtime.timers.size, 1);
    const timer = [...runtime.timers.values()][0];
    assert.equal(timer.delay, 300);
    timer.callback();
    assert.deepEqual(runtime.actions.at(-1), {
        type: 'knowledge/fetch',
        language: 'zh-CN',
        keyword: 'new',
    });
    runtime.timers.clear();
    page.onSearch('');
    [...runtime.timers.values()][0].callback();
    assert.deepEqual(runtime.actions.at(-1), { type: 'knowledge/fetch', language: 'zh-CN' });
});

test('Knowledge search component forwards keyword changes', async () => {
    const runtime = await loadComponent('KnowledgeSearchBar');
    const keywords = [];
    const tree = runtime.default({ onSearch: (keyword) => keywords.push(keyword) });
    const search = nodes(tree, (node) => node.type === 'Search')[0];
    search.props.onChange({ target: { value: 'guide' } });
    assert.deepEqual(keywords, ['guide']);
});

test('Knowledge article list preserves categories, dates and query-driven details', async () => {
    const runtime = await loadComponent('KnowledgeArticleList');
    const tree = runtime.default({
        articlesByCategory: {
            Guides: [
                { id: 1, title: 'First', updated_at: 100 },
                { id: 2, title: 'Second', updated_at: 200 },
            ],
            Empty: [],
        },
        queryId: '2',
    });
    const details = nodes(tree, (node) => node.type === 'KnowledgeDetailDrawer');
    assert.deepEqual(
        details.map((node) => [node.props.id, node.props.autoOpen]),
        [
            [1, false],
            [2, true],
        ],
    );
    assert.match(JSON.stringify(tree), /最后更新: date:200/);
    assert.equal(nodes(tree, (node) => node.type === 'h3').length, 2);
});

test('Knowledge detail renders Markdown and supports copy, jump and close cleanup', async () => {
    const runtime = await loadComponent('KnowledgeDetailDrawer');
    const props = {
        id: 2,
        autoOpen: true,
        dispatch: runtime.dispatch,
        children: { type: 'a', props: {} },
        knowledge: { knowledge: {}, fetchByIdLoading: true },
    };
    const detail = new runtime.KnowledgeDetailDrawer(props);
    detail.componentDidMount();
    assert.equal(detail.state.visible, true);
    assert.deepEqual(runtime.actions[0], { type: 'knowledge/fetchById', id: 2, language: 'zh-CN' });
    let modal = nodes(detail.render(), (node) => node.type === 'Drawer')[0];
    assert.equal(modal.props.title, 'Loading...');
    assert.equal(nodes(modal, (node) => node.type === 'Icon').length, 1);
    props.knowledge = {
        fetchByIdLoading: false,
        knowledge: { title: 'Guide', body: '**Bold**\n\n<b>HTML</b>' },
    };
    modal = nodes(detail.render(), (node) => node.type === 'Drawer')[0];
    assert.equal(modal.props.title, 'Guide');
    const body = nodes(modal, (node) => Boolean(node.props.dangerouslySetInnerHTML))[0];
    assert.match(body.props.dangerouslySetInnerHTML.__html, /<strong>Bold<\/strong>/);
    assert.match(body.props.dangerouslySetInnerHTML.__html, /<b>HTML<\/b>/);
    runtime.window.copy('example');
    assert.deepEqual(runtime.copied, ['example']);
    assert.deepEqual(runtime.notices, ['复制成功']);
    runtime.window.jump(3);
    assert.equal(runtime.actions.at(-1).id, 3);
    modal.props.onClose();
    assert.equal(detail.state.visible, false);
    assert.equal(runtime.window.copy, undefined);
    assert.equal(runtime.window.jump, undefined);
    assert.deepEqual(runtime.actions.at(-1), {
        type: 'knowledge/setState',
        payload: { knowledge: {} },
    });
});

test('Knowledge drawer waits for an article click when auto-open is disabled', async () => {
    const runtime = await loadComponent('KnowledgeDetailDrawer');
    const detail = new runtime.KnowledgeDetailDrawer({
        id: '12',
        autoOpen: false,
        dispatch: runtime.dispatch,
        children: { type: 'a', props: { title: 'Read guide' } },
        knowledge: { knowledge: {}, fetchByIdLoading: false },
    });
    detail.componentDidMount();
    assert.equal(detail.state.visible, false);
    assert.equal(runtime.actions.length, 0);
    const trigger = detail.render().children[0];
    assert.equal(trigger.props.title, 'Read guide');
    trigger.props.onClick();
    assert.equal(detail.state.visible, true);
    assert.deepEqual(runtime.actions, [
        { type: 'knowledge/fetchById', id: '12', language: 'zh-CN' },
    ]);
    const drawer = nodes(detail.render(), (node) => node.type === 'Drawer')[0];
    assert.equal(drawer.props.width, '80%');
    drawer.props.onClose();
    assert.equal(detail.state.visible, false);
});

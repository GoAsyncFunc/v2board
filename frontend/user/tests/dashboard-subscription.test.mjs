import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load(file, platform = {}) {
    const source = await fs.readFile(new URL(`../src/${file}.tsx`, import.meta.url), 'utf8');
    const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
    const actions = [],
        confirmations = [],
        routes = [],
        copied = [],
        messages = [];
    const React = {
        Fragment: 'Fragment',
        Component: class {
            constructor(props) {
                this.props = props;
            }
            setState(update) {
                this.state = {
                    ...this.state,
                    ...(typeof update === 'function' ? update(this.state) : update),
                };
            }
        },
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
        cloneElement: (child, props) => ({ ...child, props: { ...child.props, ...props } }),
    };
    const modal = Object.assign(function Modal() {}, {
        confirm: (options) => confirmations.push(options),
    });
    const module = { exports: {} };
    const window = {
        settings: { title: 'Test', assets_path: '/assets' },
        location: {},
        btoa: (value) => Buffer.from(value).toString('base64'),
    };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        window,
        require(id) {
            if (id === 'react') return React;
            if (id === 'react-redux') return { connect: () => (Component) => Component };
            if (id.includes('/Modal') || id === 'antd/lib/modal')
                return { __esModule: true, default: modal, Modal: modal };
            if (id === 'antd/lib/message')
                return { __esModule: true, default: { success: (value) => messages.push(value) } };
            if (id.includes('/ui.js'))
                return { Button: 'Button', Carousel: 'Carousel', Drawer: 'Drawer' };
            if (id === 'antd/lib/button') return { __esModule: true, default: 'Button' };
            if (id === 'antd/lib/carousel') return { __esModule: true, default: 'Carousel' };
            if (id === 'antd/lib/drawer') return { __esModule: true, default: 'Drawer' };
            if (id.includes('/LoadingContainer')) return 'Loading';
            if (id.includes('/Icon') || id === 'antd/lib/icon')
                return { __esModule: true, default: 'Icon', Icon: 'Icon' };
            if (id.includes('/components/dashboard/'))
                return { __esModule: true, default: id.split('/').at(-1) };
            if (id === './DashboardNoticeCard')
                return { __esModule: true, default: 'DashboardNoticeCard' };
            if (id.includes('/content.js')) return { QRCode: 'QRCode' };
            if (id === 'qrcode.react') return { __esModule: true, default: 'QRCode' };
            if (id.includes('SubscribeImporter')) return 'Importer';
            if (id.includes('MainLayout')) return 'Layout';
            if (id.includes('routerHistory')) return { push: (route) => routes.push(route) };
            if (id.includes('i18n')) return { formatMessage: ({ id }) => id };
            if (id.includes('subscribeStyles'))
                return { subscribeStyles: { item: 'item', oneClickSubscribe: 'subscribe' } };
            if (id.includes('styles/subscribeImporter'))
                return {
                    subscribeImporterStyles: { item: 'item', oneClickSubscribe: 'subscribe' },
                };
            if (id.includes('siteHelpers'))
                return {
                    copyToClipboard: (text) => copied.push(text),
                    isMobile: () => Boolean(platform.mobile),
                    isAppleMobile: () => Boolean(platform.apple),
                    isIPadDesktopMode: () => Boolean(platform.ipad),
                    isMac: () => Boolean(platform.mac),
                    isWindows: () => Boolean(platform.windows),
                    isAndroid: () => Boolean(platform.android),
                    isExpired: (expiry) => expiry === 1,
                    canRenew: (value) => Boolean(value.plan?.renew),
                    calculateUsage: (used, total) => (used / total) * 100,
                    formatBytes: (value) => String(value),
                };
            if (id.includes('DateTimeDisplay'))
                return { formatDate: String, formatDateDash: String, formatDaysRemaining: () => 5 };
            if (id.includes('SubscribeUsage'))
                return {
                    subscribePercent: () => 90,
                    hasSubscriptionUsage: (value) =>
                        ['u', 'd', 'transfer_enable'].every(
                            (field) => typeof value[field] === 'number',
                        ),
                    progressBarColor: () => 'warning',
                    formatDeviceLimit: String,
                };
            if (id.includes('iconStyles')) return {};
            throw Error(id);
        },
    });
    return {
        ...module.exports,
        actions,
        confirmations,
        routes,
        copied,
        messages,
        modal,
        window,
        dispatch: (action) => actions.push(action),
    };
}

function nodes(tree, predicate) {
    if (Array.isArray(tree)) return tree.flatMap((node) => nodes(node, predicate));
    if (!tree || typeof tree !== 'object') return [];
    return [...(predicate(tree) ? [tree] : []), ...nodes(tree.children, predicate)];
}

for (const [platform, expected] of [
    [{}, ['Hiddify', 'Sing-box']],
    [{ apple: true }, ['Hiddify', 'Sing-box', 'Shadowrocket', 'QuantumultX', 'Surge', 'Stash']],
    [{ ipad: true }, ['Hiddify', 'Sing-box', 'Shadowrocket', 'QuantumultX', 'Surge', 'Stash']],
    [{ mac: true }, ['Hiddify', 'Sing-box', 'ClashX']],
    [{ windows: true }, ['Hiddify', 'Sing-box', 'ClashMeta']],
    [
        { android: true },
        ['Hiddify', 'Sing-box', 'NekoBox For Android', 'ClashMeta For Android', 'Surfboard'],
    ],
])
    test(`Subscription importer platform ${JSON.stringify(platform)}`, async () => {
        const runtime = await load('components/subscription/SubscribeImporter', platform);
        const url = 'https://example.test/sub?token=test';
        const importer = new runtime.default({
            subscribeUrl: url,
            children: { type: 'button', props: {} },
        });
        const links = importer.getImportLinks();
        assert.deepEqual(
            Array.from(links, (link) => link.title),
            expected,
        );
        assert.equal(
            links[1].href,
            `sing-box://import-remote-profile?url=${encodeURIComponent(url)}#Test`,
        );
        const clash = links.find((link) => link.title === 'ClashMeta');
        if (clash)
            assert.equal(
                clash.href,
                `clash://install-config?url=${encodeURIComponent(url + '&flag=meta')}&name=Test`,
            );
        importer.props.subscribeUrl = undefined;
        assert.equal(
            importer.getImportLinks()[0].href,
            'hiddify://import/undefined&flag=sing#Test',
        );
    });

for (const mobile of [true, false])
    test(`Subscription copy, QR and close mobile=${mobile}`, async () => {
        const runtime = await load('components/subscription/SubscribeImporter', { mobile });
        const importer = new runtime.default({
            subscribeUrl: 'test-subscription',
            children: { type: 'button', props: {} },
        });
        importer.render().children[0].props.onClick();
        assert.equal(importer.state.showSubscribe, true);
        const box = importer.renderSubscribeBox();
        nodes(box, (node) =>
            node.props.className?.includes('subsrcibe-for-link'),
        )[0].props.onClick();
        assert.deepEqual(runtime.copied, ['test-subscription']);
        assert.deepEqual(runtime.messages, ['复制成功']);
        nodes(box, (node) =>
            node.props.className?.includes('subscribe-for-qrcode'),
        )[0].props.onClick();
        assert.equal(importer.state.showQrSubscribe, true);
        const qr = nodes(
            importer.render(),
            (node) => node.type === runtime.modal && node.props.zIndex === 2000,
        )[0];
        assert.equal(
            nodes(qr, (node) => node.type === 'QRCode')[0].props.value,
            'test-subscription',
        );
        qr.props.onCancel();
        assert.equal(importer.state.showQrSubscribe, false);
        const container = nodes(importer.render(), (node) =>
            mobile ? node.type === 'Drawer' : node.type === runtime.modal && !node.props.zIndex,
        )[0];
        (container.props.onClose || container.props.onCancel)();
        assert.equal(importer.state.showSubscribe, false);
    });

test('Dashboard startup, notices and reset actions preserve confirmation boundaries', async () => {
    const runtime = await load('pages/dashboard/Dashboard');
    const notice = { id: 1, title: 'Notice', content: 'Body', tags: ['弹窗'] };
    const page = new runtime.DashboardPage({
        dispatch: runtime.dispatch,
        notice: { notices: [notice] },
        order: { saveLoading: true },
        user: { subscribe: { plan_id: 7 }, stat: [] },
    });
    page.componentDidMount();
    assert.deepEqual(
        runtime.actions.map((action) => action.type),
        ['user/getSubscribe', 'user/getStat', 'notice/fetch', 'comm/config'],
    );
    runtime.actions[2].complete();
    assert.equal(page.state.notice, notice);
    assert.equal(page.state.visible, true);
    page.modalVisible();
    assert.equal(page.state.visible, false);
    page.resetPackage();
    assert.equal(runtime.actions.length, 4);
    assert.equal(runtime.confirmations[0].okButtonProps.disabled, true);
    runtime.confirmations[0].onOk();
    assert.deepEqual(JSON.parse(JSON.stringify(runtime.actions.at(-1))), {
        type: 'order/save',
        params: { period: 'reset_price', plan_id: 7 },
    });
    page.newPeriod();
    runtime.confirmations[1].onOk();
    assert.equal(runtime.actions.at(-1).type, 'user/newPeriod');
    runtime.actions.at(-1).complete();
    assert.deepEqual(runtime.messages, ['提前开启流量周期成功']);
});

test('Dashboard subscription loading, empty and active states retain their actions', async () => {
    const runtime = await load('components/dashboard/DashboardSubscription');
    const render = (subscribe, usagePercent) =>
        runtime.default({
            subscribe,
            usagePercent,
            onNavigate: (path) => runtime.routes.push(path),
            onNewPeriod() {},
            onResetPackage() {},
        });
    assert.equal(render({}, 0).type, 'Loading');
    nodes(render({ email: 'test@example.com' }, 0), (node) => node.type === 'a')[0].props.onClick();
    assert.deepEqual(runtime.routes, ['/plan']);
    const subscribe = {
        email: 'test@example.com',
        plan_id: 7,
        plan: { name: 'Plan', renew: 1, reset_price: 100 },
        expired_at: null,
        u: 9,
        d: 0,
        transfer_enable: 10,
    };
    const tree = render(subscribe, 90);
    assert.match(JSON.stringify(tree), /该订阅长期有效/);
    assert.equal(
        nodes(tree, (node) => node.props.role === 'progressbar')[0].props.style.width,
        '90%',
    );
    assert.equal(nodes(tree, (node) => node.type === 'Button').length, 1);
});

test('Dashboard notice, alert and shortcut components preserve user actions', async () => {
    const noticeRuntime = await load('components/dashboard/DashboardNoticeCard');
    const opened = [];
    const notice = { id: 1, title: 'Notice', created_at: 123, img_url: '/notice.png', tags: [] };
    const noticeTree = noticeRuntime.default({ notice, onOpen: (value) => opened.push(value) });
    assert.equal(noticeTree.props.style.backgroundImage, 'url(/notice.png)');
    noticeTree.props.onClick();
    assert.deepEqual(opened, [notice]);

    const alertRuntime = await load('components/dashboard/DashboardAlerts');
    const alertRoutes = [],
        resets = [];
    const alertTree = alertRuntime.default({
        stat: [1, 2],
        subscribe: { expired_at: null, plan: { reset_price: 100 } },
        usagePercent: 90,
        onNavigate: (path) => alertRoutes.push(path),
        onResetPackage: () => resets.push(true),
    });
    nodes(alertTree, (node) => node.type === 'a').forEach((link) => link.props.onClick());
    assert.deepEqual(alertRoutes, ['/order', '/ticket']);
    assert.deepEqual(resets, [true]);

    const shortcutRuntime = await load('components/dashboard/DashboardShortcuts');
    const shortcutRoutes = [];
    const shortcutTree = shortcutRuntime.default({
        subscribe: { plan_id: 7, plan: { renew: 1, show: 1 } },
        onNavigate: (path) => shortcutRoutes.push(path),
    });
    nodes(
        shortcutTree,
        (node) => node.props.className === 'v2board-shortcuts-item' && node.props.onClick,
    ).forEach((shortcut) => shortcut.props.onClick());
    assert.deepEqual(shortcutRoutes, ['/knowledge', '/plan/7', '/ticket']);
});

test('Dashboard notice section keeps single and multiple notice layouts', async () => {
    const runtime = await load('components/dashboard/DashboardNoticeSection');
    const notices = [
        { id: 1, title: 'First', created_at: 1, tags: [] },
        { id: 2, title: 'Second', created_at: 2, tags: [] },
    ];
    const single = runtime.default({ notices: [notices[0]], onOpen() {} });
    assert.equal(single.children[0].children[0].props.notice, notices[0]);
    const multiple = runtime.default({ notices, onOpen() {} });
    assert.equal(multiple.children[0].children[0].type, 'Carousel');
    const carousel = nodes(multiple, (node) => node.type === 'Carousel')[0];
    assert.equal(carousel.children[0].length, 2);
    assert.equal(runtime.default({ notices: [], onOpen() {} }), null);
});

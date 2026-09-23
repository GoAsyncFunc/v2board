import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

function createReact() {
    return {
        Component: class {
            constructor(props) {
                this.props = props;
                this.state = {};
            }
            setState(update) {
                const next = typeof update === 'function' ? update(this.state, this.props) : update;
                this.state = { ...this.state, ...next };
            }
            createElement(type, props, ...children) {
                return { type, props: props || {}, children };
            }
        },
        createElement(type, props, ...children) {
            return { type, props: props || {}, children };
        },
    };
}

async function loadRuntime({ useSsr }) {
    const source = await fs.readFile(
        new URL('../src/runtime/routeInitialProps.tsx', import.meta.url),
        'utf8',
    );
    const { code } = await transform(source, {
        format: 'cjs',
        loader: 'tsx',
        jsxFactory: 'React.createElement',
    });
    const React = createReact();
    const module = { exports: {} };
    vm.runInNewContext(code, {
        module,
        exports: module.exports,
        React,
        window: { g_useSSR: useSsr },
        require(id) {
            if (id === 'react') return React;
            throw new Error(id);
        },
    });
    return module.exports;
}

function routeProps(pathname, action) {
    return {
        history: { action },
        match: { params: { id: 'ticket-7' }, path: '/ticket/:id', url: '/ticket/ticket-7' },
        location: { pathname, search: '', hash: '', state: undefined },
    };
}

test('initial props defer SSR POP hydration and load after client navigation', async () => {
    const runtime = await loadRuntime({ useSsr: true });
    const contexts = [];
    function TicketPage() {}
    TicketPage.getInitialProps = async (context) => {
        contexts.push(context);
        return { ticketTitle: `loaded-${contexts.length}` };
    };

    const InitialPropsRoute = runtime.withInitialProps(
        TicketPage,
        { seed: 'ssr' },
        { store: 'store' },
    );
    const deferredRoute = new InitialPropsRoute(routeProps('/ticket/ticket-7', 'POP'));
    assert.equal(runtime.hasInitialPropsLoaded(), false);
    deferredRoute.componentDidMount();
    assert.equal(contexts.length, 0);

    deferredRoute.componentWillUnmount();
    assert.equal(runtime.hasInitialPropsLoaded(), true);

    const clientRoute = new InitialPropsRoute(routeProps('/ticket/ticket-7', 'PUSH'));
    clientRoute.componentDidMount();
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(contexts.length, 1);
    assert.deepEqual(JSON.parse(JSON.stringify(contexts[0])), {
        isServer: false,
        route: { params: { id: 'ticket-7' }, path: '/ticket/:id', url: '/ticket/ticket-7' },
        location: { pathname: '/ticket/ticket-7', search: '', hash: '' },
        prevInitialProps: { seed: 'ssr', fetchingProps: true },
        store: 'store',
    });
    assert.deepEqual(JSON.parse(JSON.stringify(clientRoute.state.extraProps)), {
        ticketTitle: 'loaded-1',
        fetchingProps: false,
    });

    const previousProps = clientRoute.props;
    clientRoute.props = routeProps('/ticket/ticket-8', 'PUSH');
    clientRoute.componentDidUpdate(previousProps);
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(contexts.length, 2);
});

test('initial props wrapper preserves an already wrapped route component', async () => {
    const runtime = await loadRuntime({ useSsr: false });
    function WrappedPage() {}
    WrappedPage.wrappedWithInitialProps = true;

    assert.equal(runtime.withInitialProps(WrappedPage, {}, {}), WrappedPage);
});

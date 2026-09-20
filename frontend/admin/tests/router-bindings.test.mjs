import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadRouterBindings() {
  const source = await fs.readFile(
    new URL('../src/runtime/routerBindings.tsx', import.meta.url),
    'utf8',
  );
  const code = (await transform(source, { format: 'cjs', loader: 'tsx' })).code;
  const module = { exports: {} };

  class Component {
    constructor(props) { this.props = props; }
  }
  const React = {
    Component,
    createElement(type, props, ...children) { return { type, props: props || {}, children }; },
  };
  const routerExports = {
    CALL_HISTORY_METHOD: '@@router/CALL_HISTORY_METHOD',
    LOCATION_CHANGE: '@@router/LOCATION_CHANGE',
    go() {},
    goBack() {},
    goForward() {},
    push() {},
    replace() {},
    routerActions: {},
    routerMiddleware() {},
  };

  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-router-dom') return { Router: 'Router' };
      if (id === 'react-router-redux') return routerExports;
      throw new Error(`Unexpected dependency ${id}`);
    },
  });
  return module.exports;
}

test('admin router bridge uses the same Router runtime and synchronizes history with Redux', async () => {
  const bindings = await loadRouterBindings();
  const dispatched = [];
  let historyListener;
  let stopped = false;
  const initialLocation = { pathname: '/login', search: '', hash: '' };
  const history = {
    location: initialLocation,
    action: 'POP',
    listen(listener) {
      historyListener = listener;
      listener(this.location, this.action);
      return () => { stopped = true; };
    },
  };
  const store = { dispatch: action => dispatched.push(action) };
  const router = new bindings.ConnectedRouter({ history, store, children: 'page' });

  const tree = router.render();
  assert.equal(tree.type, 'Router');
  assert.equal(tree.props.history, history);
  assert.deepEqual(tree.children, ['page']);

  router.componentDidMount();
  assert.deepEqual(JSON.parse(JSON.stringify(dispatched[0])), {
    type: '@@router/LOCATION_CHANGE',
    payload: { location: initialLocation, action: 'POP' },
  });

  const nextLocation = { pathname: '/dashboard', search: '', hash: '' };
  historyListener(nextLocation, 'PUSH');
  assert.deepEqual(JSON.parse(JSON.stringify(dispatched[1])), {
    type: '@@router/LOCATION_CHANGE',
    payload: { location: nextLocation, action: 'PUSH' },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(bindings.connectRouter()(undefined, dispatched[1]))), {
    location: nextLocation,
    action: 'PUSH',
  });

  router.componentWillUnmount();
  assert.equal(stopped, true);
});

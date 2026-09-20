import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadRouteRenderer(pluginCalls) {
  const source = await fs.readFile(
    new URL('../src/runtime/routeRenderer.tsx', import.meta.url),
    'utf8',
  );
  const code = (await transform(source, {
    format: 'cjs', loader: 'tsx', jsxFactory: 'React.createElement',
  })).code;
  const module = { exports: {} };
  const React = {
    createElement(type, props, ...children) { return { type, props: props || {}, children }; },
  };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-router-dom') return { Route: 'Route', Switch: 'Switch' };
      if (id === './pluginRuntime') {
        return {
          apply(key, options) {
            pluginCalls.push({ key, options });
            return { ...options.initialValue, injected: 'plugin-value' };
          },
        };
      }
      throw new Error(`Unexpected dependency ${id}`);
    },
  });
  return module.exports.default;
}

test('user route renderer builds the flat route switch and applies route props', async () => {
  const pluginCalls = [];
  const routeRenderer = await loadRouteRenderer(pluginCalls);
  const Dashboard = 'Dashboard';
  const routes = [{ path: '/dashboard', exact: true, component: Dashboard }];
  const tree = routeRenderer(routes, { store: 'user-store' });

  assert.equal(tree.type, 'Switch');
  const routeElement = tree.children[0][0];
  assert.equal(routeElement.type, 'Route');
  assert.equal(routeElement.props.path, '/dashboard');
  assert.equal(routeElement.props.exact, true);

  const location = { pathname: '/dashboard', search: '', hash: '', state: undefined };
  const rendered = routeElement.props.render({ history: {}, location, match: {}, staticContext: undefined });
  assert.equal(rendered.type, Dashboard);
  assert.equal(rendered.props.store, 'user-store');
  assert.equal(rendered.props.injected, 'plugin-value');
  assert.equal(rendered.props.route, routes[0]);
  assert.equal(pluginCalls[0].key, 'modifyRouteProps');
  assert.equal(pluginCalls[0].options.args.route, routes[0]);
});

test('user route renderer preserves null and empty route table behavior', async () => {
  const routeRenderer = await loadRouteRenderer([]);
  assert.equal(routeRenderer(null), null);
  const emptySwitch = routeRenderer([]);
  assert.equal(emptySwitch.type, 'Switch');
  assert.deepEqual(emptySwitch.children, [[]]);
});

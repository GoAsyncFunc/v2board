import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

test('admin Router accesses plugins only after bootstrap initializes them', async () => {
  const source = await fs.readFile(new URL('../src/app/Router.tsx', import.meta.url), 'utf8');
  const code = (await transform(source, {
    format: 'cjs',
    loader: 'tsx',
    jsxFactory: 'React.createElement',
  })).code;
  const module = { exports: {} };
  const pluginCalls = [];

  class Component {
    constructor(props) { this.props = props; }
  }
  const React = {
    Component,
    createElement(type, props, ...children) { return { type, props: props || {}, children }; },
  };
  const history = { location: {}, listen: () => () => {} };

  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    window: {},
    require(id) {
      if (id === 'react') return React;
      if (id.includes('pluginRuntime')) {
        return {
          applyForEach: key => pluginCalls.push(key),
        };
      }
      if (id.includes('routeRenderer')) return { __esModule: true, default() {} };
      if (id.includes('dvaApplication')) return { routerBindings: { ConnectedRouter: 'ConnectedRouter' } };
      if (id === './history') return { __esModule: true, default: history };
      if (id === '../routes/adminRoutes' || id === '@/routes/adminRoutes') return { __esModule: true, default: [] };
      throw new Error(`Unexpected dependency ${id}`);
    },
  });

  assert.deepEqual(pluginCalls, [], 'Module evaluation must not access uninitialized plugins');
  const router = new module.exports.default({ store: 'fixture-store' });
  assert.deepEqual(pluginCalls, ['patchRoutes', 'onRouteChange']);
  const tree = router.render();
  assert.equal(tree.props.store, 'fixture-store');
  router.componentWillUnmount();
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadRecaptcha() {
  const source = await fs.readFile(new URL('../src/components/Recaptcha.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const timers = [];
  const React = {
    Fragment: 'Fragment',
    Component: class {
      constructor(props) { this.props = props; }
      setState(update) { this.state = { ...this.state, ...update }; }
    },
    createRef: () => ({ current: null }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
  };
  const module = { exports: {} };
  const window = {};
  vm.runInNewContext(code, {
    module, exports: module.exports, window, document: {}, Error,
    setTimeout(callback, delay) { timers.push({ callback, delay }); },
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id.includes('Modal') || id === 'antd/lib/modal') return { __esModule: true, default: 'Modal' };
      throw new Error(id);
    },
  });
  return { Recaptcha: module.exports.Recaptcha, timers, window };
}

test('Recaptcha bypasses disabled verification and preserves delayed callback behavior', async () => {
  const { Recaptcha, timers } = await loadRecaptcha();
  const values = [];
  const child = { type: 'button', props: { type: 'submit' }, children: [] };
  const component = new Recaptcha({
    callback: value => values.push(value),
    children: child,
    guest: { commConfig: {} },
    visible: false,
  });
  component.show();
  assert.deepEqual(values, [undefined]);
  component.props.visible = true;
  component.show();
  assert.equal(component.state.visible, true);
  const tree = component.render();
  assert.equal(tree.children[0].props.onClick, component.show);
  component.handleChange('captcha-token');
  assert.equal(timers[0].delay, 500);
  timers[0].callback();
  assert.equal(component.state.visible, false);
  assert.deepEqual(values, [undefined, 'captcha-token']);
});

test('Recaptcha resets an existing widget during unmount', async () => {
  const { Recaptcha, window } = await loadRecaptcha();
  const resetIds = [];
  window.grecaptcha = { reset: id => resetIds.push(id) };
  const component = new Recaptcha({ children: { type: 'button', props: {} }, guest: { commConfig: {} } });
  component.widgetId = 7;
  component.componentWillUnmount();
  assert.deepEqual(resetIds, [7]);
});

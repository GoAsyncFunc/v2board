import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load({ ready = true, result = { token: { id: 'tok_test' } } } = {}) {
  const source = await fs.readFile(new URL('../src/components/commerce/checkout/StripePaymentForm.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const calls = [], tokens = [], card = {};
  const React = {
    Fragment: 'Fragment',
    Component: class { constructor(props) { this.props = props; } },
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require(id) {
    if (id === 'react') return React;
    if (id === '@stripe/react-stripe-js') return {
      CardElement: 'CardElement', Elements: 'Elements',
      useStripe: () => ready ? { createToken: async value => { tokens.push(value); return result; } } : null,
      useElements: () => ready ? { getElement: element => { assert.equal(element, 'CardElement'); return card; } } : null,
    };
    if (id === '@stripe/stripe-js') return { loadStripe: key => { calls.push(key); return Promise.resolve(null); } };
    throw Error(id);
  } });
  return { ...module.exports, card, calls, tokens };
}

test('Stripe form supplies the public key and callback to Elements', async () => {
  const runtime = await load();
  const callback = () => {};
  const tree = new runtime.default({ pk: 'pk_test', callback, children: 'Child' }).render();
  assert.deepEqual(runtime.calls, ['pk_test']);
  assert.equal(tree.type, 'Elements');
  assert.equal(tree.children[0].props.callback, callback);
  assert.equal(tree.children[0].children[0], 'Child');
});

test('Stripe input changes do not create tokens before SDK readiness', async () => {
  const runtime = await load({ ready: false });
  let callbacks = 0;
  const tree = runtime.StripeCardForm({ callback: () => callbacks++ });
  await tree.children[0].props.onChange();
  assert.equal(runtime.tokens.length, 0);
  assert.equal(callbacks, 0);
});

for (const failure of [false, true]) test(`Stripe token callback preserves SDK result failure=${failure}`, async () => {
  const result = failure ? { error: { message: 'Invalid card' } } : { token: { id: 'tok_test' } };
  const runtime = await load({ result });
  const callbacks = [];
  const tree = runtime.StripeCardForm({ callback: (...args) => callbacks.push(args) });
  await tree.children[0].props.onChange();
  assert.equal(runtime.tokens[0], runtime.card);
  assert.deepEqual(callbacks, failure ? [['Invalid card']] : [[null, result.token]]);
  const field = tree.children[0].type(tree.children[0].props);
  assert.equal(field.type, 'CardElement');
  assert.equal(field.props.options.style.base.fontSize, '16px');
});

test('Loading container preserves its indicator and historical prop forwarding', async () => {
  const source = await fs.readFile(new URL('../src/components/common/LoadingContainer.tsx', import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, require(id) {
    if (id === 'react') return {
      Component: class { constructor(props) { this.props = props; } },
      createElement: (type, props, ...children) => ({ type, props, children }),
    };
    if (id === 'antd/lib/spin') return 'Spin';
    throw Error(id);
  } });
  for (const loading of [undefined, false, true]) {
    const tree = new module.exports.default({ loading, children: 'Child', className: 'unused', size: 'sm' }).render();
    assert.equal(tree.type, 'Spin');
    assert.equal(tree.props.spinning, loading);
    assert.equal(tree.props.indicator.props.className, 'spinner-grow text-primary');
    assert.equal(tree.children[0], 'Child');
    assert.equal(tree.props.className, undefined);
    assert.equal(tree.props.size, undefined);
  }
});

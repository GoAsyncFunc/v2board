import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function load(original) {
  const module = { exports: {} };
  const file = new URL(original ? './fixtures/pages/user-money-display.cjs' : '../user/src/components/MoneyDisplay.jsx', import.meta.url);
  const text = await fs.readFile(file, 'utf8');
  vm.runInNewContext(original ? text : (await transform(text, { format: 'cjs', loader: 'jsx' })).code, { module, exports: module.exports });
  return original ? module.exports() : module.exports;
}

const values = [undefined, null, 0, 1, 100, 12345, 99, 101, -100, 1.5, '12345', '0', 'abc', '1e3', '', NaN, Infinity, -Infinity, Symbol('money')];
for (const value of values) test(`money display ${String(value)}`, async () => {
  const results = [];
  for (const original of [true, false]) {
    const money = await load(original);
    let balance, commission, price, error;
    try { balance = money.formatMoney ? money.formatMoney(value) : money.balance(value); } catch (e) { error = e.name; }
    try { commission = money.formatMoney ? money.formatMoney(value) : money.commission(value); } catch (e) { error = e.name; }
    try { price = money.formatPrice ? money.formatPrice(value) : money.price(value); } catch (e) { error = e.name; }
    results.push({ balance: typeof balance === 'symbol' ? String(balance) : balance, commission: typeof commission === 'symbol' ? String(commission) : commission, price: typeof price === 'symbol' ? String(price) : price, error });
  }
  assert.deepEqual(results[1], results[0]);
});

test('money display price matches order/plan expression', async () => {
  const fixture = await load(true);
  const current = await load(false);
  for (const value of [0, 100, 12345, 99, 101, -100, 1.5, '12345', null, undefined, 'abc', '', NaN, Infinity, '1e3']) {
    let expected, actual, expectedError, actualError;
    try { expected = fixture.price(value); } catch (e) { expectedError = e.name; }
    try { actual = current.formatPrice(value); } catch (e) { actualError = e.name; }
    assert.equal(actual, expected);
    assert.equal(actualError, expectedError);
  }
});

test('money display profile balance matches commission expression', async () => {
  const fixture = await load(true);
  const current = await load(false);
  for (const value of values) {
    let expected, actual, expectedError, actualError;
    try { expected = fixture.balance(value); } catch (e) { expectedError = e.name; }
    try { actual = current.formatMoney(value); } catch (e) { actualError = e.name; }
    assert.equal(actual, expected);
    assert.equal(actualError, expectedError);
  }
});
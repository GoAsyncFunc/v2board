import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = await fs.readFile(new URL('../src/utils/giftCard.ts', import.meta.url), 'utf8');
const { code } = await transform(source, { format: 'cjs', loader: 'ts' });
const module = { exports: {} };
vm.runInNewContext(code, { module, exports: module.exports });
const { describeGiftCardRedemption } = module.exports;

for (const [type, value, expected] of [
  [1, 1234, '账户余额 12.34'],
  [2, 30, '订阅时长 30 天'],
  [3, 50, '套餐流量 50 GB'],
  [4, undefined, '流量已重置'],
  [5, 365, '订阅套餐 365 天'],
  [99, 1, '未知类型'],
]) {
  test(`giftcard redemption type ${type} has a readable description`, () => {
    assert.equal(describeGiftCardRedemption({ type, value }), expected);
  });
}

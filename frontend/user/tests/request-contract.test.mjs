import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = await fs.readFile(new URL('../src/services/request.ts', import.meta.url), 'utf8');
const { code } = await transform(source, { format: 'cjs', loader: 'ts' });

function setup({ token = 'test-token', host, status = 200, body = { data: { id: 7 } } } = {}) {
  const requests = [], notices = [];
  const window = { settings: { title: 'Test', host }, location: { href: 'https://ui.test/path' } };
  const document = {};
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports, window, document, URL, require(id) {
    if (id.includes('dva')) return { fetchResponse: async (url, options) => {
      requests.push({ url, options });
      return { status, json: async () => body };
    } };
    if (id.includes('i18n')) return { getLocale: () => 'zh-CN', formatMessage: ({ id }) => id };
    if (id.includes('siteHelpers')) return { getToken: () => token, clearToken() {}, notify: (...args) => notices.push(args) };
    throw Error(id);
  } });
  return { ...module.exports, requests, notices, document };
}

test('Form encoding preserves nested arrays, null omission, inherited keys and value escaping', () => {
  const { encodeForm } = setup();
  const form = Object.assign(Object.create({ inherited: 'yes' }), {
    text: 'a & b', enabled: false, empty: '', nil: null, omitted: undefined,
    filter: { status: 0 }, values: [1, null, 'a+b'],
  });
  assert.equal(encodeForm(form), 'text=a%20%26%20b&enabled=false&empty=&filter[status]=0&values[0]=1&values[2]=a%2Bb&inherited=yes');
  for (const value of [undefined, null, '', 0, false, [1]]) assert.equal(encodeForm(value), '');
});

test('GET requests retain query joining, language, token and credentials', async () => {
  const runtime = setup();
  const result = await runtime.get('/user/fetch?existing=1', { keyword: 'a b' });
  assert.equal(runtime.requests[0].url, 'https://ui.test/api/v1/user/fetch?existing=1&keyword=a%20b');
  assert.equal(runtime.requests[0].options.headers.authorization, 'test-token');
  assert.equal(runtime.requests[0].options.headers['Content-Language'], 'zh-CN');
  assert.equal(runtime.requests[0].options.credentials, 'include');
  assert.equal(result.code, 200);
  assert.equal(result.data.id, 7);
  assert.equal(runtime.document.title, 'Test');
});

test('POST requests preserve form body and configured service host', async () => {
  const runtime = setup({ host: 'https://api.test', token: '' });
  await runtime.post('/user/update', { enabled: 1, name: 'test' });
  const { url, options } = runtime.requests[0];
  assert.equal(url, 'https://api.test/api/v1/user/update');
  assert.equal(options.method, 'POST');
  assert.equal(options.body, 'enabled=1&name=test');
  assert.equal(options.headers['Content-Type'], 'application/x-www-form-urlencoded');
  assert.equal(options.headers.authorization, undefined);
});

test('Absolute URLs retain the historical trailing query delimiter and mutable options', async () => {
  const runtime = setup();
  const options = { headers: { custom: 'value' } };
  await runtime.request('https://external.test/path', options);
  assert.equal(runtime.requests[0].url, 'https://external.test/path?');
  assert.equal(runtime.requests[0].options, options);
  assert.equal(options.headers.custom, 'value');
  assert.equal(options.headers.authorization, 'test-token');
  await runtime.request('https://external.test/path?a=1', null);
  assert.equal(runtime.requests[1].url, 'https://external.test/path?a=1&');
});

test('Successful response fields retain their original override order', async () => {
  const runtime = setup({ body: { code: 201, data: [], total: 12, extra: 'kept' } });
  const response = await runtime.get('/user/list');
  assert.equal(response.code, 201);
  assert.equal(response.total, 12);
  assert.equal(response.extra, 'kept');
});

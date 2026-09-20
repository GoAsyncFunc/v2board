import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

const source = await fs.readFile(new URL('../src/services/request.ts', import.meta.url), 'utf8');
const code = (await transform(source, { format: 'cjs', loader: 'ts' })).code;

function loadRequest({ response, token = null } = {}) {
  const calls = [];
  const notifications = [];
  const session = [];
  const location = { origin: 'https://admin.example.test', pathname: '/secure-admin', href: 'fixture' };
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    window: { location },
    require(id) {
      if (id.includes('config/siteSettings')) return { siteSettings: { serviceHost: 'https://service.example.test/api/v1' } };
      if (id.includes('utils/siteHelpers')) return {
        getToken: () => token,
        clearToken: () => session.push('clearToken'),
      };
      if (id === './fetchResponse') return {
        fetchResponse: async (url, options) => {
          calls.push({ url, options });
          return response;
        },
      };
      throw new Error(`Unexpected dependency ${id}`);
    },
  });
  module.exports.setRequestFailurePresenter(failure => notifications.push(failure));
  return { request: module.exports, calls, notifications, session, location };
}

function jsonResponse(status, payload, contentType = 'application/json') {
  return {
    status,
    headers: { get: name => name === 'content-type' ? contentType : null },
    json: async () => payload,
    arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer,
  };
}

test('admin request encodes nested form values with the recovered ordering and null behavior', () => {
  const runtime = loadRequest();
  assert.equal(runtime.request.encodeForm({
    email: 'fixture user@example.com',
    nested: { count: 2, empty: null, skipped: undefined },
    enabled: false,
  }), 'email=fixture%20user%40example.com&nested[count]=2&nested[empty]=&enabled=false');
  assert.equal(runtime.request.encodeForm(null), '');
});

test('admin request sends credentials and authorization for successful JSON responses', async () => {
  const runtime = loadRequest({
    token: 'fixture-token',
    response: jsonResponse(200, { data: { id: 7 }, total: 1 }),
  });
  const result = await runtime.request.get('/users', { page: 2 });
  assert.deepEqual(JSON.parse(JSON.stringify(result)), { code: 200, data: { id: 7 }, total: 1 });
  assert.equal(runtime.calls[0].url, 'https://service.example.test/api/v1/users?page=2');
  assert.equal(runtime.calls[0].options.credentials, 'include');
  assert.equal(runtime.calls[0].options.headers.authorization, 'fixture-token');
});

test('admin request preserves binary responses when content type is not exactly application/json', async () => {
  const runtime = loadRequest({ response: jsonResponse(200, {}, 'application/json; charset=utf-8') });
  const result = await runtime.request.get('/export');
  assert.equal(result.code, 200);
  assert.equal(result.buffer.byteLength, 3);
});

test('admin request clears the session and returns the server message on 403', async () => {
  const runtime = loadRequest({ response: jsonResponse(403, { message: 'Forbidden' }) });
  const result = await runtime.request.post('/restricted', { id: 1 });
  assert.deepEqual(JSON.parse(JSON.stringify(result)), { code: 403, msg: 'Forbidden' });
  assert.deepEqual(runtime.session, ['clearToken']);
  assert.equal(runtime.location.href, 'https://admin.example.test/secure-admin');
});

test('admin request reports the first validation error for non-200 responses', async () => {
  const runtime = loadRequest({ response: jsonResponse(422, { errors: { email: ['Invalid email'] } }) });
  const result = await runtime.request.post('/users', { email: 'invalid' });
  assert.deepEqual(JSON.parse(JSON.stringify(result)), { code: 422, msg: 'Invalid email' });
  assert.deepEqual(JSON.parse(JSON.stringify(runtime.notifications)), [{
    title: '请求失败',
    description: 'Invalid email',
    durationSeconds: 1.5,
  }]);
});

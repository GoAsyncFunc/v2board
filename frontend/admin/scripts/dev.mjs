import fs from 'node:fs/promises';
import { watch } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildApp } from './build.mjs';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = path.join(appRoot, 'dist');
const backend = process.env.API_PROXY ? new URL(process.env.API_PROXY) : null;
const port = Number(process.env.PORT || 3201);
let building = false;
let pending = false;
let timer;

if (backend && !['http:', 'https:'].includes(backend.protocol)) throw new Error('API_PROXY must use HTTP(S)');

async function rebuild() {
  if (building) {
    pending = true;
    return;
  }
  building = true;
  try {
    await buildApp();
    console.log('Ready. Refresh the browser to see changes.');
  } catch (error) {
    console.error(error);
  } finally {
    building = false;
    if (pending) {
      pending = false;
      void rebuild();
    }
  }
}

await buildApp();
for (const folder of ['src', 'public']) {
  watch(path.join(appRoot, folder), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 250);
  });
}

const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.woff': 'font/woff', '.woff2': 'font/woff2' };

http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname.startsWith('/api/')) {
      if (!backend) {
        response.writeHead(503, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Set API_PROXY to a test backend, then restart the dev server.' }));
        return;
      }
      const headers = new Headers();
      for (const name of ['content-type', 'authorization', 'cookie', 'accept', 'accept-language']) {
        if (request.headers[name]) headers.set(name, request.headers[name]);
      }
      const chunks = [];
      let bytes = 0;
      for await (const chunk of request) {
        bytes += chunk.length;
        if (bytes > 10 * 1024 * 1024) {
          response.writeHead(413);
          response.end();
          return;
        }
        chunks.push(chunk);
      }
      const upstream = await fetch(new URL(url.pathname + url.search, backend), {
        method: request.method,
        headers,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : Buffer.concat(chunks),
        redirect: 'manual',
        signal: AbortSignal.timeout(30000),
      });
      const responseHeaders = { 'Content-Type': upstream.headers.get('content-type') || 'application/json', 'Cache-Control': 'no-store' };
      const cookies = upstream.headers.getSetCookie();
      if (cookies.length) responseHeaders['Set-Cookie'] = cookies;
      if (upstream.headers.has('location')) responseHeaders.Location = upstream.headers.get('location');
      response.writeHead(upstream.status, responseHeaders);
      response.end(Buffer.from(await upstream.arrayBuffer()));
      return;
    }
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405);
      response.end();
      return;
    }
    const file = path.resolve(base, `.${decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)}`);
    if (!file.startsWith(`${base}${path.sep}`)) {
      response.writeHead(403);
      response.end();
      return;
    }
    const data = await fs.readFile(file);
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 502);
    response.end('Request failed');
  }
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port} - ${backend ? 'API proxy enabled' : 'no backend configured'}`));

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import http from 'node:http';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const out = path.join(root, 'recovered-ui/dist');
const targets = { user: 'public/theme/default/assets', admin: 'public/assets/admin' };
const bundles = new Set(['umi.js', 'components.async.js', 'vendors.async.js']);
async function files(dir, prefix = '') {
  const result = [];
  for (const entry of await fs.readdir(path.join(dir, prefix), { withFileTypes: true })) {
    const name = path.join(prefix, entry.name);
    if (entry.isDirectory()) result.push(...await files(dir, name));
    else if (entry.isFile()) result.push(name);
  }
  return result;
}
async function build() {
  const run = spawnSync(process.execPath, [path.join(root, 'tools/ui-recovery/recover.mjs'), 'build'], { stdio: 'inherit' });
  if (run.status !== 0) throw new Error('Module build failed');
  for (const [target, relative] of Object.entries(targets)) {
    const source = path.join(root, relative);
    const dest = path.join(out, target);
    const assets = path.join(dest, relative.replace(/^public\//, ''));
    await fs.mkdir(assets, { recursive: true });
    await fs.cp(source, assets, { recursive: true });
    for (const bundle of bundles) await fs.copyFile(path.join(dest, bundle), path.join(assets, bundle));
    // Preserve Laravel templates as well as a separate, configurable static preview entry.
    const blade = target === 'admin' ? 'resources/views/admin.blade.php' : 'public/theme/default/dashboard.blade.php';
    await fs.mkdir(path.dirname(path.join(out, 'laravel', blade)), { recursive: true });
    await fs.copyFile(path.join(root, blade), path.join(out, 'laravel', blade));
    const laravelAssets = path.join(out, 'laravel', relative);
    await fs.mkdir(path.dirname(laravelAssets), { recursive: true });
    await fs.cp(assets, laravelAssets, { recursive: true });
    if (target === 'user') await fs.copyFile(path.join(root, 'public/theme/default/config.json'), path.join(out, 'laravel/public/theme/default/config.json'));
    const settings = {
      title: 'V2Board', description: 'V2Board is best', host: '', version: 'recovered',
      theme: { sidebar: 'light', header: 'dark', color: 'default' },
      background_url: '', logo: '',
      ...(target === 'admin' ? { secure_path: 'admin' } : {
        assets_path: '/theme/default/assets', i18n: ['zh-CN', 'en-US', 'ja-JP', 'vi-VN', 'ko-KR', 'zh-TW', 'fa-IR']
      })
    };
    const settingsFile = path.join(dest, 'settings.js');
    try { await fs.access(settingsFile); } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      await fs.writeFile(settingsFile, `// Edit to match the original Laravel settings; preserved across builds.\nwindow.routerBase = '/';\nwindow.settings = ${JSON.stringify(settings, null, 2)};\n`);
    }
    const url = '/' + relative.replace(/^public\//, '');
    const languages = target === 'user' ? settings.i18n.map(lang => `<script src="${url}/i18n/${lang}.js"></script>`).join('\n') : '';
    const customCss = (await files(assets)).includes('custom.css') ? `<link rel="stylesheet" href="${url}/custom.css">` : '';
    const customJs = target === 'user' && (await files(assets)).includes('custom.js') ? `<script src="${url}/custom.js"></script>` : '';
    await fs.writeFile(path.join(dest, 'index.html'), `<!DOCTYPE html>
<html><head>
<link rel="stylesheet" href="${url}/components.chunk.css">
<link rel="stylesheet" href="${url}/umi.css">
${customCss}
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<title>V2Board</title>
<script src="/settings.js"></script>
<script>document.title=window.settings.title; if (${target === 'user'}) {var m=document.createElement('meta');m.name='theme-color';m.content=({darkblue:'#3b5998',black:'#343a40',default:'#0665d0',green:'#319795'})[window.settings.theme.color];document.head.appendChild(m);}</script>
${languages}
</head><body><div id="root"></div>
<script src="${url}/vendors.async.js"></script>
<script src="${url}/components.async.js"></script>
<script src="${url}/umi.js"></script>
${customJs}
</body></html>\n`);
    const inventory = [];
    for (const name of await files(source)) {
      const original = await fs.readFile(path.join(source, name));
      const restored = await fs.readFile(path.join(assets, name));
      const identical = original.equals(restored);
      if (!bundles.has(name) && !identical) throw new Error(`Asset mismatch: ${target}/${name}`);
      inventory.push({ file: name, identical, sha256: createHash('sha256').update(restored).digest('hex') });
    }
    await fs.writeFile(path.join(dest, 'asset-manifest.json'), JSON.stringify(inventory, null, 2));
    console.log(`${target}: ${inventory.length} assets packaged; ${inventory.filter(x => x.identical).length} byte-identical to original`);
  }
}
async function serve() {
  const target = process.argv[3] || 'user';
  if (!(target in targets)) throw new Error('Target must be user or admin');
  const base = path.join(out, target);
  await fs.access(path.join(base, 'index.html'));
  const port = Number(process.env.PORT || (target === 'user' ? 3100 : 3101));
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
  http.createServer(async (req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (pathname.startsWith('/api/')) { res.writeHead(503, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ message: 'Preview has no API. Configure settings.js host to a test backend with CORS enabled.' })); return; }
      const file = path.resolve(base, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!file.startsWith(base + path.sep)) { res.writeHead(403); res.end(); return; }
      const data = await fs.readFile(file);
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(req.method === 'HEAD' ? undefined : data);
    } catch (error) { res.writeHead(error.code === 'ENOENT' ? 404 : 400); res.end('Not available'); }
  }).listen(port, '127.0.0.1', () => console.log(`${target}: http://127.0.0.1:${port} (local preview only)`));
}
try {
  if (process.argv[2] === 'build') await build();
  else if (process.argv[2] === 'serve') await serve();
  else throw new Error('Usage: node site.mjs build|serve [user|admin]');
} catch (error) { console.error(error.message); process.exitCode = 1; }

// Readonly column/table comparison; no write menus or backend requests.
import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const js = (
    await build({
        absWorkingDir: home,
        stdin: {
            resolveDir: home,
            loader: 'jsx',
            contents: `import React from 'react';import ReactDOM from 'react-dom';import original from './tests/fixtures/pages/user-ticket-display.cjs';import {createTicketColumns} from './src/components/support/TicketColumns.tsx';import Table from 'antd/lib/table';import Badge from 'antd/lib/badge';import moment from 'moment';import {formatMessage} from './src/locales/i18n';const levels=[formatMessage({id:'低'}),formatMessage({id:'中'}),formatMessage({id:'高'})];const deps={createElement:React.createElement,Badge,formatMessage,moment,levels};const q=new URL(location.href).searchParams;const columns=q.get('mode')==='original'?original(deps):Object.values(createTicketColumns(levels));const rows=q.get('state')==='empty'?[]:[0,1,2,3,4].map(i=>({key:i,id:i+1,subject:i===0?'Long fixture subject '.repeat(10):'Fixture Ticket '+i,level:i%3,reply_status:i%2,status:i%3===0?1:0,created_at:1700000000,updated_at:1700000100}));ReactDOM.render(<Table columns={columns} dataSource={rows} loading={q.get('state')==='loading'} pagination={false} scroll={{x:900}}/>,document.getElementById('root'));window.ready=true;`,
        },
        bundle: true,
        loader: { '.js': 'jsx' },
        write: false,
        format: 'iife',
        define: { 'process.env.NODE_ENV': '"production"' },
    })
).outputFiles[0].text;
const out = path.join(home, 'test-results/user-ticket-display');
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const report = [];
try {
    for (const width of [1440, 390])
        for (const state of ['rows', 'empty', 'loading']) {
            const shots = [];
            for (const mode of ['original', 'source']) {
                const context = await browser.newContext({
                    viewport: { width, height: 900 },
                    locale: 'zh-CN',
                    timezoneId: 'UTC',
                    serviceWorkers: 'block',
                });
                const page = await context.newPage();
                const errors = [];
                page.on('pageerror', (e) => errors.push(e.message));
                await page.route('**/*', async (route) => {
                    const u = new URL(route.request().url());
                    if (u.origin !== 'http://ui.test') {
                        errors.push('External request');
                        return route.abort();
                    }
                    if (u.pathname === '/')
                        return route.fulfill({
                            contentType: 'text/html',
                            body: '<meta charset="utf-8"><link rel="stylesheet" href="/theme/default/assets/components.chunk.css"><link rel="stylesheet" href="/theme/default/assets/umi.css"><script>window.settings={};</script><div id="root"></div><script src="/test.js"></script>',
                        });
                    if (u.pathname === '/test.js')
                        return route.fulfill({ contentType: 'application/javascript', body: js });
                    const p = path.resolve(home, 'public', '.' + u.pathname);
                    if (!p.startsWith(path.join(home, 'public') + path.sep)) return route.abort();
                    try {
                        return await route.fulfill({ path: p });
                    } catch {
                        return route.fulfill({ status: 404, body: '' });
                    }
                });
                await page.goto(`http://ui.test/?mode=${mode}&state=${state}`);
                await page.waitForFunction(() => window.ready);
                await page.evaluate(() => document.fonts.ready);
                await page.addStyleTag({
                    content:
                        '*,*::before,*::after{animation:none!important;transition:none!important}',
                });
                await page.waitForTimeout(200);
                shots.push(
                    await page.screenshot({
                        path: path.join(out, `${width}-${state}-${mode}.png`),
                        fullPage: true,
                    }),
                );
                if (state === 'rows' && width === 390) {
                    const scrolled = await page.locator('.ant-table-body').evaluate((el) => {
                        el.scrollLeft = 200;
                        return el.scrollWidth > el.clientWidth && el.scrollLeft > 0;
                    });
                    if (!scrolled) throw Error('Horizontal scroll missing');
                }
                if (errors.length) throw Error(errors.join(';'));
                await context.close();
            }
            const a = PNG.sync.read(shots[0]),
                b = PNG.sync.read(shots[1]);
            if (a.width !== b.width || a.height !== b.height) throw Error('Dimensions differ');
            let pixels = 0;
            for (let i = 0; i < a.data.length; i += 4)
                if (!a.data.subarray(i, i + 4).equals(b.data.subarray(i, i + 4))) pixels++;
            report.push({ width, state, pixels });
            console.log(width, state, pixels);
        }
    await fs.writeFile(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
    if (report.some((x) => x.pixels > 10)) throw Error('Visual mismatch');
} finally {
    await browser.close();
}

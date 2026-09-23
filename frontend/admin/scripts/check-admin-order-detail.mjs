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
            contents: `import React from 'react';import ReactDOM from 'react-dom';import original from './tests/fixtures/pages/admin-order-detail-body.cjs';import Body from './src/pages/order/components/OrderDetailBody.tsx';import Row from 'antd/lib/row';import Col from 'antd/lib/col';import {settings} from './src/config/adminSettings.ts';import moment from 'moment';import Divider from 'antd/lib/divider';import Tooltip from 'antd/lib/tooltip';import Icon from 'antd/lib/icon';const q=new URL(location.href).searchParams;const data={user:q.get('state')==='loading'?{}:{email:'fixture@example.com'},order:q.get('state')==='empty'?{}:{trade_no:'TEST',period:'month_price',status:3,plan_id:1,total_amount:12345,balance_amount:0,discount_amount:100,refund_amount:0,surplus_amount:0,created_at:1700000000,updated_at:1700000100,invite_user_id:2,commission_balance:123,actual_commission_balance:100,commission_status:2},inviteUser:{email:'invite@example.com'},plans:[{id:1,name:'Fixture plan'}],onUserFilter:(...args)=>window.actions.push(args)};window.actions=[];const body=q.get('mode')==='original'?original.call({state:{order:data.order,user:data.user,invite_user:data.inviteUser},props:{plan:{plans:data.plans}},jumpUserFilter:data.onUserFilter},{a:React},{a:Row},{a:Col},{a:settings},()=>moment,{a:Divider},{a:Tooltip},{a:Icon}):<Body {...data}/>;ReactDOM.render(<div style={{maxWidth:520,padding:24}}><h3>订单信息</h3>{body}</div>,document.getElementById('root'));window.ready=true;`,
        },
        bundle: true,
        loader: { '.cjs': 'jsx', '.js': 'jsx', '.tsx': 'tsx' },
        write: false,
        format: 'iife',
        define: { 'process.env.NODE_ENV': '"production"' },
    })
).outputFiles[0].text;
const out = path.join(home, 'test-results/admin-order-detail');
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
                    timezoneId: 'UTC',
                    serviceWorkers: 'block',
                });
                const page = await context.newPage();
                const errors = [];
                page.on('pageerror', (e) => {
                    errors.push(e.message);
                    console.error(e.message);
                });
                await page.route('**/*', async (route) => {
                    const u = new URL(route.request().url());
                    if (u.origin !== 'http://ui.test') {
                        errors.push('External request');
                        return route.abort();
                    }
                    if (u.pathname === '/')
                        return route.fulfill({
                            contentType: 'text/html',
                            body: '<meta charset="utf-8"><link rel="stylesheet" href="/assets/admin/components.chunk.css"><link rel="stylesheet" href="/assets/admin/umi.css"><script>window.settings={};</script><div id="root"></div><script src="/test.js"></script>',
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
                if (state === 'rows') {
                    await page.getByText('fixture@example.com', { exact: true }).click();
                    if (
                        !(await page.evaluate(() =>
                            window.actions.some(
                                (a) => a[0] === 'email' && a[2] === 'fixture@example.com',
                            ),
                        ))
                    )
                        throw Error('Callback mismatch');
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

// Compare the original ticket timestamp renderer with the restored formatter.
import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const home = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = `
import React from 'react';
import ReactDOM from 'react-dom';
import original from './tests/fixtures/pages/admin-datetime-display.cjs';
import { formatDateTime } from './src/utils/dateTime.ts';
import moment from 'moment';

const query = new URL(location.href).searchParams;
const fixture = original(moment);
const timestamps = query.get('state') === 'edge'
    ? [0, -1, null, undefined]
    : [1700000000, 1712345678, 946684800, 2147483647];
const render = query.get('mode') === 'original'
    ? value => fixture.my({ created_at: value })
    : formatDateTime;

ReactDOM.render(
    <div style={{ fontFamily: 'sans-serif', fontSize: 28, margin: 24 }}>
        {timestamps.map((value, index) => <p key={index} style={{ margin: 0 }}>{render(value)}</p>)}
    </div>,
    document.getElementById('root'),
);
window.ready = true;
`;
const { outputFiles } = await build({
    absWorkingDir: home,
    stdin: { resolveDir: home, loader: 'jsx', contents: source },
    bundle: true,
    loader: { '.js': 'jsx', '.ts': 'ts' },
    write: false,
    format: 'iife',
    define: { 'process.env.NODE_ENV': '"production"' },
});
const bundle = outputFiles[0].text;
const outputDirectory = path.join(home, 'test-results/admin-datetime-display');
await fs.mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const report = [];
try {
    for (const width of [1440, 390]) {
        for (const state of ['rows', 'edge']) {
            const screenshots = [];
            for (const mode of ['original', 'source']) {
                const context = await browser.newContext({
                    viewport: { width, height: 300 },
                    locale: 'zh-CN',
                    timezoneId: 'UTC',
                    serviceWorkers: 'block',
                });
                try {
                    const page = await context.newPage();
                    const errors = [];
                    page.on('pageerror', error => errors.push(error.message));
                    await page.route('**/*', async route => {
                        const url = new URL(route.request().url());
                        if (url.origin !== 'http://ui.test') {
                            errors.push('External request');
                            return route.abort();
                        }
                        if (url.pathname === '/') {
                            return route.fulfill({
                                contentType: 'text/html',
                                body: '<meta charset="utf-8"><div id="root"></div><script src="/test.js"></script>',
                            });
                        }
                        if (url.pathname === '/test.js') {
                            return route.fulfill({ contentType: 'application/javascript', body: bundle });
                        }
                        return route.abort();
                    });
                    await page.goto(`http://ui.test/?mode=${mode}&state=${state}`);
                    await page.waitForFunction(() => window.ready);
                    await page.waitForTimeout(200);
                    screenshots.push(await page.screenshot({
                        path: path.join(outputDirectory, `${width}-${state}-${mode}.png`),
                        fullPage: true,
                    }));
                    if (errors.length) throw new Error(errors.join('; '));
                } finally {
                    await context.close();
                }
            }

            const [original, restored] = screenshots.map(image => PNG.sync.read(image));
            if (original.width !== restored.width || original.height !== restored.height) {
                throw new Error('Screenshot dimensions differ');
            }
            let differingPixels = 0;
            for (let index = 0; index < original.data.length; index += 4) {
                if (!original.data.subarray(index, index + 4).equals(restored.data.subarray(index, index + 4))) {
                    differingPixels += 1;
                }
            }
            report.push({ width, state, differingPixels });
            console.log(width, state, differingPixels);
        }
    }

    await fs.writeFile(path.join(outputDirectory, 'report.json'), JSON.stringify(report, null, 2));
    if (report.some(result => result.differingPixels > 10)) {
        throw new Error('Visual mismatch');
    }
} finally {
    await browser.close();
}

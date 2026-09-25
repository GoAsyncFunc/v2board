import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const baseUrl = process.env.TEST_BASE || 'http://5.104.86.24:7003';
const buildPrefix = process.env.BUILD_PREFIX || '/user-build';
const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;
const outputDirectory = path.resolve('test-results');
const routes = [
    '/dashboard',
    '/plan',
    '/order',
    '/profile',
    '/ticket',
    '/traffic',
    '/invite',
    '/node',
    '/knowledge',
];
const origin = new URL(baseUrl).origin;

function collectResponseFailures(page, failures) {
    page.on('response', (response) => {
        if (!response.url().startsWith(origin)) return;
        const { pathname } = new URL(response.url());
        const status = response.status();
        if (pathname.startsWith(buildPrefix) && status >= 400) {
            failures.push(`static asset ${pathname} responded ${status}`);
        }
        if (pathname.startsWith('/api/') && status >= 500) {
            failures.push(`api ${pathname} responded ${status}`);
        }
    });
}

const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' });
try {
    // Permission control: an unauthenticated visitor must not reach the dashboard.
    // The user client answers a rejected request by clearing the token and
    // reloading onto the home route, which redirects to the login page.
    const anonymousContext = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        locale: 'zh-CN',
    });
    const anonymousPage = await anonymousContext.newPage();
    await anonymousPage.goto(`${baseUrl}/#/dashboard`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    });
    await anonymousPage.waitForURL((url) => url.hash.includes('/login'), { timeout: 60000 });
    await anonymousPage.locator('input[type="password"]').waitFor({ timeout: 30000 });
    console.log('user: unauthenticated dashboard access falls back to the login page');
    await anonymousContext.close();

    const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        locale: 'zh-CN',
    });
    const page = await context.newPage();
    const errors = [];
    const responseFailures = [];
    page.on('pageerror', (error) => errors.push(error.message));
    collectResponseFailures(page, responseFailures);

    await page.goto(`${baseUrl}/#/login`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.locator('input[type="password"]').waitFor();
    console.log('user: deployed login rendered');

    if (email && password) {
        await page.locator('input[type="text"]').first().fill(email);
        await page.locator('input[type="password"]').fill(password);
        await page.locator('button[type="submit"]').click();
        await page.waitForURL((url) => url.hash.includes('dashboard'), { timeout: 30000 });

        for (const route of routes) {
            await page.goto(`${baseUrl}/#${route}`, { waitUntil: 'networkidle', timeout: 60000 });
            const text = await page.locator('#root').innerText();
            if (text.length < 30 || page.url().includes('#/login')) {
                throw new Error(
                    `user ${route}: unexpected page content (${text.length} characters)`,
                );
            }
            console.log(`user ${route}: rendered ${text.length} text characters`);
        }

        // Main edit page: the new-ticket modal must open from the ticket list.
        await page.goto(`${baseUrl}/#/ticket`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.getByRole('button', { name: '新的工单' }).click();
        await page.locator('.ant-modal-title', { hasText: '新的工单' }).waitFor({ timeout: 30000 });
        await page.locator('.ant-modal-close').last().click();
        await page
            .locator('.ant-modal-title', { hasText: '新的工单' })
            .waitFor({ state: 'hidden', timeout: 30000 });
        console.log('user: new-ticket modal opens and closes');
    }

    if (responseFailures.length) {
        throw new Error(`Failed same-origin responses: ${responseFailures.join('; ')}`);
    }
    if (errors.length) throw new Error(`Uncaught browser errors: ${errors.join('; ')}`);
    await fs.mkdir(outputDirectory, { recursive: true });
    await page.screenshot({
        path: path.join(outputDirectory, 'deployed-user.png'),
        fullPage: true,
    });
    await context.close();
} finally {
    await browser.close();
}

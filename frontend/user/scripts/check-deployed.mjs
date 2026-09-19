import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const baseUrl = process.env.TEST_BASE || 'http://5.104.86.24:7003';
const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;
const outputDirectory = path.resolve('test-results');
const routes = ['/dashboard', '/plan', '/order', '/profile', '/ticket'];

const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, locale: 'zh-CN' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  await page.goto(`${baseUrl}/#/login`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.locator('input[type="password"]').waitFor();
  console.log('user: deployed login rendered');

  if (email && password) {
    await page.locator('input[type="text"]').first().fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.locator('button[type="submit"]').click();
    await page.waitForURL(url => url.hash.includes('dashboard'), { timeout: 30000 });

    for (const route of routes) {
      await page.goto(`${baseUrl}/#${route}`, { waitUntil: 'networkidle', timeout: 60000 });
      const text = await page.locator('#root').innerText();
      if (text.length < 30 || page.url().includes('#/login')) {
        throw new Error(`user ${route}: unexpected page content (${text.length} characters)`);
      }
      console.log(`user ${route}: rendered ${text.length} text characters`);
    }
  }

  if (errors.length) throw new Error(`Uncaught browser errors: ${errors.join('; ')}`);
  await fs.mkdir(outputDirectory, { recursive: true });
  await page.screenshot({ path: path.join(outputDirectory, 'deployed-user.png'), fullPage: true });
} finally {
  await browser.close();
}

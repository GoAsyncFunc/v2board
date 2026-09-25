import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const requestedNames = process.argv.slice(2).filter((argument) => !argument.startsWith('--'));
const configuredConcurrency = Number.parseInt(process.env.VISUAL_CHECK_CONCURRENCY ?? '3', 10);
const concurrency =
    Number.isFinite(configuredConcurrency) && configuredConcurrency > 0 ? configuredConcurrency : 3;

const availableScripts = (await readdir(scriptsDirectory))
    .filter((name) => /^check-user-.+\.mjs$/.test(name))
    .sort();
const selectedScripts = requestedNames.length
    ? requestedNames.map((name) => (name.endsWith('.mjs') ? name : `check-user-${name}.mjs`))
    : availableScripts;
const unknownScripts = selectedScripts.filter((name) => !availableScripts.includes(name));
if (unknownScripts.length) {
    throw new Error(`Unknown User visual checks: ${unknownScripts.join(', ')}`);
}

function runScript(scriptName) {
    return new Promise((resolve) => {
        const child = spawn(process.execPath, [path.join(scriptsDirectory, scriptName)], {
            cwd: path.resolve(scriptsDirectory, '..'),
            env: process.env,
            stdio: 'inherit',
        });
        child.on('close', (code, signal) => {
            resolve({ code: code ?? 1, scriptName, signal });
        });
        child.on('error', () => {
            resolve({ code: 1, scriptName, signal: null });
        });
    });
}

const pending = [...selectedScripts];
const failures = [];
async function worker() {
    while (pending.length) {
        const scriptName = pending.shift();
        if (!scriptName) return;
        const result = await runScript(scriptName);
        if (result.code !== 0) failures.push(result);
    }
}

const workerCount = Math.min(concurrency, selectedScripts.length);
await Promise.all(Array.from({ length: workerCount }, () => worker()));

if (failures.length) {
    throw new Error(
        `${failures.length} User visual check(s) failed: ${failures
            .map(({ scriptName, code, signal }) => `${scriptName} (${signal ?? code})`)
            .join(', ')}`,
    );
}

console.log(`user: ${selectedScripts.length} visual checks passed (concurrency ${workerCount})`);

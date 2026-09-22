import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform as esbuildTransform } from 'esbuild';
import { expandVendorUiImports } from './helpers/vendor-ui-mock.mjs';
const transform = (input, options) => esbuildTransform(expandVendorUiImports(input), options);
async function load(original) {
    const module = { exports: {} };
    const file = new URL(
        original
            ? './fixtures/pages/admin-server-route-display.cjs'
            : '../src/pages/server/route/_List/ServerRouteDisplayColumns.ts',
        import.meta.url,
    );
    const source = await fs.readFile(file, 'utf8');
    vm.runInNewContext(
        original ? source : (await transform(source, { format: 'cjs', loader: 'ts' })).code,
        { module, exports: module.exports },
    );
    return original
        ? module.exports()
        : Object.values(module.exports.createReadonlyServerRouteColumns());
}
for (const [index, match] of [
    '',
    ',,,',
    'a,,b,',
    ' , ',
    [],
    ['a', 'b'],
    null,
    undefined,
    0,
    {},
    { length: '0' },
    { length: 3 },
].entries())
    test(`readonly route match ${index + 1}`, async () => {
        const results = [];
        for (const original of [true, false]) {
            const columns = await load(original);
            let value, error;
            try {
                value = columns[2].render(match);
            } catch (e) {
                error = e.name;
            }
            results.push({ columns: JSON.parse(JSON.stringify(columns)), value, error });
        }
        assert.deepEqual(results[1], results[0]);
    });
